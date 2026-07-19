"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Config mirrors ABHAY / TEJAS in page.tsx
const ABHAY = {
  src:    '/images/HomeImages/abhay-v.svg',
  width:  590,
  left:   '-35%',
  top:    '-2%',
  rotate: 35,
}

const TEJAS = {
  src:    '/images/HomeImages/tejas-v.svg',
  width:  510,
  right:  '-35%',
  top:    '40%',
  rotate: -15,
}

export default function ParallaxImages() {
  const abhayDesktop = useRef<HTMLDivElement>(null)
  const tejasDesktop = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrub with 1s lag for inertia
      }

      // Desktop: drift down + slide outward
      gsap.to(abhayDesktop.current, {
        y: () =>  window.innerHeight * 0.35,
        x: () => -window.innerWidth  * 0.25,
        ease: 'none',
        force3D: true, // Force GPU layer creation
        scrollTrigger: st,
      })
      gsap.to(tejasDesktop.current, {
        y: () =>  window.innerHeight * 0.35,
        x: () =>  window.innerWidth  * 0.25,
        ease: 'none',
        force3D: true, // Force GPU layer creation
        scrollTrigger: st,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Desktop ──────────────────────────────────────────── */}
      <div
        ref={abhayDesktop}
        className="absolute h-auto hidden md:block pointer-events-none"
        style={{
          width: ABHAY.width,
          left: ABHAY.left,
          top: ABHAY.top,
          transform: `rotate(${ABHAY.rotate}deg)`,
          zIndex: 10,
          willChange: 'transform'
        }}
      >
        <Image src={ABHAY.src} alt="Abhay" width={ABHAY.width} height={500} className="w-full h-auto object-contain block pointer-events-none" />
      </div>
      <div
        ref={tejasDesktop}
        className="absolute h-auto hidden md:block pointer-events-none"
        style={{
          width: TEJAS.width,
          right: TEJAS.right,
          top: TEJAS.top,
          transform: `rotate(${TEJAS.rotate}deg)`,
          zIndex: 10,
          willChange: 'transform'
        }}
      >
        <Image src={TEJAS.src} alt="Tejas" width={TEJAS.width} height={500} className="w-full h-auto object-contain block pointer-events-none" />
      </div>

      {/* ── Mobile - absolute to hero container, scrolls naturally with zero scroll friction ── */}
      <div
        className="absolute block md:hidden pointer-events-none"
        style={{
          width: 210,
          left: -40,
          top: '4%',
          transform: 'rotate(22deg)',
          zIndex: 1,
          opacity: 0.14,
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
        }}
      >
        <Image src={ABHAY.src} alt="Abhay" width={210} height={290} className="w-full h-auto object-contain block" />
      </div>
      <div
        className="absolute block md:hidden pointer-events-none"
        style={{
          width: 170,
          right: -40,
          bottom: 0,
          transform: 'rotate(-18deg)',
          zIndex: 1,
          opacity: 0.14,
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
        }}
      >
        <Image src={TEJAS.src} alt="Tejas" width={170} height={235} className="w-full h-auto object-contain block" />
      </div>
    </>
  )
}
