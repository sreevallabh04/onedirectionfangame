"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Music, Heart, Star } from "lucide-react"
import Image from "next/image"

interface AlbumGalleryProps {
  onBackToMenu: () => void
  onStartGame: () => void
  playlist: any[]
  setCurrentTrack: (track: number) => void
  setIsPlaying: (playing: boolean) => void
}

const albums = [
  {
    title: "Up All Night",
    year: "2011",
    image: "/images/up-all-night.jpeg",
    description: "Their debut that started it all",
    tracks: ["What Makes You Beautiful", "Gotta Be You", "One Thing", "More Than This"],
    highlights: ["Debut Album", "X-Factor Success", "First World Tour"],
  },
  {
    title: "Take Me Home",
    year: "2012",
    image: "/images/this-is-us.jpeg",
    description: "The journey continues",
    tracks: ["Live While We're Young", "Kiss You", "Little Things", "C'mon, C'mon"],
    highlights: ["Second Album", "Take Me Home Tour", "Record Breaking"],
  },
  {
    title: "Midnight Memories",
    year: "2013",
    image: "/images/midnight-memories.jpeg",
    description: "Their most rock-influenced album",
    tracks: ["Best Song Ever", "Story of My Life", "Diana", "Midnight Memories"],
    highlights: ["Rock Influence", "Where We Are Tour", "Global Success"],
  },
  {
    title: "Four",
    year: "2014",
    image: "/images/four-album.jpeg",
    description: "Maturity and growth",
    tracks: ["Steal My Girl", "Night Changes", "18", "Stockholm Syndrome"],
    highlights: ["Fourth Album", "On The Road Again Tour", "Musical Evolution"],
  },
  {
    title: "Made in the A.M.",
    year: "2015",
    image: "/images/made-in-am.jpeg",
    description: "Their final chapter as four",
    tracks: ["Drag Me Down", "Perfect", "History", "End of the Day"],
    highlights: ["Final Album", "Farewell Tour", "Legacy"],
  },
]

export function AlbumGallery({
  onBackToMenu,
  onStartGame,
  playlist,
  setCurrentTrack,
  setIsPlaying,
}: AlbumGalleryProps) {
  const handlePlayAlbum = (albumIndex: number) => {
    setCurrentTrack(albumIndex)
    setIsPlaying(true)
  }

  return (
    <div className="min-h-screen py-8 relative">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cd-collection.jpeg"
          alt="CD Collection Background"
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12 px-4">
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
              Discography
            </h1>
            <p className="text-gray-400 mt-2 font-handwriting">A journey through their music</p>
          </div>

          <Button 
            onClick={onStartGame} 
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white transform hover:scale-105 transition-all duration-300"
          >
            Start Trivia
          </Button>
        </div>

        {/* Enhanced Album Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4">
          {albums.map((album, index) => (
            <Card
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.title}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">Album Highlights</span>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {album.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center">
                          <Heart className="w-3 h-3 mr-2 text-red-500 fill-current" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => handlePlayAlbum(index)}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 p-0 transform hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white font-serif">{album.title}</h3>
                  <span className="text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded-full">{album.year}</span>
                </div>
                <p className="text-gray-400 mb-4 italic">{album.description}</p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-300 flex items-center">
                    <Music className="w-4 h-4 mr-2" />
                    Featured Tracks
                  </h4>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {album.tracks.map((track, trackIndex) => (
                      <li key={trackIndex} className="flex items-center group/item">
                        <Heart className="w-3 h-3 mr-2 text-red-500 fill-current group-hover/item:animate-pulse" />
                        <span className="group-hover/item:text-gray-300 transition-colors">{track}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Collection Showcase */}
        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700 shadow-2xl mx-4">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white font-serif mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
                  The Complete Collection
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  From their X-Factor beginnings to their final album as a group, One Direction's discography tells the
                  story of five boys who became legends. Each album captures a different era of their journey.
                </p>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={onStartGame}
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-serif px-8 py-3 transform hover:scale-105 transition-all duration-300"
                  >
                    Test Your Knowledge
                  </Button>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                    <span>5 Albums</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/cd-collection.jpeg"
                  alt="CD Collection"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
