"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

export default function ParallaxImagesV1() {
  const abhayDesktop = useRef<HTMLDivElement>(null)
  const tejasDesktop = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }

      // Desktop scroll-driven drift
      gsap.to(abhayDesktop.current, {
        y: () =>  window.innerHeight * 0.35,
        x: () => -window.innerWidth  * 0.25,
        ease: 'none',
        scrollTrigger: st,
      })
      gsap.to(tejasDesktop.current, {
        y: () =>  window.innerHeight * 0.35,
        x: () =>  window.innerWidth  * 0.25,
        ease: 'none',
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
        className="absolute h-auto hidden md:block"
        style={{
          width: ABHAY.width,
          left: ABHAY.left,
          top: ABHAY.top,
          transform: `rotate(${ABHAY.rotate}deg)`,
          zIndex: 10,
          willChange: 'transform'
        }}
      >
        <div className="relative w-full h-full">
          <Image src={ABHAY.src} alt="Abhay" width={ABHAY.width} height={500} className="w-full h-auto object-contain block pointer-events-none" />
          {/* Fingertip Marker */}
          <div id="left-fingertip" className="absolute w-2 h-2 rounded-full" style={{ right: '0%', top: '40%', opacity: 0 }} />
        </div>
      </div>
      <div
        ref={tejasDesktop}
        className="absolute h-auto hidden md:block"
        style={{
          width: TEJAS.width,
          right: TEJAS.right,
          top: TEJAS.top,
          transform: `rotate(${TEJAS.rotate}deg)`,
          zIndex: 10,
          willChange: 'transform'
        }}
      >
        <div className="relative w-full h-full">
          <Image src={TEJAS.src} alt="Tejas" width={TEJAS.width} height={500} className="w-full h-auto object-contain block pointer-events-none" />
          {/* Fingertip Marker */}
          <div id="right-fingertip" className="absolute w-2 h-2 rounded-full" style={{ left: '0%', top: '42%', opacity: 0 }} />
        </div>
      </div>

      {/* ── Mobile ── */}
      <div
        className="absolute block md:hidden pointer-events-none opacity-[0.22]"
        style={{ 
          width: 240, 
          left: -50, 
          top: '15%', 
          transform: 'rotate(22deg)', 
          zIndex: 1,
        }}
      >
        <Image src={ABHAY.src} alt="Abhay" width={240} height={330} className="w-full h-auto object-contain block" />
      </div>
      <div
        className="absolute block md:hidden pointer-events-none opacity-[0.22]"
        style={{ 
          width: 200, 
          right: -45, 
          top: '42%', 
          transform: 'rotate(-18deg)', 
          zIndex: 1,
        }}
      >
        <Image src={TEJAS.src} alt="Tejas" width={200} height={280} className="w-full h-auto object-contain block" />
      </div>
    </>
  )
}
