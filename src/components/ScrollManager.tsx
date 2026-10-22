import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the URL hash target on navigation, or to the top on a route change. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.getElementById(hash.slice(1))
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [pathname, hash])

  return null
}
