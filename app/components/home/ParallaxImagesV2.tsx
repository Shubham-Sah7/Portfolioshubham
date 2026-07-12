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

export default function ParallaxImagesV2() {
  const abhayDesktop = useRef<HTMLDivElement>(null)
  const tejasDesktop = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const abhay = abhayDesktop.current
    const tejas = tejasDesktop.current
    if (!abhay || !tejas) return

    // Set initial low opacity
    gsap.set(abhay, { opacity: 0.15 })
    gsap.set(tejas, { opacity: 0.15 })

    const ctx = gsap.context(() => {
      const st = {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Slightly slower lag for more cinematic weight
      }

      // Desktop: deeper drift down + wider slide outward
      gsap.to(abhay, {
        y: () =>  window.innerHeight * 0.45,
        x: () => -window.innerWidth  * 0.32,
        ease: 'none',
        scrollTrigger: st,
      })
      gsap.to(tejas, {
        y: () =>  window.innerHeight * 0.45,
        x: () =>  window.innerWidth  * 0.32,
        ease: 'none',
        scrollTrigger: st,
      })

      const handleMouseMove = (e: MouseEvent) => {
        const rAbhay = abhay.getBoundingClientRect()
        const rTejas = tejas.getBoundingClientRect()

        const cAbhayX = rAbhay.left + rAbhay.width / 2
        const cAbhayY = rAbhay.top + rAbhay.height / 2
        const cTejasX = rTejas.left + rTejas.width / 2
        const cTejasY = rTejas.top + rTejas.height / 2

        const dAbhay = Math.sqrt((e.clientX - cAbhayX) ** 2 + (e.clientY - cAbhayY) ** 2)
        const dTejas = Math.sqrt((e.clientX - cTejasX) ** 2 + (e.clientY - cTejasY) ** 2)

        const maxDist = 550
        const baseOpacity = 0.15
        const targetOpacity = 0.95

        const opAbhay = baseOpacity + Math.max(0, (maxDist - dAbhay) / maxDist) * (targetOpacity - baseOpacity)
        const opTejas = baseOpacity + Math.max(0, (maxDist - dTejas) / maxDist) * (targetOpacity - baseOpacity)

        gsap.to(abhay, { opacity: opAbhay, duration: 0.4, ease: "power1.out" })
        gsap.to(tejas, { opacity: opTejas, duration: 0.4, ease: "power1.out" })
      }

      const handleMouseLeave = () => {
        gsap.to(abhay, { opacity: 0.15, duration: 0.8 })
        gsap.to(tejas, { opacity: 0.15, duration: 0.8 })
      }

      window.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
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
        <Image src={ABHAY.src} alt="Abhay" width={ABHAY.width} height={500} className="w-full h-auto object-contain block pointer-events-none" />
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
        <Image src={TEJAS.src} alt="Tejas" width={TEJAS.width} height={500} className="w-full h-auto object-contain block pointer-events-none" />
      </div>

      {/* ── Mobile - absolute to hero container, scrolls naturally with zero scroll friction ── */}
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
