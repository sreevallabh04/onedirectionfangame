"use client"

import { Button } from "@/components/ui/button"
import { Music, Play, Heart, Camera, CandlestickChartIcon as Candle, PenTool } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

// Client-side only component for floating hearts
function FloatingHearts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[
        { left: "10%", top: "20%", delay: "0s", duration: "4s" },
        { left: "30%", top: "40%", delay: "2s", duration: "5s" },
        { left: "50%", top: "60%", delay: "4s", duration: "4.5s" },
        { left: "70%", top: "30%", delay: "6s", duration: "5.5s" },
        { left: "90%", top: "50%", delay: "8s", duration: "4.8s" }
      ].map((heart, i) => (
        <Heart
          key={i}
          className="absolute w-4 h-4 text-red-500/20 fill-current animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            animationDuration: heart.duration
          }}
        />
      ))}
    </div>
  )
}

interface WelcomeScreenProps {
  onStartGame: () => void
  onShowGallery: () => void
  onShowTribute: () => void
  onShowStories: () => void
}

export function WelcomeScreen({ onStartGame, onShowGallery, onShowTribute, onShowStories }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vintage-1d-1.jpeg"
          alt="One Direction Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Polaroid gallery - more dynamic layout */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Top row */}
        <div className="absolute top-10 left-1/4 transform -rotate-12 hover:rotate-0 transition-transform duration-700 opacity-60 hover:opacity-90">
          <div className="w-32 h-36 bg-white p-2 shadow-2xl">
            <Image
              src="/images/up-all-night.jpeg"
              alt="Up All Night"
              width={128}
              height={128}
              className="w-full h-28 object-cover"
            />
            <div className="text-xs text-center mt-1 font-handwriting text-gray-700">2011 ♡</div>
          </div>
        </div>

        <div className="absolute top-20 right-1/4 transform rotate-12 hover:rotate-6 transition-transform duration-700 opacity-60 hover:opacity-90">
          <div className="w-32 h-36 bg-white p-2 shadow-2xl">
            <Image
              src="/images/made-in-am.jpeg"
              alt="Made in the A.M."
              width={128}
              height={128}
              className="w-full h-28 object-cover"
            />
            <div className="text-xs text-center mt-1 font-handwriting text-gray-700">2015 ♡</div>
          </div>
        </div>

        {/* Middle row */}
        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 -rotate-6 hover:rotate-0 transition-transform duration-700 opacity-60 hover:opacity-90">
          <div className="w-32 h-36 bg-white p-2 shadow-2xl">
            <Image
              src="/images/vintage-1d-3.jpeg"
              alt="Vintage 1D"
              width={128}
              height={128}
              className="w-full h-28 object-cover"
            />
            <div className="text-xs text-center mt-1 font-handwriting text-gray-700">Memories ♡</div>
          </div>
        </div>

        <div className="absolute top-1/2 right-1/3 transform -translate-y-1/2 rotate-6 hover:rotate-0 transition-transform duration-700 opacity-60 hover:opacity-90">
          <div className="w-32 h-36 bg-white p-2 shadow-2xl">
            <Image
              src="/images/vintage-1d-4.jpeg"
              alt="Vintage 1D"
              width={128}
              height={128}
              className="w-full h-28 object-cover"
            />
            <div className="text-xs text-center mt-1 font-handwriting text-gray-700">Forever ♡</div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="absolute bottom-20 left-1/4 transform rotate-8 hover:rotate-15 transition-transform duration-700 opacity-60 hover:opacity-90">
          <div className="w-32 h-36 bg-white p-2 shadow-2xl">
            <Image
              src="/images/midnight-memories.jpeg"
              alt="Midnight Memories"
              width={128}
              height={128}
              className="w-full h-28 object-cover"
            />
            <div className="text-xs text-center mt-1 font-handwriting text-gray-700">2013 ♡</div>
          </div>
        </div>

        <div className="absolute bottom-20 right-1/4 transform -rotate-8 hover:-rotate-15 transition-transform duration-700 opacity-60 hover:opacity-90">
          <div className="w-32 h-36 bg-white p-2 shadow-2xl">
            <Image
              src="/images/four-album.jpeg"
              alt="Four"
              width={128}
              height={128}
              className="w-full h-28 object-cover"
            />
            <div className="text-xs text-center mt-1 font-handwriting text-gray-700">2014 ♡</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="text-center space-y-12 z-20 relative max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
          <Music className="w-8 h-8 text-white animate-bounce" />
          <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white font-serif tracking-wider drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500">
              ONE DIRECTION
            </h1>
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-light text-red-400 font-handwriting">
              ~ trivia & memories ~
            </h2>
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic">
            "Test your knowledge, share your stories, and keep the memories alive"
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span className="text-gray-500 text-sm">For Directioners, by Directioners</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={onStartGame}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-serif text-xl px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border border-red-500/50 relative overflow-hidden group min-w-48"
            >
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Play className="w-5 h-5 mr-3 relative z-10" />
              <span className="relative z-10">Start Trivia</span>
            </Button>

            <Button
              onClick={onShowStories}
              variant="outline"
              size="lg"
              className="border-2 border-purple-600 text-purple-300 hover:bg-purple-900/30 hover:text-purple-200 hover:border-purple-500 font-serif text-xl px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group min-w-48"
            >
              <div className="absolute inset-0 bg-purple-400/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <PenTool className="w-5 h-5 mr-3 relative z-10" />
              <span className="relative z-10">Share Stories</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onShowGallery}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 font-serif text-lg px-8 py-3 rounded-full transition-all duration-300"
            >
              <Camera className="w-4 h-4 mr-2" />
              View Albums
            </Button>

            <span className="text-gray-600 text-sm">•</span>

            <Button
              onClick={onShowTribute}
              variant="ghost"
              size="sm"
              className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 font-serif text-lg px-8 py-3 rounded-full transition-all duration-300"
            >
              <Candle className="w-4 h-4 mr-2" />
              RIP Liam
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 space-y-6">
          <p className="text-gray-500 text-lg font-handwriting">"What makes you beautiful is knowing every lyric" ♡</p>
          <div className="flex items-center justify-center space-x-6 text-gray-600 text-sm">
            <span>2010 - 2016</span>
            <Heart className="w-3 h-3 fill-current animate-pulse" />
            <span>Forever in our hearts</span>
          </div>
        </div>
      </div>

      {/* Replace the floating hearts section with the new component */}
      <FloatingHearts />
    </div>
  )
}
