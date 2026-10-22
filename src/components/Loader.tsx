import { useRef, useState } from 'react'
import { gsap, MQ, useGSAP } from '@/lib/gsap'
import { markIntroDone } from '@/lib/intro'

const SEEN_KEY = 'gachiakuta:intro-seen'

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function waitForImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = src
  })
}

/**
 * First-visit intro curtain. Waits for fonts + the hero image (capped at ~1.6s so it
 * never holds the page hostage), then wipes away and hands off to the hero timeline.
 */
export function Loader() {
  const [show, setShow] = useState(() => !alreadySeen() && window.matchMedia(MQ.desktop).matches)
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!show) {
        markIntroDone()
        return
      }
      const counter = { v: 0 }
      const num = root.current!.querySelector('.loader-num')!
      const fill = gsap.to(counter, {
        v: 90,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')),
      })
      gsap.from('.loader-word span', { yPercent: 110, stagger: 0.05, duration: 0.8, ease: 'expo.out' })

      const ready = Promise.all([
        document.fonts?.ready,
        waitForImage('/img/rudo-hero-736.webp'),
        new Promise((r) => setTimeout(r, 900)),
      ])
      const cap = new Promise((r) => setTimeout(r, 1600))

      let cancelled = false
      void Promise.race([ready, cap]).then(() => {
        if (cancelled) return
        fill.kill()
        gsap
          .timeline({
            onComplete: () => {
              try {
                sessionStorage.setItem(SEEN_KEY, '1')
              } catch {
                /* private mode */
              }
              setShow(false)
            },
          })
          .to(counter, { v: 100, duration: 0.25, onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')) })
          .to('.loader-word span', { yPercent: -110, stagger: 0.03, duration: 0.5, ease: 'expo.in' })
          .call(markIntroDone)
          .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '<0.1')
      })
      return () => {
        cancelled = true
      }
    },
    { scope: root },
  )

  if (!show) return null

  return (
    <div ref={root} className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-surface-container-lowest" style={{ clipPath: 'inset(0 0 0 0)' }} aria-hidden>
      <div className="absolute inset-0 halftone opacity-20" />
      <div className="loader-word relative flex overflow-hidden font-headline-xl italic uppercase text-primary drop-shadow-[6px_6px_0px_#8b0000]">
        {'GACHIAKUTA'.split('').map((c, i) => (
          <span key={i} className="inline-block">
            {c}
          </span>
        ))}
      </div>
      <div className="relative mt-6 flex items-center gap-4 font-label-bold text-xs uppercase text-on-surface-variant">
        <span>Descending into the Pit</span>
        <span className="loader-num tabular-nums text-primary">000</span>
      </div>
    </div>
  )
}
