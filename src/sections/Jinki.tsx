import { Cpu, Sparkles } from 'lucide-react'

const steps = [
  { n: '01', title: 'Soul Connection', text: 'Synchronization rate must exceed 85% for activation.' },
  { n: '02', title: 'Physical Manifestation', text: "The object's physical properties are amplified by the user's willpower." },
  { n: '03', title: 'Corruption Risk', text: "Overuse leads to permanent mental fracture from the object's history." },
]

export function Jinki() {
  return (
    <section id="jinki" className="jinki-section py-margin px-gutter md:px-8 bg-surface-container-highest border-y-8 border-double border-outline-variant relative overflow-hidden">
      <div className="absolute inset-0 halftone opacity-20 pointer-events-none" />
      <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -top-6 -left-4 md:-top-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 border-l-8 border-t-8 border-primary opacity-50" />
          <div className="jinki-panel bg-black p-6 md:p-8 border-2 border-white rotate-1 shadow-[12px_12px_0px_0px_#8b0000]">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-8">
              <h3 className="font-headline-md uppercase text-primary">Jinki Analysis</h3>
              <span className="font-label-bold text-xs text-outline uppercase">Model: 3R Gloves</span>
            </div>
            <div className="space-y-6">
              {steps.map((s) => (
                <div key={s.n} className="jinki-step flex gap-4 items-center">
                  <div className="w-12 h-12 shrink-0 bg-primary-container rounded-full flex items-center justify-center font-black border border-white/20">{s.n}</div>
                  <div>
                    <p className="font-label-bold uppercase text-white">{s.title}</p>
                    <p className="text-xs text-on-surface-variant mt-1">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-dashed border-outline-variant">
              <div className="h-2 bg-outline-variant w-full overflow-hidden">
                <div className="integrity-bar h-full bg-primary w-2/3 origin-left" />
              </div>
              <p className="text-[10px] uppercase mt-2 text-outline">System integrity: 67% and falling...</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <h2 className="section-title font-headline-xl uppercase tracking-tighter">
            Tools of the <br />
            <span className="italic text-primary">Unwanted</span>
          </h2>
          <p className="font-body-lg">
            In Gachiakuta, objects aren't just things—they are repositories of human emotion. When a "Giver" pours their spirit into an item they cherish, it transforms into a Jinki: a living weapon of immense power.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-surface border-l-4 border-primary">
              <Cpu className="w-6 h-6 text-primary mb-2" />
              <p className="font-label-bold uppercase text-sm">Industrial Design</p>
              <p className="text-xs opacity-60 mt-1">Scrap metal components and salvaged gear.</p>
            </div>
            <div className="p-4 bg-surface border-l-4 border-primary">
              <Sparkles className="w-6 h-6 text-primary mb-2" />
              <p className="font-label-bold uppercase text-sm">Vital Essence</p>
              <p className="text-xs opacity-60 mt-1">Animated by the user's life force.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
