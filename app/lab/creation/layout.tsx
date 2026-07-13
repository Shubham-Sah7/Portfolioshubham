import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creation of Adam | Lab Experiment | Shubham Sah",
  description: "An interactive, premium architectural blueprint rendering of Michelangelo's Creation of Adam, featuring pointer tracking, SVG dimension annotations, and synthesized audio.",
}

export default function CreationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
