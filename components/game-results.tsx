"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw, Home, Share2, CheckCircle, XCircle, Heart, Star } from "lucide-react"
import Image from "next/image"

interface GameResultsProps {
  score: number
  totalQuestions: number
  userAnswers: any[]
  onRestart: () => void
  onBackToMenu: () => void
}

export function GameResults({ score, totalQuestions, userAnswers, onRestart, onBackToMenu }: GameResultsProps) {
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Legendary! You're a true Directioner! 🖤"
    if (percentage >= 70) return "Impressive! You know your 1D darkness! ✨"
    if (percentage >= 50) return "Good! Keep diving deeper into their world! 🎵"
    return "Keep exploring! There's always more darkness to discover! 💫"
  }

  const getPerformanceColor = () => {
    if (percentage >= 90) return "text-yellow-400"
    if (percentage >= 70) return "text-green-400"
    if (percentage >= 50) return "text-blue-400"
    return "text-red-400"
  }

  const shareScore = () => {
    const text = `I just scored ${score} points (${percentage}%) on the One Direction Dark Trivia Challenge! 🖤✨ Can you beat my score? #OneDirection #TriviaChallenge #Directioner`

    if (navigator.share) {
      navigator.share({
        title: "One Direction Dark Trivia Challenge",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text + " " + window.location.href)
      alert("Score copied to clipboard! 📋🖤")
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Main results card */}
      <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border-gray-700 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className={`w-20 h-20 ${getPerformanceColor()}`} />
              <Star className="w-8 h-8 text-yellow-400 fill-current absolute -top-2 -right-2" />
              <Heart className="w-6 h-6 text-red-500 fill-current absolute -bottom-1 -left-1" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-white mb-4 font-serif">Journey Complete!</CardTitle>
          <p className={`text-2xl font-serif ${getPerformanceColor()}`}>{getPerformanceMessage()}</p>
        </CardHeader>
        <CardContent className="text-center space-y-8">
          {/* Score grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-600">
              <p className="text-3xl font-bold text-red-400 font-serif">{score}</p>
              <p className="text-gray-400 font-serif">Total Score</p>
            </div>
            <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-600">
              <p className="text-3xl font-bold text-red-400 font-serif">
                {correctAnswers}/{totalQuestions}
              </p>
              <p className="text-gray-400 font-serif">Correct Answers</p>
            </div>
            <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-600">
              <p className="text-3xl font-bold text-red-400 font-serif">{percentage}%</p>
              <p className="text-gray-400 font-serif">Accuracy</p>
            </div>
          </div>

          {/* Dark album covers decoration */}
          <div className="flex justify-center space-x-4 my-8">
            <div className="w-24 h-28 bg-gray-800 p-2 shadow-2xl transform -rotate-6 border border-gray-600">
              <div className="w-full h-20 bg-gray-700 rounded-sm overflow-hidden">
                <Image
                  src="/images/dark-promo.jpeg"
                  alt="One Direction"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-center mt-1 font-handwriting text-gray-400">dark 🖤</div>
            </div>
            <div className="w-24 h-28 bg-gray-800 p-2 shadow-2xl transform rotate-12 border border-gray-600">
              <div className="w-full h-20 bg-gray-700 rounded-sm overflow-hidden">
                <Image
                  src="/images/made-in-am.jpeg"
                  alt="One Direction"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-center mt-1 font-handwriting text-gray-400">memories 🖤</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={onRestart}
              className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-serif px-6 py-3 rounded-full shadow-lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={onBackToMenu}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-serif px-6 py-3 rounded-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
            <Button
              onClick={shareScore}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-serif px-6 py-3 rounded-full shadow-lg"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Score
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Answer review */}
      <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white font-serif text-2xl">Review Your Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userAnswers.map((answer, index) => (
            <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
              <div className="flex items-start space-x-3">
                {answer.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-white font-medium mb-1 font-serif">{answer.question}</p>
                  <p className="text-sm text-gray-400 font-serif">
                    Your answer:{" "}
                    <span className={answer.isCorrect ? "text-green-400" : "text-red-400"}>
                      {answer.selectedAnswer || "No answer"}
                    </span>
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-sm text-gray-400 font-serif">
                      Correct answer: <span className="text-green-400">{answer.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
