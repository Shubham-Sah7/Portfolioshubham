import type { Metadata } from 'next';
import SkinSage from '../../components/works-pages/skinSage';
import MoreWorks from '../../components/works-pages/MoreWorks';
import ScrollToTop from '../../components/ui/ScrollToTop';

export const metadata: Metadata = {
  title: "SkinSage Case Study | Shubham Sah",
  description: "Designing an AI skin health analysis and personalized dermatology advice application interface.",
}

export default function SkinSagePage() {
  return (
    <div className="bg-white min-h-screen">
      <SkinSage />
      <MoreWorks current="/works/skinSage" />
      <ScrollToTop />
    </div>
  );
}
