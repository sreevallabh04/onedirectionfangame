"use client"

import { Trophy, Star } from "lucide-react"

interface ScoreDisplayProps {
  score: number
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex items-center space-x-3 bg-gray-900/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-gray-700 shadow-2xl">
      <div className="flex items-center space-x-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <Star className="w-4 h-4 text-red-500 fill-current" />
      </div>
      <div>
        <p className="text-sm text-gray-400 font-serif">Score</p>
        <p className="text-2xl font-bold text-white font-serif">{score}</p>
      </div>
    </div>
  )
}
