import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { featuredCharacters, charImage } from '@/data/characters'
import { cn } from '@/lib/utils'

export function Cast() {
  return (
    <section id="cast" className="cast-section relative bg-background overflow-hidden py-16 md:py-0 md:h-[100svh] flex flex-col justify-center">
      <div
        aria-hidden
        className="cast-watermark absolute -left-20 top-1/2 -translate-y-1/2 opacity-10 font-black text-[8rem] md:text-[12rem] uppercase -rotate-90 pointer-events-none z-0 select-none"
      >
        WATCHMAN
      </div>

      <div className="px-gutter md:px-8 container-max w-full mb-8 md:mb-10 relative z-10 shrink-0 flex items-end justify-between gap-4">
        <div>
          <span className="text-primary font-label-bold uppercase tracking-widest bg-primary/10 px-2">The Rebels</span>
          <h2 className="section-title font-headline-lg uppercase mt-2">Engineers of Fate</h2>
        </div>
        <div className="hidden md:flex items-center gap-3 font-label-bold text-xs uppercase text-on-surface-variant">
          <span className="cast-count text-primary">01</span>
          <div className="w-32 h-1 bg-surface-container-highest overflow-hidden">
            <div className="cast-progress h-full w-full bg-primary origin-left scale-x-0" />
          </div>
          <span>0{featuredCharacters.length + 1}</span>
        </div>
      </div>

      <div className="cast-viewport relative z-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [scrollbar-width:none]">
        <div className="cast-track flex gap-6 md:gap-8 px-gutter md:px-8 w-max">
          {featuredCharacters.map((c) => (
            <article key={c.name} className="cast-card snap-center shrink-0 w-[78vw] max-w-[380px] md:w-[380px] h-[62svh] min-h-[460px] max-h-[640px] group">
              <div className="cast-card-inner bg-surface-container border-2 border-outline relative h-full flex flex-col transition-[border-color] duration-300 group-hover:border-primary">
                <div className={cn('absolute top-0 left-0 w-full h-1 z-30', c.accent === 'primary' ? 'bg-primary' : 'bg-white')} />
                <div className="absolute top-4 right-4 z-20">
                  <span className="stencil-status text-sm">{c.status}</span>
                </div>
                <div className="relative h-[62%] overflow-hidden bg-black">
                  <img
                    alt=""
                    aria-hidden
                    className="cast-img absolute top-0 -left-[8%] w-[116%] max-w-none h-full object-cover grayscale"
                    style={{ objectPosition: c.focus }}
                    src={charImage(c.slug)}
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    alt={c.name}
                    className="cast-img absolute top-0 -left-[8%] w-[116%] max-w-none h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ objectPosition: c.focus }}
                    src={charImage(c.slug)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-center bg-black">
                  <h3 className="font-headline-md uppercase">{c.name}</h3>
                  <span
                    className={cn(
                      'w-max px-2 py-0.5 font-label-bold text-xs uppercase mb-3 mt-1 inline-block',
                      c.accent === 'primary' ? 'bg-white text-black' : 'bg-primary text-on-primary',
                    )}
                  >
                    {c.title}
                  </span>
                  <p className="font-body-md text-sm md:text-base text-on-surface-variant">{c.blurb}</p>
                </div>
              </div>
            </article>
          ))}

          <article className="cast-card snap-center shrink-0 w-[78vw] max-w-[380px] md:w-[380px] h-[62svh] min-h-[460px] max-h-[640px]">
            <div className="bg-primary-container border-2 border-white relative h-full shadow-[8px_8px_0px_0px_#000]">
              <div className="h-full flex flex-col items-center justify-center p-8 halftone text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 z-20">
                  <span className="stencil-status text-sm !bg-white !text-primary-container">RECORDS</span>
                </div>
                <Users className="w-20 h-20 mb-4 text-white" strokeWidth={1.5} />
                <h3 className="font-headline-md uppercase text-white">All Characters</h3>
                <p className="font-body-md mt-4 text-white">
                  Access the complete database of Janitors, Raiders, and other inhabitants of the Pit and the Heavens.
                </p>
                <Link
                  to="/characters"
                  viewTransition
                  className="magnetic mt-8 border-2 border-white text-white px-6 py-2 font-label-bold uppercase hover:bg-white hover:text-black transition-colors"
                >
                  Explore Others
                </Link>
              </div>
            </div>
          </article>
          <div className="shrink-0 w-px md:w-[8vw]" aria-hidden />
        </div>
      </div>
    </section>
  )
}
