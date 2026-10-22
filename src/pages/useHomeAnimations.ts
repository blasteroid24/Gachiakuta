import type { RefObject } from 'react'
import { gsap, MQ, ScrollTrigger, revealHeading, useGSAP } from '@/lib/gsap'
import { attachTilt } from '@/lib/tilt'

/**
 * All scroll/intro choreography for the home page. Everything lives in one
 * gsap.matchMedia so desktop, mobile and reduced-motion each get their own
 * timelines, and everything is reverted on unmount.
 */
export function useHomeAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current!
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        // ---- Hero intro
        const intro = gsap.timeline({ delay: 0.1 })
        intro
          .from('.hero-tag', { clipPath: 'inset(0 100% 0 0)', duration: 0.7, ease: 'expo.inOut' })
          .from('.hero-sub', { y: 30, autoAlpha: 0 }, 0.7)
          .from('.hero-cta > *', { y: 24, autoAlpha: 0, stagger: 0.08 }, 0.85)
          .from('.hero-card > *', { y: 120, rotate: (i) => [10, -8, 18][i] ?? 0, autoAlpha: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12 }, 0.2)
        q('.hero-line').forEach((el, i) => revealHeading(el, { trigger: false, delay: 0.25 + i * 0.15 }))

        // ---- Section headings
        q('.section-title').forEach((el) => revealHeading(el, { type: 'words' }))

        // ---- Great Divide panels
        gsap.from('.about-panel', {
          y: 120,
          rotate: (i) => (i ? 4 : -4),
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.about-section', start: 'top 70%', once: true },
        })

        // ---- Watchman
        gsap.from('.watchman-feature', {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.2,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: '.watchman-feature', start: 'top 80%', once: true },
        })
        gsap.from('.watchman-card', {
          y: 50,
          autoAlpha: 0,
          stagger: 0.07,
          scrollTrigger: { trigger: '.watchman-card', start: 'top 92%', once: true },
        })

        // ---- Jinki
        gsap.from('.jinki-panel', {
          x: -80,
          rotate: -6,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.jinki-section', start: 'top 70%', once: true },
        })
        gsap.from('.jinki-step', {
          x: -30,
          autoAlpha: 0,
          stagger: 0.12,
          delay: 0.3,
          scrollTrigger: { trigger: '.jinki-section', start: 'top 70%', once: true },
        })
        gsap.from('.integrity-bar', {
          scaleX: 0,
          duration: 1.8,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.integrity-bar', start: 'top 90%', once: true },
        })

        // ---- Footer watermark drift
        gsap.fromTo('.footer-mark', { xPercent: 12 }, {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: '.footer-mark', start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      mm.add(MQ.desktop, () => {
        // ---- Hero scroll parallax (separate elements from the intro targets to avoid conflicts)
        const heroScroll = { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero-copy', { yPercent: -18, autoAlpha: 0.15, ease: 'none', scrollTrigger: heroScroll })
        gsap.to('.hero-card', { yPercent: 22, rotate: -5, ease: 'none', scrollTrigger: heroScroll })
        gsap.to('.hero-bg', { yPercent: 30, ease: 'none', scrollTrigger: heroScroll })

        // ---- Pinned horizontal cast
        const track = q('.cast-track')[0]
        const cards = q('.cast-card')
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
        const progressBar = q('.cast-progress')[0]
        const counter = q('.cast-count')[0]

        const skewTo = gsap.quickSetter(track, 'skewX', 'deg')
        const skew = { v: 0 }
        const clampSkew = gsap.utils.clamp(-6, 6)

        const horizontal = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.cast-section',
            pin: true,
            scrub: 0.6,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate(self) {
              progressBar.style.transform = `scaleX(${self.progress})`
              counter.textContent = String(Math.min(cards.length, Math.floor(self.progress * cards.length) + 1)).padStart(2, '0')
              const target = clampSkew(self.getVelocity() / -400)
              if (Math.abs(target) > Math.abs(skew.v)) {
                skew.v = target
                gsap.to(skew, { v: 0, duration: 0.8, ease: 'power3', overwrite: true, onUpdate: () => skewTo(skew.v) })
              }
            },
          },
        })

        cards.forEach((card) => {
          gsap.fromTo(card, { scale: 0.86, rotate: 4, autoAlpha: 0.35 }, {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: horizontal, start: 'left right', end: 'left 55%', scrub: true },
          })
          const imgs = card.querySelectorAll('.cast-img')
          if (imgs.length) {
            gsap.fromTo(imgs, { xPercent: 6 }, {
              xPercent: -6,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: horizontal, start: 'left right', end: 'right left', scrub: true },
            })
          }
        })

        gsap.to('.cast-watermark', {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: { trigger: '.cast-section', start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })
      })

      mm.add(MQ.mobile, () => {
        gsap.from('.cast-card', {
          y: 60,
          autoAlpha: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: '.cast-viewport', start: 'top 85%', once: true },
        })
      })

      mm.add(MQ.finePointer, () => attachTilt(root, '.cast-card-inner, .jinki-panel', 6))

      // Images that load late can shift layout under pinned sections.
      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad)
      return () => {
        window.removeEventListener('load', onLoad)
        mm.revert()
      }
    },
    { scope },
  )
}
