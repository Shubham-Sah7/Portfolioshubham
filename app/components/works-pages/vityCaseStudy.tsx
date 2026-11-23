"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxItem {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export default function VityCaseStudy() {
  const [activeLightbox, setActiveLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const galleryItems: LightboxItem[] = [
    {
      src: "/images/projects/vity/vity-00-hero@2x.png",
      alt: "Maximem Vity - Hero Product Experience",
      title: "One memory. Every AI.",
      caption: "A personal AI memory assistant that connects your context across ChatGPT, Claude, Gemini and other AI tools.",
    },
    {
      src: "/images/projects/vity/vity-01-intent@2x.png",
      alt: "Import your existing conversations",
      title: "Import your existing conversations.",
      caption: "Bring previous chats from supported AI platforms into one shared memory space.",
    },
    {
      src: "/images/projects/vity/vity-02-consent@2x.png",
      alt: "Choose what context to share",
      title: "Choose what context to share.",
      caption: "Vity surfaces relevant memories beside the chat input. Select the information you want to include before continuing.",
    },
    {
      src: "/images/projects/vity/vity-03-extension@2x.png",
      alt: "Explore connected memories",
      title: "Explore connected memories.",
      caption: "Browse, search, filter, add and delete memories from a central dashboard.",
    },
    {
      src: "/images/projects/vity/vity-04-profile@2x.png",
      alt: "See how knowledge connects",
      title: "See how knowledge connects.",
      caption: "Explore memory graphs and knowledge graphs to understand relationships between conversations, topics and personal knowledge.",
    },
    {
      src: "/images/projects/vity/vity-05-dashboard@2x.png",
      alt: "One dashboard for all memories",
      title: "One dashboard for all memories.",
      caption: "Manage personal context, explore memory activity and organize information from one central workspace.",
    },
    {
      src: "/images/projects/vity/vity-06-apps@2x.png",
      alt: "Dedicated apps for everyday tasks",
      title: "Dedicated apps for everyday tasks.",
      caption: "From Sound Like Me and Echo to WaitPro and Summarize For Me, Vity's applications use shared memory to make everyday tasks more personal.",
    },
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightbox(null);
      if (e.key === "ArrowRight" && activeLightbox !== null) {
        setActiveLightbox((prev) => (prev! + 1) % galleryItems.length);
      }
      if (e.key === "ArrowLeft" && activeLightbox !== null) {
        setActiveLightbox((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox, galleryItems.length]);

  return (
    <article className="min-h-screen bg-[#FAF9F5] text-zinc-900 selection:bg-orange-500/20 selection:text-orange-950">
      
      {/* ── Top Header Navigation ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md px-4 sm:px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
            style={{ fontFamily: "FunnelDisplay, sans-serif" }}
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-zinc-400 group-hover:text-zinc-950" />
            <span>Back to Selected Works</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://app.maximem.ai/main-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-700 hover:text-zinc-950 transition-colors font-medium"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              <span>Live Product</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
            <a
              href="https://vityyy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-950 hover:bg-orange-600 text-white text-xs transition-colors rounded-sm font-medium shadow-xs"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              <span>See Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Case Study Content Stream ──────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-32">
        
        {/* ── 01. HERO SECTION ───────────────────────────────────────── */}
        <section className="mb-20 sm:mb-28">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-[11px] uppercase tracking-widest text-orange-600 font-semibold"
                style={{ fontFamily: "FunnelDisplay, sans-serif" }}
              >
                MAXIMEM VITY · PRODUCT DESIGN CASE STUDY · 2026
              </span>
            </div>

            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-light text-zinc-950 tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: "SatishSans, sans-serif" }}
            >
              One memory. Every AI.
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-3xl font-light mb-10"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              A personal AI memory assistant that connects your context across ChatGPT, Claude, Gemini and other AI tools. Vity remembers your projects, preferences and conversations, so you don&apos;t have to start from zero.
            </p>

            {/* Two Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              {/* Card 1 — THE CONTEXT PROBLEM */}
              <div className="md:col-span-7 bg-white/70 rounded-2xl p-6 sm:p-8 shadow-xs">
                <span
                  className="text-[11px] uppercase tracking-widest text-orange-600 font-semibold block mb-3"
                  style={{ fontFamily: "FunnelDisplay, sans-serif" }}
                >
                  THE CONTEXT PROBLEM
                </span>
                <h3
                  className="text-xl sm:text-2xl text-zinc-950 font-light tracking-tight mb-3"
                  style={{ fontFamily: "SatishSans, sans-serif" }}
                >
                  What if every AI already knew your context?
                </h3>
                <p
                  className="text-sm text-zinc-600 font-light leading-relaxed"
                  style={{ fontFamily: "FunnelDisplay, sans-serif" }}
                >
                  Switching between AI tools shouldn&apos;t mean repeating your role, projects, preferences and ideas every time you start a conversation.
                </p>
              </div>

              {/* Card 2 — THE VITY APPROACH */}
              <div className="md:col-span-5 bg-white/70 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                <span
                  className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold block mb-4"
                  style={{ fontFamily: "FunnelDisplay, sans-serif" }}
                >
                  THE VITY APPROACH
                </span>
                <div>
                  <h3
                    className="text-lg sm:text-xl text-zinc-950 font-light tracking-tight mb-4"
                    style={{ fontFamily: "SatishSans, sans-serif" }}
                  >
                    One memory across all your AI tools.
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm font-medium text-zinc-800" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                    <li className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold shrink-0">01</span>
                      <span>Connect your everyday AI apps.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold shrink-0">02</span>
                      <span>Import existing chats and capture new conversations.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold shrink-0">03</span>
                      <span>Choose relevant memories to share.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Hero UI Screenshot */}
          <div
            onClick={() => setActiveLightbox(0)}
            className="group relative cursor-zoom-in rounded-2xl overflow-hidden bg-zinc-950 shadow-xl transition-transform duration-300 hover:scale-[1.005]"
          >
            <Image
              src="/images/projects/vity/vity-00-hero@2x.png"
              alt="Maximem Vity - Hero Product Experience"
              width={2048}
              height={1284}
              unoptimized
              priority
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to enlarge
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 text-center" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
            The product promise: “No more explaining yourself from scratch.”
          </p>
        </section>


        {/* ── 02. CONTEXT & CONTROL ──────────────────────────────────── */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-2xl mb-8">
            <span
              className="text-[11px] uppercase tracking-widest text-orange-600 font-semibold block mb-2"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              01 — CONTEXT & CONTROL
            </span>
            <h2
              className="text-2xl sm:text-4xl font-light text-zinc-950 tracking-tight leading-tight mb-3"
              style={{ fontFamily: "SatishSans, sans-serif" }}
            >
              Ask for context. Stay in control.
            </h2>
            <p
              className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              Vity brings relevant memories into your AI conversations, while keeping you in charge of what gets shared.
            </p>
          </div>

          {/* Two Screenshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              onClick={() => setActiveLightbox(1)}
              className="group cursor-zoom-in rounded-xl overflow-hidden bg-zinc-950 shadow-md transition-all hover:scale-[1.008]"
            >
              <Image
                src="/images/projects/vity/vity-01-intent@2x.png"
                alt="Import your existing conversations"
                width={2048}
                height={1284}
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>

            <div
              onClick={() => setActiveLightbox(2)}
              className="group cursor-zoom-in rounded-xl overflow-hidden bg-zinc-950 shadow-md transition-all hover:scale-[1.008]"
            >
              <Image
                src="/images/projects/vity/vity-02-consent@2x.png"
                alt="Choose what context to share"
                width={2048}
                height={1294}
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Explanatory Annotations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 mb-1.5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Import your existing conversations.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Bring previous chats from supported AI platforms into one shared memory space.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 mb-1.5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Choose what context to share.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Vity surfaces relevant memories beside the chat input. Select the information you want to include before continuing.
              </p>
            </div>
          </div>

          {/* Bottom Insight Card */}
          <div className="bg-white/80 rounded-xl p-5 sm:p-6 shadow-xs">
            <span className="text-[10px] uppercase tracking-widest text-orange-600 font-semibold block mb-1" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
              DESIGN DECISION
            </span>
            <p className="text-xs sm:text-sm text-zinc-700 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
              Memory should feel helpful, not intrusive. Giving users control over what gets shared makes the experience more transparent and predictable.
            </p>
          </div>
        </section>


        {/* ── 03. MEMORY VISIBILITY ──────────────────────────────────── */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-2xl mb-8">
            <span
              className="text-[11px] uppercase tracking-widest text-orange-600 font-semibold block mb-2"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              02 — MAKING MEMORY VISIBLE
            </span>
            <h2
              className="text-2xl sm:text-4xl font-light text-zinc-950 tracking-tight leading-tight mb-3"
              style={{ fontFamily: "SatishSans, sans-serif" }}
            >
              Make the invisible memory visible.
            </h2>
            <p
              className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              A useful memory system needs more than storage. Vity gives users a clear way to explore, understand and manage what their AI remembers.
            </p>
          </div>

          {/* Two Screenshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              onClick={() => setActiveLightbox(3)}
              className="group cursor-zoom-in rounded-xl overflow-hidden bg-zinc-950 shadow-md transition-all hover:scale-[1.008]"
            >
              <Image
                src="/images/projects/vity/vity-03-extension@2x.png"
                alt="Explore connected memories"
                width={2048}
                height={1288}
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>

            <div
              onClick={() => setActiveLightbox(4)}
              className="group cursor-zoom-in rounded-xl overflow-hidden bg-zinc-950 shadow-md transition-all hover:scale-[1.008]"
            >
              <Image
                src="/images/projects/vity/vity-04-profile@2x.png"
                alt="See how knowledge connects"
                width={2048}
                height={1292}
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Explanatory Annotations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 mb-1.5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Explore connected memories.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Browse, search, filter, add and delete memories from a central dashboard.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 mb-1.5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                See how knowledge connects.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Explore memory graphs and knowledge graphs to understand relationships between conversations, topics and personal knowledge.
              </p>
            </div>
          </div>

          {/* Bottom Insight Card */}
          <div className="bg-white/80 rounded-xl p-5 sm:p-6 shadow-xs">
            <span className="text-[10px] uppercase tracking-widest text-orange-600 font-semibold block mb-1" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
              DESIGN DECISION
            </span>
            <p className="text-xs sm:text-sm text-zinc-700 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
              Making memory visible builds trust. Users should always have a clear understanding of what is stored and how their information is organized.
            </p>
          </div>
        </section>


        {/* ── 04. THE VITY ECOSYSTEM ─────────────────────────────────── */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-2xl mb-8">
            <span
              className="text-[11px] uppercase tracking-widest text-orange-600 font-semibold block mb-2"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              03 — A CONNECTED MEMORY ECOSYSTEM
            </span>
            <h2
              className="text-2xl sm:text-4xl font-light text-zinc-950 tracking-tight leading-tight mb-3"
              style={{ fontFamily: "SatishSans, sans-serif" }}
            >
              One place to manage. Everyday use cases.
            </h2>
            <p
              className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              The Vity dashboard brings personal memories, integrations and AI-powered applications together, creating one connected experience across everyday workflows.
            </p>
          </div>

          {/* Two Screenshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              onClick={() => setActiveLightbox(5)}
              className="group cursor-zoom-in rounded-xl overflow-hidden bg-zinc-950 shadow-md transition-all hover:scale-[1.008]"
            >
              <Image
                src="/images/projects/vity/vity-05-dashboard@2x.png"
                alt="One dashboard for all memories"
                width={2048}
                height={1288}
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>

            <div
              onClick={() => setActiveLightbox(6)}
              className="group cursor-zoom-in rounded-xl overflow-hidden bg-zinc-950 shadow-md transition-all hover:scale-[1.008]"
            >
              <Image
                src="/images/projects/vity/vity-06-apps@2x.png"
                alt="Dedicated apps for everyday tasks"
                width={2048}
                height={1304}
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Explanatory Annotations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 mb-1.5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                One dashboard for all memories.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Manage personal context, explore memory activity and organize information from one central workspace.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 mb-1.5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Dedicated apps for everyday tasks.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                From Sound Like Me and Echo to WaitPro and Summarize For Me, Vity&apos;s applications use shared memory to make everyday tasks more personal.
              </p>
            </div>
          </div>

          {/* Bottom Insight Card */}
          <div className="bg-white/80 rounded-xl p-5 sm:p-6 shadow-xs">
            <span className="text-[10px] uppercase tracking-widest text-orange-600 font-semibold block mb-1" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
              PRODUCT ECOSYSTEM
            </span>
            <p className="text-xs sm:text-sm text-zinc-700 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
              The same memory layer powers multiple experiences, allowing users to carry their context across writing, reading, research and communication.
            </p>
          </div>
        </section>


        {/* ── 05. DESIGN PRINCIPLES ──────────────────────────────────── */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-2xl mb-8">
            <span
              className="text-[11px] uppercase tracking-widest text-orange-600 font-semibold block mb-2"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              04 — PRODUCT EXPERIENCE
            </span>
            <h2
              className="text-2xl sm:text-4xl font-light text-zinc-950 tracking-tight leading-tight mb-3"
              style={{ fontFamily: "SatishSans, sans-serif" }}
            >
              A clear promise. Three critical principles.
            </h2>
            <p
              className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              Designing a personal memory product meant balancing usefulness, transparency and user control.
            </p>
          </div>

          {/* 3-Column Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 01 */}
            <div className="bg-white/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <span className="text-[10px] uppercase tracking-widest text-orange-600 font-semibold block mb-3" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                01 — USER CONTROL
              </span>
              <h4 className="text-lg text-zinc-950 font-light tracking-tight mb-3" style={{ fontFamily: "SatishSans, sans-serif" }}>
                Useful context. Visible control.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Users can explore, edit and delete their memories, and decide which information enters their conversations.
              </p>
            </div>

            {/* Card 02 */}
            <div className="bg-white/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <span className="text-[10px] uppercase tracking-widest text-orange-600 font-semibold block mb-3" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                02 — RELEVANCE
              </span>
              <h4 className="text-lg text-zinc-950 font-light tracking-tight mb-3" style={{ fontFamily: "SatishSans, sans-serif" }}>
                Make the next step unmistakable.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Surface relevant memories at the right moment without overwhelming users with unnecessary information.
              </p>
            </div>

            {/* Card 03 */}
            <div className="bg-white/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <span className="text-[10px] uppercase tracking-widest text-orange-600 font-semibold block mb-3" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                03 — CONTINUITY
              </span>
              <h4 className="text-lg text-zinc-950 font-light tracking-tight mb-3" style={{ fontFamily: "SatishSans, sans-serif" }}>
                One memory across every workflow.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                Keep personal context connected across supported AI platforms, applications and compatible agents.
              </p>
            </div>
          </div>

          {/* ── 06. CLOSING STATEMENT ──────────────────────────────────── */}
          <div className="bg-zinc-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg text-center max-w-3xl mx-auto">
            <blockquote
              className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-100 tracking-tight leading-snug mb-4"
              style={{ fontFamily: "SatishSans, sans-serif" }}
            >
              &ldquo;One memory layer. Every AI tool. Your context, always within reach.&rdquo;
            </blockquote>
            <p
              className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              Your projects, preferences and knowledge shouldn&apos;t be scattered across conversations. Vity brings them together, making every AI interaction feel more personal and connected.
            </p>
          </div>
        </section>


        {/* ── 07. FINAL CTA ──────────────────────────────────────────── */}
        <section className="text-center pt-8">
          <p
            className="text-[11px] uppercase tracking-widest text-zinc-400 mb-3"
            style={{ fontFamily: "FunnelDisplay, sans-serif" }}
          >
            EXPLORE THE PRODUCT
          </p>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-light text-zinc-950 tracking-tight mb-8"
            style={{ fontFamily: "SatishSans, sans-serif" }}
          >
            Ready to give your AI a memory?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://vityyy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 hover:bg-orange-600 text-white text-xs uppercase tracking-wider font-semibold transition-all rounded-sm shadow-sm"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              <span>OPEN VITY PROTOTYPE</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://app.maximem.ai/main-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-zinc-100 text-zinc-950 text-xs uppercase tracking-wider font-semibold transition-all rounded-sm shadow-xs border border-zinc-200"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              <span>VIEW LIVE PRODUCT</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </a>
          </div>
        </section>

      </main>

      {/* ── Fullscreen Lightbox Modal for Screenshots ───────────────── */}
      {mounted && activeLightbox !== null && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setActiveLightbox(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white w-full max-w-6xl mx-auto py-2">
            <div>
              <p className="text-xs font-medium text-orange-400" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                {galleryItems[activeLightbox].title}
              </p>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                {galleryItems[activeLightbox].caption}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400 font-mono">
                {activeLightbox + 1} / {galleryItems.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightbox(null);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div
            className="flex-1 flex items-center justify-center p-2 sm:p-4 max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryItems[activeLightbox].src}
              alt={galleryItems[activeLightbox].alt}
              width={2048}
              height={1300}
              unoptimized
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />

            {/* Nav Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightbox((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
              }}
              className="absolute left-2 sm:left-6 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-all backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightbox((prev) => (prev! + 1) % galleryItems.length);
              }}
              className="absolute right-2 sm:right-6 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-all backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Caption */}
          <div className="text-center py-2 text-xs text-zinc-500 font-light" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
            Press Esc or click outside to exit · Arrow keys to navigate
          </div>
        </div>,
        document.body
      )}

    </article>
  );
}
