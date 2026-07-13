"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus } from "../ui/Markers"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: "Shubham is a top-tier designer who knows how to shape products from the early stages. He took complete ownership of our GenAI platform's interface, delivering intuitive experience layouts that our 100K+ creators love.",
    author: "Ritwika Chowdhury",
    role: "Founder, Unscript",
    image: "/images/life/ritwika_avatar.png",
  },
  {
    quote: "A designer who moves incredibly fast without losing depth. Shubham's work on our maternal healthcare visual systems and interactive prototypes was invaluable to our scaling journey.",
    author: "Love Beejal",
    role: "Founder, Symita Inc.",
    image: "/images/life/love_avatar.png",
  },
  {
    quote: "Shubham helped us redesign our patient management workflows into a clean, modern digital platform. His design thinking was invaluable as we scaled our product and pitched on Shark Tank India.",
    author: "Saket Asati",
    role: "CEO, DigiQure (Featured on Shark Tank India)",
    image: "/images/life/saket_avatar.png",
  },
]

type Testimonial = (typeof TESTIMONIALS)[0]

function TestimonialCard({
  t,
  onRef,
}: {
  t: Testimonial
  onRef: (el: HTMLDivElement | null) => void
}) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const quoteRef   = useRef<HTMLSpanElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile()) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    gsap.to(el, {
      rotateX: -y * 7,
      rotateY:  x * 7,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.35,
      overwrite: "auto",
    })
    // Quote glyph follows cursor with slight parallax
    gsap.to(quoteRef.current, {
      x: x * 7,
      y: y * 7,
      ease: "power2.out",
      duration: 0.35,
      overwrite: "auto",
    })
  }

  const handleMouseEnter = () => {
    if (isMobile()) return
    gsap.to(quoteRef.current, { scale: 1.3, ease: "power2.out", duration: 0.35 })
    gsap.to(lineRef.current,  { scaleX: 1,  ease: "power3.out", duration: 0.45 })
  }

  const handleMouseLeave = () => {
    if (isMobile()) return
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      ease: "elastic.out(1, 0.65)",
      duration: 1.1,
      overwrite: "auto",
    })
    gsap.to(quoteRef.current, {
      scale: 1, x: 0, y: 0,
      ease: "elastic.out(1, 0.65)",
      duration: 1.1,
      overwrite: "auto",
    })
    gsap.to(lineRef.current, { scaleX: 0, ease: "power3.in", duration: 0.22 })
  }

  const handleMouseDown = () => {
    if (isMobile()) return
    gsap.to(cardRef.current, { scale: 0.972, duration: 0.1, ease: "power2.in", overwrite: "auto" })
  }

  const handleMouseUp = () => {
    if (isMobile()) return
    gsap.to(cardRef.current, { scale: 1, duration: 0.75, ease: "elastic.out(1, 0.5)", overwrite: "auto" })
  }

  return (
    <div
      ref={(el) => { (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el; onRef(el) }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative border border-zinc-200 p-6 md:p-8 flex flex-col justify-between h-full bg-white
        hover:border-zinc-950 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] group/card cursor-default select-none"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <Plus h="left"  v="top" />
      <Plus h="right" v="top" />
      <Plus h="left"  v="bottom" />
      <Plus h="right" v="bottom" />

      {/* Quote + body — floats above card surface in 3D space */}
      <div className="relative z-10 flex-1 flex flex-col pt-2" style={{ transform: "translateZ(12px)" }}>
        <div className="relative flex-1">
          <span
            ref={quoteRef}
            className="text-4xl text-zinc-200 font-serif absolute -top-4 -left-2 select-none pointer-events-none"
            style={{ display: "inline-block", transformOrigin: "center center" }}
          >
            &ldquo;
          </span>
          <p
            className="text-sm text-zinc-400 leading-relaxed pl-5 transition-colors duration-500 group-hover/card:text-zinc-700"
            style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300 }}
          >
            {t.quote}
          </p>
        </div>
      </div>

      {/* Author — floats slightly higher */}
      <div className="mt-8 pl-5 relative z-10 flex items-center gap-4" style={{ transform: "translateZ(18px)" }}>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 shrink-0 relative shadow-sm">
          <Image
            src={t.image}
            alt={t.author}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div
            className="text-sm font-semibold text-black"
            style={{ fontFamily: "SatishSans, sans-serif" }}
          >
            {t.author}
          </div>
          {/* Underline draws on hover via scaleX */}
          <div
            ref={lineRef}
            className="h-px bg-zinc-900 mt-1 mb-1"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
          />
          <div
            className="text-xs text-gray-400"
            style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300 }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const foundersRef = useRef<HTMLHeadingElement>(null)
  const sayRef      = useRef<HTMLHeadingElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center center", opacity: 0 })

      // Header: same split-to-edges animation as other sections
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 87%",
        once: true,
        onEnter: () => {
          const header   = headerRef.current
          const founders = foundersRef.current
          const say      = sayRef.current
          const line     = lineRef.current
          if (!header || !founders || !say || !line) return

          if (window.innerWidth < 768) {
            gsap.set(line, { scaleX: 1, opacity: 1 })
            return
          }

          const cRect = header.getBoundingClientRect()
          const fRect = founders.getBoundingClientRect()
          const sRect = say.getBoundingClientRect()

          const paddingX     = parseFloat(window.getComputedStyle(header).paddingLeft)
          const contentLeft  = cRect.left + paddingX
          const contentRight = cRect.right - paddingX

          const foundersFinalX = contentLeft - fRect.left
          const sayFinalX      = (contentRight - sRect.width) - sRect.left

          gsap.timeline({ defaults: { duration: 1.1, ease: "power3.inOut" } })
            .to(founders, { x: foundersFinalX }, 0)
            .to(line,     { scaleX: 1, opacity: 1, ease: "power2.inOut" }, 0)
            .to(say,      { x: sayFinalX }, 0)
        },
      })

      // Cards: staggered rise
      const cards = cardRefs.current.filter(Boolean)
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 44 })
        ScrollTrigger.create({
          trigger: cards[0],
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.13,
            })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-5xl mx-auto px-6 md:px-10"
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div ref={headerRef} className="pb-8 md:pb-12 overflow-hidden">
        <div className="relative">
          <div
            ref={lineRef}
            className="absolute inset-x-0 border-t border-gray-200"
            style={{ top: "50%" }}
          />
          <div className="relative flex items-baseline justify-center gap-2">
            <h2
              ref={foundersRef}
              className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: "SatishCapsSans, sans-serif", fontSize: "1.5em" }}>F</span>
              <span style={{ fontFamily: "SatishSans, sans-serif" }}>ounders</span>
            </h2>
            <h2
              ref={sayRef}
              className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: "SatishCapsSans, sans-serif", fontSize: "1.5em" }}>S</span>
              <span style={{ fontFamily: "SatishSans, sans-serif" }}>ay</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-stretch">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard
            key={i}
            t={t}
            onRef={(el) => { cardRefs.current[i] = el }}
          />
        ))}
      </div>
    </section>
  )
}
