import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'One Direction Fan Game',
  description: 'Test your knowledge of One Direction with this fun trivia game!',
  keywords: ['One Direction', '1D', 'Trivia', 'Fan Game', 'Music Quiz'],
  authors: [{ name: 'Directioner' }],
  creator: 'Directioner',
  publisher: 'Directioner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://onedirectionfangame.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'One Direction Fan Game',
    description: 'Test your knowledge of One Direction with this fun trivia game!',
    url: 'https://onedirectionfangame.vercel.app',
    siteName: 'One Direction Fan Game',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'One Direction Fan Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Direction Fan Game',
    description: 'Test your knowledge of One Direction with this fun trivia game!',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'entertainment',
  generator: 'v0.dev',
} 