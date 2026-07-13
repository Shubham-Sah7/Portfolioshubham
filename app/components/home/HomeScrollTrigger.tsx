"use client"

import { useEffect } from 'react'

export default function HomeScrollTrigger({ target }: { target?: string }) {
  useEffect(() => {
    if (!target) return

    // Delay scroll slightly to wait for the page entrance loader fadeout
    const timer = setTimeout(() => {
      const selector = target === 'work' 
        ? '[data-section="work"]' 
        : target === 'unplugged' 
        ? '[data-section="unplug"]' 
        : `[data-section="${target}"]`

      const el = document.querySelector(selector)
      if (el) {
        const lenis = (window as any).__lenis
        if (lenis) {
          lenis.scrollTo(el, { offset: -100 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }, 1200)

    return () => clearTimeout(timer)
  }, [target])

  return null
}
