"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink, Heart, Clock } from "lucide-react"
import Image from "next/image"
import type { SpotifyTrack } from "@/lib/spotify-service"
import { SpotifyService } from "@/lib/spotify-service"

interface OneDirectionPlaylistProps {
  onTrackSelect: (trackIndex: number) => void
  currentTrackIndex: number
  isPlaying: boolean
}

export function OneDirectionPlaylist({ onTrackSelect, currentTrackIndex, isPlaying }: OneDirectionPlaylistProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTracks()
  }, [])

  const loadTracks = async () => {
    setIsLoading(true)
    try {
      const oneDirectionTracks = await SpotifyService.getOneDirectionTracks()
      setTracks(oneDirectionTracks)
    } catch (error) {
      console.error("Failed to load tracks:", error)
      setTracks(SpotifyService.getFallbackTracks())
    }
    setIsLoading(false)
  }

  const openInSpotify = (track: SpotifyTrack) => {
    window.open(track.external_urls.spotify, "_blank")
  }

  if (isLoading) {
    return (
      <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading One Direction tracks...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white font-serif text-2xl flex items-center">
          <Heart className="w-6 h-6 mr-3 text-red-500 fill-current" />
          One Direction Playlist
        </CardTitle>
        <p className="text-gray-400">The ultimate collection of 1D hits</p>
      </CardHeader>
      <CardContent className="space-y-2 max-h-96 overflow-y-auto">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              index === currentTrackIndex
                ? "bg-red-600/20 border border-red-500/30"
                : "hover:bg-gray-800/50 border border-transparent"
            }`}
          >
            {/* Album art */}
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <Image
                src={track.album.images[0]?.url || "/placeholder.svg"}
                alt={track.album.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium text-sm truncate">{track.name}</h4>
              <p className="text-gray-400 text-xs truncate">{track.album.name}</p>
            </div>

            {/* Preview indicator */}
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              {track.preview_url ? (
                <>
                  <Clock className="w-3 h-3" />
                  <span>30s</span>
                </>
              ) : (
                <span>Spotify</span>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => onTrackSelect(index)}
                variant="ghost"
                size="sm"
                className={`${
                  index === currentTrackIndex && isPlaying ? "text-red-400" : "text-gray-400 hover:text-white"
                } p-1`}
              >
                <Play className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => openInSpotify(track)}
                variant="ghost"
                size="sm"
                className="text-green-400 hover:text-green-300 p-1"
                title="Open in Spotify"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
