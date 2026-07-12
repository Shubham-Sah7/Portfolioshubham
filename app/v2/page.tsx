"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Loader from "../components/layout/Loader"
import WorkGallery from "../components/home/workGallery"
import MouseColorBloom from "../components/home/MouseColorBloom"
import ParallaxImagesV2 from "../components/home/ParallaxImagesV2"
import EmailSection from "../components/home/EmailSection"
import VisualIdentityGallery from "../components/home/visualIdentityGallery"
import ProposalsGallery from "../components/home/proposalsGallery"
import PageBranches from "../components/home/PageBranches"
import LifeCarousel from "../components/home/LifeCarousel"
import FooterPlayground from "../components/home/FooterPlayground"

gsap.registerPlugin(ScrollTrigger)

export default function HomeV2() {
  const leftPillarRef = useRef<HTMLDivElement>(null)
  const rightPillarRef = useRef<HTMLDivElement>(null)
  const magneticRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // 1. Multi-plane pillar scroll parallax (slower drift than deities)
    gsap.to(leftPillarRef.current, {
      y: () => window.innerHeight * 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })
    gsap.to(rightPillarRef.current, {
      y: () => window.innerHeight * 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    // 2. Kinetic Typography Staggered Intro
    gsap.to(".name-char", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.8
    })

    // 3. Scroll-Drawing Golden Thread SVG
    const path = pathRef.current
    if (path) {
      const length = path.getTotalLength()
      // Set up dash array to hide line initially
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      // Animate line drawing based on scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom center",
          scrub: 1
        }
      })
    }

    // 4. Magnetic Copy CTA Hover Effect
    const magneticEl = magneticRef.current
    if (magneticEl) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = magneticEl.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        const dist = Math.sqrt(x * x + y * y)

        // Capture radius of 100px
        if (dist < 100) {
          gsap.to(magneticEl, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: "power2.out"
          })
        } else {
          gsap.to(magneticEl, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          })
        }
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const nameLetters = "Shubham Sah".split("").map((char, idx) => (
    <span
      key={idx}
      className="inline-block name-char opacity-0"
      style={{
        transform: "translateY(24px)",
        fontFamily: char === "S" ? "SatishCapsSans, sans-serif" : "SatishSans, sans-serif",
        fontSize: char === "S" ? "1.4em" : "inherit",
        marginRight: char === " " ? "12px" : "1px"
      }}
    >
      {char}
    </span>
  ))

  return (
    <div className="bg-white relative flex flex-col gap-20 md:gap-28 overflow-x-clip w-full">
      <Loader />
      <PageBranches />

      {/* ── Cinematic Vignette Background Overlay ──────────────── */}
      <div 
        className="absolute inset-0 h-screen pointer-events-none hidden md:block"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 15%, rgba(248,246,242,0.6) 55%, rgba(225,220,208,0.4) 100%)",
          zIndex: 0
        }}
      />

      {/* ── Pillar decorations - absolute with parallax drift ─────── */}
      <div ref={leftPillarRef} className="absolute top-0 h-[120vh] hidden md:block group/left-pillar" style={{ zIndex: 1, left: '-70px' }}>
        <Image
          src="/images/HomeImages/piller-v.svg"
          alt=""
          width={120}
          height={800}
          className="h-full w-auto object-contain object-top select-none transition-all duration-700 ease-out opacity-[0.18] scale-100 brightness-100 group-hover/left-pillar:opacity-[0.30] group-hover/left-pillar:scale-[1.04] group-hover/left-pillar:brightness-[1.2]"
        />
      </div>
      <div ref={rightPillarRef} className="absolute top-0 h-[120vh] hidden md:block group/right-pillar" style={{ zIndex: 1, right: '-40px' }}>
        <Image
          src="/images/HomeImages/piller-2-v.svg"
          alt=""
          width={120}
          height={800}
          className="h-full w-auto object-contain object-top select-none transition-all duration-700 ease-out opacity-[0.18] scale-100 brightness-100 group-hover/right-pillar:opacity-[0.30] group-hover/right-pillar:scale-[1.04] group-hover/right-pillar:brightness-[1.2]"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col gap-20 md:gap-28 z-10">

        {/* First fold - name + description, full viewport height */}
        <MouseColorBloom />
        <div 
          className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center gap-6 overflow-visible md:overflow-visible hero-container" 
          style={{ zIndex: 2 }}
        >
          {/* Scroll-Drawing Golden Thread SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
            style={{ zIndex: 0 }}
          >
            <path
              ref={pathRef}
              d="M 500,0 L 500,230 C 440,250 440,310 500,330 C 560,310 560,250 500,230 L 500,650"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
          </svg>

          {/* Upgraded Multi-Plane Parallax Deities */}
          <ParallaxImagesV2 />

          {/* Text layer styled with cinematic spacing */}
          <div className="relative flex flex-col items-center gap-6 md:bg-transparent md:px-6 md:py-4" style={{ zIndex: 20 }}>
            {/* Logo */}
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={62}
              height={62}
              className="mb-6 md:mb-16 transform transition-all duration-500 hover:scale-105"
              style={{ mixBlendMode: 'multiply', filter: 'invert(1)', transform: 'rotate(180deg)' }}
            />
            {/* Staggered Serif Name */}
            <h1 className="text-4xl md:text-5xl tracking-tight text-black select-none">
              {nameLetters}
            </h1>
            <p
              className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl flex flex-col items-center text-center gap-y-1 md:gap-y-0.5"
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: '300' }}
            >
              <span className="block">Building Products for Global Companies & Startups</span>
              <span className="flex flex-wrap justify-center gap-x-1.5 mt-0.5 md:mt-0">
                <span className="whitespace-nowrap">25K+ on LinkedIn <span className="text-gray-300 ml-1.5">•</span></span>
                <span className="whitespace-nowrap">Founded a 2K+ Design Community <span className="text-gray-300 ml-1.5">•</span></span>
                <span className="whitespace-nowrap">IIT Patna MBA</span>
              </span>
            </p>

            {/* Mobile Email Section */}
            <div className="block md:hidden mt-8">
              <EmailSection />
            </div>
          </div>

          {/* Desktop Magnetic Email Section */}
          <div 
            ref={magneticRef}
            className="hidden md:flex absolute bottom-20 left-0 right-0 justify-center items-center" 
            style={{ zIndex: 20 }}
          >
            <EmailSection />
          </div>
        </div>

        {/* Work section */}
        <div data-section="work">
          <WorkGallery />
        </div>

        {/* Visual Identity section */}
        <div data-section="visual-identity">
          <VisualIdentityGallery />
        </div>

        {/* Design Proposals section */}
        <div data-section="proposals">
          <ProposalsGallery />
        </div>
      </div>

      {/* Life Carousel */}
      <div data-section="life">
        <LifeCarousel />
      </div>

      {/* Footer Playground */}
      <FooterPlayground />
    </div>
  )
}
