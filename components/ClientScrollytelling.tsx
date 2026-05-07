
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

export default function ClientScrollytelling({ stitchData }: { stitchData: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const watchmanRef = useRef<HTMLDivElement>(null);
  const watchmanScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Watchman Series Horizontal Scroll
    if (watchmanRef.current && watchmanScrollRef.current) {
      const sections = gsap.utils.toArray('.watchman-item');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        ScrollTrigger: {
          trigger: watchmanRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + watchmanScrollRef.current!.offsetWidth,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black text-white selection:bg-[#8B0000] selection:text-white">
      <div className="noise-bg pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"></div>

      {/* API Stitch Data Stamp */}
      <div className="fixed top-4 right-4 z-50 brutal-border bg-black px-4 py-2 text-[10px] uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-[#8B0000] cursor-pointer">
        Stitch Product ID: <span className="font-bold">{stitchData?.id || '14121529659282373839'}</span>
      </div>

      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/rudo surebrec (1).jpg"
            alt="Rudo"
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </motion.div>

        <div className="z-10 flex flex-col items-center text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-epilogue text-[12vw] font-black leading-[0.8] tracking-[-0.05em] text-[#8B0000]"
            style={{ textShadow: '6px 6px 0px #333' }}
          >
            GACHIAKUTA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 border-b-4 border-white pb-2 font-space text-lg font-bold tracking-[0.2em] uppercase"
          >
            The World & The Power System
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 z-10 flex flex-col items-center animate-bounce"
        >
          <span className="font-space text-xs tracking-widest uppercase mb-2">Descend</span>
          <div className="h-12 w-[2px] bg-white/50"></div>
        </motion.div>
      </section>

      {/* The World Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:py-48">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="brutal-border bg-[#111] p-8 md:p-12 hover:border-white transition-colors duration-300"
          >
            <h2 className="font-epilogue text-5xl font-extrabold text-white">THE SPHERE</h2>
            <div className="mt-4 h-1 w-16 bg-[#8B0000]" />
            <p className="mt-6 font-inter text-lg text-gray-300 leading-relaxed">
              A pristine utopia floating above the clouds. Here, everything is perfect, disposable, and heartless. Those who produce waste are revered, while the waste itself is cast into the abyss without a second thought.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="brutal-border bg-[#0a0a0a] p-8 md:p-12 relative top-0 md:top-24 border-[#8B0000] hover:border-white transition-colors duration-300"
          >
            <h2 className="font-epilogue text-5xl font-extrabold text-[#8B0000]">THE PIT</h2>
            <div className="mt-4 h-1 w-16 bg-white" />
            <p className="mt-6 font-inter text-lg text-gray-300 leading-relaxed">
              The graveyard of the world. A sprawling industrial wasteland where survival depends on "Givers"—those who can manifest the latent souls within discarded objects. Life is hard, metal is heavy, and justice is rare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Watchman Series Horizontal Scroll */}
      <section ref={watchmanRef} className="relative h-screen w-full overflow-hidden bg-[#131313] border-y-4 border-[#333]">
        <div className="absolute top-12 left-12 z-20 pointer-events-none mix-blend-difference">
          <h2 className="font-epilogue text-4xl md:text-6xl font-black uppercase text-white">
            Watchman<br /><span className="text-[#8B0000]">Series</span>
          </h2>
          <p className="mt-2 font-space text-xs md:text-sm tracking-widest text-gray-300">THE 6 ORIGINAL VITAL INSTRUMENTS</p>
        </div>

        <div ref={watchmanScrollRef} className="flex h-full w-[600vw]">
          {watchmanData.map((item, i) => (
            <div key={i} className="watchman-item relative flex h-full w-screen items-center justify-center p-6 md:p-12">
              <div className="absolute inset-0 z-0 bg-black">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover opacity-20 grayscale filter transition-all duration-700 hover:grayscale-0 hover:opacity-50"
                />
              </div>
              <div className="z-10 flex w-full max-w-4xl flex-col items-start brutal-border bg-black/80 p-8 md:p-12 backdrop-blur-sm">
                <span className="font-space text-xl font-bold tracking-widest text-[#8B0000]">SENSE: {item.sense}</span>
                <h3 className="mt-2 font-epilogue text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">{item.name}</h3>
                <p className="mt-6 font-inter text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
                <div className="mt-8 border-t-2 border-[#333] pt-4 font-space text-sm text-gray-500 uppercase flex items-center gap-4">
                  <span>Current User</span>
                  <span className="bg-white text-black px-3 py-1 font-bold">{item.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Characters Section (Cleaners vs Raiders) */}
      <section className="relative min-h-screen bg-black py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-24 text-center font-epilogue text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #fff' }}>The</span> Cleaners
          </h2>

          <div className="grid grid-cols-1 gap-32">
            {cleaners.map((char, idx) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                <div className="relative w-full md:w-5/12 overflow-hidden brutal-border aspect-[3/4] group">
                  <img src={char.image} alt={char.name} className="h-full w-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" />
                  <div className="absolute bottom-0 left-0 bg-[#8B0000] px-6 py-4 font-space text-2xl font-bold text-white uppercase transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                    {char.name}
                  </div>
                </div>
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                  <h3 className="font-epilogue text-5xl font-black text-white tracking-tight">{char.name}</h3>
                  <div className="my-6 h-2 w-24 bg-[#333]" />
                  <p className="font-inter text-xl text-gray-400 leading-relaxed max-w-xl">{char.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-[#0a0a0a] py-32 border-t-[12px] border-[#8B0000]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-24 text-center font-epilogue text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#8B0000] drop-shadow-lg">
            The Raiders
          </h2>

          <div className="grid grid-cols-1 gap-32">
            {raiders.map((char, idx) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                <div className="relative w-full md:w-5/12 overflow-hidden brutal-border border-[#8B0000] aspect-[3/4] group">
                  <img src={char.image} alt={char.name} className="h-full w-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-lighten opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-0 right-0 bg-white px-6 py-4 font-space text-2xl font-bold text-black uppercase">
                    {char.name}
                  </div>
                </div>
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                  <h3 className="font-epilogue text-5xl font-black text-[#8B0000] tracking-tight">{char.name}</h3>
                  <div className="my-6 h-2 w-24 bg-white" />
                  <p className="font-inter text-xl text-gray-400 leading-relaxed max-w-xl">{char.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-[#333] bg-black py-24 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-epilogue text-6xl md:text-9xl font-black text-[#1a1a1a] hover:text-white transition-colors duration-500 cursor-default">CLEAN THE WORLD</h1>
          <p className="mt-8 font-space text-sm tracking-[0.3em] text-gray-600">© 2026 ENGINE STUDIOS / KODANSHA.</p>
        </div>
      </footer>
    </div>
  );
}

const watchmanData = [
  {
    name: "Gloves (3R)",
    sense: "TOUCH",
    user: "Rudo",
    desc: "Can give 'life' to any discarded object, turning it into a temporary Jinki.",
    image: "/watchman_rudoglove.jpeg"
  },
  {
    name: "Boots",
    sense: "SMELL",
    user: "Amo",
    desc: "Emits scents that trigger memories and powerful sensory illusions.",
    image: "/watchaman_amoshoes.jpeg"
  },
  {
    name: "Mishra (Coat)",
    sense: "TASTE",
    user: "Zodyl",
    desc: "Mutates the user's body based on whatever they 'consume' (e.g., wings, scales).",
    image: "/watchman_jacket.webp"
  },
  {
    name: "Book",
    sense: "SIGHT",
    user: "Tamsy",
    desc: "Can alter or 'rewrite' the memories of anyone who looks at its pages.",
    image: "/Watchman_book.webp"
  },
  {
    name: "Connect (Necklace)",
    sense: "HEARING",
    user: "Gountess",
    desc: "Links thoughts/feelings; used to create the communication chokers.",
    image: "/watchman_pendant.jpeg"
  },
  {
    name: "Wristwatch",
    sense: "INTUITION",
    user: "Enjin",
    desc: "Recently revealed to manipulate time or precognitive 'instinct.'",
    image: "/watchman_watch.webp"
  }
];

const cleaners = [
  { name: "Enjin", image: "/Enjin.png", desc: "A veteran fighter using Umbreaker (a sword-umbrella). He acts as a mentor to Rudo and possesses the Watchman Watch." },
  { name: "Zanka Nijiku", image: "/Zanka.jpg", desc: "A former Hell Guard trainee with an inferiority complex. His weapon, Lovely Assistaff, is a simple stick that becomes a high-density spear." },
  { name: "Semiu Grier", image: "/Semiu.png", desc: "The HQ receptionist and guard. Her Jinki, Eyes (glasses), grants her superhuman reflexes and a 'bullet time' perception of the future." },
  { name: "Dear", image: "/Dear.png", desc: "A 10-year-old child using Centralian (a pacifier). He is a 'Power Parasite' who drains energy from opponents with every punch." },
  { name: "Arkha Corvus", image: "/Corvus.png", desc: "The mysterious and towering head of the Cleaners, currently regarded as the strongest fighter on the Surface." }
];

const raiders = [
  { name: "Zodyl Typhon", image: "/Zodyl.png", desc: "A cold strategist who wears the Watchman Coat. He believes the Sphere is a parasite that must be pruned." },
  { name: "Jabber Wonger", image: "/Jabber.png", desc: "A frontline brawler and sadist. He uses his hands and toxic fluids to dissolve enemies. He was Rudo's first major obstacle." },
  { name: "Bundus", image: "/Bundus.png", desc: "A massive heavy-hitter who uses industrial-style tank weapons to overwhelm opponents with sheer firepower." },
  { name: "Fu Orostor", image: "/Fu.png", desc: "A young Raider who eventually defects to the Cleaners after realizing the depth of Zodyl's destructive goals." }
];
