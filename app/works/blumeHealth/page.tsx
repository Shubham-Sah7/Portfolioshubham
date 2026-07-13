import type { Metadata } from 'next';
import BlumeHealth from '../../components/works-pages/blumeHealth';
import MoreWorks from '../../components/works-pages/MoreWorks';
import ScrollToTop from '../../components/ui/ScrollToTop';

export const metadata: Metadata = {
  title: "Blume Health Case Study | Shubham Sah",
  description: "Redesigning maternal healthcare systems and patient management workflows into a clean, modern digital platform.",
}

export default function BlumeHealthPage() {
  return (
    <div className="bg-white min-h-screen">
      <BlumeHealth />
      <MoreWorks current="/works/blumeHealth" />
      <ScrollToTop />
    </div>
  );
}
