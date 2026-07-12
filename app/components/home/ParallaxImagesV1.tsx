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
    const abhay = abhayDesktop.current
    const tejas = tejasDesktop.current
    if (!abhay || !tejas) return

    const ctx = gsap.context(() => {
      // Set 3D depth offsets
      gsap.set(abhay, { transformPerspective: 1200, z: 60 })
      gsap.set(tejas, { transformPerspective: 1200, z: 60 })

      // 1. Scroll-driven vertical drift
      const st = {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }

      gsap.to(abhay, {
        y: () => window.innerHeight * 0.35,
        x: () => -window.innerWidth * 0.25,
        ease: 'none',
        scrollTrigger: st,
      })

      gsap.to(tejas, {
        y: () => window.innerHeight * 0.35,
        x: () => window.innerWidth * 0.25,
        ease: 'none',
        scrollTrigger: st,
      })

      // 2. Mouse-driven interactive tilt & drift
      // We use GSAP quickTo for smooth spring-like mouse follow
      const abhayMouseX = gsap.quickTo(abhay, "xPercent", { duration: 0.8, ease: "power2.out" })
      const abhayMouseY = gsap.quickTo(abhay, "yPercent", { duration: 0.8, ease: "power2.out" })
      const abhayMouseR = gsap.quickTo(abhay, "rotation", { duration: 0.8, ease: "power2.out" })

      const tejasMouseX = gsap.quickTo(tejas, "xPercent", { duration: 0.8, ease: "power2.out" })
      const tejasMouseY = gsap.quickTo(tejas, "yPercent", { duration: 0.8, ease: "power2.out" })
      const tejasMouseR = gsap.quickTo(tejas, "rotation", { duration: 0.8, ease: "power2.out" })

      const handleMouseMove = (e: MouseEvent) => {
        // Calculate normalized cursor offset from screen center (-1 to 1)
        const normX = (e.clientX / window.innerWidth) - 0.5
        const normY = (e.clientY / window.innerHeight) - 0.5

        // Move left deity: opposite to mouse, rotate slightly
        abhayMouseX(normX * -15)
        abhayMouseY(normY * -15)
        abhayMouseR(ABHAY.rotate + (normX * 8))

        // Move right deity: follows mouse, rotate slightly
        tejasMouseX(normX * 15)
        tejasMouseY(normY * 15)
        tejasMouseR(TEJAS.rotate + (normX * -8))
      }

      const handleMouseLeave = () => {
        // Reset to original positions
        abhayMouseX(0)
        abhayMouseY(0)
        abhayMouseR(ABHAY.rotate)

        tejasMouseX(0)
        tejasMouseY(0)
        tejasMouseR(TEJAS.rotate)
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

      {/* ── Mobile - absolute to hero container, scrolls natively with zero scroll friction ── */}
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
