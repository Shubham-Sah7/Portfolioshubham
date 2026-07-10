"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    requestAnimationFrame(() => {
      // Reset main visibility — GSAP transition sets opacity:0/y:50 on exit
      const main = document.querySelector('main') as HTMLElement | null
      if (main) {
        main.style.opacity = '1'
        main.style.transform = 'none'
      }

      // Scroll to top
      const lenis = (window as any).__lenis
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    })
  }, [pathname])

  return null
}
