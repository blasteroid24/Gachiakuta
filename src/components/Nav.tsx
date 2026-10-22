import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLenis } from '@/lib/lenis-context'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const links = [
  { to: '/#divide', label: 'World' },
  { to: '/#cast', label: 'Cast' },
  { to: '/#watchman', label: 'Watchman' },
  { to: '/#jinki', label: 'Jinki' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lenis = useLenis()
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('')

  // Hide on scroll down, reveal on scroll up; page progress bar; active-section highlight.
  useGSAP(
    () => {
      let hidden = false
      const setHidden = (h: boolean) => {
        if (h === hidden) return
        hidden = h
        gsap.to(navRef.current, { yPercent: h ? -120 : 0, duration: 0.45, ease: 'power3.out', overwrite: true })
      }
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate(self) {
          progressRef.current!.style.transform = `scaleX(${self.progress})`
          setHidden(self.direction === 1 && self.scroll() > 240)
        },
      })

      if (pathname === '/') {
        for (const { to } of links) {
          const id = to.slice(2)
          const el = document.getElementById(id)
          if (!el) continue
          ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            refreshPriority: -1, // measure after the pinned cast section adds its spacer
            onToggle: (self) => setActive((cur) => (self.isActive ? id : cur === id ? '' : cur)),
          })
        }
      }
      return () => setHidden(false)
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  return (
    <>
      <nav ref={navRef} style={{ viewTransitionName: 'site-nav' }} className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter md:px-8 py-3 md:py-4 bg-surface/90 border-b-4 border-primary-container shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]">
        <Link to="/" viewTransition={pathname !== '/'} className="magnetic font-headline-lg !text-[28px] md:!text-[36px] font-black text-primary italic no-underline relative z-10">
          GACHIAKUTA
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              viewTransition={pathname !== '/'}
              className={cn(
                'nav-link font-label-bold uppercase text-on-surface hover:text-primary transition-colors',
                pathname === '/' && active === l.to.slice(2) && 'text-primary',
              )}
            >
              {l.label}
            </Link>
          ))}
          <NavLink
            to="/characters"
            viewTransition
            className={({ isActive }) => cn('nav-link font-label-bold uppercase hover:text-primary transition-colors', isActive ? 'text-primary' : 'text-on-surface')}
          >
            All Characters
          </NavLink>
        </div>

        <Link
          to={pathname === '/characters' ? '/' : '/characters'}
          viewTransition
          className="magnetic hidden md:inline-block bg-primary-container text-on-primary-container font-label-bold px-5 py-2 border-2 border-on-background shadow-[4px_4px_0px_0px_#ffffff] transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1"
        >
          {pathname === '/characters' ? 'BACK TO MISSION' : 'JOIN REBELLION'}
        </Link>

        <button
          className="md:hidden relative z-10 w-10 h-10 flex flex-col justify-center items-center gap-1.5 text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={cn('block h-0.5 w-6 bg-current transition-transform duration-300', open && 'translate-y-2 rotate-45')} />
          <span className={cn('block h-0.5 w-6 bg-current transition-opacity duration-300', open && 'opacity-0')} />
          <span className={cn('block h-0.5 w-6 bg-current transition-transform duration-300', open && '-translate-y-2 -rotate-45')} />
        </button>
        <div ref={progressRef} aria-hidden className="absolute left-0 -bottom-1 h-1 w-full origin-left scale-x-0 bg-primary" />
      </nav>

      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-surface-container-lowest flex flex-col items-start justify-center gap-6 px-8 transition-[opacity,visibility] duration-300',
          open ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
      >
        <div className="absolute inset-0 halftone opacity-20 pointer-events-none" />
        {[...links, { to: '/characters', label: 'All Characters' }].map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            viewTransition={!(pathname === '/' && l.to.startsWith('/#'))}
            onClick={() => setOpen(false)}
            className={cn(
              'relative font-headline-lg uppercase text-white hover:text-primary transition-[transform,opacity] duration-500',
              open ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0',
            )}
            style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
          >
            <span className="font-label-bold text-primary text-xs align-top mr-3">0{i + 1}</span>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}
