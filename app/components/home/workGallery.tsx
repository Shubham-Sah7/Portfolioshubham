"use client"

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    num: '001',
    title: 'Unscript',
    description: 'Designed an AI-powered platform helping creators streamline content planning, scripting, and production workflows. Focused on simplifying complex creation processes through intuitive user experiences and scalable product systems.',
    image: '/images/projects/unscript.png',
    href: 'https://www.behance.net/gallery/233866187/Unscript',
    year: '2025',
    available: true,
    external: true,
  },
  {
    num: '002',
    title: 'Design System',
    description: 'Built a scalable design system that improved consistency, accelerated product development, and established a unified visual language across multiple product experiences.',
    image: '/images/New images/Design System.png',
    href: 'https://www.behance.net/gallery/235056425/Design-System',
    year: '2024',
    available: true,
    external: true,
  },
  {
    num: '003',
    title: 'Roam IQ',
    description: 'An AI operations assistant for multi-outlet restaurants. Designed to help restaurant owners manage operations, monitor performance, optimize workflows, and make data-driven decisions across locations from a single interface.',
    image: '/images/projects/roam-iq.png',
    href: 'https://cork-cub-83153427.figma.site/',
    year: '2024',
    available: true,
    external: true,
  },
  {
    num: '004',
    title: 'Credit Lending Platform',
    description: 'Designed an AI-driven lending experience focused on onboarding, credit assessment, loan management, and financial decision-making. Simplifying complex financial workflows through intelligent product design.',
    image: '/images/projects/ai-lending-app.png',
    href: 'https://riverlineapp.vercel.app/',
    year: '2024',
    available: true,
    external: true,
  },
  {
    num: '005',
    title: 'Signzy',
    description: 'Contributed to fintech products powering digital onboarding, KYC verification, compliance workflows, and enterprise financial operations at scale.',
    image: '/images/New images/Signzy.png',
    href: 'https://www.signzy.com/',
    year: '2023',
    available: true,
    external: true,
  },
  {
    num: '006',
    title: 'AI Video Documentation Platform',
    description: 'Designed a platform that transforms workflows into professional video documentation, tutorials, onboarding guides, and product walkthroughs using AI-powered automation.',
    image: '/images/New images/AI Documentaion APP.png',
    href: 'https://trupeerai.vercel.app/',
    year: '2024',
    available: true,
    external: true,
  },
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
      [h]: 0,
      [v]: 0,
      transform: `translate(${h === 'left' ? '-50%' : '50%'}, ${v === 'top' ? '-50%' : '50%'})`,
      color: '#9ca3af',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function WorkGallery() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const selectedEl = useRef<HTMLHeadingElement>(null)
  const worksEl    = useRef<HTMLHeadingElement>(null)
  const lineEl     = useRef<HTMLDivElement>(null)
  const branchContainerRef = useRef<HTMLDivElement>(null)

  // Parallax + tilt for all branches via data attributes
  useEffect(() => {
    // Disable branch scroll tracking on mobile viewports
    if (typeof window !== 'undefined' && window.innerWidth < 768) return

    const handleScroll = () => {
      const y = window.scrollY
      const tilt = Math.min(y * 0.015, 8)
      const els = branchContainerRef.current?.querySelectorAll<HTMLImageElement>('[data-branch]')
      els?.forEach(el => {
        const speed   = parseFloat(el.dataset.speed  ?? '0.1')
        const baseRot = parseFloat(el.dataset.rot    ?? '-25')
        const tiltDir = parseFloat(el.dataset.tiltdir ?? '1')
        const flip    = el.dataset.flip === 'true'
        const dy = -(y * speed)
        const rot = baseRot + tiltDir * tilt
        el.style.transform = flip
          ? `translateY(${dy}px) scaleX(-1) rotate(${rot}deg)`
          : `translateY(${dy}px) rotate(${rot}deg)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const header   = headerRef.current
    const selected = selectedEl.current
    const worksH   = worksEl.current
    const line     = lineEl.current
    if (!header || !selected || !worksH || !line) return

    let tl: gsap.core.Timeline

    const setup = () => {
      if (window.innerWidth < 768) {
        gsap.set(selected, { x: 0 })
        gsap.set(worksH, { x: 0 })
        gsap.set(line, { scaleX: 1, opacity: 1 })
        return
      }

      // Words are centered via CSS (justify-center) - this IS the initial state.
      // We calculate where they need to animate TO (left edge / right edge of content area).
      const cRect = header.getBoundingClientRect()
      const sRect = selected.getBoundingClientRect()
      const wRect = worksH.getBoundingClientRect()

      // line uses inset-x-0 on the inner wrapper (header minus its padding)
      const paddingX    = parseFloat(window.getComputedStyle(header).paddingLeft)
      const contentLeft  = cRect.left  + paddingX
      const contentRight = cRect.right - paddingX

      // How far each word moves from its centered position to the edge
      const selectedFinalX = contentLeft - sRect.left               // negative → moves left
      const worksFinalX    = (contentRight - wRect.width) - wRect.left  // positive → moves right

      // Hide line at start
      gsap.set(line, { scaleX: 0, transformOrigin: 'center center', opacity: 0 })

      // One-shot animation triggered when section enters view.
      // toggleActions: play forward on enter, reverse on leave-back.
      tl = gsap.timeline({
        defaults: { duration: 1.1, ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(selected, { x: selectedFinalX }, 0)
        .to(line,     { scaleX: 1, opacity: 1, ease: 'power2.inOut' }, 0)
        .to(worksH,   { x: worksFinalX }, 0)
    }

    document.fonts.ready.then(() => requestAnimationFrame(setup))

    return () => { tl?.kill() }
  }, [])

  return (
    <div>

      {/* ── Section header ──────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="pb-8 md:pb-12 overflow-hidden"
      >
        {/* Inner wrapper: height = text height only, so top:50% = text midline */}
        <div className="relative">
          {/* Line: spans full content width, vertically centred with the text */}
          <div
            ref={lineEl}
            className="absolute inset-x-0 border-t border-gray-300"
            style={{ top: '50%' }}
          />

          {/* Words: start naturally centered side-by-side */}
          <div className="relative flex items-baseline justify-center gap-2">
            <h2
              ref={selectedEl}
              className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>S</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>elected</span>
            </h2>
            <h2
              ref={worksEl}
              className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>W</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>orks</span>
            </h2>
          </div>
        </div>

        {/* Small subtitle or scroll tip inside header area */}
        <div className="relative flex justify-center mt-2">
          <span className="relative bg-white px-3 text-[10px] text-gray-400 tracking-wider uppercase select-none">
            Swipe or Hover for Details
          </span>
        </div>
      </div>

      {/* ── Works list ─────────────────────────────────────── */}
      <div className="relative" ref={branchContainerRef}>

        {/* Left branches */}
        <img data-branch data-speed="0.18" data-rot="-25" data-tiltdir="-1" data-flip="true"
          src="/images/HomeImages/branch.svg" aria-hidden="true"
          className="hidden md:block absolute pointer-events-none select-none"
          style={{ width: 'auto', height: '460px', top: '5%',  left: 'calc(50% - 50vw - 35px)', transform: 'translateY(0px) scaleX(-1) rotate(-25deg)', filter: 'brightness(0) opacity(0.13)' }}
        />
        <img data-branch data-speed="0.13" data-rot="-20" data-tiltdir="-1" data-flip="true"
          src="/images/HomeImages/branch.svg" aria-hidden="true"
          className="hidden md:block absolute pointer-events-none select-none"
          style={{ width: 'auto', height: '420px', top: '38%', left: 'calc(50% - 50vw - 45px)', transform: 'translateY(0px) scaleX(-1) rotate(-20deg)', filter: 'brightness(0) opacity(0.11)' }}
        />
        <img data-branch data-speed="0.20" data-rot="-28" data-tiltdir="-1" data-flip="true"
          src="/images/HomeImages/branch.svg" aria-hidden="true"
          className="hidden md:block absolute pointer-events-none select-none"
          style={{ width: 'auto', height: '400px', top: '72%', left: 'calc(50% - 50vw - 30px)', transform: 'translateY(0px) scaleX(-1) rotate(-28deg)', filter: 'brightness(0) opacity(0.10)' }}
        />

        {/* Right branches */}
        <img data-branch data-speed="0.09" data-rot="-25" data-tiltdir="1" data-flip="false"
          src="/images/HomeImages/branch.svg" aria-hidden="true"
          className="hidden md:block absolute pointer-events-none select-none"
          style={{ width: 'auto', height: '430px', top: '20%', right: 'calc(50% - 50vw - 30px)', transform: 'translateY(0px) rotate(-25deg)', filter: 'brightness(0) opacity(0.11)' }}
        />
        <img data-branch data-speed="0.15" data-rot="-22" data-tiltdir="1" data-flip="false"
          src="/images/HomeImages/branch.svg" aria-hidden="true"
          className="hidden md:block absolute pointer-events-none select-none"
          style={{ width: 'auto', height: '450px', top: '55%', right: 'calc(50% - 50vw - 40px)', transform: 'translateY(0px) rotate(-22deg)', filter: 'brightness(0) opacity(0.12)' }}
        />
        <img data-branch data-speed="0.11" data-rot="-18" data-tiltdir="1" data-flip="false"
          src="/images/HomeImages/branch.svg" aria-hidden="true"
          className="hidden md:block absolute pointer-events-none select-none"
          style={{ width: 'auto', height: '390px', top: '85%', right: 'calc(50% - 50vw - 25px)', transform: 'translateY(0px) rotate(-18deg)', filter: 'brightness(0) opacity(0.10)' }}
        />

      <div className="flex flex-col gap-10 md:gap-16">
        {works.map((work) => (
          <CardContainer key={work.num} containerClassName="w-full p-0" className="w-full">
            <CardBody className="relative border border-zinc-300 grid grid-cols-1 md:grid-cols-2 w-full items-stretch">

              {/* Corner plus markers */}
              <Plus h="left"  v="top" />
              <Plus h="right" v="top" />
              <Plus h="left"  v="bottom" />
              <Plus h="right" v="bottom" />

              {/* Info */}
              <div className="p-6 md:p-10 flex flex-col justify-between order-2 md:order-1">
                <div>
                  <CardItem translateZ={5} as="h3"
                    className="text-2xl md:text-3xl font-light text-black mb-4 block"
                    style={{ fontFamily: 'SatishSans, sans-serif' }}
                  >
                    {work.title}
                  </CardItem>
                  <CardItem translateZ={3} as="p"
                    className="text-sm text-gray-400 leading-relaxed max-w-sm block"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    {work.description}
                  </CardItem>
                </div>

                <div className="mt-8 flex items-end justify-between">
                  <CardItem translateZ={2} as="span"
                    className="text-xs text-gray-400 block"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    {work.year}
                  </CardItem>
                  {work.available && work.href && (
                    <CardItem translateZ={7}>
                      <a
                        href={work.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-900 text-xs text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 shrink-0 flex items-center gap-2"
                        style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                      >
                        View Work
                        <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor">
                          <path d="M251.77-254.23 210-296l393.62-394H245.77v-60h460v460h-60v-357.85l-394 393.62Z"/>
                        </svg>
                      </a>
                    </CardItem>
                  )}
                </div>
              </div>

              {/* Image */}
              <CardItem translateZ={9} className="w-full min-h-[280px] md:min-h-0 relative overflow-hidden order-1 md:order-2 block bg-zinc-50 border-b md:border-b-0 md:border-l border-zinc-200">
                <a
                  href={work.href ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                >
                  {work.image && (
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-3 md:p-0 md:object-cover md:object-top"
                    />
                  )}
                </a>
              </CardItem>

            </CardBody>
          </CardContainer>
        ))}
      </div>

      </div>{/* end relative wrapper */}

    </div>
  )
}
