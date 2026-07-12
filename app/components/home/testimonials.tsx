"use client"

import React, { useEffect, useRef, useState } from "react"
import { Plus } from "../ui/Markers"

const TESTIMONIALS = [
  {
    num: "01",
    quote: "Shubham is a top-tier designer who knows how to shape products from the early stages. He took complete ownership of our GenAI platform's interface, delivering intuitive experience layouts that our 100K+ creators love.",
    author: "Ritwika",
    role: "Founder, Unscript"
  },
  {
    num: "02",
    quote: "A designer who moves incredibly fast without losing depth. Shubham's work on our maternal healthcare visual systems and interactive prototypes was invaluable to our scaling journey.",
    author: "Love Beejal",
    role: "Founder, Symita Inc."
  },
  {
    num: "03",
    quote: "Shubham helped us redesign our patient management workflows into a clean, modern digital platform. His design thinking was invaluable as we scaled our product and pitched on Shark Tank India.",
    author: "Saket",
    role: "CEO, DigiQure (Featured on Shark Tank India)"
  }
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Intersection Observer to trigger entrance animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full max-w-5xl mx-auto px-6 md:px-10 pt-2 pb-6 md:pb-8"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="pb-8 md:pb-12 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-x-0 border-t border-gray-200" style={{ top: "50%" }} />
          <div className="relative flex justify-center">
            <h2 className="relative bg-white px-4 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap">
              <span style={{ fontFamily: "SatishCapsSans, sans-serif", fontSize: "1.5em" }}>T</span>
              <span style={{ fontFamily: "SatishSans, sans-serif" }}>estimonials</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Testimonials Grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-stretch">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className={`relative border border-zinc-200 p-6 md:p-8 flex flex-col justify-between h-full bg-white 
              transition-all duration-700 ease-out hover:-translate-y-2 hover:border-zinc-950 
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] group/card
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ 
              transitionDelay: `${i * 150}ms`,
              willChange: "transform, opacity"
            }}
          >
            {/* Corner plus markers */}
            <Plus h="left"  v="top" />
            <Plus h="right" v="top" />
            <Plus h="left"  v="bottom" />
            <Plus h="right" v="bottom" />

            {/* Background watermark number */}
            <span 
              className="absolute right-6 bottom-4 text-[90px] font-extralight text-zinc-100 select-none pointer-events-none leading-none z-0 transition-all duration-500 group-hover/card:text-zinc-200/50 group-hover/card:scale-105"
              style={{ fontFamily: "SatishSans, sans-serif" }}
            >
              {t.num}
            </span>

            <div className="relative z-10 flex-1 flex flex-col">
              {/* Premium micro accent line */}
              <div className="w-5 h-[1px] bg-amber-500 mb-6 transition-all duration-500 group-hover/card:w-10" />

              {/* Quote block */}
              <div className="relative flex-1">
                <span className="text-4xl text-zinc-200 font-serif absolute -top-4 -left-2 select-none pointer-events-none group-hover/card:text-amber-200/50 transition-colors duration-500">
                  “
                </span>
                <p
                  className="text-sm text-zinc-400 leading-relaxed pl-5 transition-colors duration-500 group-hover/card:text-zinc-700"
                  style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300 }}
                >
                  {t.quote}
                </p>
              </div>
            </div>

            {/* Author block */}
            <div className="mt-8 pl-5 relative z-10">
              <div
                className="text-sm font-semibold text-black transition-colors duration-500 group-hover/card:text-amber-600"
                style={{ fontFamily: "SatishSans, sans-serif" }}
              >
                {t.author}
              </div>
              <div
                className="text-xs text-gray-400 mt-1"
                style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300 }}
              >
                {t.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
