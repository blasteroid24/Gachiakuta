import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { LenisContext } from '@/lib/lenis-context'

const NAV_OFFSET = -88

/**
 * One Lenis instance for the whole app, driven by GSAP's ticker so Lenis and
 * ScrollTrigger update on the same frame (the main source of scroll jitter before).
 * Disabled entirely for prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- exposing an external instance
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      <RouteScroll lenis={lenis} />
      {children}
    </LenisContext.Provider>
  )
}

/** Scroll to the hash target on navigation, or jump to the top on a route change. */
function RouteScroll({ lenis }: { lenis: Lenis | null }) {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
      else window.scrollTo(0, 0)
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }
    // Wait a frame so pins/spacers from the newly mounted page exist before measuring.
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1))
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.4 })
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash, key, lenis])

  return null
}
