"use client";

import Image from "next/image";
import { useState } from "react";

const companies: {
  src: string;
  name: string;
  year: string;
  shadow: string;
  tags: { label: string; rotate: number; x: number }[];
}[] = [
  { src: "/images/inAbout/Abhi.svg",       name: "Unscript",      year: "2025",           shadow: "rgba(99, 102, 241, 0.22)",  tags: [{ label: "AI", rotate: -9, x: -26 }, { label: "SaaS", rotate: 6, x: 28 }] },
  { src: "/images/inAbout/blumeH.svg",     name: "Signzy",        year: "2023 - 2024",    shadow: "rgba(52, 211, 153, 0.28)",  tags: [{ label: "Fintech", rotate: -7, x: -26 }, { label: "Enterprise", rotate: 5, x: 30 }] },
  { src: "/images/inAbout/SR.svg",         name: "Symita",        year: "2024",           shadow: "rgba(109, 84, 224, 0.25)",  tags: [{ label: "SaaS", rotate: -8, x: -24 }, { label: "Enterprise", rotate: 6, x: 30 }] },
  { src: "/images/inAbout/SS.svg",         name: "MedEase",       year: "2024",           shadow: "rgba(34, 197, 94, 0.28)",   tags: [{ label: "AI", rotate: -6, x: -24 }, { label: "Health-Tech", rotate: 8, x: 30 }] },
  { src: "/images/inAbout/fuellstack.svg", name: "Design Systems", year: "2022 - Present", shadow: "rgba(220, 88, 20, 0.25)",   tags: [{ label: "Systems", rotate: -7, x: 0 }] },
  { src: "/images/inAbout/LV.svg",         name: "Branding",      year: "2020 - Present", shadow: "rgba(109, 84, 224, 0.25)",  tags: [{ label: "Brand", rotate: 7, x: 0 }] },
  { src: "/images/inAbout/Storuage.svg",   name: "IIT Patna",     year: "2024 - Present", shadow: "rgba(245, 158, 11, 0.28)",  tags: [{ label: "PM", rotate: -6, x: -28 }, { label: "Research", rotate: 5, x: 34 }] },
  { src: "/images/inAbout/Wagwan.svg",     name: "Community",     year: "2020 - Present", shadow: "rgba(239, 68, 68, 0.25)",   tags: [{ label: "2000+", rotate: -7, x: -22 }, { label: "Members", rotate: 6, x: 24 }] },
];

export default function About() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [imageHovered, setImageHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('sahshubham953@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-12" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <div className="mb-6 mt-2 flex justify-center md:hidden">
          <Image
            src="/images/logo.png"
            alt="Shubham Sah"
            width={48}
            height={48}
            style={{ opacity: 0.6 }}
          />
        </div>

        {/* ── Manifesto lines ──────────────────────────────────── */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
            Currently striving toward
          </p>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            {[
              "An artist's soul.",
              "An athlete's body.",
              "An entrepreneur's mind.",
            ].map((line, i) => (
              <p key={i}
                className="text-xl md:text-2xl text-gray-800 leading-snug whitespace-nowrap"
                style={{ fontFamily: 'SatishSans, serif', fontWeight: 400 }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* ── Section 1: intro + photo ─────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 mb-10">
          <div className="flex-1 order-2 md:order-1">
            <p
              className="text-2xl md:text-3xl leading-snug text-gray-800 mb-6"
              style={{ fontFamily: "SatishSans, serif", fontWeight: 400 }}
            >
              Started on my mom's phone - just curiosity, sketches, and exploring apps.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              That curiosity turned into product design, and today I build products used by real users, work with startups including fast-growing and venture-backed companies, and explore how AI can transform product experiences.
            </p>
          </div>

          <div
            className="flex-shrink-0 flex justify-center md:justify-end md:pt-4 order-1 md:order-2"
            style={{ position: "relative" }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            {/* Text chips */}
            {[
              { label: "Product Designer",      top: "12px",    left: "8px",   rotate: -3,  delay: 0,    duration: "0.5s"  },
              { label: "AI Builder",            top: "12px",    right: "8px",  rotate: 2,   delay: 0.05, duration: "0.45s" },
              { label: "Vibe Coder",            top: "44px",    right: "4px",  rotate: -2,  delay: 0.08, duration: "0.5s"  },
              { label: "Attacking Midfielder",  top: "46%",     left: "-4px",  rotate: -2,  delay: 0.1,  duration: "0.55s" },
              { label: "Community Builder",     top: "68%",     right: "0px",  rotate: 2,   delay: 0.06, duration: "0.5s"  },
              { label: "PM Student",            top: "78%",     right: "4px",  rotate: -1,  delay: 0.07, duration: "0.48s" },
              { label: "Creative",              bottom: "-8px", left: "12px",  rotate: -2,  delay: 0.09, duration: "0.46s" },
            ].map((chip, i) => (
              <div
                key={`chip-${i}`}
                style={{
                  position: "absolute",
                  top: chip.top, bottom: chip.bottom,
                  left: chip.left, right: chip.right,
                  transform: `rotate(${chip.rotate}deg) scale(${imageHovered ? 1 : 0.5})`,
                  opacity: imageHovered ? 1 : 0,
                  transition: `transform ${chip.duration} cubic-bezier(0.34, 1.56, 0.64, 1) ${chip.delay}s, opacity 0.2s ease ${chip.delay}s`,
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  padding: "3px 9px",
                  fontSize: "10px",
                  fontFamily: "FunnelDisplay, sans-serif",
                  fontWeight: 400,
                  color: "#111827",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                  zIndex: 10,
                  letterSpacing: "0.01em",
                }}
              >
                {chip.label}
              </div>
            ))}

            <div style={{ width: 260, height: 320, borderRadius: 14, overflow: 'hidden', position: 'relative', zIndex: 1, flexShrink: 0 }}>
              <Image
                src="/images/shubham-sah.jpg"
                alt="Shubham Sah"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: full-width description ───────────────── */}
        <div className="mb-12">
          <p className="text-base text-gray-500 leading-relaxed">
            I am a Product Designer with 6+ years of experience across SaaS, AI, Fintech, Enterprise, and Health-Tech products. I am also associated with IIT Patna, pursuing Product Management while continuing to design and build products. I build and manage a 2,000+ member design community and have 25,000+ followers across professional platforms.
          </p>
        </div>

        {/* ── Experience timeline ──────────────────────────────── */}
        <div className="mb-20">
          <p
            className="text-xl md:text-2xl text-gray-700 leading-snug mb-10"
            style={{ fontFamily: "SatishSans, serif", fontWeight: 400 }}
          >
            Working at the intersection of Design, Product, and AI. These are some of the projects and companies I've worked with.
          </p>
          <div className="grid grid-cols-4 justify-items-center gap-8 md:gap-12 pb-4">
            {companies.map((co, i) => {
              const isHovered = hovered === i;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 flex-shrink-0"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Logo + chips wrapper */}
                  <div style={{ position: "relative", display: "flex", justifyContent: "center", width: "60px", height: "60px" }}>

                    {/* Chips - behind logo, pop up on hover */}
                    {co.tags.map((tag, ti) => (
                      <div
                        key={ti}
                        style={{
                          position: "absolute",
                          bottom: isHovered ? "68px" : "20px",
                          left: "50%",
                          transform: `translateX(calc(-50% + ${tag.x}px)) rotate(${tag.rotate}deg)`,
                          opacity: isHovered ? 1 : 0,
                          transition: `bottom 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${ti * 0.06}s, opacity 0.2s ease ${ti * 0.06}s`,
                          zIndex: 0,
                          background: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "20px",
                          padding: "3px 8px",
                          fontSize: "10px",
                          fontFamily: "FunnelDisplay, sans-serif",
                          color: "#374151",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                        }}
                      >
                        {tag.label}
                      </div>
                    ))}

                    {/* Logo box */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "60px",
                        height: "60px",
                        background: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                        borderRadius: "30%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        boxShadow: isHovered ? `inset 0 -14px 20px 4px ${co.shadow}` : "none",
                        transition: "box-shadow 0.3s ease",
                      }}
                    >
                      <Image src={co.src} alt={co.name} width={60} height={60} className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-500" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{co.name}</span>
                  <span className="text-[10px] text-gray-300 text-center" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{co.year}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Toolkit ──────────────────────────────────────────── */}
        <div className="mb-20">
          <p
            className="text-xl md:text-2xl text-gray-700 leading-snug mb-2"
            style={{ fontFamily: "SatishSans, serif", fontWeight: 400 }}
          >
            My Toolkit
          </p>
          <p className="text-sm text-gray-400 mb-10" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
            Tools I use to design, build, and ship every day.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

            {/* Design & Animations */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>Design & Animations</p>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Figma",         src: "/images/ToolsIcons/figma-icon.svg" },
                  { name: "Photoshop",     src: "/images/ToolsIcons/adobe-photoshop-icon.svg" },
                  { name: "After Effects", src: "/images/ToolsIcons/adobe-after-effects-icon.svg" },
                  { name: "Blender",       src: "/images/ToolsIcons/blender-icon.svg" },
                  { name: "LottieFiles",   src: "/images/ToolsIcons/lottiefiles.svg" },
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                      <Image src={tool.src} alt={tool.name} width={36} height={36} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-sm text-gray-700" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{tool.name}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                  + dozens of online tools
                </p>
              </div>
            </div>

            {/* Development + AI combined on mobile */}
            <div className="flex flex-col gap-10 md:contents">

            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>Development</p>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Cursor", src: "/images/ToolsIcons/cursor-ai-code-icon.svg" },
                  { name: "GitHub", src: "/images/ToolsIcons/github-icon.svg" },
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                      <Image src={tool.src} alt={tool.name} width={36} height={36} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-sm text-gray-700" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI & Assistive */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>AI & Assistive Tools</p>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Claude Code",   src: "/images/ToolsIcons/claude-ai-icon.svg" },
                  { name: "ChatGPT",       src: "/images/ToolsIcons/chatgpt-icon.svg" },
                  { name: "Google Gemini", src: "/images/ToolsIcons/google-gemini-icon.svg" },
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                      <Image src={tool.src} alt={tool.name} width={36} height={36} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-sm text-gray-700" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            </div>{/* closes mobile wrapper */}

          </div>
        </div>

        {/* ── Closing CTA ──────────────────────────────────────── */}
        <div className="text-center">
          <p
            className="text-2xl md:text-3xl text-gray-700 leading-snug mb-8"
            style={{ fontFamily: "SatishSans, serif", fontWeight: 400 }}
          >
            If you're building something and need a designer who takes full ownership, let's talk.
          </p>
          <div className="inline-flex items-stretch gap-0">
            <a
              href="mailto:sahshubham953@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
              style={{ fontFamily: "FunnelDisplay, sans-serif", letterSpacing: "0.05em" }}
            >
              say hello
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div
              className="flex items-center px-5 border border-l-0 border-gray-200 text-sm text-gray-400 select-all cursor-pointer"
              style={{ fontFamily: "FunnelDisplay, sans-serif", letterSpacing: "0.03em" }}
            >
              sahshubham953@gmail.com
              <button
                onClick={handleCopy}
                className="ml-2 text-gray-300 hover:text-gray-600 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                title="Copy email"
              >
                {copied ? (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="5" y="5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M9 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
