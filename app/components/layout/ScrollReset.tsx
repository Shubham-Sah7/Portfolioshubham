"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    // Give the new page DOM a frame to mount, then jump to top immediately.
    // Tries Lenis first (smooth scroll engine), falls back to native.
    requestAnimationFrame(() => {
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
