"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const proposals = [
  /*
  {
    num: '001',
    title: 'HealthTech Patient Experience',
    description: "Redesigned patient-facing flows for a Health-Tech product. Simplified onboarding, reduced drop-off, improved care plan adherence.",
    href: 'https://www.behance.net/gallery/180887605/MedEase-App',
    photo: null,
    external: true,
  },
  */
  {
    num: '002',
    title: 'Brand Identity & Visual Systems',
    description: "Visual identity, brand systems, and design language built for startups across multiple sectors.",
    href: 'https://www.behance.net/gallery/195327435/Brand-Strategy-Case-Study',
    photo: null,
    external: true,
  },
  /*
  {
    num: '003',
    title: 'Design Community Platform',
    description: "Behance for vibe coders and AI product builders.",
    href: 'https://www.productgallery.in/',
    photo: null,
    external: true,
  },
  */
  {
    num: '004',
    title: 'AI Agent for Pharma Operations',
    description: "AI agent for medicine factory operations and workflow management.",
    href: 'https://karixadesign.vercel.app/',
    photo: null,
    external: true,
  },
  /*
  {
    num: '005',
    title: '2D to 3D Engineering AI',
    description: "AI platform that converts 2D engineering drawings into accurate 3D models.",
    href: 'https://hanomi-zeta.vercel.app/',
    photo: null,
    external: true,
  },
  {
    num: '006',
    title: 'Sports Analytics Dashboard',
    description: "Cricket intelligence dashboard for player performance, match analytics, and insights.",
    href: 'https://stancebeam.vercel.app/',
    photo: null,
    external: true,
  },
  */
]

// Corner plus marker
const Plus = ({ h, v = 'bottom' }: { h: 'left' | 'right'; v?: 'top' | 'bottom' }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className="absolute select-none pointer-events-none"
    style={{
      [h]: '-6px',
      [v]: '-6px',
      color: '#9ca3af',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function ProposalsGallery() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const designEl   = useRef<HTMLHeadingElement>(null)
  const proposalEl = useRef<HTMLHeadingElement>(null)
  const lineEl     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header   = headerRef.current
    const design   = designEl.current
    const proposal = proposalEl.current
    const line     = lineEl.current
    if (!header || !design || !proposal || !line) return

    let tl: gsap.core.Timeline

    const setup = () => {
      if (window.innerWidth < 768) {
        gsap.set(design, { x: 0 })
        gsap.set(proposal, { x: 0 })
        gsap.set(line, { scaleX: 1, opacity: 1 })
        return
      }

      const cRect = header.getBoundingClientRect()
      const dRect = design.getBoundingClientRect()
      const pRect = proposal.getBoundingClientRect()

      const paddingX     = parseFloat(window.getComputedStyle(header).paddingLeft)
      const contentLeft  = cRect.left + paddingX
      const contentRight = cRect.right - paddingX

      const designFinalX   = contentLeft - dRect.left
      const proposalFinalX = (contentRight - pRect.width) - pRect.left

      gsap.set(line, { scaleX: 0, transformOrigin: 'center center', opacity: 0 })

      tl = gsap.timeline({
        defaults: { duration: 1.1, ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(design,   { x: designFinalX }, 0)
        .to(line,     { scaleX: 1, opacity: 1, ease: 'power2.inOut' }, 0)
        .to(proposal, { x: proposalFinalX }, 0)
    }

    document.fonts.ready.then(() => requestAnimationFrame(setup))

    return () => { tl?.kill() }
  }, [])

  return (
    <div>

      {/* Section header */}
      <div
        ref={headerRef}
        className="pb-8 md:pb-12 overflow-hidden"
      >
        <div className="relative">
          <div
            ref={lineEl}
            className="absolute inset-x-0 border-t border-gray-300 hidden md:block"
            style={{ top: '50%' }}
          />
          <div className="relative flex items-baseline justify-center gap-2">
            <h2
              ref={designEl}
              className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>D</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>esign</span>
            </h2>
            <h2
              ref={proposalEl}
              className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>P</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>roposals</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
        {proposals.map((item) => {
          const inner = (
            <>
              <Plus h="left" v="top" />
              <Plus h="right" v="top" />
              <Plus h="left" v="bottom" />
              <Plus h="right" v="bottom" />

              <div className="flex flex-row items-center h-full min-h-[90px] md:min-h-[100px]">
                {item.photo && (
                  <div className="relative shrink-0 overflow-hidden" style={{ width: 72, height: 80 }}>
                    <Image
                      src={item.photo}
                      alt={item.title}
                      fill
                      sizes="72px"
                      className="object-cover object-top"
                    />
                  </div>
                )}

                  {/* Meta */}
                  <div className="flex flex-1 items-center justify-between px-4 md:px-8 py-4 md:py-6 gap-4 md:gap-6">
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3
                        className="text-sm md:text-lg font-light text-black leading-tight"
                        style={{ fontFamily: 'SatishSans, sans-serif' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-xs text-gray-400 leading-snug line-clamp-2"
                        style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
                      >
                        {item.description}
                      </p>
                    </div>
                    <span
                      className="text-xs text-black shrink-0 group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1"
                      style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                    >
                      View
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                </div>
            </>
          )

          const cardClass = `group block relative border border-gray-200 bg-white hover:border-gray-400 transition-colors duration-300 h-full`

          return item.external ? (
            <a
              key={item.num}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={item.num}
              href={item.href}
              className={cardClass}
            >
              {inner}
            </Link>
          )
        })}
      </div>

    </div>
  )
}
