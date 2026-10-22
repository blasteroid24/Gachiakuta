import { useState, type ReactNode } from 'react'
import { BookOpen, Footprints, Gem, Hand, Shirt, Watch, type LucideIcon } from 'lucide-react'
import { watchmanItems, watchmanImage, type WatchmanItem, type WatchmanKind } from '@/data/watchman'
import { cn } from '@/lib/utils'

const icons: Record<WatchmanKind, LucideIcon> = {
  gloves: Hand,
  boots: Footprints,
  coat: Shirt,
  book: BookOpen,
  necklace: Gem,
  watch: Watch,
}

type Props = {
  renderViewer?: (item: WatchmanItem) => ReactNode
}

export function Watchman({ renderViewer }: Props) {
  const [active, setActive] = useState(0)
  const item = watchmanItems[active]
  const ActiveIcon = icons[item.kind]

  return (
    <section id="watchman" className="watchman-section py-margin px-gutter md:px-8 bg-surface-dim relative overflow-hidden border-t-4 border-primary-container">
      <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />
      <div className="container-max relative z-10">
        <div aria-hidden className="watermark-corrupted top-20 -left-40 -rotate-12">DATA_CORRUPTED</div>
        <div aria-hidden className="watermark-corrupted bottom-20 -right-40 rotate-12">SYSTEM_ERROR</div>

        <div className="mb-10 md:mb-12 border-l-8 border-primary-container pl-6">
          <span className="font-label-bold text-primary uppercase tracking-[0.3em] text-xs glitch-text">
            Classified Database // Access Level: Restricted
          </span>
          <h2 className="section-title font-headline-lg uppercase text-white mt-2 chromatic-aberration">The Watchman Series</h2>
          <p className="font-body-md text-on-surface-variant mt-3 max-w-2xl">
            The six original Vital Instruments of Canis Surebrec — unlimited Anima, one for each sense.
          </p>
        </div>

        {/* Featured item */}
        <div className="watchman-feature grid grid-cols-1 lg:grid-cols-5 gap-0 border-2 border-primary-container/60 bg-black mb-10">
          <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-primary-container/60">
            {renderViewer ? (
              renderViewer(item)
            ) : (
              <img
                key={item.kind}
                src={watchmanImage(item.kind, 960)}
                srcSet={`${watchmanImage(item.kind, 480)} 480w, ${watchmanImage(item.kind, 960)} 960w`}
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="absolute top-3 left-3 font-label-bold text-[10px] text-primary/80 uppercase z-10 pointer-events-none">
              Tactical_Scan_{item.ref}.obj
            </div>
          </div>
          <div key={item.kind} className="swap-in lg:col-span-2 p-6 md:p-8 flex flex-col gap-4 relative">
            <div className="static-noise" />
            <div className="flex items-center gap-3">
              <ActiveIcon className="w-8 h-8 text-primary" strokeWidth={1.75} />
              <span className="font-label-bold text-xs uppercase bg-primary-container text-on-primary-container px-2 py-1">
                Class: {item.weaponClass}
              </span>
            </div>
            <h3 className="feature-name font-headline-md uppercase text-white chromatic-aberration">{item.name}</h3>
            <dl className="grid grid-cols-2 gap-3 font-label-bold text-xs uppercase">
              <div className="border border-outline-variant p-3">
                <dt className="text-outline">Wielder</dt>
                <dd className="text-white mt-1 text-sm">{item.wielder}</dd>
              </div>
              <div className="border border-outline-variant p-3">
                <dt className="text-outline">Sense</dt>
                <dd className="text-white mt-1 text-sm">{item.sense}</dd>
              </div>
            </dl>
            <div className="flex items-center gap-4 font-label-bold text-xs">
              <span className="text-primary">SOUL SYNC:</span>
              <div className="flex-1 h-2 bg-surface-container-highest">
                <div className="sync-bar h-full bg-primary data-loss-bar origin-left" style={{ width: `${item.sync}%` }} />
              </div>
              <span className="text-white tabular-nums">{item.sync}%</span>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{item.blurb}</p>
            <div className="mt-auto pt-4 border-t border-dashed border-outline-variant flex justify-between font-label-bold text-[10px] uppercase">
              <span className="text-primary">Status: {item.status}</span>
              <span className="text-outline">Ref: {item.ref}</span>
            </div>
          </div>
        </div>

        {/* Selector grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" role="tablist" aria-label="Watchman items">
          {watchmanItems.map((w, i) => {
            const Icon = icons[w.kind]
            return (
              <button
                key={w.kind}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'watchman-card group relative text-left bg-surface-container-low border-2 p-3 transition-[border-color,transform] duration-300 hover:-translate-y-1 border-flicker',
                  i === active ? 'border-primary' : 'border-primary-container/30 hover:border-primary/70',
                )}
              >
                <div className="aspect-video bg-black/40 border border-outline-variant mb-3 relative overflow-hidden">
                  <img
                    src={watchmanImage(w.kind, 480)}
                    alt=""
                    className={cn(
                      'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
                      i === active ? 'opacity-100' : 'opacity-40 group-hover:opacity-80',
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                  <Icon className="absolute bottom-1.5 right-1.5 w-5 h-5 text-primary drop-shadow" />
                </div>
                <span className="block font-label-bold text-[11px] uppercase text-white leading-tight">{w.name}</span>
                <span className="block font-label-bold text-[10px] uppercase text-outline mt-1">{w.sense}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-10 p-4 bg-primary-container/10 border-l-4 border-primary text-[10px] font-label-bold text-on-surface-variant uppercase tracking-widest">
          Warning: Unauthorized access to Watchman Series data is punishable by immediate disposal into the Pit.
        </div>
      </div>
    </section>
  )
}
