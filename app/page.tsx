import Image from "next/image"
import Loader from "./components/layout/Loader"
import WorkGallery from "./components/home/workGallery"
import EmailSection from "./components/home/EmailSection"
import EmailCopy from "./components/home/EmailCopy"
// import UnpluggedGallery from "./components/home/unpluggedGallery"
import VisualIdentityGallery from "./components/home/visualIdentityGallery"
import ProposalsGallery from "./components/home/proposalsGallery"
import PageBranches from "./components/home/PageBranches"
import LifeCarousel from "./components/home/LifeCarousel"
import FooterPlayground from "./components/home/FooterPlayground"
import Testimonials from "./components/home/testimonials"
import HeroLetsConnect from "./components/home/HeroLetsConnect"
import HomeScrollTrigger from "./components/home/HomeScrollTrigger"

interface HomeProps {
  searchParams: Promise<{ scroll?: string }>
}

const Plus = (_props?: any) => null

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams
  const scroll = resolvedParams?.scroll

  return (
    <div className="bg-white relative flex flex-col gap-20 md:gap-28 w-full">
      <HomeScrollTrigger target={scroll} />
      {/* ── Classical Pillars Hero Background ─────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[calc(100vh-120px)] md:h-screen pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
        <Image
          src="/images/HomeImages/hero-pillars-hands-bg.jpg"
          alt="Classical pillars background"
          fill
          priority
          quality={95}
          className="object-cover object-top select-none pointer-events-none"
        />
        {/* Soft bottom fade to blend with page sections */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      <Loader />
      <PageBranches />

      <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col gap-20 md:gap-28">

        {/* First fold - name + description, full viewport height */}
        <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center gap-6 overflow-visible md:overflow-visible" style={{ zIndex: 20 }}>

          {/* Text isolated above the bloom layer so color blend doesn't affect it */}
          <div className="relative flex flex-col items-center gap-3 md:gap-6 md:px-6 md:py-4 select-text" style={{ zIndex: 30 }}>
            <Image
              src="/images/logo.png"
              alt="SCR7"
              width={62}
              height={62}
              draggable={false}
              className="mb-0 md:mb-16 pointer-events-none select-none"
              style={{ mixBlendMode: 'multiply', filter: 'invert(1)', transform: 'rotate(180deg)' }}
            />
            {/* DESIGNING PRODUCTS Badge Card (our style) */}
            <div 
              className="relative border border-zinc-200 bg-zinc-50/80 px-4 py-1 text-[9px] md:text-[10px] tracking-[0.18em] text-zinc-500 mb-1 md:mb-3 select-text cursor-text"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500', userSelect: 'text', WebkitUserSelect: 'text' }}
            >
              <Plus h="left" v="top" />
              <Plus h="right" v="top" />
              <Plus h="left" v="bottom" />
              <Plus h="right" v="bottom" />
              <span className="select-text cursor-text" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>DESIGNING PRODUCTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tight text-black select-text cursor-text" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em', userSelect: 'text', WebkitUserSelect: 'text' }}>S</span><span style={{ fontFamily: 'SatishSans, sans-serif', marginLeft: '4px', userSelect: 'text', WebkitUserSelect: 'text' }}>hubham </span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em', userSelect: 'text', WebkitUserSelect: 'text' }}>S</span><span style={{ fontFamily: 'SatishSans, sans-serif', marginLeft: '4px', userSelect: 'text', WebkitUserSelect: 'text' }}>ah</span>
            </h1>
            <p
              className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl flex flex-col items-center text-center gap-y-1 md:gap-y-0.5 select-text cursor-text"
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: '300', userSelect: 'text', WebkitUserSelect: 'text' }}
            >
              <span className="block select-text cursor-text" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>Building Products for Global Companies & Startups</span>
              <span className="flex flex-wrap justify-center gap-x-1.5 mt-0.5 md:mt-0 select-text cursor-text" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
                <span className="whitespace-nowrap select-text cursor-text" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>25K+ on LinkedIn <span className="text-gray-300 ml-1.5">•</span></span>
                <span className="whitespace-nowrap select-text cursor-text" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>Founded a 2K+ Design Community <span className="text-gray-300 ml-1.5">•</span></span>
                <span className="whitespace-nowrap select-text cursor-text" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>IIT Patna MBA</span>
              </span>
            </p>

            {/* Centered "Let's Connect" CTA Section with Branches */}
            <div className="mt-4 md:mt-8">
              <EmailCopy />
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
