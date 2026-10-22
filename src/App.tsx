import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { Cursor } from '@/components/Cursor'
import { SmoothScroll } from '@/components/SmoothScroll'
import Home from '@/pages/Home'

const loadCharacters = () => import('@/pages/Characters')
const Characters = lazy(loadCharacters)

export default function App() {
  // Warm the Characters chunk once the browser is idle so route transitions never show a fallback.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500))
    idle(() => void loadCharacters())
  }, [])

  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </SmoothScroll>
  )
}
