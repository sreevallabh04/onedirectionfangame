"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ExternalLink,
  Heart,
  Shuffle,
  Repeat,
  Music,
  Loader2,
  Headphones,
} from "lucide-react"
import Image from "next/image"
import type { SpotifyTrack } from "@/lib/spotify-service"
import { SpotifyService } from "@/lib/spotify-service"

interface OneDirectionPlayerProps {
  isVisible: boolean
}

export function OneDirectionPlayer({ isVisible }: OneDirectionPlayerProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [hasAudioSupport, setHasAudioSupport] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  // Fallback tracks without audio URLs (display only)
  const fallbackTracks: SpotifyTrack[] = [
    {
      id: "1",
      name: "What Makes You Beautiful",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Up All Night",
        images: [{ url: "/images/up-all-night.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/4Km5HrUvYTaSUfiSGPJeQR",
      },
      duration_ms: 218000,
    },
    {
      id: "2",
      name: "Story of My Life",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Midnight Memories",
        images: [{ url: "/images/midnight-memories.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
      },
      duration_ms: 245000,
    },
    {
      id: "3",
      name: "Night Changes",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Four",
        images: [{ url: "/images/four-album.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/1iNZlqnKLdRK5trOaByMgb",
      },
      duration_ms: 238000,
    },
    {
      id: "4",
      name: "Drag Me Down",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Made in the A.M.",
        images: [{ url: "/images/made-in-am.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/3Kkjo3cT83cw09VJyrLNwX",
      },
      duration_ms: 193000,
    },
    {
      id: "5",
      name: "Perfect",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Made in the A.M.",
        images: [{ url: "/images/made-in-am.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/4W8niZpiMy6qz1jCUdwzKo",
      },
      duration_ms: 230000,
    },
    {
      id: "6",
      name: "Best Song Ever",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Midnight Memories",
        images: [{ url: "/images/midnight-memories.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/3QGsuHI8jO1Rx4JWLUh9jd",
      },
      duration_ms: 196000,
    },
    {
      id: "7",
      name: "Live While We're Young",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Take Me Home",
        images: [{ url: "/images/this-is-us.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/0BxE4FqsDD1Ot4YuBXwn8F",
      },
      duration_ms: 201000,
    },
    {
      id: "8",
      name: "History",
      artists: [{ name: "One Direction" }],
      album: {
        name: "Made in the A.M.",
        images: [{ url: "/images/made-in-am.jpeg" }],
      },
      preview_url: null,
      external_urls: {
        spotify: "https://open.spotify.com/track/1ZMiCix7XSAbfAJlEZWMCp",
      },
      duration_ms: 207000,
    },
  ]

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    // Start with fallback tracks
    setTracks(fallbackTracks)
    setIsLoading(false)

    // Try to load from Spotify in the background
    loadOneDirectionTracks()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => {
      setDuration(audio.duration)
      setHasAudioSupport(true)
    }

    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0
        audio.play().catch(() => {
          setIsPlaying(false)
          setAudioError("Playback ended")
        })
      } else {
        handleNext()
      }
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      setAudioError("Audio not available - Listen on Spotify")
      setIsPlaying(false)
      setHasAudioSupport(false)
    }

    const handleCanPlay = () => {
      setAudioError(null)
      setHasAudioSupport(true)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [isRepeating])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack?.preview_url) {
      setAudioError("No preview available - Listen on Spotify")
      setHasAudioSupport(false)
      return
    }

    // Reset states when changing tracks
    setAudioError(null)
    setCurrentTime(0)
    setDuration(0)

    // Set the source and load the audio
    audio.src = currentTrack.preview_url
    audio.load()

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback failed:", error)
          setIsPlaying(false)
          setAudioError("Preview not available - Listen on Spotify")
          setHasAudioSupport(false)
        })
      }
    }
  }, [currentTrackIndex, currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !hasAudioSupport) return

    if (isPlaying && currentTrack?.preview_url) {
      audio.play().catch((error) => {
        console.error("Play failed:", error)
        setIsPlaying(false)
        setAudioError("Playback failed - Try Spotify")
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, hasAudioSupport])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const loadOneDirectionTracks = async () => {
    try {
      const spotifyTracks = await SpotifyService.getOneDirectionTracks()

      if (spotifyTracks.length > 0) {
        // Merge with fallback tracks, prioritizing Spotify data
        const mergedTracks = fallbackTracks.map((fallbackTrack) => {
          const spotifyMatch = spotifyTracks.find(
            (track) =>
              track.name.toLowerCase().includes(fallbackTrack.name.toLowerCase()) ||
              fallbackTrack.name.toLowerCase().includes(track.name.toLowerCase()),
          )
          return spotifyMatch || fallbackTrack
        })

        setTracks(mergedTracks)
      }
    } catch (error) {
      console.error("Failed to load One Direction tracks from Spotify:", error)
      setLoadingError("Using offline mode")
    }
  }

  const handlePlayPause = () => {
    if (!currentTrack) return

    if (!currentTrack.preview_url) {
      // If no preview available, open in Spotify
      openInSpotify()
      return
    }

    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (isShuffled) {
      setCurrentTrackIndex(Math.floor(Math.random() * tracks.length))
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
    }
    setCurrentTime(0)
    // Don't auto-play next track if current one doesn't have preview
    if (tracks[(currentTrackIndex + 1) % tracks.length]?.preview_url) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const handlePrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
    setCurrentTrackIndex(prevIndex)
    setCurrentTime(0)
    // Don't auto-play previous track if it doesn't have preview
    if (tracks[prevIndex]?.preview_url) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (audio && currentTrack?.preview_url && hasAudioSupport) {
      audio.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const openInSpotify = () => {
    if (currentTrack) {
      window.open(currentTrack.external_urls.spotify, "_blank")
    }
  }

  if (!isVisible) return null

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 w-80 z-50">
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="w-5 h-5 animate-spin text-red-500" />
              <span className="text-white font-serif">Loading One Direction tracks...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-4 right-4 transition-all duration-300 z-50 ${isMinimized ? "w-16 h-16" : "w-96"}`}>
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-full shadow-2xl"
        >
          <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
        </Button>
      ) : (
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardContent className="p-4">
            <audio ref={audioRef} preload="auto" crossOrigin="anonymous" />

            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                  <span className="text-white font-semibold text-sm">One Direction</span>
                  {loadingError && (
                    <span className="text-yellow-400 text-xs" title={loadingError}>
                      ⚠️
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => setIsMinimized(true)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-1"
                >
                  ×
                </Button>
              </div>

              {currentTrack && (
                <>
                  {/* Track info with album art */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={currentTrack.album.images[0]?.url || "/placeholder.svg"}
                        alt={currentTrack.album.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm truncate">{currentTrack.name}</h3>
                      <p className="text-gray-400 text-xs truncate">{currentTrack.album.name}</p>
                    </div>
                    <Button
                      onClick={openInSpotify}
                      variant="ghost"
                      size="sm"
                      className="text-green-400 hover:text-green-300 p-1"
                      title="Listen on Spotify (Full Song)"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Audio status message */}
                  {audioError && (
                    <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-2 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Headphones className="w-4 h-4 text-blue-400" />
                        <p className="text-blue-300 text-xs">{audioError}</p>
                      </div>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <Slider
                      value={[currentTime]}
                      max={duration || currentTrack.duration_ms / 1000}
                      step={1}
                      onValueChange={handleSeek}
                      className="w-full"
                      disabled={!hasAudioSupport || !currentTrack.preview_url}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>
                        {currentTrack.preview_url
                          ? formatTime(duration || 30)
                          : formatTime(currentTrack.duration_ms / 1000)}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-3">
                    <Button
                      onClick={() => setIsShuffled(!isShuffled)}
                      variant="ghost"
                      size="sm"
                      className={`${isShuffled ? "text-red-400" : "text-gray-400"} hover:text-white p-1`}
                    >
                      <Shuffle className="w-4 h-4" />
                    </Button>

                    <Button
                      onClick={handlePrevious}
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white p-1"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>

                    <Button
                      onClick={handlePlayPause}
                      className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-full w-10 h-10 p-0"
                      title={currentTrack.preview_url ? "Play/Pause Preview" : "Listen on Spotify"}
                    >
                      {currentTrack.preview_url ? (
                        isPlaying && hasAudioSupport ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      onClick={handleNext}
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white p-1"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>

                    <Button
                      onClick={() => setIsRepeating(!isRepeating)}
                      variant="ghost"
                      size="sm"
                      className={`${isRepeating ? "text-red-400" : "text-gray-400"} hover:text-white p-1`}
                      disabled={!currentTrack.preview_url}
                    >
                      <Repeat className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Volume control */}
                  {hasAudioSupport && currentTrack.preview_url && (
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setIsMuted(!isMuted)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-white p-1"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={100}
                        step={1}
                        onValueChange={(value) => setVolume(value[0])}
                        className="flex-1"
                      />
                    </div>
                  )}

                  {/* Track info */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Track {currentTrackIndex + 1} of {tracks.length}
                      {currentTrack.preview_url ? " • Preview Available" : " • Full Song on Spotify"}
                    </p>
                  </div>
                </>
              )}

              {!currentTrack && (
                <div className="text-center py-4">
                  <Music className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                  <p className="text-gray-400">No tracks available</p>
                  <Button
                    onClick={() => setTracks(fallbackTracks)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 mt-2"
                  >
                    Load Default Tracks
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
