"use client"

import React, { useEffect, useRef } from "react"

export interface ShubhamParticleWordmarkProps {
  dotGap?: number
  interactionRadius?: number
  inkColor?: string
  warmColor?: string
  className?: string
}

export default function ShubhamParticleWordmark({
  dotGap = 5.5,
  interactionRadius = 85,
  inkColor = "#18181b",
  warmColor = "#ea580c",
  className = "",
}: ShubhamParticleWordmarkProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<number | 0>(0)
  const maskImgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Parse hex colors
    const parseHex = (hex: string): [number, number, number] => {
      const clean = hex.replace("#", "")
      if (clean.length === 3) {
        return [
          parseInt(clean[0] + clean[0], 16),
          parseInt(clean[1] + clean[1], 16),
          parseInt(clean[2] + clean[2], 16),
        ]
      }
      return [
        parseInt(clean.slice(0, 2), 16),
        parseInt(clean.slice(2, 4), 16),
        parseInt(clean.slice(4, 6), 16),
      ]
    }

    const inkRgb = parseHex(inkColor)
    const warmRgb = parseHex(warmColor)

    let w = 0
    let h = 0
    let dpr = 1
    let px = -1e5
    let py = -1e5
    let isAwake = true
    let isVisible = true
    let shockwave = { x: 0, y: 0, t: -1 }

    // Particle flat array: [x, y, vx, vy, hx, hy, radius] (7 values per particle)
    let particles = new Float32Array(0)
    let particleCount = 0

    const initParticles = () => {
      const img = maskImgRef.current
      if (!img || !img.complete || img.naturalWidth === 0) return

      const rect = container.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"

      // Offscreen buffer for mask sampling
      const offscreen = document.createElement("canvas")
      offscreen.width = w
      offscreen.height = h
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true })
      if (!offCtx) return

      // Maintain aspect ratio of mask centered within container
      const maskAspect = img.naturalWidth / img.naturalHeight
      let drawW = w
      let drawH = drawW / maskAspect

      if (drawH > h) {
        drawH = h
        drawW = drawH * maskAspect
      }

      const drawX = (w - drawW) / 2
      const drawY = (h - drawH) / 2

      offCtx.clearRect(0, 0, w, h)
      offCtx.drawImage(img, drawX, drawY, drawW, drawH)

      const imgData = offCtx.getImageData(0, 0, w, h).data
      const gap = Math.max(3.5, w < 640 ? 4.2 : dotGap)
      const cols = Math.ceil(w / gap)
      const rows = Math.ceil(h / gap)

      const tmp: number[] = []

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sumAlpha = 0
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const sampleX = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
              const sampleY = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
              sumAlpha += imgData[(sampleY * w + sampleX) * 4 + 3]
            }
          }
          const coverage = sumAlpha / (9 * 255)
          if (coverage < 0.07) continue

          const r = Math.sqrt(coverage) * gap * 0.56
          const hx = gx * gap + gap / 2
          const hy = gy * gap + gap / 2

          // [x, y, vx, vy, hx, hy, r]
          tmp.push(hx, hy, 0, 0, hx, hy, r)
        }
      }

      particles = new Float32Array(tmp)
      particleCount = tmp.length / 7
      isAwake = true
    }

    const render = (now: number) => {
      if (!ctx || w === 0 || h === 0) return

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const curRadius = reducedMotion ? 0 : interactionRadius
      const shockAge = shockwave.t < 0 ? 1e9 : now - shockwave.t
      const shockR = shockAge * 0.95
      let isMoving = false

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 7
        let x = particles[idx]
        let y = particles[idx + 1]
        let vx = particles[idx + 2]
        let vy = particles[idx + 3]
        const hx = particles[idx + 4]
        const hy = particles[idx + 5]
        const baseR = particles[idx + 6]

        if (!reducedMotion) {
          // Shockwave effect on click
          if (shockAge < 900) {
            const dx = hx - shockwave.x
            const dy = hy - shockwave.y
            const dist = Math.sqrt(dx * dx + dy * dy) + 0.001
            const band = 1 - Math.min(1, Math.abs(dist - shockR) / 28)
            if (band > 0) {
              const force = band * 3.8 * (1 - shockAge / 900)
              vx += (dx / dist) * force
              vy += (dy / dist) * force
            }
          }

          // Cursor displacement spring physics
          const dx = x - px
          const dy = y - py
          const distSq = dx * dx + dy * dy
          if (curRadius > 0 && distSq < curRadius * curRadius) {
            const dist = Math.sqrt(distSq) + 0.001
            const force = (1 - dist / curRadius) * 2.8
            vx += (dx / dist) * force
            vy += (dy / dist) * force
          }

          // Spring toward home with damping
          vx = (vx + (hx - x) * 0.065) * 0.82
          vy = (vy + (hy - y) * 0.065) * 0.82

          x += vx
          y += vy

          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) {
            isMoving = true
          } else {
            x = hx
            y = hy
            vx = 0
            vy = 0
          }

          particles[idx] = x
          particles[idx + 1] = y
          particles[idx + 2] = vx
          particles[idx + 3] = vy
        }

        // Color warmth based on displacement distance
        const disp = Math.hypot(x - hx, y - hy)
        const warmth = Math.min(1, disp / 26)

        if (warmth > 0.03) {
          ctx.fillStyle = `rgb(${Math.round(inkRgb[0] + (warmRgb[0] - inkRgb[0]) * warmth)}, ${Math.round(inkRgb[1] + (warmRgb[1] - inkRgb[1]) * warmth)}, ${Math.round(inkRgb[2] + (warmRgb[2] - inkRgb[2]) * warmth)})`
        } else {
          ctx.fillStyle = inkColor
        }

        ctx.beginPath()
        ctx.arc(x, y, baseR, 0, Math.PI * 2)
        ctx.fill()
      }

      isAwake = isMoving || shockAge < 900 || px > -1e4
    }

    const loop = (now: number) => {
      animRef.current = 0
      if (!isVisible) return
      render(now)
      if (isAwake) {
        animRef.current = requestAnimationFrame(loop)
      }
    }

    const wake = () => {
      isAwake = true
      if (!animRef.current && isVisible) {
        animRef.current = requestAnimationFrame(loop)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      px = e.clientX - rect.left
      py = e.clientY - rect.top
      wake()
    }

    const onPointerLeave = () => {
      px = -1e5
      py = -1e5
      wake()
    }

    const onPointerDown = (e: PointerEvent) => {
      if (reducedMotion) return
      const rect = canvas.getBoundingClientRect()
      shockwave = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: performance.now(),
      }
      wake()
    }

    // Pre-load mask image
    const maskImg = new Image()
    maskImg.src = "/images/shubham-particle-mask.png"
    maskImgRef.current = maskImg
    maskImg.onload = () => {
      initParticles()
      wake()
    }

    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerleave", onPointerLeave)
    container.addEventListener("pointerdown", onPointerDown)

    const resizeObserver = new ResizeObserver(() => {
      initParticles()
      wake()
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true
        if (isVisible) wake()
      },
      { threshold: 0.1 }
    )
    intersectionObserver.observe(container)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerleave", onPointerLeave)
      container.removeEventListener("pointerdown", onPointerDown)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [dotGap, interactionRadius, inkColor, warmColor])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-visible select-none cursor-crosshair ${className}`}
      style={{
        aspectRatio: "779 / 193",
        maxHeight: "180px",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Shubham"
        role="img"
        className="absolute inset-0 block w-full h-full pointer-events-auto"
        style={{
          imageRendering: "crisp-edges",
        }}
      />
    </div>
  )
}
