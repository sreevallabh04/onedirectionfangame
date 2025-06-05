"use client"

import { useEffect } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  timeLeft: number
  setTimeLeft: (time: number) => void
  onTimeUp: () => void
  isActive: boolean
}

export function Timer({ timeLeft, setTimeLeft, onTimeUp, isActive }: TimerProps) {
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isActive, setTimeLeft])

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      onTimeUp()
    }
  }, [timeLeft, isActive, onTimeUp])

  const getTimerColor = () => {
    if (timeLeft > 10) return "text-green-400"
    if (timeLeft > 5) return "text-yellow-400"
    return "text-red-400"
  }

  const getProgressColor = () => {
    if (timeLeft > 10) return "bg-green-500"
    if (timeLeft > 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex flex-col items-center space-y-3 bg-gray-800/80 p-4 rounded-lg border border-gray-600">
      <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
        <Clock className="w-5 h-5" />
        <span className="font-mono text-xl font-bold">{timeLeft}s</span>
      </div>
      <div className="w-20 h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        />
      </div>
    </div>
  )
}
