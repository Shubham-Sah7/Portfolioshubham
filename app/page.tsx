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
import HeroCurtainIntro from "./components/home/HeroCurtainIntro"

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
      <Loader />
      <PageBranches />

      {/* ── Hero Fold with Creation of Adam Theatre Curtain Reveal ── */}
      <HeroCurtainIntro />

      <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col gap-20 md:gap-28">

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
