import { useRef } from 'react'
import { Hero } from '@/sections/Hero'
import { Divide } from '@/sections/Divide'
import { Cast } from '@/sections/Cast'
import { Watchman } from '@/sections/Watchman'
import { Jinki } from '@/sections/Jinki'
import { Footer } from '@/components/Footer'
import { useHomeAnimations } from './useHomeAnimations'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  useHomeAnimations(containerRef)

  return (
    <div ref={containerRef} className="bg-background text-on-background font-body-md overflow-x-clip trash-texture relative">
      <div className="grime-layer" />
      <div aria-hidden className="graffiti-accent text-8xl -top-10 -left-10 rotate-12">TRASH</div>

      <Hero />
      <Divide />
      <Cast />
      <Watchman />
      <Jinki />
      <Footer />
    </div>
  )
}
