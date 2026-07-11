"use client"

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VisualIdentityGallery() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const visualEl   = useRef<HTMLHeadingElement>(null)
  const identityEl = useRef<HTMLHeadingElement>(null)
  const lineEl     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header   = headerRef.current
    const visual   = visualEl.current
    const identity = identityEl.current
    const line     = lineEl.current
    if (!header || !visual || !identity || !line) return

    let tl: gsap.core.Timeline

    const setup = () => {
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
            Aether — Designed by me
          </span>
        </div>
      </div>

      {/* ── Desktop collage (md+) ─────────────────────────────── */}
      <div className="hidden md:flex gap-2">

        {/* Left: construction grid square - aspect-ratio makes it 1:1 */}
        <div
          className="relative overflow-hidden bg-gray-50 shrink-0"
          style={{ flexBasis: 'calc(50% - 4px)', aspectRatio: '1 / 1' }}
        >
          <Image
            src="/images/Visuals/aether-V/AE-grid.png"
            alt="Aether Logo Construction Grid"
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right column: landscape top + 2 squares bottom */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="relative overflow-hidden bg-gray-50 flex-1">
            <Image 
              src="/images/Visuals/aether-V/AE-hero.png" 
              alt="Aether Hero Branding" 
              fill 
              sizes="50vw" 
              className="object-cover" 
            />
          </div>
          <div className="flex gap-2">
            <div className="relative overflow-hidden bg-gray-50 flex-1" style={{ aspectRatio: '1 / 1' }}>
              <Image 
                src="/images/Visuals/aether-V/AE-mobile.png" 
                alt="Aether Mobile App UI" 
                fill 
                sizes="25vw" 
                className="object-cover" 
              />
            </div>
            <div className="relative overflow-hidden bg-gray-50 flex-1" style={{ aspectRatio: '1 / 1' }}>
              <Image 
                src="/images/Visuals/aether-V/AE-stationery.png" 
                alt="Aether Branding Stationery" 
                fill 
                sizes="25vw" 
                className="object-cover" 
              />
            </div>
          </div>
        </div>

      </div>

      {/* ── Mobile collage ────────────────────────────────────── */}
      <div className="grid md:hidden gap-1.5">
        {/* Left/Grid box: full width, 1:1 */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1/1' }}>
          <Image
            src="/images/Visuals/aether-V/AE-grid.png"
            alt="Aether Logo Construction Grid"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        {/* Wide rectangle */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '2/1' }}>
          <Image 
            src="/images/Visuals/aether-V/AE-hero.png" 
            alt="Aether Hero Branding" 
            fill 
            sizes="100vw" 
            className="object-cover" 
          />
        </div>
        {/* Two small squares */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1/1' }}>
            <Image 
              src="/images/Visuals/aether-V/AE-mobile.png" 
              alt="Aether Mobile App UI" 
              fill 
              sizes="50vw" 
              className="object-cover" 
            />
          </div>
          <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1/1' }}>
            <Image 
              src="/images/Visuals/aether-V/AE-stationery.png" 
              alt="Aether Branding Stationery" 
              fill 
              sizes="50vw" 
              className="object-cover" 
            />
          </div>
        </div>
      </div>

    </div>
  )
}
