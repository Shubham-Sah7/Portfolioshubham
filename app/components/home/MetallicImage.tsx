"use client"

import Image from 'next/image'
import { useRef, useState, CSSProperties } from 'react'

interface Props {
  src: string
  alt: string
  imgWidth: number
  imgHeight: number
  className?: string
  style?: CSSProperties
  radius?: number
}

export default function MetallicImage({
  src, alt, imgWidth, imgHeight, className, style, radius = 200,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect()
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      onMouseLeave={() => setCursor(null)}
    >
      <Image
        src={src}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        className="w-full h-auto object-contain block"
      />

      {/* Metallic radial sheen follows the cursor */}
      {cursor && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            background: `radial-gradient(circle ${radius}px at ${cursor.x}px ${cursor.y}px,
              rgba(255,252,240,0.95) 0%,
              rgba(210,200,185,0.80) 18%,
              rgba(168,160,148,0.55) 38%,
              rgba(120,115,108,0.25) 65%,
              transparent 100%)`,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  )
}
