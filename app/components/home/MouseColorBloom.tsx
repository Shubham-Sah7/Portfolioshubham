"use client"

import { useRef, useEffect } from 'react'

// ─── Bloom config ─────────────────────────────────────────────────────────────
const BLOOM = {
  radius:  140,                        // px — size of the color circle
  color:   'rgba(59, 130, 246, 0.85)', // blue — change hue/opacity here
  // Try: 'rgba(168, 85, 247, 0.8)'  → purple
  // Try: 'rgba(239, 68, 68, 0.8)'   → red
  // Try: 'rgba(16, 185, 129, 0.8)'  → green
}

export default function MouseColorBloom() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', `${e.clientX}px`)
      el.style.setProperty('--my', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        background: `radial-gradient(circle ${BLOOM.radius}px at var(--mx, -500px) var(--my, -500px), ${BLOOM.color} 0%, transparent 100%)`,
        mixBlendMode: 'color',
      }}
    />
  )
}
