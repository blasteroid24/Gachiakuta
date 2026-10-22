import { useRef } from 'react'
import { gsap, MQ, useGSAP } from '@/lib/gsap'

const INTERACTIVE = 'a, button, [role="tab"], .magnetic'

/**
 * Desktop-only cursor (dot + lagging ring) and magnetic pull on `.magnetic` elements.
 * Everything is transform-only via gsap.quickTo, so it never triggers layout.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.finePointer, () => {
      document.documentElement.classList.add('has-cursor')
      gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

      const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.1, ease: 'power3' })
      const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.1, ease: 'power3' })
      const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
      const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

      let magnet: HTMLElement | null = null
      let mx: gsap.QuickToFunc | null = null
      let my: gsap.QuickToFunc | null = null

      const releaseMagnet = () => {
        if (!magnet) return
        gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        magnet = mx = my = null
      }

      const onMove = (e: PointerEvent) => {
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' })
        dotX(e.clientX)
        dotY(e.clientY)
        ringX(e.clientX)
        ringY(e.clientY)

        const target = (e.target as Element).closest<HTMLElement>('.magnetic')
        if (target !== magnet) {
          releaseMagnet()
          if (target) {
            magnet = target
            mx = gsap.quickTo(target, 'x', { duration: 0.4, ease: 'power3' })
            my = gsap.quickTo(target, 'y', { duration: 0.4, ease: 'power3' })
          }
        }
        if (magnet && mx && my) {
          const r = magnet.getBoundingClientRect()
          mx((e.clientX - (r.left + r.width / 2)) * 0.3)
          my((e.clientY - (r.top + r.height / 2)) * 0.3)
        }
      }

      const onOver = (e: PointerEvent) => {
        const hit = (e.target as Element).closest(INTERACTIVE)
        gsap.to(ring.current, { scale: hit ? 1.8 : 1, duration: 0.3, overwrite: 'auto' })
        gsap.to(dot.current, { scale: hit ? 0 : 1, duration: 0.2, overwrite: 'auto' })
      }

      const onLeave = () => {
        releaseMagnet()
        gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 })
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerover', onOver, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)

      return () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerover', onOver)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        document.documentElement.classList.remove('has-cursor')
      }
    })
    return () => mm.revert()
  })

  return (
    <>
      <div ref={ring} aria-hidden className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border-2 border-primary mix-blend-difference" />
      <div ref={dot} aria-hidden className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-primary" />
    </>
  )
}
