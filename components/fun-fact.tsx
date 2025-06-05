"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Heart } from "lucide-react"
import Image from "next/image"

const funFacts = [
  "One Direction was formed on July 23, 2010, during the seventh series of The X Factor! 🖤",
  "The band's name 'One Direction' was suggested by Harry Styles! ✨",
  "Their debut single 'What Makes You Beautiful' reached number one in several countries! 🎵",
  "One Direction became the first group in US Billboard 200 history to have their first four albums debut at number one! 🏆",
  "The band has sold over 70 million records worldwide! 🌍",
  "Zayn Malik left the band in March 2015 to pursue a solo career! 💔",
  "Their song 'Story of My Life' was co-written by band member Louis Tomlinson! ✍️",
  "One Direction went on hiatus in January 2016, but never officially disbanded! 💭",
  "Harry Styles was working in a bakery before joining One Direction! 🥖",
  "The band's fans are called 'Directioners'! 🖤",
]

const darkImages = ["/images/dark-promo.jpeg", "/images/made-in-am-poster.jpeg", "/images/four-album.jpeg"]

export function FunFact() {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]
  const randomImage = darkImages[Math.floor(Math.random() * darkImages.length)]

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border-gray-700 max-w-3xl mx-auto shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-red-500 animate-pulse" />
              <Heart className="w-6 h-6 text-red-500 fill-current absolute -top-2 -right-2" />
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-6 font-serif">Did You Know?</h3>

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
              <div className="text-xs text-center mt-2 font-handwriting text-gray-400">memories 🖤</div>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed font-serif max-w-2xl mx-auto">{randomFact}</p>

          <div className="mt-8">
            <div className="animate-bounce">
              <p className="text-sm text-red-400 font-serif italic">Next question emerging from the shadows... 🖤</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
