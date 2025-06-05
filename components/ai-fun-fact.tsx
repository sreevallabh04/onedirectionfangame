"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Heart, Zap, AlertTriangle } from "lucide-react"
import { GeminiService } from "@/lib/gemini-service"
import Image from "next/image"

const darkImages = ["/images/dark-promo.jpeg", "/images/made-in-am-poster.jpeg", "/images/four-album.jpeg"]

export function AiFunFact() {
  const [funFact, setFunFact] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAiGenerated, setIsAiGenerated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    generateFunFact()
  }, [])

  const generateFunFact = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const fact = await GeminiService.generateFunFact()
      setFunFact(fact)
      setIsAiGenerated(true)
    } catch (error) {
      console.error("Failed to generate fun fact:", error)
      // Use fallback fun fact
      const fallbackFact = GeminiService.getFallbackFunFact()
      setFunFact(fallbackFact)
      setIsAiGenerated(false)
      setError("Using offline fun fact")
    }

    setIsLoading(false)
  }

  const randomImage = darkImages[Math.floor(Math.random() * darkImages.length)]

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border-gray-700 max-w-3xl mx-auto shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className={`w-16 h-16 ${isAiGenerated ? "text-purple-500" : "text-gray-500"} animate-pulse`} />
              {isAiGenerated ? (
                <Zap className="w-6 h-6 text-purple-400 absolute -top-2 -right-2" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2" />
              )}
              <Heart className="w-6 h-6 text-red-500 fill-current absolute -bottom-1 -left-1" />
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-2 font-serif">
            {isAiGenerated ? "AI-Generated Fun Fact" : "Fun Fact"}
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-6">
            {isAiGenerated ? (
              <p className="text-purple-400 text-sm">Powered by Gemini AI ✨</p>
            ) : (
              <p className="text-yellow-400 text-sm flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {error || "Offline Mode"}
              </p>
            )}
          </div>

          <div className="mb-8">
            <div className="w-40 h-48 mx-auto bg-gray-800 p-3 shadow-2xl transform rotate-3 mb-6 border border-gray-600">
              <div className="w-full h-36 bg-gray-700 rounded-sm overflow-hidden">
                <Image
                  src={randomImage || "/placeholder.svg"}
                  alt="One Direction dark moment"
                  width={160}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-center mt-2 font-handwriting text-gray-400">
                {isAiGenerated ? "AI memories 🤖" : "memories 🖤"}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              <p className="text-gray-300 font-serif">AI is thinking...</p>
            </div>
          ) : (
            <p className="text-xl text-gray-300 leading-relaxed font-serif max-w-2xl mx-auto">{funFact}</p>
          )}

          <div className="mt-8">
            <div className="animate-bounce">
              <p className="text-sm text-purple-400 font-serif italic">
                {isAiGenerated ? "Next question powered by AI... 🤖" : "Next question coming up... 🖤"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
