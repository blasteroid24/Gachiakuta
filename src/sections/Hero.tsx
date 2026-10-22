import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <header id="top" className="hero-section relative min-h-[100svh] flex items-center justify-center pt-28 pb-16 px-gutter md:px-8 overflow-hidden">
      <div className="hero-bg absolute inset-0 z-0 opacity-60 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 halftone" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="container-max w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center relative z-10">
        <div className="hero-copy md:col-span-7 flex flex-col items-start gap-5 -rotate-1">
          <div className="hero-tag bg-primary-container text-on-primary-container px-4 py-1 font-label-bold uppercase relative overflow-hidden">
            <div className="absolute inset-0 halftone opacity-30" />
            <span className="relative">System: Trash-Punk Activated</span>
          </div>
          <h1 className="hero-title font-headline-xl uppercase text-white drop-shadow-[8px_8px_0px_#8b0000]">
            <span className="hero-line block">Clean the</span>
            <span className="hero-line block text-primary italic">World</span>
          </h1>
          <p className="hero-sub font-body-lg max-w-xl bg-surface/80 p-4 border-l-4 border-primary">
            Discarded by the "Heavens," surviving in the "Pit." Follow Rudo's descent into a world where trash is treasure and life is imbued in every piece of scrap.
          </p>
          <div className="hero-cta flex flex-wrap gap-4 mt-4">
            <Link
              to="/#cast"
              className="magnetic bg-white text-black font-label-bold text-base md:text-lg px-6 md:px-8 py-4 border-2 border-primary shadow-[6px_6px_0px_0px_#8b0000] transition-shadow hover:shadow-[10px_10px_0px_0px_#8b0000]"
            >
              MEET THE CAST
            </Link>
            <Link
              to="/#watchman"
              className="magnetic bg-transparent text-white font-label-bold text-base md:text-lg px-6 md:px-8 py-4 border-2 border-white transition-colors hover:bg-white/10"
            >
              EXPLORE JINKI
            </Link>
          </div>
        </div>

        <div className="hero-card md:col-span-5 relative group max-w-md mx-auto w-full">
          <div className="absolute inset-0 bg-primary-container rotate-3 translate-x-4 translate-y-4 -z-10 opacity-50" />
          <div className="border-4 border-white p-2 bg-surface -rotate-2 relative overflow-hidden">
            <div className="absolute inset-0 halftone opacity-20 pointer-events-none z-10" />
            <img
              alt="Rudo Surebrec, the protagonist"
              className="hero-img w-full object-cover aspect-[3/4] grayscale contrast-125 brightness-90"
              src="/img/rudo-hero-736.webp"
              srcSet="/img/rudo-hero-480.webp 480w, /img/rudo-hero-736.webp 736w"
              sizes="(min-width: 768px) 40vw, 90vw"
              width={736}
              height={981}
              fetchPriority="high"
              decoding="async"
            />
            <img
              aria-hidden
              alt=""
              className="hero-img-color absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              src="/img/rudo-hero-736.webp"
              srcSet="/img/rudo-hero-480.webp 480w, /img/rudo-hero-736.webp 736w"
              sizes="(min-width: 768px) 40vw, 90vw"
              decoding="async"
            />
          </div>
          <div className="absolute -bottom-4 -right-2 md:-right-4 bg-primary text-black font-black px-6 py-2 uppercase rotate-6 border-2 border-black z-20">
            #001 RUDO
          </div>
        </div>
      </div>
    </header>
  )
}
