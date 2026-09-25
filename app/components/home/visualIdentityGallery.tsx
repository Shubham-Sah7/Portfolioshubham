"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

const symitaImages = [
  '/images/Visuals/symita-V/symita-icon.png',
  '/images/Visuals/symita-V/symita-logomark-06.png',
]

export default function VisualIdentityGallery() {
  const [cycleIndex, setCycleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCycleIndex(i => (i + 1) % symitaImages.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>

      {/* ── Section header ──────────────────────────────────────── */}
      <div className="pb-8 md:pb-12 overflow-hidden">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-x-0 border-t border-gray-300"
            style={{ top: '50%' }}
          />
          <h2 className="relative bg-white px-4 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap flex items-baseline gap-2">
            <span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>V</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>isual</span>
            </span>
            <span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>I</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>dentity</span>
            </span>
          </h2>
        </div>
      </div>

      {/* ── Desktop collage (md+) ─────────────────────────────── */}
      <div className="hidden md:flex gap-2">

        {/* Left: cycling square — pink always underneath, green fades on top */}
        <div
          className="relative overflow-hidden bg-[#0f0e17] shrink-0"
          style={{ flexBasis: 'calc(50% - 4px)', aspectRatio: '1 / 1' }}
        >
          {/* Pink — always visible at bottom */}
          <Image
            src="/images/Visuals/symita-V/symita-icon.png"
            alt="Symita Pink Logo"
            fill sizes="50vw" quality={100}
            className="object-contain p-12"
            style={{ position: 'absolute', zIndex: 1 }}
            priority
          />
          {/* Green — fades in/out on top, no gap ever */}
          <Image
            src="/images/Visuals/symita-V/symita-logomark-06.png"
            alt="Symita Green Logo"
            fill sizes="50vw" quality={100}
            className="object-contain p-12"
            style={{
              position: 'absolute',
              zIndex: 2,
              opacity: cycleIndex === 1 ? 1 : 0,
              transform: cycleIndex === 1 ? 'scale(1)' : 'scale(0.96)',
              transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </div>

        {/* Right column: landscape top + 2 wordmarks bottom */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="relative overflow-hidden bg-white flex-1 border border-zinc-100 flex items-center justify-center p-8">
            <Image
              src="/images/Visuals/symita-V/symita-grid.png"
              alt="Symita Logo Construction Diagram"
              fill
              sizes="50vw"
              className="object-contain p-6"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative overflow-hidden bg-white flex-1 border border-zinc-100" style={{ aspectRatio: '1 / 1' }}>
              <div className="absolute inset-6">
                <Image
                  src="/images/Visuals/symita-V/symita-pink.png"
                  alt="Symita Pink Wordmark"
                  fill
                  sizes="25vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="relative overflow-hidden bg-white flex-1 border border-zinc-100" style={{ aspectRatio: '1 / 1' }}>
              <div className="absolute inset-6">
                <Image
                  src="/images/Visuals/symita-V/symita-blue.png"
                  alt="Symita Blue Wordmark"
                  fill
                  sizes="25vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Mobile collage ────────────────────────────────────── */}
      <div className="grid md:hidden gap-1.5">
        {/* Cycling box: full width, 1:1 */}
        <div className="relative overflow-hidden bg-[#0f0e17]" style={{ aspectRatio: '1/1' }}>
          <Image
            src="/images/Visuals/symita-V/symita-icon.png"
            alt="Symita Pink Logo"
            fill sizes="100vw" quality={100}
            className="object-contain p-12"
            style={{ position: 'absolute', zIndex: 1 }}
            priority
          />
          <Image
            src="/images/Visuals/symita-V/symita-logomark-06.png"
            alt="Symita Green Logo"
            fill sizes="100vw" quality={100}
            className="object-contain p-12"
            style={{
              position: 'absolute',
              zIndex: 2,
              opacity: cycleIndex === 1 ? 1 : 0,
              transform: cycleIndex === 1 ? 'scale(1)' : 'scale(0.96)',
              transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </div>
        {/* Wide rectangle: construction diagram */}
        <div className="relative overflow-hidden bg-white border border-zinc-100" style={{ aspectRatio: '2/1' }}>
          <Image
            src="/images/Visuals/symita-V/symita-grid.png"
            alt="Symita Logo Construction Diagram"
            fill
            sizes="100vw"
            className="object-contain p-4"
          />
        </div>
        {/* Two small squares: wordmarks */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative overflow-hidden bg-white border border-zinc-100" style={{ aspectRatio: '1/1' }}>
            <div className="absolute inset-4">
              <Image
                src="/images/Visuals/symita-V/symita-pink.png"
                alt="Symita Pink Wordmark"
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
          </div>
          <div className="relative overflow-hidden bg-white border border-zinc-100" style={{ aspectRatio: '1/1' }}>
            <div className="absolute inset-4">
              <Image
                src="/images/Visuals/symita-V/symita-blue.png"
                alt="Symita Blue Wordmark"
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
