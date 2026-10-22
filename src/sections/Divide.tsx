import type { ReactNode } from 'react'

type Props = {
  skyVisual?: ReactNode
  pitVisual?: ReactNode
}

export function Divide({ skyVisual, pitVisual }: Props) {
  return (
    <section id="divide" className="about-section py-margin px-gutter md:px-8 bg-surface-container-low relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-background to-transparent opacity-50" />
      <div className="container-max relative z-10 text-center">
        <h2 className="section-title font-headline-lg uppercase text-primary-fixed border-b-8 border-double border-outline-variant inline-block">
          The Great Divide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-12 text-left">
          <div className="about-panel clipped-panel p-6 md:p-8 bg-white text-black relative overflow-hidden border-2 border-black/10">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-5xl md:text-6xl">UPPER</div>
            <h3 className="font-headline-md mb-4 uppercase tracking-tighter">The Sky Realm</h3>
            <p className="font-body-md mb-6 relative z-10">
              A pristine utopia floating above the clouds. Here, everything is perfect, disposable, and heartless. Those who produce waste are revered, while the waste itself is cast into the abyss without a second thought.
            </p>
            <div className="border-2 border-black p-1 bg-white">
              <div className="h-56 md:h-64 bg-[#e9ecef] relative overflow-hidden">
                {skyVisual ?? <div className="h-full halftone" />}
              </div>
            </div>
          </div>

          <div className="about-panel clipped-panel p-6 md:p-8 bg-primary-container text-white relative overflow-hidden glitch-border">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-5xl md:text-6xl">LOWER</div>
            <h3 className="font-headline-md mb-4 uppercase tracking-tighter">The Pit</h3>
            <p className="font-body-md mb-6 relative z-10">
              The graveyard of the world. A sprawling industrial wasteland where survival depends on "Givers"—those who can manifest the latent souls within discarded objects. Life is hard, metal is heavy, and justice is rare.
            </p>
            <div className="border-2 border-white p-1 bg-black">
              <div className="h-56 md:h-64 bg-[#0b0b0b] relative overflow-hidden">
                {pitVisual ?? <div className="h-full halftone" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
