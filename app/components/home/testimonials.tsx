"use client"

import React from "react"
import { Plus } from "../ui/Markers"

const TESTIMONIALS = [
  {
    quote: "Shubham's ability to translate complex SaaS requirements into clean, structured design systems is phenomenal. He has a rare blend of aesthetic mastery and product design logic.",
    author: "Apuroop",
    role: "Founder & CEO, Unscript"
  },
  {
    quote: "An absolute powerhouse of product design. Shubham helped us redefine our credit risk workflows and design a scalable onboarding experience that boosted activation rate.",
    author: "Pranay",
    role: "Product Lead, Fintech App"
  },
  {
    quote: "A designer who moves incredibly fast without losing depth. Shubham's work on our visual systems and interactive prototypes helped us secure our latest round of funding.",
    author: "Anjali",
    role: "Co-Founder, Symita Inc."
  }
]

export default function Testimonials() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 md:px-10 py-4">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="pb-8 md:pb-12 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-x-0 border-t border-gray-250" style={{ top: "50%" }} />
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

            <div
              className="text-sm text-gray-500 italic leading-relaxed"
              style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300 }}
            >
              "{t.quote}"
            </div>

            <div className="mt-8">
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
