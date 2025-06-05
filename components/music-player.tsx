"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc3 } from "lucide-react"
import Image from "next/image"

interface MusicPlayerProps {
  playlist: any[]
  currentTrack: number
  setCurrentTrack: (track: number) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const albumCovers = [
  "/images/up-all-night.jpeg",
  "/images/midnight-memories.jpeg",
  "/images/four-album.jpeg",
  "/images/made-in-am.jpeg",
  "/images/this-is-us.jpeg",
]

export function MusicPlayer({ playlist, currentTrack, setCurrentTrack, isPlaying, setIsPlaying }: MusicPlayerProps) {
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const currentVideo = playlist[currentTrack]
  const currentAlbumCover = albumCovers[currentTrack % albumCovers.length]

  useEffect(() => {
    if (playlist.length > 0) {
      setIsLoading(false)
    }
  }, [playlist])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((currentTrack + 1) % playlist.length)
  }

  const prevTrack = () => {
    setCurrentTrack(currentTrack === 0 ? playlist.length - 1 : currentTrack - 1)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (isLoading || !currentVideo) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
            <span className="text-gray-300 text-sm font-serif">Loading music...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`fixed bottom-4 right-4 bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl transition-all duration-300 ${
        isMinimized ? "w-16 h-16" : "w-80"
      }`}
    >
      <CardContent className="p-4">
        {isMinimized ? (
          <Button
            onClick={() => setIsMinimized(false)}
            size="sm"
            className="w-full h-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-full"
          >
            <Disc3 className="w-4 h-4 animate-spin-slow" />
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Album cover and track info */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={currentAlbumCover || "/placeholder.svg"}
                  alt="Album cover"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm truncate font-serif">{currentVideo.snippet.title}</h4>
                <p className="text-red-400 text-xs font-serif italic">One Direction</p>
              </div>
              <Button
                onClick={() => setIsMinimized(true)}
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white p-1"
              >
                ×
              </Button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-3">
              <Button
                onClick={prevTrack}
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:bg-gray-800 rounded-full w-8 h-8 p-0"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                onClick={togglePlay}
                size="sm"
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-full w-12 h-12 p-0"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button
                onClick={nextTrack}
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:bg-gray-800 rounded-full w-8 h-8 p-0"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume control */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleMute}
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:bg-gray-800 p-1 rounded-full"
              >
                {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            <div className="text-xs text-gray-500 text-center font-serif italic">
              Track {currentTrack + 1} of {playlist.length} 🖤
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
