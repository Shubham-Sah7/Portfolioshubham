"use client"

import React from "react"
import { Plus } from "../ui/Markers"

const TESTIMONIALS = [
  {
    quote: "Shubham is a top-tier designer who knows how to shape products from the early stages. He took complete ownership of our GenAI platform's interface, delivering intuitive experience layouts that our 100K+ creators love.",
    author: "Ritwika",
    role: "Founder, Unscript"
  },
  {
    quote: "A designer who moves incredibly fast without losing depth. Shubham's work on our maternal healthcare visual systems and interactive prototypes was invaluable to our scaling journey.",
    author: "Love Beejal",
    role: "Founder, Symita Inc."
  },
  {
    quote: "Shubham helped us redesign our patient management workflows into a clean, modern digital platform. His design thinking was invaluable as we scaled our product and pitched on Shark Tank India.",
    author: "Saket",
    role: "CEO, DigiQure (Featured on Shark Tank India)"
  }
]

export default function Testimonials() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
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
            className="relative border border-zinc-300 p-6 md:p-8 flex flex-col justify-between h-full bg-white"
          >
            {/* Corner plus markers */}
            <Plus h="left"  v="top" />
            <Plus h="right" v="top" />
            <Plus h="left"  v="bottom" />
            <Plus h="right" v="bottom" />

            {/* Quote block */}
            <div className="relative">
              <span className="text-4xl text-zinc-200 font-serif absolute -top-4 -left-2 select-none">“</span>
              <p
                className="text-sm text-zinc-600 leading-relaxed pl-5 relative z-10"
                style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300 }}
              >
                {t.quote}
              </p>
            </div>

            {/* Author block */}
            <div className="mt-8 pl-5">
              <div
                className="text-sm font-semibold text-black"
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
