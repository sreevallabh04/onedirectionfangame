"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer } from "@/components/timer"
import { CheckCircle, XCircle, Heart } from "lucide-react"

interface QuestionCardProps {
  question: {
    question: string
    options: string[]
    correctAnswer: string
    category: string
  }
  onAnswerSelect: (answer: string, isCorrect: boolean) => void
  onTimeUp: () => void
  questionNumber: number
}

export function QuestionCard({ question, onAnswerSelect, onTimeUp, questionNumber }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)

  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(15)
  }, [question])

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer || showResult) return

    setSelectedAnswer(answer)
    setShowResult(true)

    const isCorrect = answer === question.correctAnswer

    setTimeout(() => {
      onAnswerSelect(answer, isCorrect)
    }, 1500)
  }

  const handleTimeUp = () => {
    if (!selectedAnswer && !showResult) {
      setShowResult(true)
      setTimeout(() => {
        onTimeUp()
      }, 1500)
    }
  }

  const getButtonStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option
        ? "bg-red-600 hover:bg-red-700 border-red-500 text-white"
        : "bg-gray-800/80 hover:bg-gray-700 border-gray-600 text-gray-200"
    }

    if (option === question.correctAnswer) {
      return "bg-green-600 border-green-500 text-white"
    }

    if (selectedAnswer === option && option !== question.correctAnswer) {
      return "bg-red-600 border-red-500 text-white"
    }

    return "bg-gray-800/60 border-gray-600 text-gray-400"
  }

  const getButtonIcon = (option: string) => {
    if (!showResult) return null

    if (option === question.correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-green-200" />
    }

    if (selectedAnswer === option && option !== question.correctAnswer) {
      return <XCircle className="w-5 h-5 text-red-200" />
    }

    return null
  }

  return (
    <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-1 rounded-full text-sm font-serif font-medium">
                {question.category}
              </span>
              <span className="text-gray-400 text-sm font-serif">Question {questionNumber}</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
            <CardTitle className="text-white text-2xl leading-relaxed font-serif">{question.question}</CardTitle>
          </div>
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={handleTimeUp} isActive={!showResult} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={showResult}
            className={`w-full text-left justify-between p-6 h-auto transition-all duration-300 font-serif text-lg ${getButtonStyle(option)}`}
            variant="outline"
          >
            <span className="font-medium">{option}</span>
            {getButtonIcon(option)}
          </Button>
        ))}

        {showResult && (
          <div className="mt-6 p-6 rounded-lg bg-gray-800/80 border border-gray-600">
            <p className="text-center text-gray-200 font-serif text-lg">
              {selectedAnswer === question.correctAnswer ? (
                <span className="text-green-400 font-semibold">Perfect! You know your 1D history! 🖤</span>
              ) : selectedAnswer ? (
                <span className="text-red-400 font-semibold">
                  Not quite right. The answer was: {question.correctAnswer} 💔
                </span>
              ) : (
                <span className="text-gray-400 font-semibold">
                  Time's up! The answer was: {question.correctAnswer} ⏰
                </span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
