"use client"

import { useState, useEffect } from "react"
import { QuestionCard } from "@/components/question-card"
import { ScoreDisplay } from "@/components/score-display"
import { ProgressBar } from "@/components/progress-bar"
import { GameResults } from "@/components/game-results"
import { FunFact } from "@/components/fun-fact"
import { triviaQuestions } from "@/lib/trivia-data"
import { shuffleArray } from "@/lib/utils"

interface TriviaGameProps {
  onRestartGame: () => void
}

export function TriviaGame({ onRestartGame }: TriviaGameProps) {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [showFunFact, setShowFunFact] = useState(false)
  const [userAnswers, setUserAnswers] = useState<any[]>([])

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...triviaQuestions]).slice(0, 10)
    setQuestions(shuffledQuestions)
  }, [])

  const handleAnswerSelect = (selectedAnswer: string, isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex]
    const answerData = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    }

    setUserAnswers((prev) => [...prev, answerData])

    if (isCorrect) {
      setScore((prev) => prev + 100)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setShowFunFact(true)
      setTimeout(() => {
        setShowFunFact(false)
        setCurrentQuestionIndex((prev) => prev + 1)
      }, 3000)
    } else {
      setTimeout(() => {
        setGameComplete(true)
      }, 1500)
    }
  }

  const handleTimeUp = () => {
    handleAnswerSelect("", false)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setGameComplete(false)
    setShowFunFact(false)
    setUserAnswers([])
    const shuffledQuestions = shuffleArray([...triviaQuestions]).slice(0, 10)
    setQuestions(shuffledQuestions)
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl text-white font-serif">Loading memories...</p>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    return (
      <GameResults
        score={score}
        totalQuestions={questions.length}
        userAnswers={userAnswers}
        onRestart={handleRestart}
        onBackToMenu={onRestartGame}
      />
    )
  }

  if (showFunFact) {
    return <FunFact />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <ScoreDisplay score={score} />
        <div className="text-right">
          <p className="text-sm text-gray-400 font-serif">Question</p>
          <p className="text-2xl font-bold text-white font-serif">
            {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
      </div>

      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        onTimeUp={handleTimeUp}
        questionNumber={currentQuestionIndex + 1}
      />
    </div>
  )
}
