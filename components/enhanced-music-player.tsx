"use client"

import { useState } from "react"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Shuffle, Repeat } from "lucide-react"

// Sample audio tracks (using royalty-free music for demo)
const sampleTracks = [
  {
    title: "Upbeat Pop Track",
    artist: "Demo Artist",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Replace with actual audio URLs
    albumCover: "/images/up-all-night.jpeg",
  },
  {
    title: "Acoustic Ballad",
    artist: "Demo Artist",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Replace with actual audio URLs
    albumCover: "/images/midnight-memories.jpeg",
  },
  {
    title: "Rock Anthem",
    artist: "Demo Artist",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Replace with actual audio URLs
    albumCover: "/images/four-album.jpeg",
  },
]

interface EnhancedMusicPlayerProps {
  isVisible: boolean
}

export function EnhancedMusicPlayer({ isVisible }: EnhancedMusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const currentTrack = sampleTracks[currentTrackIndex]

  const handleNext = () => {
    if (isShuffled) {
      setCurrentTrackIndex(Math.floor(Math.random() * sampleTracks.length))
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % sampleTracks.length)
    }
  }

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + sampleTracks.length) % sampleTracks.length)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-4 right-4 transition-all duration-300 ${isMinimized ? "w-16 h-16" : "w-80"}`}>
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-full"
        >
          <Music className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-semibold">Now Playing</h4>
              <Button
                onClick={() => setIsMinimized(true)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                ×
              </Button>
            </div>

            <AudioPlayer
              currentTrack={currentTrack}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
            />

            <div className="flex justify-center space-x-2 mt-4">
              <Button
                onClick={() => setIsShuffled(!isShuffled)}
                variant="ghost"
                size="sm"
                className={`${isShuffled ? "text-red-400" : "text-gray-400"} hover:text-white`}
              >
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsRepeating(!isRepeating)}
                variant="ghost"
                size="sm"
                className={`${isRepeating ? "text-red-400" : "text-gray-400"} hover:text-white`}
              >
                <Repeat className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
