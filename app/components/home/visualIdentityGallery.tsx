"use client"

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const symitaImages = [
  '/images/Visuals/symita-new/symita-grid.png',
  '/images/Visuals/symita-new/symita-hero.png',
]

export default function VisualIdentityGallery() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const visualEl   = useRef<HTMLHeadingElement>(null)
  const identityEl = useRef<HTMLHeadingElement>(null)
  const lineEl     = useRef<HTMLDivElement>(null)
  const [cycleIndex, setCycleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCycleIndex(i => (i + 1) % symitaImages.length)
    }, 2000) // 2s per cycle for comfortable viewing
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const header   = headerRef.current
    const visual   = visualEl.current
    const identity = identityEl.current
    const line     = lineEl.current
    if (!header || !visual || !identity || !line) return

    let tl: gsap.core.Timeline

    const setup = () => {
      if (window.innerWidth < 768) {
        gsap.set(visual, { x: 0 })
        gsap.set(identity, { x: 0 })
        gsap.set(line, { scaleX: 1, opacity: 1 })
        return
      }

      const cRect = header.getBoundingClientRect()
      const vRect = visual.getBoundingClientRect()
      const iRect = identity.getBoundingClientRect()

      const paddingX     = parseFloat(window.getComputedStyle(header).paddingLeft)
      const contentLeft  = cRect.left + paddingX
      const contentRight = cRect.right - paddingX

      const visualFinalX   = contentLeft - vRect.left
      const identityFinalX = (contentRight - iRect.width) - iRect.left

      gsap.set(line, { scaleX: 0, transformOrigin: 'center center', opacity: 0 })

      tl = gsap.timeline({
        defaults: { duration: 1.1, ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(visual,   { x: visualFinalX }, 0)
        .to(line,     { scaleX: 1, opacity: 1, ease: 'power2.inOut' }, 0)
        .to(identity, { x: identityFinalX }, 0)
    }

    document.fonts.ready.then(() => requestAnimationFrame(setup))

    return () => { tl?.kill() }
  }, [])

  return (
    <div>

      {/* ── Section header ──────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="pb-8 md:pb-12 overflow-hidden"
      >
        <div className="relative">
          <div
            ref={lineEl}
            className="absolute inset-x-0 border-t border-gray-300"
            style={{ top: '50%' }}
          />
          <div className="relative flex items-baseline justify-center gap-2">
            <h2
              ref={visualEl}
              className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>V</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>isual</span>
            </h2>
            <h2
              ref={identityEl}
              className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>I</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>dentity</span>
            </h2>
          </div>
        </div>

        {/* Small subtitle inside header area */}
        <div className="relative flex justify-center mt-2">
          <span className="relative bg-white px-3 text-[10px] text-gray-400 tracking-wider uppercase select-none">
            Symita — Designed by me
          </span>
        </div>
      </div>

      {/* ── Desktop collage (md+) ─────────────────────────────── */}
      <div className="hidden md:flex gap-2">

        {/* Left: cycling square - aspect-ratio makes it 1:1 */}
        <div
          className="relative overflow-hidden bg-[#FBFBFC] border border-zinc-100 shrink-0"
          style={{ flexBasis: 'calc(50% - 4px)', aspectRatio: '1 / 1' }}
        >
          {symitaImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt="Symita Logo Variations"
              fill
              sizes="50vw"
              className={src.includes('grid') ? 'object-contain p-6' : 'object-cover'}
              style={{
                opacity: cycleIndex === idx ? 1 : 0,
                transition: 'opacity 0.25s ease-in-out',
                position: 'absolute',
              }}
              priority={idx === 0}
            />
          ))}
        </div>

        {/* Right column: landscape top + 2 squares bottom */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="relative overflow-hidden bg-gray-50 flex-1 border border-zinc-100" style={{ minHeight: '220px' }}>
            <Image 
              src="/images/Visuals/symita-new/symita-stationery.png" 
              alt="Symita Physical Branding Mockup" 
              fill 
              sizes="50vw" 
              className="object-cover" 
            />
          </div>
          <div className="flex gap-2">
            <div className="relative overflow-hidden bg-gray-50 flex-1 border border-zinc-100" style={{ aspectRatio: '1 / 1' }}>
              <Image 
                src="/images/Visuals/symita-new/symita-mobile.png" 
                alt="Symita Mobile Dashboard UI" 
                fill 
                sizes="25vw" 
                className="object-cover" 
              />
            </div>
            <div className="relative overflow-hidden bg-[#FBFBFC] flex-1 border border-zinc-100 flex items-center justify-center p-6" style={{ aspectRatio: '1 / 1' }}>
              <div className="relative w-full h-full">
                <Image 
                  src="/images/Visuals/symita-new/symita-outline.png" 
                  alt="Symita Outline Logo Mark" 
                  fill 
                  sizes="25vw" 
                  className="object-contain opacity-75" 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Mobile collage ────────────────────────────────────── */}
      <div className="grid md:hidden gap-1.5">
        {/* Cycling box: full width, 1:1 */}
        <div className="relative overflow-hidden bg-[#FBFBFC] border border-zinc-100" style={{ aspectRatio: '1/1' }}>
          {symitaImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt="Symita Logo Variations"
              fill
              sizes="100vw"
              className={src.includes('grid') ? 'object-contain p-6' : 'object-cover'}
              style={{
                opacity: cycleIndex === idx ? 1 : 0,
                transition: 'opacity 0.25s ease-in-out',
                position: 'absolute',
              }}
              priority={idx === 0}
            />
          ))}
        </div>
        {/* Wide rectangle */}
        <div className="relative overflow-hidden bg-gray-50 border border-zinc-100" style={{ aspectRatio: '2/1' }}>
          <Image 
            src="/images/Visuals/symita-new/symita-stationery.png" 
            alt="Symita Physical Branding Mockup" 
            fill 
            sizes="100vw" 
            className="object-cover" 
          />
        </div>
        {/* Two small squares */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative overflow-hidden bg-gray-50 border border-zinc-100" style={{ aspectRatio: '1/1' }}>
            <Image 
              src="/images/Visuals/symita-new/symita-mobile.png" 
              alt="Symita Mobile Dashboard UI" 
              fill 
              sizes="50vw" 
              className="object-cover" 
            />
          </div>
          <div className="relative overflow-hidden bg-[#FBFBFC] border border-zinc-100 flex items-center justify-center p-5" style={{ aspectRatio: '1/1' }}>
            <div className="relative w-full h-full">
              <Image 
                src="/images/Visuals/symita-new/symita-outline.png" 
                alt="Symita Outline Logo Mark" 
                fill 
                sizes="50vw" 
                className="object-contain opacity-75" 
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
