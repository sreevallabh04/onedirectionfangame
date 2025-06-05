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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">One Direction Fan Game</h1>
        <p className="text-center mb-4">Welcome to the ultimate One Direction fan experience!</p>
      </div>
    </main>
  )
}
