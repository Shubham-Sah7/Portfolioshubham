import Image from "next/image"
import Loader from "./components/layout/Loader"
import WorkGallery from "./components/home/workGallery"
import MouseColorBloom from "./components/home/MouseColorBloom"
import ParallaxImages from "./components/home/ParallaxImages"
import EmailSection from "./components/home/EmailSection"
// import UnpluggedGallery from "./components/home/unpluggedGallery"
import VisualIdentityGallery from "./components/home/visualIdentityGallery"
import ProposalsGallery from "./components/home/proposalsGallery"
import PageBranches from "./components/home/PageBranches"
import LifeCarousel from "./components/home/LifeCarousel"
import FooterPlayground from "./components/home/FooterPlayground"
import Testimonials from "./components/home/testimonials"
import HeroLetsConnect from "./components/home/HeroLetsConnect"

const Plus = ({ h, v }: { h: 'left' | 'right'; v: 'top' | 'bottom' }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className="absolute select-none pointer-events-none text-zinc-300"
    style={{
      [h]: '-6px',
      [v]: '-6px',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function Home() {
  return (
    <div className="bg-white relative flex flex-col gap-20 md:gap-28 w-full">
      {/* Grid Background overlay (centered, matching max-w-5xl content bounds to clear decorative pillars) */}
      <div className="absolute top-0 h-screen left-1/2 -translate-x-1/2 w-full max-w-5xl bg-grid-pattern pointer-events-none" style={{ zIndex: 0 }} />

      <Loader />
      <PageBranches />

      {/* ── Pillar decorations - fixed to viewport edges ─────── */}
      <div className="fixed top-0 h-screen hidden md:block group/left-pillar" style={{ zIndex: 5, left: '-70px' }}>
        <Image
          src="/images/HomeImages/piller-v.svg"
          alt=""
          width={120}
          height={800}
          className="h-screen w-auto object-contain object-top select-none transition-all duration-700 ease-out opacity-[0.18] scale-100 brightness-100 group-hover/left-pillar:opacity-[0.30] group-hover/left-pillar:scale-[1.04] group-hover/left-pillar:brightness-[1.2]"
        />
      </div>
      <div className="fixed top-0 h-screen hidden md:block group/right-pillar" style={{ zIndex: 5, right: '-40px' }}>
        <Image
          src="/images/HomeImages/piller-2-v.svg"
          alt=""
          width={120}
          height={800}
          className="h-screen w-auto object-contain object-top select-none transition-all duration-700 ease-out opacity-[0.18] scale-100 brightness-100 group-hover/right-pillar:opacity-[0.30] group-hover/right-pillar:scale-[1.04] group-hover/right-pillar:brightness-[1.2]"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col gap-20 md:gap-28">

        {/* First fold - name + description, full viewport height */}
        <MouseColorBloom />
        <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center gap-6 overflow-visible md:overflow-visible" style={{ zIndex: 2 }}>

          <ParallaxImages />

          {/* Text isolated above the bloom layer so color blend doesn't affect it */}
          <div className="relative flex flex-col items-center gap-3 md:gap-6 md:px-6 md:py-4" style={{ zIndex: 20 }}>
            <Image
              src="/images/logo.png"
              alt="SCR7"
              width={62}
              height={62}
              className="mb-0 md:mb-16"
              style={{ mixBlendMode: 'multiply', filter: 'invert(1)', transform: 'rotate(180deg)' }}
            />
            {/* DESIGNING PRODUCTS Badge Card (our style) */}
            <div 
              className="relative border border-zinc-200 bg-zinc-50/80 px-4 py-1 text-[9px] md:text-[10px] tracking-[0.18em] text-zinc-500 select-none mb-1 md:mb-3"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}
            >
              <Plus h="left" v="top" />
              <Plus h="right" v="top" />
              <Plus h="left" v="bottom" />
              <Plus h="right" v="bottom" />
              <span>DESIGNING PRODUCTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tight text-black">
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>S</span><span style={{ fontFamily: 'SatishSans, sans-serif', marginLeft: '4px' }}>hubham </span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>S</span><span style={{ fontFamily: 'SatishSans, sans-serif', marginLeft: '4px' }}>ah</span>
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

            {/* Centered "Let's Connect" CTA Section with Branches */}
            <div className="mt-4 md:mt-8">
              <HeroLetsConnect />
            </div>
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

      {/* Testimonials */}
      <div data-section="testimonials">
        <Testimonials />
      </div>

      {/* Footer Playground — full-bleed, outside max-w container */}
      <div data-section="playground">
        <FooterPlayground />
      </div>

    </div>
  )
}
