"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Star, Music, Camera } from "lucide-react"
import Image from "next/image"

interface LiamTributeProps {
  onBackToMenu: () => void
}

export function LiamTribute({ onBackToMenu }: LiamTributeProps) {
  return (
    <div className="min-h-screen py-8 relative">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/liam-tribute.jpeg"
          alt="Liam Tribute Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Button 
            onClick={onBackToMenu} 
            variant="ghost" 
            className="text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Menu
          </Button>

          <div className="text-center">
            <h1 className="text-5xl font-bold text-white font-serif bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500">
              In Memory of Liam
            </h1>
            <p className="text-gray-400 mt-2 font-handwriting">Forever in our hearts</p>
          </div>

          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Tribute Card */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <h2 className="text-3xl font-bold text-white font-serif">A Tribute to Liam</h2>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Liam was more than just a member of One Direction - he was a beacon of light, a source of joy, and an
                  inspiration to millions. His voice, his smile, and his spirit will forever echo in our hearts.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Music className="w-5 h-5 text-red-500" />
                    <span className="text-gray-400">His voice touched millions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                    <span className="text-gray-400">His kindness knew no bounds</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-400">His legacy lives on</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/vintage-1d-2.jpeg"
                  alt="Liam Memory 1"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/vintage-1d-5.jpeg"
                  alt="Liam Memory 2"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative h-64 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/vintage-1d-7.jpeg"
                  alt="Liam Memory 3"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/vintage-1d-8.jpeg"
                  alt="Liam Memory 4"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Wall */}
        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white font-serif mb-4">Memory Wall</h2>
              <p className="text-gray-400">Share your favorite memories of Liam</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "His incredible voice in 'What Makes You Beautiful'",
                "The way he made everyone smile",
                "His dedication to the fans",
                "His beautiful smile",
                "His amazing stage presence",
                "His kind heart",
              ].map((memory, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-red-500/50 transition-colors duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-red-500 fill-current mt-1 flex-shrink-0" />
                    <p className="text-gray-300">{memory}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 font-handwriting text-lg">
                "Forever in our hearts, forever in our memories"
              </p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span className="text-gray-400">1993 - Forever</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
