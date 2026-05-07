import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ReactLenis } from '@studio-freight/react-lenis';

const categories = [
  {
    id: "akuta",
    title: "Cleaners' Team Akuta",
    characters: [
      { name: "Rudo", image: "/RUDO SUREBREC _ GACHIAKUTA.jpg", role: "The Trash Collector" },
      { name: "Enjin", image: "/Enjin.png", role: "Janitor Squad Leader" },
      { name: "Zanka Nijiku", image: "/Zanka.jpg", role: "The Iron-Willed Spear" },
      { name: "Riyo", image: "/chara_list_4.png", role: "Cleaners Member" }, // Image missing, using placeholder
    ]
  },
  {
    id: "child",
    title: "Cleaners' Team Child",
    characters: [
      { name: "Bro", image: "/Bro.png", role: "Cleaners Member" },
      { name: "Dear", image: "/Dear.png", role: "Cleaners Member" },
      { name: "Guita", image: "/Guita.png", role: "Cleaners Member" },
    ]
  },
  {
    id: "supporter",
    title: "Supporter",
    characters: [
      { name: "Gris", image: "/Gris.png", role: "Supporter" },
      { name: "Tomme", image: "/Tomme.png", role: "Supporter" },
    ]
  },
  {
    id: "other_cleaners",
    title: "Other members of the Cleaners",
    characters: [
      { name: "Corvus", image: "/Corvus.png", role: "Cleaners Member" },
      { name: "Semiu", image: "/Semiu.png", role: "Cleaners Member" },
      { name: "August", image: "/August.png", role: "Cleaners Member" },
      { name: "Eishia", image: "/Eisha.png", role: "Cleaners Member" },
      { name: "Falla", image: "/Falla.png", role: "Cleaners Member" },
    ]
  },
  {
    id: "raiders",
    title: "The Raiders",
    characters: [
      { name: "Zodyl", image: "/Zodyl.png", role: "Raider Leader" },
      { name: "Jabber", image: "/Jabber.png", role: "Raider" },
      { name: "Cthoni", image: "/Cthoni.png", role: "Raider" },
      { name: "Noerde", image: "/Norde.png", role: "Raider" },
      { name: "Fu", image: "/Fu.png", role: "Raider" },
      { name: "Bundus", image: "/Bundus.png", role: "Raider" },
    ]
  },
  {
    id: "spherite",
    title: "Spherite",
    characters: [
      { name: "Regto", image: "/Regto.png", role: "Spherite" },
      { name: "Chiwa", image: "/Chiwa.png", role: "Spherite" },
    ]
  },
  {
    id: "other",
    title: "Other",
    characters: [
      { name: "Alice", image: "/Alice (Old Lady).png", role: "Other" },
      { name: "Remlin", image: "/Remlia.png", role: "Other" },
      { name: "Amo", image: "/Amo.png", role: "Other" },
    ]
  }
];

const Characters: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections appearing
      gsap.from('.category-section', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Animate individual cards with a slight delay
      gsap.from('.char-card', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.3
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div ref={containerRef} className="bg-background text-on-background min-h-screen font-body-md overflow-x-hidden trash-texture relative dark pt-24 pb-12">
        <div className="grime-layer"></div>

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter py-4 bg-surface/90 backdrop-blur-sm border-b-4 border-primary dark:border-primary-container shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]">
          <Link to="/" className="flex items-center gap-8 no-underline">
            <span className="font-headline-lg text-headline-lg font-black text-primary italic">GACHIAKUTA</span>
          </Link>
          <div className="hidden lg:flex gap-4">
            {categories.map(cat => (
              <a key={cat.id} href={`#${cat.id}`} className="font-label-bold text-[10px] uppercase text-white hover:text-primary transition-colors no-underline border-b border-transparent hover:border-primary">
                {cat.id.replace('_', ' ')}
              </a>
            ))}
          </div>
          <Link to="/" className="bg-primary-container text-on-primary-container font-label-bold px-6 py-2 border-2 border-on-background hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[4px_4px_0px_0px_#ffffff] no-underline">
            BACK TO MISSION
          </Link>
        </nav>

        <header className="container-max mx-auto px-gutter mb-16 text-center">
          <div className="inline-block bg-primary-container text-on-primary-container px-4 py-1 font-label-bold uppercase relative overflow-hidden mb-4">
            <div className="absolute inset-0 halftone opacity-30"></div>
            <span className="relative text-white">Database: Categorized Subjects</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl uppercase text-white drop-shadow-[8px_8px_0px_#8b0000]">
            GACHIAKUTA <span className="text-primary italic">CAST</span>
          </h1>
        </header>

        <main className="container-max mx-auto px-gutter">
          {categories.map((category) => (
            <section key={category.id} id={category.id} className="category-section mb-20">
              <div className="flex items-center gap-4 mb-10 border-b-2 border-outline/20 pb-4">
                <h2 className="font-headline-lg text-3xl uppercase text-primary italic">{category.title}</h2>
                <div className="flex-1 h-[1px] bg-outline/20"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {category.characters.map((char, charIndex) => (
                  <div key={charIndex} className="char-card group">
                    <div className="bg-surface-container border-2 border-outline relative h-full flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary z-30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <div className="absolute inset-0 halftone opacity-20 z-10 pointer-events-none"></div>
                        <img
                          alt={char.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          src={char.image}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/chara_list_4.png';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                          <span className="bg-primary text-black px-2 py-0.5 font-label-bold text-[10px] uppercase inline-block">
                            {char.role}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-black flex-1 flex flex-col justify-center border-t-2 border-outline/30">
                        <h4 className="font-headline-md text-xl uppercase text-white group-hover:text-primary transition-colors">{char.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="w-full mt-24 py-margin px-gutter border-t-8 border-double border-outline-variant bg-surface-container-lowest relative overflow-hidden text-center">
          <p className="font-label-bold text-label-bold uppercase text-primary">
            © 2024 ENGINE STUDIOS / KODANSHA. CLEAN THE WORLD.
          </p>
        </footer>
      </div>
    </ReactLenis>
  );
};

export default Characters;
