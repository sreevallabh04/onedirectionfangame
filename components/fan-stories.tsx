"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Star, Music, Camera, PenTool } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface FanStoriesProps {
  onBackToMenu: () => void
}

const stories = [
  {
    id: 1,
    author: "Sarah",
    location: "London, UK",
    content: "I'll never forget the first time I heard 'What Makes You Beautiful'. I was 13, and it changed my life forever. The way Liam's voice soared in the chorus... I knew I had found my favorite band.",
    image: "/images/vintage-1d-1.jpeg",
    year: "2011",
  },
  {
    id: 2,
    author: "Emma",
    location: "New York, USA",
    content: "Meeting them after the concert was a dream come true. Liam was so kind, taking time to talk to each fan. His smile lit up the whole room!",
    image: "/images/vintage-1d-3.jpeg",
    year: "2013",
  },
  {
    id: 3,
    author: "Maria",
    location: "Madrid, Spain",
    content: "The Where We Are Tour was my first concert ever. When they sang 'Story of My Life', the whole stadium was singing along. It was magical!",
    image: "/images/vintage-1d-4.jpeg",
    year: "2014",
  },
  {
    id: 4,
    author: "Jessica",
    location: "Sydney, Australia",
    content: "I made friends from all over the world because of One Direction. We still meet up every year to celebrate their music and our friendship.",
    image: "/images/vintage-1d-6.jpeg",
    year: "2015",
  },
  {
    id: 5,
    author: "Sophie",
    location: "Paris, France",
    content: "The night they won their first BRIT Award, I stayed up until 3 AM watching the live stream. When they won, I cried tears of joy!",
    image: "/images/vintage-1d-9.jpeg",
    year: "2012",
  },
  {
    id: 6,
    author: "Lisa",
    location: "Toronto, Canada",
    content: "I learned English by translating their lyrics. Now I'm studying to become a translator. Thank you, 1D, for inspiring me!",
    image: "/images/this-is-us.jpeg",
    year: "2013",
  },
]

export function FanStories({ onBackToMenu }: FanStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<number | null>(null)

  return (
    <div className="min-h-screen py-8 relative">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/dark-promo.jpeg"
          alt="Fan Stories Background"
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
              Fan Stories
            </h1>
            <p className="text-gray-400 mt-2 font-handwriting">Share your One Direction journey</p>
          </div>

          <Button
            variant="outline"
            className="border-purple-600 text-purple-300 hover:bg-purple-900/30 hover:text-purple-200 hover:border-purple-500"
          >
            <PenTool className="w-4 h-4 mr-2" />
            Share Your Story
          </Button>
        </div>

        {/* Featured Story */}
        {selectedStory !== null && (
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src={stories[selectedStory].image}
                    alt={stories[selectedStory].author}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm bg-red-500/80 px-3 py-1 rounded-full">
                      {stories[selectedStory].year}
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white font-serif mb-2">
                      {stories[selectedStory].author}'s Story
                    </h2>
                    <p className="text-gray-400">{stories[selectedStory].location}</p>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {stories[selectedStory].content}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-red-400 hover:text-red-300">
                      <Heart className="w-5 h-5 mr-2" />
                      Like Story
                    </Button>
                    <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                      <PenTool className="w-5 h-5 mr-2" />
                      Share Similar Story
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedStory(story.id - 1)}
            >
              <div className="relative h-48">
                <Image
                  src={story.image}
                  alt={story.author}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm bg-red-500/80 px-3 py-1 rounded-full">
                    {story.year}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-serif">{story.author}</h3>
                  <span className="text-gray-400 text-sm">{story.location}</span>
                </div>
                <p className="text-gray-300 line-clamp-3">{story.content}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    <span className="text-sm">42</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">Featured</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Share Your Story Section */}
        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700 shadow-2xl mt-12">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-white font-serif">Share Your Story</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Every Directioner has a unique story. Share your memories, your first concert, or how One Direction
                changed your life. Your story could inspire others!
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-serif px-8 py-3 transform hover:scale-105 transition-all duration-300"
              >
                <PenTool className="w-5 h-5 mr-2" />
                Write Your Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
