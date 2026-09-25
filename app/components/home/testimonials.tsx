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
    image: "/images/life/ritwika_avatar.webp",
  },
  {
    quote: "A designer who moves incredibly fast without losing depth. Shubham's work on our maternal healthcare visual systems and interactive prototypes was invaluable to our scaling journey.",
    author: "Love Beejal",
    role: "Founder, Symita Inc.",
    image: "/images/life/love_avatar.jpeg",
  },
  {
    quote: "Shubham helped us redesign our patient management workflows into a clean, modern digital platform. His design thinking was invaluable as we scaled our product and pitched on Shark Tank India.",
    author: "Saket Asati",
    role: "CEO, DigiQure (Featured on Shark Tank India)",
    image: "/images/life/saket_avatar.jpeg",
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


  const handleMouseEnter = () => {
    if (isMobile()) return
    gsap.to(quoteRef.current, { scale: 1.3, ease: "power2.out", duration: 0.35 })
    gsap.to(lineRef.current,  { scaleX: 1,  ease: "power3.out", duration: 0.45 })
  }

  const handleMouseLeave = () => {
    if (isMobile()) return
    gsap.to(quoteRef.current, {
      scale: 1, x: 0, y: 0,
      ease: "elastic.out(1, 0.65)",
      duration: 1.1,
      overwrite: "auto",
    })
    gsap.to(lineRef.current, { scaleX: 0, ease: "power3.in", duration: 0.22 })
  }

  return (
    <div
      ref={(el) => { (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el; onRef(el) }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative border border-zinc-200 p-6 md:p-8 flex flex-col justify-between h-full bg-transparent
        hover:bg-white hover:border-zinc-950 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] group/card select-text transition-all duration-300"
    >
      <Plus h="left"  v="top" />
      <Plus h="right" v="top" />
      <Plus h="left"  v="bottom" />
      <Plus h="right" v="bottom" />

      {/* Quote + body */}
      <div className="relative z-10 flex-1 flex flex-col pt-2 select-text">
        <div className="relative flex-1 select-text">
          <span
            ref={quoteRef}
            className="text-4xl text-zinc-200 font-serif absolute -top-4 -left-2 select-none pointer-events-none"
            style={{ display: "inline-block", transformOrigin: "center center" }}
          >
            &ldquo;
          </span>
          <p
            className="text-sm text-zinc-400 leading-relaxed pl-5 transition-colors duration-500 group-hover/card:text-zinc-700 select-text cursor-text"
            style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300, userSelect: "text", WebkitUserSelect: "text" }}
          >
            {t.quote}
          </p>
        </div>
      </div>

      {/* Author */}
      <div className="mt-8 pl-5 relative z-10 flex items-center gap-4 select-text">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 shrink-0 relative shadow-sm pointer-events-none select-none">
          <Image
            src={t.image}
            alt={t.author}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 select-text">
          <div
            className="text-sm font-semibold text-black select-text cursor-text"
            style={{ fontFamily: "SatishSans, sans-serif", userSelect: "text", WebkitUserSelect: "text" }}
          >
            {t.author}
          </div>
          {/* Underline draws on hover via scaleX */}
          <div
            ref={lineRef}
            className="h-px bg-zinc-900 mt-1 mb-1 pointer-events-none"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
          />
          <div
            className="text-xs text-gray-400 select-text cursor-text"
            style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300, userSelect: "text", WebkitUserSelect: "text" }}
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
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      <div className="pb-8 md:pb-12 overflow-hidden">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-x-0 border-t border-gray-200"
            style={{ top: "50%" }}
          />
          <h2 className="relative bg-white px-4 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap flex items-baseline gap-2">
            <span>
              <span style={{ fontFamily: "SatishCapsSans, sans-serif", fontSize: "1.5em" }}>F</span>
              <span style={{ fontFamily: "SatishSans, sans-serif" }}>ounders</span>
            </span>
            <span>
              <span style={{ fontFamily: "SatishCapsSans, sans-serif", fontSize: "1.5em" }}>S</span>
              <span style={{ fontFamily: "SatishSans, sans-serif" }}>ay</span>
            </span>
          </h2>
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
