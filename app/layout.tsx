import type { Metadata } from "next"
import { Inter, Caveat } from "next/font/google"
import "./globals.css"
import ClientLayout from './client-layout'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: '--font-handwriting',
})

export const metadata: Metadata = {
  title: "One Direction Fan Game",
  description: "A tribute to One Direction and their fans",
  keywords: ["One Direction", "Fan Game", "Music", "Tribute"],
  authors: [{ name: "One Direction Fan" }],
  openGraph: {
    title: "One Direction Fan Game",
    description: "A tribute to One Direction and their fans",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Direction Fan Game",
    description: "A tribute to One Direction and their fans",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-black text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
