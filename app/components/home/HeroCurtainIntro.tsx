"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import EmailCopy from "./EmailCopy"

interface HeroCurtainIntroProps {
  onIntroComplete?: () => void
}

const Plus = (_props?: any) => null

export default function HeroCurtainIntro({ onIntroComplete }: HeroCurtainIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  
  // Granular refs for choreographed editorial reveal
  const logoRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)

  const playHeroIntro = useCallback(() => {
    if (!containerRef.current) return

    const bg = bgRef.current
    const logo = logoRef.current
    const badge = badgeRef.current
    const heading = headingRef.current
    const subheading = subheadingRef.current
    const cta = ctaRef.current

    // Kill any active tweens
    gsap.killTweensOf([bg, logo, badge, heading, subheading, cta])

    // 1. Initial State: Dreamy Renaissance focus pull & classical depth
    if (bg) {
      gsap.set(bg, {
        scale: 1.04,
        opacity: 0.9,
        filter: "blur(5px)",
        transformOrigin: "50% 42%",
      })
    }

    if (logo) {
      gsap.set(logo, {
        opacity: 0,
        y: -14,
        scale: 0.9,
        filter: "blur(4px)",
      })
    }

    if (badge) {
      gsap.set(badge, {
        opacity: 0,
        y: 14,
        scale: 0.95,
        letterSpacing: "0.24em",
        filter: "blur(3px)",
      })
    }

    if (heading) {
      gsap.set(heading, {
        opacity: 0,
        y: 24,
        filter: "blur(6px)",
      })
    }

    if (subheading) {
      gsap.set(subheading, {
        opacity: 0,
        y: 16,
        filter: "blur(4px)",
      })
    }

    if (cta) {
      gsap.set(cta, {
        opacity: 0,
        y: 14,
        scale: 0.96,
        filter: "blur(3px)",
      })
    }

    // 2. Choreographed Master Timeline
    const tl = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        setHasAnimated(true)
        setIsInteractive(true)
        if (onIntroComplete) onIntroComplete()
        window.dispatchEvent(new CustomEvent("hero-curtain-complete"))
      },
    })

    // Phase 1: Background Classical Painting Focus Pull
    // Resolves Michelangelo's Creation of Adam and Corinthian columns from dreamy blur to razor-sharp grandeur
    if (bg) {
      tl.to(
        bg,
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
        },
        0
      )
    }

    // Phase 2: SCR7 Crest Logo drifts into place
    if (logo) {
      tl.to(
        logo,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
        },
        0.15
      )
    }

    // Phase 3: Architectural "DESIGNING PRODUCTS" Badge Card
    if (badge) {
      tl.to(
        badge,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          letterSpacing: "0.18em",
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power2.out",
        },
        0.28
      )
    }

    // Phase 4: Grand Editorial "Shubham Sah" Title Unveiling
    if (heading) {
      tl.to(
        heading,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        },
        0.38
      )
    }

    // Phase 5: Credentials & Subtitle Lines Float Up
    if (subheading) {
      tl.to(
        subheading,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power2.out",
        },
        0.52
      )
    }

    // Phase 6: Interactive "Let's Connect" Email Pill Lands
    if (cta) {
      tl.to(
        cta,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power2.out",
        },
        0.66
      )
    }
  }, [onIntroComplete])

  useEffect(() => {
    // Listen for loader-exit from Loader component
    const handleLoaderExit = () => {
      // Loader begins slide-up at 400ms; start hero focus right as it lifts
      setTimeout(playHeroIntro, 250)
    }

    window.addEventListener("loader-exit", handleLoaderExit)

    // Fallback: If loader is already completed or page re-focused, run
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        playHeroIntro()
      }
    }, 900)

    return () => {
      window.removeEventListener("loader-exit", handleLoaderExit)
      clearTimeout(timer)
    }
  }, [hasAnimated, playHeroIntro])

  // Subtle interactive 2.5D ambient float on desktop (living depth)
  useEffect(() => {
    if (!isInteractive || typeof window === "undefined" || window.innerWidth < 768) return

    const container = containerRef.current
    const bg = bgRef.current
    if (!container || !bg) return

    let rafId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      if (e.clientY > rect.bottom) return

      // Normalized coordinates (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1

      // Subtle atmospheric shift (max 6px horizontally, 4px vertically)
      targetX = nx * -6
      targetY = ny * -4
    }

    const render = () => {
      // Smooth lerp (0.05)
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05

      if (bg) {
        bg.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      }
      rafId = requestAnimationFrame(render)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
      if (bg) bg.style.transform = ""
    }
  }, [isInteractive])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden select-none">
      {/* ── Classical Pillars Hero Background (The authentic original) ─── */}
      <div
        ref={bgRef}
        className="absolute top-0 inset-x-0 h-[100dvh] md:h-screen pointer-events-none select-none overflow-hidden will-change-transform"
        style={{ zIndex: 0 }}
      >
        {/* Desktop authentic classical pillars & hands background */}
        <Image
          src="/images/HomeImages/hero-pillars-hands-bg.jpg"
          alt="Classical pillars background"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="hidden md:block object-cover object-top select-none pointer-events-none"
        />
        {/* Mobile authentic background */}
        <Image
          src="/images/HomeImages/hero-pillars-hands-mobile-bg.jpg"
          alt="Classical background"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="block md:hidden object-cover object-top select-none pointer-events-none"
        />
        {/* Soft bottom fade to blend with page sections */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* ── Center Content (Editorial Staggered Reveal) ────────────── */}
      <div className="relative min-h-[100dvh] md:min-h-screen flex flex-col justify-center items-center text-center gap-6 overflow-visible" style={{ zIndex: 20 }}>
        <div
          className="relative flex flex-col items-center gap-3 md:gap-6 md:px-6 md:py-4 select-text will-change-transform"
          style={{ zIndex: 30 }}
        >
          {/* SCR7 Crest Logo */}
          <div ref={logoRef} className="will-change-transform">
            <Image
              src="/images/logo.png"
              alt="SCR7"
              width={62}
              height={62}
              draggable={false}
              className="mb-0 md:mb-16 pointer-events-none select-none"
              style={{ mixBlendMode: "multiply", filter: "invert(1)", transform: "rotate(180deg)" }}
            />
          </div>

          {/* DESIGNING PRODUCTS Badge Card */}
          <div
            ref={badgeRef}
            className="relative border border-zinc-200 bg-zinc-50/80 px-4 py-1 text-[9px] md:text-[10px] tracking-[0.18em] text-zinc-500 mb-1 md:mb-3 select-text cursor-text will-change-transform"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", userSelect: "text", WebkitUserSelect: "text" }}
          >
            <Plus h="left" v="top" />
            <Plus h="right" v="top" />
            <Plus h="left" v="bottom" />
            <Plus h="right" v="bottom" />
            <span className="select-text cursor-text" style={{ userSelect: "text", WebkitUserSelect: "text" }}>
              DESIGNING PRODUCTS
            </span>
          </div>

          {/* Hero Name Heading */}
          <h1
            ref={headingRef}
            id="hero-name-heading"
            className="text-4xl md:text-5xl tracking-tight text-black select-text cursor-text relative will-change-transform"
            style={{ userSelect: "text", WebkitUserSelect: "text" }}
          >
            <span style={{ fontFamily: "SatishCapsSans, sans-serif", fontSize: "1.5em", userSelect: "text", WebkitUserSelect: "text" }}>
              S
            </span>
            <span style={{ fontFamily: "SatishSans, sans-serif", marginLeft: "4px", userSelect: "text", WebkitUserSelect: "text" }}>
              hubham{" "}
            </span>
            <span style={{ fontFamily: "SatishCapsSans, sans-serif", fontSize: "1.5em", userSelect: "text", WebkitUserSelect: "text" }}>
              S
            </span>
            <span style={{ fontFamily: "SatishSans, sans-serif", marginLeft: "4px", userSelect: "text", WebkitUserSelect: "text" }}>
              ah
            </span>
          </h1>

          {/* Credentials and Subtitle */}
          <div ref={subheadingRef} className="flex flex-col items-center will-change-transform">
            <p
              className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl flex flex-col items-center text-center gap-y-1 md:gap-y-0.5 select-text cursor-text"
              style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: "300", userSelect: "text", WebkitUserSelect: "text" }}
            >
              <span className="block select-text cursor-text" style={{ userSelect: "text", WebkitUserSelect: "text" }}>
                Building Products for Global Companies & Startups
              </span>
              <span className="flex flex-wrap justify-center gap-x-1.5 mt-0.5 md:mt-0 select-text cursor-text" style={{ userSelect: "text", WebkitUserSelect: "text" }}>
                <span className="whitespace-nowrap select-text cursor-text" style={{ userSelect: "text", WebkitUserSelect: "text" }}>
                  25K+ on LinkedIn <span className="text-gray-300 ml-1.5">•</span>
                </span>
                <span className="whitespace-nowrap select-text cursor-text" style={{ userSelect: "text", WebkitUserSelect: "text" }}>
                  Founded a 2K+ Design Community <span className="text-gray-300 ml-1.5">•</span>
                </span>
                <span className="whitespace-nowrap select-text cursor-text" style={{ userSelect: "text", WebkitUserSelect: "text" }}>
                  IIT Patna MBA
                </span>
              </span>
            </p>
          </div>

          {/* Centered "Let's Connect" CTA Section */}
          <div ref={ctaRef} className="mt-4 md:mt-8 will-change-transform">
            <EmailCopy />
          </div>
        </div>
      </div>
    </div>
  )
}
