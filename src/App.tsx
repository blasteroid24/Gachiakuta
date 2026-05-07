import { useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis } from '@studio-freight/react-lenis';
import Characters from './pages/Characters';

gsap.registerPlugin(ScrollTrigger);

function ScrollytellingContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax for the Hero
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Pin and scrub text in About Section
      gsap.from('.about-panel', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // Horizontal Scroll for Characters
      if (horizontalScrollRef.current) {
        const sections = gsap.utils.toArray('.char-card');
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.char-section',
            pin: true,
            scrub: 1,
            end: () => '+=' + horizontalScrollRef.current!.offsetWidth,
          },
        });
      }

      // Parallax for Watchman Series
      gsap.from('.watchman-card', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.watchman-section',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background text-on-background font-body-md overflow-x-hidden trash-texture relative dark">
      <div className="grime-layer"></div>

      {/* Background Graffiti Elements */}
      <div className="graffiti-accent text-8xl -top-10 -left-10 rotate-12">TRASH</div>
      <div className="graffiti-accent text-9xl bottom-1/4 right-0 -rotate-90 opacity-10">JINKI</div>
      <div className="graffiti-accent text-7xl top-1/2 left-0 rotate-90 opacity-5">GIVER</div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter py-4 bg-surface/90 backdrop-blur-sm border-b-4 border-primary dark:border-primary-container shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]">
        <div className="flex items-center gap-8">
          <span className="font-headline-lg text-headline-lg font-black text-primary italic">GACHIAKUTA</span>
          <div className="hidden md:flex gap-6 items-center">
            <a className="font-headline-md text-headline-md uppercase tracking-tighter text-primary font-black border-b-2 border-primary hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-100" href="#">Manga</a>
            <a className="font-headline-md text-headline-md uppercase tracking-tighter text-on-surface hover:text-primary-fixed hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-100" href="#">Characters</a>
            <a className="font-headline-md text-headline-md uppercase tracking-tighter text-on-surface hover:text-primary-fixed hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-100" href="#">World</a>
            <a className="font-headline-md text-headline-md uppercase tracking-tighter text-on-surface hover:text-primary-fixed hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-100" href="#">Gear</a>
          </div>
        </div>
        <button className="bg-primary-container text-on-primary-container font-label-bold px-6 py-2 border-2 border-on-background hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[4px_4px_0px_0px_#ffffff]">
          JOIN REBELLION
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section relative min-h-screen flex items-center justify-center pt-24 px-gutter overflow-hidden">
        <div className="hero-bg absolute inset-0 z-0 opacity-60 mix-blend-overlay">
          <div className="absolute inset-0 halftone"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>
        <div className="container-max w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
          <div className="md:col-span-7 flex flex-col items-start gap-4 transform -rotate-1">
            <div className="bg-primary-container text-on-primary-container px-4 py-1 font-label-bold uppercase relative overflow-hidden">
              <div className="absolute inset-0 halftone opacity-30"></div>
              <span className="relative">System: Trash-Punk Activated</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl uppercase text-white drop-shadow-[8px_8px_0px_#8b0000]">
              CLEAN THE <br /> <span className="text-primary italic">WORLD</span>
            </h1>
            <p className="font-body-lg text-body-lg max-w-xl bg-surface/80 p-4 border-l-4 border-primary backdrop-blur-sm">
              Discarded by the "Heavens," surviving in the "Pit." Follow Rudo's descent into a world where trash is treasure and life is imbued in every piece of scrap.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="bg-white text-black font-label-bold text-lg px-8 py-4 border-2 border-primary shadow-[6px_6px_0px_0px_#8b0000] hover:-translate-y-1 hover:-translate-x-1 transition-all">START READING</button>
              <button className="bg-transparent text-white font-label-bold text-lg px-8 py-4 border-2 border-white hover:bg-white/10 transition-all">EXPLORE JINKI</button>
            </div>
          </div>
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-0 bg-primary-container transform rotate-3 translate-x-4 translate-y-4 -z-10 opacity-50"></div>
            <div className="border-4 border-white p-2 bg-surface transform -rotate-2 relative overflow-hidden">
              <div className="absolute inset-0 halftone opacity-20 pointer-events-none"></div>
              <img alt="Rudo the protagonist" className="grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-[3/4]" src="/rudo surebrec (1).jpg" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-black font-black px-6 py-2 uppercase transform rotate-6 border-2 border-black z-20">
              #001 RUDO
            </div>
          </div>
        </div>
      </header>

      {/* About Section: The Great Divide */}
      <section className="about-section py-margin px-gutter bg-surface-container-low relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-background to-transparent opacity-50"></div>
        <div className="container-max mx-auto relative z-10">
          <h2 className="font-headline-lg text-headline-lg uppercase mb-12 text-center text-primary-fixed border-b-8 border-double border-outline-variant inline-block">The Great Divide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div className="about-panel clipped-panel p-8 bg-white text-black relative group overflow-hidden border-2 border-black/10">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">UPPER</div>
              <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-tighter">The Sky Realm</h3>
              <p className="font-body-md text-body-md mb-6 relative z-10">
                A pristine utopia floating above the clouds. Here, everything is perfect, disposable, and heartless. Those who produce waste are revered, while the waste itself is cast into the abyss without a second thought.
              </p>
              <div className="border-2 border-black p-1 bg-white">
                <div className="h-48 bg-secondary-container flex items-center justify-center font-label-bold text-outline uppercase halftone">Utopian Grid Visualization</div>
              </div>
            </div>

            <div className="about-panel clipped-panel p-8 bg-primary-container text-white relative group overflow-hidden glitch-border">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">LOWER</div>
              <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-tighter">The Pit</h3>
              <p className="font-body-md text-body-md mb-6 relative z-10">
                The graveyard of the world. A sprawling industrial wasteland where survival depends on "Givers"—those who can manifest the latent souls within discarded objects. Life is hard, metal is heavy, and justice is rare.
              </p>
              <div className="border-2 border-white p-1 bg-black">
                <div className="h-48 bg-surface-container-highest flex items-center justify-center font-label-bold text-on-surface uppercase halftone">Wasteland Topography</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characters Grid */}
      <section className="char-section h-screen bg-background relative overflow-hidden flex flex-col justify-center">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-10 font-black text-[12rem] uppercase -rotate-90 pointer-events-none mix-blend-overlay z-0">WATCHMAN</div>
        <div className="px-gutter container-max mx-auto mb-12 relative z-10 shrink-0">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-primary font-label-bold uppercase tracking-widest bg-primary/10 px-2">The Rebels</span>
              <h2 className="font-headline-lg text-headline-lg uppercase">Engineers of Fate</h2>
            </div>
          </div>
        </div>
        <div ref={horizontalScrollRef} className="flex gap-8 px-gutter h-[60vh] w-[400vw] relative z-10">

          {/* Rudo Card */}
          <div className="char-card w-[400px] h-full shrink-0 group">
            <div className="bg-surface-container border-2 border-outline relative h-full flex flex-col transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary z-30"></div>
              <div className="absolute top-4 right-4 z-20">
                <span className="stencil-status text-sm">ACTIVE</span>
              </div>
              <img alt="Rudo" className="w-full h-2/3 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" src="/RUDO SUREBREC _ GACHIAKUTA.jpg" />
              <div className="p-6 flex-1 flex flex-col justify-center bg-black">
                <h4 className="font-headline-md text-headline-md uppercase">Rudo</h4>
                <span className="bg-white text-black w-max px-2 py-0.5 font-label-bold text-xs uppercase mb-4 inline-block">The Trash Collector</span>
                <p className="font-body-md text-body-md text-on-surface-variant">Falsely accused of murder and thrown into the Pit, Rudo discovers his ability as a Giver—animating any object he values.</p>
              </div>
            </div>
          </div>

          {/* Enjin Card */}
          <div className="char-card w-[400px] h-full shrink-0 group">
            <div className="bg-surface-container border-2 border-outline relative h-full flex flex-col transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-white z-30"></div>
              <div className="absolute top-4 right-4 z-20">
                <span className="stencil-status text-sm">DEPLOYED</span>
              </div>
              <img alt="Enjin" className="w-full h-2/3 object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500" src="/Enjin.png" />
              <div className="p-6 flex-1 flex flex-col justify-center bg-black">
                <h4 className="font-headline-md text-headline-md uppercase">Enjin</h4>
                <span className="bg-primary text-on-primary-container w-max px-2 py-0.5 font-label-bold text-xs uppercase mb-4 inline-block">Janitor Squad Leader</span>
                <p className="font-body-md text-body-md text-on-surface-variant">A powerful Giver who wields an umbrella Jinki. He rescues Rudo and introduces him to the Janitors' mission.</p>
              </div>
            </div>
          </div>

          {/* Zanka Nijiku Card */}
          <div className="char-card w-[400px] h-full shrink-0 group">
            <div className="bg-surface-container border-2 border-outline relative h-full flex flex-col transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary z-30"></div>
              <div className="absolute top-4 right-4 z-20">
                <span className="stencil-status text-sm">ON MISSION</span>
              </div>
              <img alt="Zanka Nijiku" className="w-full h-2/3 object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500" src="/Zanka.jpg" />
              <div className="p-6 flex-1 flex flex-col justify-center bg-black">
                <h4 className="font-headline-md text-headline-md uppercase">Zanka Nijiku</h4>
                <span className="bg-white text-black px-2 w-max py-0.5 font-label-bold text-xs uppercase mb-4 inline-block">The Iron-Willed Spear</span>
                <p className="font-body-md text-body-md text-on-surface-variant">A cool and stoic warrior whose discipline is as sharp as his spear Jinki. He values strength and order.</p>
              </div>
            </div>
          </div>

          {/* Explore Other Characters Card */}
          <div className="char-card w-[400px] h-full shrink-0 group">
            <div className="bg-primary-container border-2 border-white relative h-full transition-transform duration-300 shadow-[8px_8px_0px_0px_#131313]">
              <div className="h-full flex flex-col items-center justify-center p-8 halftone text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 z-20">
                  <span className="stencil-status text-sm !bg-white !text-primary-container border-white">RECORDS</span>
                </div>
                <span className="material-symbols-outlined text-8xl mb-4 text-white">groups</span>
                <h4 className="font-headline-md text-headline-md uppercase text-white">All Characters</h4>
                <p className="font-body-md text-body-md mt-4 text-white">Access the complete database of Janitors, Raiders, and other inhabitants of the Pit and the Heavens.</p>
                <Link to="/characters" className="mt-8 border-2 border-white text-white px-6 py-2 font-label-bold uppercase hover:bg-white hover:text-black transition-colors no-underline">Explore Others</Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Watchman Series Section */}
      <section className="watchman-section py-margin px-gutter bg-surface-dim relative overflow-hidden border-t-4 border-primary-container">
        <div className="absolute inset-0 halftone opacity-30 pointer-events-none"></div>
        <div className="container-max mx-auto relative z-10">
          <div className="watermark-corrupted absolute top-20 -left-40 -rotate-12 pointer-events-none">DATA_CORRUPTED</div>
          <div className="watermark-corrupted absolute bottom-20 -right-40 rotate-12 pointer-events-none">SYSTEM_ERROR</div>

          <div className="mb-12 border-l-8 border-primary-container pl-6">
            <span className="font-label-bold text-primary uppercase tracking-[0.3em] text-xs glitch-text">Classified Database // Access Level: Restricted</span>
            <h2 className="font-headline-lg text-headline-lg uppercase text-white mt-2 chromatic-aberration">The Watchman Series</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="watchman-card bg-surface-container-low border-2 border-primary-container/30 relative p-6 group hover:border-primary transition-colors border-flicker">
              <div className="static-noise"></div>
              <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container px-3 py-1 font-label-bold text-[10px] uppercase z-10">
                Weapon Class: Restricted
              </div>
              <div className="aspect-video bg-black/40 border border-outline-variant mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 halftone opacity-20"></div>
                <img src="/watchman_rudoglove.jpeg" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="material-symbols-outlined text-6xl text-primary/40 chromatic-aberration z-10">back_hand</span>
                <div className="absolute bottom-2 left-2 font-label-bold text-[10px] text-primary/60 uppercase z-10">Tactical_Scan_001.jpg</div>
              </div>
              <h3 className="font-headline-md text-2xl uppercase mb-2 text-white chromatic-aberration relative z-10">Gloves of the Damned</h3>
              <div className="flex items-center gap-4 mb-4 font-label-bold text-xs relative z-10">
                <span className="text-primary">SOUL SYNC:</span>
                <div className="flex-1 h-2 bg-surface-container-highest">
                  <div className="h-full bg-primary data-loss-bar" style={{ width: '88%' }}></div>
                </div>
                <span className="text-white">88%</span>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed relative z-10">
                Experimental gauntlets that allow the user to manifest physical force from perceived value. High risk of mental contamination if used beyond safety limits.
              </p>
              <div className="mt-6 pt-4 border-t border-dashed border-outline-variant flex justify-between relative z-10">
                <span className="font-label-bold text-[10px] text-primary uppercase translate-x-1 -translate-y-0.5 opacity-80">Status: Active</span>
                <span className="font-label-bold text-[10px] text-outline uppercase -translate-x-1 translate-y-0.5 opacity-80">Ref: R-01</span>
              </div>
            </div>

            {/* Other watchman cards */}
            <div className="watchman-card bg-surface-container-low border-2 border-primary-container/30 relative p-6 group hover:border-primary transition-colors border-flicker">
              <div className="static-noise"></div>
              <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container px-3 py-1 font-label-bold text-[10px] uppercase z-10">
                Weapon Class: Combat Ready
              </div>
              <div className="aspect-video bg-black/40 border border-outline-variant mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 halftone opacity-20"></div>
                <img src="/watchaman_amoshoes.jpeg" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="material-symbols-outlined text-6xl text-primary/40 chromatic-aberration z-10">directions_walk</span>
                <div className="absolute bottom-2 left-2 font-label-bold text-[10px] text-primary/60 uppercase z-10">Tactical_Scan_042.jpg</div>
              </div>
              <h3 className="font-headline-md text-2xl uppercase mb-2 text-white chromatic-aberration relative z-10">Watchman Boots</h3>
              <div className="flex items-center gap-4 mb-4 font-label-bold text-xs relative z-10">
                <span className="text-primary">SOUL SYNC:</span>
                <div className="flex-1 h-2 bg-surface-container-highest">
                  <div className="h-full bg-primary data-loss-bar" style={{ width: '94%' }}></div>
                </div>
                <span className="text-white">94%</span>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed relative z-10">
                Emits scents that trigger memories and powerful sensory illusions.
              </p>
              <div className="mt-6 pt-4 border-t border-dashed border-outline-variant flex justify-between relative z-10">
                <span className="font-label-bold text-[10px] text-primary uppercase translate-x-1 -translate-y-0.5 opacity-80">Status: Deployed</span>
                <span className="font-label-bold text-[10px] text-outline uppercase -translate-x-1 translate-y-0.5 opacity-80">Ref: E-42</span>
              </div>
            </div>

            <div className="watchman-card bg-surface-container-low border-2 border-primary-container/30 relative p-6 group hover:border-primary transition-colors border-flicker">
              <div className="static-noise"></div>
              <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container px-3 py-1 font-label-bold text-[10px] uppercase z-10">
                Weapon Class: Prototype
              </div>
              <div className="aspect-video bg-black/40 border border-outline-variant mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 halftone opacity-20"></div>
                <img src="/watchman_jacket.webp" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="material-symbols-outlined text-6xl text-primary/40 chromatic-aberration z-10">styler</span>
                <div className="absolute bottom-2 left-2 font-label-bold text-[10px] text-primary/60 uppercase z-10">Tactical_Scan_089.jpg</div>
              </div>
              <h3 className="font-headline-md text-2xl uppercase mb-2 text-white chromatic-aberration relative z-10">Mishra (Coat)</h3>
              <div className="flex items-center gap-4 mb-4 font-label-bold text-xs relative z-10">
                <span className="text-primary">SOUL SYNC:</span>
                <div className="flex-1 h-2 bg-surface-container-highest">
                  <div className="h-full bg-primary data-loss-bar" style={{ width: '76%' }}></div>
                </div>
                <span className="text-white">76%</span>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed relative z-10">
                Mutates the user's body based on whatever they "consume" (e.g., wings, scales).
              </p>
              <div className="mt-6 pt-4 border-t border-dashed border-outline-variant flex justify-between relative z-10">
                <span className="font-label-bold text-[10px] text-primary uppercase translate-x-1 -translate-y-0.5 opacity-80">Status: Testing</span>
                <span className="font-label-bold text-[10px] text-outline uppercase -translate-x-1 translate-y-0.5 opacity-80">Ref: Z-89</span>
              </div>
            </div>
          </div>
          <div className="mt-12 p-4 bg-primary-container/10 border-l-4 border-primary text-[10px] font-label-bold text-on-surface-variant uppercase tracking-widest relative z-10">
            Warning: Unauthorized access to Watchman Series data is punishable by immediate disposal into the Pit.
          </div>
        </div>
      </section>

      {/* World/Gear Feature */}
      <section className="py-margin px-gutter bg-surface-container-highest border-y-8 border-double border-outline-variant relative overflow-hidden">
        <div className="absolute inset-0 halftone opacity-20 pointer-events-none"></div>
        <div className="container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 border-l-8 border-t-8 border-primary opacity-50"></div>
            <div className="bg-black p-8 border-2 border-white transform rotate-1 shadow-[12px_12px_0px_0px_#8b0000]">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-headline-md text-headline-md uppercase text-primary">Jinki Analysis</h3>
                <span className="font-label-bold text-outline-variant uppercase">Model: Gloves of the Damned</span>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center font-black border border-white/20">01</div>
                  <div>
                    <p className="font-label-bold uppercase text-white">Soul Connection</p>
                    <p className="text-xs text-on-surface-variant">Synchronization rate must exceed 85% for activation.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center font-black border border-white/20">02</div>
                  <div>
                    <p className="font-label-bold uppercase text-white">Physical manifestation</p>
                    <p className="text-xs text-on-surface-variant">The object's physical properties are amplified by user's willpower.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center font-black border border-white/20">03</div>
                  <div>
                    <p className="font-label-bold uppercase text-white">Corruption Risk</p>
                    <p className="text-xs text-on-surface-variant">Overuse leads to permanent mental fracture from the object's history.</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-dashed border-outline-variant">
                <div className="h-2 bg-outline-variant w-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
                <p className="text-[10px] uppercase mt-2 text-outline-variant">System integrity: 67% and falling...</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-xl text-headline-xl uppercase tracking-tighter">Tools of the <br /><span className="italic text-primary">Unwanted</span></h2>
            <p className="font-body-lg text-body-lg">In Gachiakuta, objects aren't just things—they are repositories of human emotion. When a "Giver" pours their spirit into an item they cherish, it transforms into a Jinki: a living weapon of immense power.</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-surface border-l-4 border-primary">
                <span className="material-symbols-outlined text-primary mb-2">settings_input_component</span>
                <p className="font-label-bold uppercase text-sm">Industrial Design</p>
                <p className="text-xs opacity-60">Scrap metal components and salvaged gear.</p>
              </div>
              <div className="p-4 bg-surface border-l-4 border-primary">
                <span className="material-symbols-outlined text-primary mb-2">auto_fix_high</span>
                <p className="font-label-bold uppercase text-sm">Vital Essence</p>
                <p className="text-xs opacity-60">Animated by the user's life force.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="w-full py-margin px-gutter flex flex-col md:flex-row justify-between items-center gap-4 border-t-8 border-double border-outline-variant bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
        <div className="flex flex-col items-center md:items-start gap-4 relative z-10">
          <span className="font-headline-md text-headline-md text-on-surface font-black uppercase">JOIN THE REBELLION</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6 relative z-10">
          <p className="font-label-bold text-label-bold uppercase text-primary text-center md:text-right">
            © 2024 ENGINE STUDIOS / KODANSHA. CLEAN THE WORLD.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
          <ScrollytellingContent />
        </ReactLenis>
      } />
      <Route path="/characters" element={<Characters />} />
    </Routes>
  );
}
