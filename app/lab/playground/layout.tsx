import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Drawing Playground | Lab Experiment | Shubham Sah",
  description: "An interactive drawing canvas and digital design playground to sketch, prototype, and play with markers and colors.",
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
