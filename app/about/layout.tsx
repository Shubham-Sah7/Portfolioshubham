import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Shubham Sah - Senior Product Designer",
  description: "Learn more about Shubham Sah's product design background, philosophy, 5+ years experience building GenAI, SaaS and Fintech platforms, and IIT Patna credentials.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
