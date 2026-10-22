import { useRef } from 'react'
import { characterGroups, charImage } from '@/data/characters'
import { Footer } from '@/components/Footer'

export default function Characters() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="bg-background text-on-background min-h-screen font-body-md overflow-x-clip trash-texture relative pt-28">
      <div className="grime-layer" />

      <header className="container-max px-gutter md:px-8 mb-12 md:mb-16 text-center relative z-10">
        <div className="chars-tag inline-block bg-primary-container text-on-primary-container px-4 py-1 font-label-bold uppercase relative overflow-hidden mb-4">
          <div className="absolute inset-0 halftone opacity-30" />
          <span className="relative text-white">Database: Categorized Subjects</span>
        </div>
        <h1 className="chars-title font-headline-xl uppercase text-white drop-shadow-[8px_8px_0px_#8b0000]">
          Gachiakuta <span className="text-primary italic">Cast</span>
        </h1>
        <nav className="flex flex-wrap justify-center gap-2 mt-8" aria-label="Character groups">
          {characterGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="font-label-bold text-[11px] uppercase text-white border border-outline-variant px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
            >
              {g.title.replace("Cleaners' ", '')}
            </a>
          ))}
        </nav>
      </header>

      <main className="container-max px-gutter md:px-8 relative z-10 pb-12">
        {characterGroups.map((group) => (
          <section key={group.id} id={group.id} className="category-section mb-16 md:mb-20 scroll-mt-28">
            <div className="flex items-center gap-4 mb-8 md:mb-10 border-b-2 border-outline/20 pb-4">
              <h2 className="category-title font-headline-lg !text-[clamp(24px,3.2vw,36px)] uppercase text-primary italic">{group.title}</h2>
              <div className="flex-1 h-px bg-outline/20" />
              <span className="font-label-bold text-xs text-outline">{String(group.characters.length).padStart(2, '0')}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {group.characters.map((char) => (
                <article key={char.slug} className="char-card group">
                  <div className="char-card-inner bg-surface-container border-2 border-outline relative h-full flex flex-col transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary z-30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="aspect-[3/4] overflow-hidden relative bg-black">
                      <div className="absolute inset-0 halftone opacity-20 z-10 pointer-events-none" />
                      <img
                        alt=""
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale"
                        src={charImage(char.slug)}
                        width={420}
                        height={700}
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        alt={char.name}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:scale-105"
                        src={charImage(char.slug)}
                        width={420}
                        height={700}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black to-transparent z-20">
                        <span className="bg-primary text-black px-2 py-0.5 font-label-bold text-[10px] uppercase inline-block">{char.role}</span>
                      </div>
                    </div>
                    <div className="p-3 md:p-4 bg-black flex-1 flex flex-col justify-center border-t-2 border-outline/30">
                      <h3 className="font-headline-md !text-lg md:!text-xl uppercase text-white group-hover:text-primary transition-colors">{char.name}</h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  )
}
