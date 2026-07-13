import type { Metadata } from 'next';
import AbhiyantrikWebsite from '../../components/works-pages/abhiyantrikWebsite';

export const metadata: Metadata = {
  title: "Abhiyantrik Website Case Study | Shubham Sah",
  description: "Designing the corporate website, branding guidelines, and digital identity for Abhiyantrik, a technology and engineering consulting firm.",
}

export default function AbhiyantrikWebsitePage() {
  return <AbhiyantrikWebsite />;
}