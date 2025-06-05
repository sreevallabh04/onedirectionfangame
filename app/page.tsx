"use client"

import { useState, useEffect } from "react"
import { AiEnhancedTrivia } from "@/components/ai-enhanced-trivia"
import { WelcomeScreen } from "@/components/welcome-screen"
import { OneDirectionPlayer } from "@/components/one-direction-player"
import { AlbumGallery } from "@/components/album-gallery"
import { LiamTribute } from "@/components/liam-tribute"
import { FanStories } from "@/components/fan-stories"
import { YouTubeService } from "@/lib/youtube-service"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showTribute, setShowTribute] = useState(false)
  const [showStories, setShowStories] = useState(false)
  const [playlist, setPlaylist] = useState<any[]>([])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const initializePlaylist = async () => {
      try {
        const videos = await YouTubeService.getOneDirectionVideos()
        setPlaylist(videos)
      } catch (error) {
        console.error("Failed to load playlist:", error)
        const fallbackVideos = YouTubeService.getFallbackPlaylist()
        setPlaylist(fallbackVideos)
      }
    }

    initializePlaylist()
  }, [])

  const handleStartGame = () => {
    setGameStarted(true)
    setShowGallery(false)
    setShowTribute(false)
    setShowStories(false)
    setIsPlaying(true)
  }

  const handleShowGallery = () => {
    setShowGallery(true)
    setGameStarted(false)
    setShowTribute(false)
    setShowStories(false)
  }

  const handleShowTribute = () => {
    setShowTribute(true)
    setGameStarted(false)
    setShowGallery(false)
    setShowStories(false)
    setIsPlaying(false)
  }

  const handleShowStories = () => {
    setShowStories(true)
    setGameStarted(false)
    setShowGallery(false)
    setShowTribute(false)
  }

  const handleBackToMenu = () => {
    setGameStarted(false)
    setShowGallery(false)
    setShowTribute(false)
    setShowStories(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Dark atmospheric overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {!gameStarted && !showGallery && !showTribute && !showStories && (
          <WelcomeScreen
            onStartGame={handleStartGame}
            onShowGallery={handleShowGallery}
            onShowTribute={handleShowTribute}
            onShowStories={handleShowStories}
          />
        )}

        {showGallery && (
          <AlbumGallery
            onBackToMenu={handleBackToMenu}
            onStartGame={handleStartGame}
            playlist={playlist}
            setCurrentTrack={setCurrentTrack}
            setIsPlaying={setIsPlaying}
          />
        )}

        {showTribute && <LiamTribute onBackToMenu={handleBackToMenu} />}

        {showStories && <FanStories onBackToMenu={handleBackToMenu} />}

        {gameStarted && <AiEnhancedTrivia onRestartGame={handleBackToMenu} />}

        {/* One Direction Music Player */}
        <OneDirectionPlayer isVisible={!showTribute} />
      </div>
    </div>
  )
}
