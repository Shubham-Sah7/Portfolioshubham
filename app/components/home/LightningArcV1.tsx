"use client"

import { useEffect, useRef } from "react"

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
}

export default function LightningArcV1() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Helper to generate a jagged path between two points (Midpoint Displacement)
    const getLightningPath = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number
    ): { x: number; y: number }[] => {
      const points = [{ x: x1, y: y1 }, { x: x2, y: y2 }]
      let iterations = 5 // detail level

      for (let i = 0; i < iterations; i++) {
        let len = points.length
        for (let j = len - 1; j > 0; j--) {
          const p1 = points[j]
          const p2 = points[j - 1]
          const midX = (p1.x + p2.x) / 2
          const midY = (p1.y + p2.y) / 2

          // Perpendicular vector
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const normalX = -dy
          const normalY = dx
          const normalLength = Math.sqrt(normalX * normalX + normalY * normalY)

          const nx = normalX / normalLength
          const ny = normalY / normalLength

          // Random offset
          const offset = (Math.random() - 0.5) * displace
          const newPt = {
            x: midX + nx * offset,
            y: midY + ny * offset
          }

          points.splice(j, 0, newPt)
        }
        displace *= 0.5 // Reduce displacement in each subdivision
      }

      return points
    }

    const drawBolt = (
      context: CanvasRenderingContext2D,
      path: { x: number; y: number }[],
      color: string,
      glowColor: string,
      width: number
    ) => {
      // Draw glow
      context.beginPath()
      context.moveTo(path[0].x, path[0].y)
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y)
      }
      context.strokeStyle = glowColor
      context.lineWidth = width * 3.5
      context.shadowBlur = 12
      context.shadowColor = glowColor
      context.stroke()

      // Draw white core
      context.beginPath()
      context.moveTo(path[0].x, path[0].y)
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y)
      }
      context.strokeStyle = color
      context.lineWidth = width
      context.shadowBlur = 0
      context.stroke()
    }

    const drawBranch = (
      context: CanvasRenderingContext2D,
      startX: number,
      startY: number,
      angle: number,
      length: number,
      displace: number
    ) => {
      const endX = startX + Math.cos(angle) * length
      const endY = startY + Math.sin(angle) * length
      const path = getLightningPath(startX, startY, endX, endY, displace)
      drawBolt(context, path, "rgba(255, 255, 255, 0.9)", "rgba(56, 189, 248, 0.45)", 0.6)
    }

    const updateAndDrawSparks = (context: CanvasRenderingContext2D, cx: number, cy: number) => {
      // Spawn new sparks
      if (Math.random() < 0.7) {
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 2 + 1
          sparksRef.current.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.5, // slightly float up
            alpha: 1.0,
            size: Math.random() * 2 + 1
          })
        }
      }

      // Update and draw
      const sparks = sparksRef.current
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.alpha -= 0.035

        if (s.alpha <= 0) {
          sparks.splice(i, 1)
          continue
        }

        context.beginPath()
        context.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(244, 215, 144, ${s.alpha})` // Golden sparks
        context.fill()
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const leftFinger = document.getElementById("left-fingertip")
      const rightFinger = document.getElementById("right-fingertip")

      if (leftFinger && rightFinger) {
        const r1 = leftFinger.getBoundingClientRect()
        const r2 = rightFinger.getBoundingClientRect()

        // Finger Coordinates relative to canvas
        const fx1 = r1.left + r1.width / 2
        const fy1 = r1.top + r1.height / 2
        const fx2 = r2.left + r2.width / 2
        const fy2 = r2.top + r2.height / 2

        // Center meeting point (near the S-logo)
        const cx = canvas.width / 2
        const cy = canvas.height / 2 - 60

        // Only draw lightning 85% of frames to simulate electric flickering
        if (Math.random() < 0.90) {
          // Left Bolt
          const pathLeft = getLightningPath(fx1, fy1, cx, cy, 35)
          drawBolt(ctx, pathLeft, "#ffffff", "rgba(56, 189, 248, 0.6)", 1.5)

          // Right Bolt
          const pathRight = getLightningPath(fx2, fy2, cx, cy, 35)
          drawBolt(ctx, pathRight, "#ffffff", "rgba(56, 189, 248, 0.6)", 1.5)

          // Random branches for organic look
          if (Math.random() < 0.3) {
            const idx = Math.floor(Math.random() * pathLeft.length)
            const pt = pathLeft[idx]
            drawBranch(ctx, pt.x, pt.y, Math.PI * 0.75, 40, 15)
          }
          if (Math.random() < 0.3) {
            const idx = Math.floor(Math.random() * pathRight.length)
            const pt = pathRight[idx]
            drawBranch(ctx, pt.x, pt.y, Math.PI * 0.25, 40, 15)
          }
        }

        // Draw Plasma glow ball in the center
        const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 14)
        grad.addColorStop(0, "rgba(255, 255, 255, 1)")
        grad.addColorStop(0.3, "rgba(56, 189, 248, 0.9)")
        grad.addColorStop(1, "rgba(56, 189, 248, 0)")
        ctx.beginPath()
        ctx.arc(cx, cy, 15, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Update sparks
        updateAndDrawSparks(ctx, cx, cy)
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 11 }} // Layer above pillars and deities, but below text
    />
  )
}
