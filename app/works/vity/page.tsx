import type { Metadata } from 'next';
import VityCaseStudy from '../../components/works-pages/vityCaseStudy';
import ScrollToTop from '../../components/ui/ScrollToTop';

export const metadata: Metadata = {
  title: "Maximem Vity Case Study | Shubham Sah - Senior Product Designer",
  description: "A shared memory layer that brings your context across the AI tools you use. UX architecture, consent models, and application ecosystem design.",
};

export default function VityPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <VityCaseStudy />
      <ScrollToTop />
    </div>
  );
}
