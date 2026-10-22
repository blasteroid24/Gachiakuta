import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })
ScrollTrigger.config({ ignoreMobileResize: true })

export const MQ = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const

/** Masked line/char reveal for a heading, played once when it scrolls into view (or immediately). */
export function revealHeading(target: Element, opts: { trigger?: boolean; delay?: number; type?: 'chars' | 'words' } = {}) {
  const { trigger = true, delay = 0, type = 'chars' } = opts
  return SplitText.create(target, {
    type: type === 'chars' ? 'lines,chars' : 'lines,words',
    mask: 'lines',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(type === 'chars' ? self.chars : self.words, {
        yPercent: 110,
        rotate: 6,
        duration: 0.9,
        delay,
        stagger: type === 'chars' ? 0.025 : 0.06,
        ease: 'expo.out',
        scrollTrigger: trigger ? { trigger: target, start: 'top 85%', once: true } : undefined,
      })
    },
  })
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
