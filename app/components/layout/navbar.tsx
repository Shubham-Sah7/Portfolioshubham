"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin)

const RESUME_URL = "https://drive.google.com/file/d/1kOanHM4ByS2qRn3JO9EpEjh6wfn0aPXM/preview"
const RESUME_VIEW_URL = "https://drive.google.com/file/d/1kOanHM4ByS2qRn3JO9EpEjh6wfn0aPXM/view?usp=sharing"

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
      color: '#d1d5db',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

const navItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Craft", href: "/lab/playground" },
  { name: "Resume", href: "#resume" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isLightPage, setIsLightPage] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [resumeMode, setResumeMode] = useState<'interactive' | 'pdf'>('interactive')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowResume(false) }
    if (showResume) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.stop()
      }
    } else {
      document.body.style.overflow = ""
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.start()
      }
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.start()
      }
    }
  }, [showResume])


  useEffect(() => {
    setIsLightPage(document.body.hasAttribute('data-light-page'))
    const observer = new MutationObserver(() => {
      setIsLightPage(document.body.hasAttribute('data-light-page'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-light-page'] })
    return () => observer.disconnect()
  }, [])

  // nav is white-text when on walkman dark mode (default) or toggled off light mode
  const showWhiteNav = pathname === '/lab/walkman' && !isLightPage

  useEffect(() => {
    // Create the SVG displacement map for liquid glass effect
    const mapSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
        <radialGradient id="lensGradient">
          <stop offset="0%" stop-color="white" stop-opacity="1" />
          <stop offset="55%" stop-color="gray" stop-opacity="0.4" />
          <stop offset="80%" stop-color="black" stop-opacity="0.6" />
          <stop offset="100%" stop-color="white" stop-opacity="1" />
        </radialGradient>
        <rect width="1" height="1" fill="url(#lensGradient)" />
      </svg>
    `

    const encodedMap = encodeURIComponent(mapSvg)

    // Create and inject the filter SVG
    const filterSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    filterSvg.style.position = "fixed"
    filterSvg.style.top = "-10000px"
    filterSvg.innerHTML = `
      <defs>
        <filter id="liquid-lens" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          <feImage href="data:image/svg+xml;charset=utf-8,${encodedMap}" result="displacementMap" />
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="40" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="3" result="blurred" />
          <feMorphology operator="dilate" radius="1" in="blurred" result="expanded" />
          <feComposite in="expanded" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    `

    document.body.appendChild(filterSvg)

    // Animate navbar entrance
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 }
      )
    }

    return () => {
      if (filterSvg && filterSvg.parentNode) {
        filterSvg.parentNode.removeChild(filterSvg)
      }
    }
  }, [])

  const handleNavigation = (item: typeof navItems[0], e: React.MouseEvent) => {
    e.preventDefault()

    // Add click animation
    if (navRef.current) {
      gsap.to(navRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
    }

    if (item.name === "Resume") {
      setShowResume(true)
      return
    }

    if (item.name === "Work") {
      // Check if we're on a work page
      if (pathname.startsWith('/works/')) {
        // Navigate to home and scroll to work section
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToWorkSection()
          }, 500)
        })
      } else if (pathname === '/') {
        // Already on home, just scroll to work section
        scrollToWorkSection()
      } else {
        // Navigate to home and scroll to work
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToWorkSection()
          }, 500)
        })
      }
    } else if (item.name === "Unplug") {
      if (pathname === '/') {
        // Already on home, scroll to unplugged
        scrollToUnplugSection()
      } else {
        // Navigate to home and scroll to unplugged
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToUnplugSection()
          }, 500)
        })
      }
    } else if (item.name === "About") {
      navigateWithTransition('/about')
    } else if (item.name === "Home") {
      if (pathname !== '/') {
        navigateWithTransition('/')
      } else {
        // Already on home, scroll to top
        scrollToTop()
      }
    } else {
      // Handle other navigation items
      if (pathname !== item.href) {
        navigateWithTransition(item.href)
      }
    }
  }

  const navigateWithTransition = (href: string, callback?: () => void) => {
    // Page transition out
    gsap.to("main", {
      y: 50,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(href)
        if (callback) callback()
      }
    })
  }

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: 0,
        offsetY: 0
      },
      ease: "power2.inOut"
    })
  }

  const scrollToWorkSection = () => {
    // Find work section and scroll to it
    const workSection = document.querySelector('[data-section="work"]') ||
                       document.querySelector('.gallery-wrapper') ||
                       Array.from(document.querySelectorAll('h2')).find(el =>
                         el.textContent?.toLowerCase().includes('work')
                       )?.parentElement

    if (workSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: workSection,
          offsetY: 100
        },
        ease: "power2.inOut"
      })
    }
  }

  const scrollToUnplugSection = () => {
    // Find unplugged section
    const unpluggedSection = document.querySelector('[data-section="unplugged"]') ||
                            // Try to find by text content containing "Unplug"
                            Array.from(document.querySelectorAll('h2, h3')).find(el =>
                              el.textContent?.toLowerCase().includes('unplugged')
                            )?.closest('div')

    if (unpluggedSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: unpluggedSection,
          offsetY: 100
        },
        ease: "power2.inOut"
      })
    }
  }


  // Page transition in effect
  useEffect(() => {
    gsap.fromTo("main",
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1
      }
    )
  }, [pathname])

  return (
    <>
    <div className="fixed top-0 left-0 right-0 flex justify-center px-3 py-4 pointer-events-none" style={{ zIndex: 10005 }}>
      <nav
        ref={navRef}
        className={`flex items-center rounded-none py-1 relative transition-all duration-300 hover:shadow-lg pointer-events-auto w-full max-w-full md:w-auto justify-between md:justify-start ${
          isMounted
            ? "gap-1 md:gap-6 px-3 md:px-6"
            : "gap-1 px-3"
        }`}
        style={{
          background: showWhiteNav ? 'rgba(255,255,255,0.06)' : 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'url(#liquid-lens) blur(2px)',
          border: showWhiteNav ? '2px solid rgba(255,255,255,0.14)' : '2px solid rgb(212, 212, 216)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            0 8px 24px rgba(0, 0, 0, 0.1)
          `
        }}
      >
        {/* Corner squares - half outside */}
        <div className={`hidden md:block absolute -top-1 -left-1 w-2 h-2 ${showWhiteNav ? 'bg-white/25' : 'bg-zinc-300'}`} />
        <div className={`hidden md:block absolute -top-1 -right-1 w-2 h-2 ${showWhiteNav ? 'bg-white/25' : 'bg-zinc-300'}`} />
        <div className={`hidden md:block absolute -bottom-1 -left-1 w-2 h-2 ${showWhiteNav ? 'bg-white/25' : 'bg-zinc-300'}`} />
        <div className={`hidden md:block absolute -bottom-1 -right-1 w-2 h-2 ${showWhiteNav ? 'bg-white/25' : 'bg-zinc-300'}`} />
         {navItems.map((item, index) => (
          <div key={item.name} className={`flex items-center ${isMounted ? "gap-0.5 md:gap-3" : "gap-0.5"}`}>
            <button
              onClick={(e) => handleNavigation(item, e)}
              className={`cursor-pointer font-light transition-all duration-300 relative hover:text-black hover:scale-105 py-2 px-2.5 md:py-1 md:px-2 ${
                isMounted ? "text-xs md:text-sm" : "text-sm"
              } ${
                (item.name === "Home" && pathname === '/') ||
                (item.name !== "Home" && pathname === item.href) ||
                (item.name === "Work" && pathname.startsWith('/works/')) ||
                (item.name === "Craft" && pathname.startsWith('/lab'))
                  ? "text-black"
                  : (item.name === "Unplug" && pathname.startsWith('/unplugged/'))
                    ? "text-zinc-700"
                    : (pathname.startsWith('/unplugged/') || showWhiteNav)
                      ? "text-white"
                      : "text-zinc-700"
              }`}
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: '400' }}
            >
              {item.name}
            </button>
            {index < navItems.length - 1 && (
              <span className={`${showWhiteNav ? 'text-white/25' : 'text-zinc-300'} ${isMounted ? "text-[7px] md:text-[10px]" : "text-[10px]"}`}>•</span>
            )}
          </div>
        ))}
      </nav>
    </div>
    {showResume && (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 99999, background: 'rgba(9,9,11,0.92)', backdropFilter: 'blur(12px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) setShowResume(false) }}
      >
        <div className="relative w-full max-w-4xl flex flex-col" style={{ height: '92vh', margin: '0 16px' }}>
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-xs tracking-widest uppercase font-semibold" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                Resume - Shubham Sah
              </span>
              
              {/* Segmented Control */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5" style={{ zIndex: 1000 }}>
                <button
                  onClick={() => setResumeMode('interactive')}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-light transition-all cursor-pointer ${
                    resumeMode === 'interactive'
                      ? 'bg-white text-zinc-950 font-normal'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  Interactive Doc
                </button>
                <button
                  onClick={() => setResumeMode('pdf')}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-light transition-all cursor-pointer ${
                    resumeMode === 'pdf'
                      ? 'bg-white text-zinc-950 font-normal'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  Original PDF
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <a
                href={RESUME_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-xs tracking-wide hover:text-white transition-colors flex items-center gap-1"
                style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
              >
                Open in Drive
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
              <button
                onClick={() => setShowResume(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-white transition-all hover:scale-110 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full bg-zinc-900 overflow-hidden border border-white/10 rounded-sm">
            {resumeMode === 'interactive' ? (
              <div className="w-full h-full overflow-y-auto bg-zinc-950 p-4 sm:p-6 md:p-8 scrollbar-thin" data-lenis-prevent>
                <div className="relative mx-auto bg-white text-zinc-900 px-5 py-8 sm:px-8 sm:py-12 md:px-12 md:py-14 max-w-3xl shadow-2xl min-h-full transition-all duration-300">
                  {/* Plus Corner Markers */}
                  <Plus h="left" v="top" />
                  <Plus h="right" v="top" />
                  <Plus h="left" v="bottom" />
                  <Plus h="right" v="bottom" />

                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-light text-zinc-950 tracking-tight mb-1" style={{ fontFamily: 'SatishSans, sans-serif' }}>
                      <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.25em' }}>S</span>hubham <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.25em' }}>S</span>ah
                    </h2>
                    <p className="text-[10px] sm:text-xs font-light text-zinc-400 uppercase tracking-widest mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif', letterSpacing: '0.15em' }}>
                      Senior Product Designer | AI Products, Design Systems, Prototype to Code
                    </p>
                    
                    <div className="text-[10px] sm:text-[11px] text-zinc-500 flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 mb-2" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      <span>Bangalore, India</span>
                      <span className="text-zinc-350">•</span>
                      <a href="mailto:sahshubham953@gmail.com" className="hover:text-black transition-colors font-medium">sahshubham953@gmail.com</a>
                      <span className="text-zinc-350">•</span>
                      <a href="tel:+918101803745" className="hover:text-black transition-colors">+91 81018 03745</a>
                    </div>
                    
                    <div className="text-[10px] sm:text-[11px] font-semibold text-zinc-650 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-0.5" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      <a href="https://www.shubhamsah.com" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline transition-all">Portfolio</a>
                      <span className="text-zinc-300">|</span>
                      <a href="https://www.linkedin.com/in/shubham-sah/" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline transition-all">LinkedIn</a>
                      <span className="text-zinc-300">|</span>
                      <a href="https://www.behance.net/sahshubham" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline transition-all">Behance</a>
                      <span className="text-zinc-300">|</span>
                      <a href="https://bento.me/shubhamsah" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline transition-all">Bento</a>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-5 text-left">
                    <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-100 pb-1" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      Summary
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-700 leading-relaxed font-light" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      Product designer with <strong className="font-semibold text-zinc-900">5+ years</strong> of experience in AI, SaaS, and healthcare products for companies in India and the US. I have taken <strong className="font-semibold text-zinc-900">three products from 0 to 1</strong> as the first or only designer, and my work has measurably improved onboarding, engagement, and retention at every company I have joined. I design end to end: research, flows, prototypes, usability testing, and the design systems that ship them, and I build what I design using AI coding tools. Currently pursuing an <strong className="font-semibold text-zinc-900">MBA in AI and Product Management at IIT Patna</strong>. I also run a design community of <strong className="font-semibold text-zinc-900">2,000+ members</strong> with a <strong className="font-semibold text-zinc-900">25K+ audience</strong>.
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-5 text-left">
                    <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-100 pb-1" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      Skills
                    </h3>
                    <div className="flex flex-col gap-1.5 text-[11px] sm:text-xs" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      <div>
                        <strong className="font-semibold text-zinc-900">Design:</strong> <span className="text-zinc-600 font-light">Product Design, Design Strategy, 0 to 1 Product Design, Interaction Design, Information Architecture, Wireframing, Prototyping, Usability Testing, Accessibility (WCAG 2.1), Mobile and Web Apps</span>
                      </div>
                      <div>
                        <strong className="font-semibold text-zinc-900">Design Systems:</strong> <span className="text-zinc-600 font-light">Component Libraries, Design Tokens, Figma Variables, Cross Platform (iOS, Android, Web), Developer Handoff, Documentation</span>
                      </div>
                      <div>
                        <strong className="font-semibold text-zinc-900">Research and Data:</strong> <span className="text-zinc-600 font-light">User Research, Journey Mapping, A/B Testing, Funnel Analysis, Usability Studies, Competitive Analysis</span>
                      </div>
                      <div>
                        <strong className="font-semibold text-zinc-900">AI:</strong> <span className="text-zinc-600 font-light">Designing LLM Features, GenAI Workflows, Prompt Design, AI Assisted Prototyping and Front End Builds (Cursor, Claude Code, v0)</span>
                      </div>
                      <div>
                        <strong className="font-semibold text-zinc-900">Tools:</strong> <span className="text-zinc-600 font-light">Figma, Framer, Webflow, Adobe XD, Miro, Jira, Notion, Confluence, Mixpanel, Amplitude, Zeplin, HTML/CSS</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mb-5 text-left">
                    <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-1" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      Experience
                    </h3>
                    <div className="flex flex-col gap-5" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      {/* Zumlo */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-0.5">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-950">Product Experience Lead (Consulting Contract) <span className="text-zinc-350 font-light">|</span> Zumlo</span>
                          <span className="text-[10px] text-zinc-500 font-light sm:text-right shrink-0">Remote, United States | Dec 2025 – Present</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-zinc-400 italic mb-1.5 font-light">Early stage healthcare SaaS startup. Engaged as the first designer, working directly with the co-founders.</p>
                        <ul className="list-disc list-outside pl-4 text-[11px] sm:text-xs text-zinc-700 font-light flex flex-col gap-1">
                          <li>Designed the onboarding and core product flows from scratch and shipped complete user journeys within the first <strong className="font-medium text-zinc-900">60 days</strong></li>
                          <li>Cut clinician task friction by <strong className="font-medium text-zinc-900">40%</strong>, confirmed through usability sessions with real users</li>
                          <li>Set up the design system (tokens, variants, documentation) before the first engineering sprint, which made later iterations about <strong className="font-medium text-zinc-900">2x faster</strong></li>
                        </ul>
                      </div>

                      {/* Unscript */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-0.5">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-950">Lead Product Designer <span className="text-zinc-350 font-light">|</span> Unscript</span>
                          <span className="text-[10px] text-zinc-500 font-light sm:text-right shrink-0">Bangalore, India | Oct 2024 – Nov 2025</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-zinc-400 italic mb-1.5 font-light">GenAI video platform with 100K+ registered users. Covered by Business Insider, The Washington Post, and CNBC TV18.</p>
                        <ul className="list-disc list-outside pl-4 text-[11px] sm:text-xs text-zinc-700 font-light flex flex-col gap-1">
                          <li>Redesigned the AI video editor with drag and drop scenes, contextual toolbars, and live preview. Average session duration went up <strong className="font-medium text-zinc-900">40%</strong></li>
                          <li>Simplified the AI Avatar Builder from 11 steps to 4 after testing with 30+ users. Within 6 weeks, <strong className="font-medium text-zinc-900">60% of active users</strong> had adopted it</li>
                          <li>Built a shared design system of <strong className="font-medium text-zinc-900">200+ components</strong> for web and mobile, which cut design to development back and forth by roughly <strong className="font-medium text-zinc-900">70%</strong></li>
                          <li>Shipped product pages, onboarding flows, and launch assets on my own using Webflow and Framer</li>
                          <li>Worked day to day with a 15+ person team of PMs and engineers, and mentored two junior designers</li>
                        </ul>
                      </div>

                      {/* Digital Harbor */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-0.5">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-950">Product Designer <span className="text-zinc-350 font-light">|</span> Digital Harbor, Inc.</span>
                          <span className="text-[10px] text-zinc-500 font-light sm:text-right shrink-0">Bangalore, India | Apr 2024 – Sep 2024</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-zinc-400 italic mb-1.5 font-light">Enterprise collaboration tools (chat, task manager, screenshot tool) used by 1,000+ employees.</p>
                        <ul className="list-disc list-outside pl-4 text-[11px] sm:text-xs text-zinc-700 font-light flex flex-col gap-1">
                          <li>Reduced onboarding time from <strong className="font-medium text-zinc-900">12 to 9 minutes</strong> by removing 6 redundant setup steps, tested across 3 cohorts</li>
                          <li>Built a modular design system of <strong className="font-medium text-zinc-900">150+ components</strong> that sped up front end development by about <strong className="font-semibold text-zinc-900">30%</strong></li>
                          <li>Ran 20+ stakeholder interviews and 4 rounds of moderated usability testing to validate designs before handoff</li>
                        </ul>
                      </div>

                      {/* Symita */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-0.5">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-950">Founding Product Designer <span className="text-zinc-350 font-light">|</span> Symita Inc.</span>
                          <span className="text-[10px] text-zinc-500 font-light sm:text-right shrink-0">Remote, United States | Apr 2022 – Apr 2024</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-zinc-400 italic mb-1.5 font-light">Sole designer on an AI maternal health platform (web and iOS) serving thousands of expecting mothers and healthcare providers.</p>
                        <ul className="list-disc list-outside pl-4 text-[11px] sm:text-xs text-zinc-700 font-light flex flex-col gap-1">
                          <li>Redesigned the core experience around trimester based personalization. Routine completion rose <strong className="font-medium text-zinc-900">35%</strong>, daily engagement <strong className="font-medium text-zinc-900">25%</strong>, and churn dropped <strong className="font-medium text-zinc-900">20%</strong></li>
                          <li>Restructured the information architecture, cutting task completion time by <strong className="font-medium text-zinc-900">30%</strong></li>
                          <li>Built the design system and delivered prototypes used in 2 successful investor pitch rounds</li>
                        </ul>
                      </div>

                      {/* Freelance Product Designer */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-0.5">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-950">Freelance Product Designer <span className="text-zinc-350 font-light">|</span> Clients: IOTA Informatics, DigiQure</span>
                          <span className="text-[10px] text-zinc-500 font-light sm:text-right shrink-0">Feb 2020 – Feb 2022</span>
                        </div>
                        <ul className="list-disc list-outside pl-4 text-[11px] sm:text-xs text-zinc-700 font-light flex flex-col gap-1">
                          <li>Redesigned dashboards and booking flows for IOTA Informatics, cutting task time by <strong className="font-medium text-zinc-900">30%</strong> and lifting NPS by <strong className="font-medium text-zinc-900">15 points</strong>; designed for DigiQure, an e-clinic startup featured on Shark Tank India Season 2</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Leadership and Community */}
                  <div className="mb-5 text-left">
                    <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2.5 border-b border-zinc-100 pb-1" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      Leadership and Community
                    </h3>
                    <div className="flex flex-col gap-3" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-0.5">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-950">Founder, Product Design Community</span>
                          <span className="text-[10px] text-zinc-500 font-light sm:text-right shrink-0">2022 – Present</span>
                        </div>
                        <ul className="list-disc list-outside pl-4 text-[11px] sm:text-xs text-zinc-700 font-light flex flex-col gap-1">
                          <li>Grew a <strong className="font-semibold text-zinc-900">2,000+ member</strong> community and <strong className="font-semibold text-zinc-900">25K+ LinkedIn audience</strong> through weekly posts, 10+ workshops, and meetups. Regularly invited for talks, podcasts, and consulting</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education and Certifications */}
                  <div className="text-left">
                    <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2.5 border-b border-zinc-100 pb-1" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      Education and Certifications
                    </h3>
                    <div className="flex flex-col gap-2 text-[11px] sm:text-xs text-zinc-700 font-light" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <div>
                          <strong className="font-semibold text-zinc-900">MBA, AI and Product Management</strong> <span className="text-zinc-500 font-light"> - </span> Indian Institute of Technology (IIT) Patna
                        </div>
                        <span className="text-[10px] text-zinc-500 shrink-0">2024 – 2026</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <div>
                          <strong className="font-semibold text-zinc-900">BBA, Business Administration</strong> <span className="text-zinc-500 font-light"> - </span> LNCT University, Bhopal
                        </div>
                        <span className="text-[10px] text-zinc-500 shrink-0">2022</span>
                      </div>
                      <div>
                        <strong className="font-semibold text-zinc-900">UX Design Certification</strong> <span className="text-zinc-500 font-light"> - </span> Interaction Design Foundation (IxDF), Completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={RESUME_URL}
                className="w-full h-full border-none"
                style={{ background: '#111' }}
                title="Shubham Sah Resume"
              />
            )}
          </div>
        </div>
      </div>
    )}
    </>
  )
}
