"use client"

import { useEffect, useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial client render, render children directly
  if (!mounted) {
    return <>{children}</>
  }

  // After hydration, render with any browser extension attributes
  return <>{children}</>
} 