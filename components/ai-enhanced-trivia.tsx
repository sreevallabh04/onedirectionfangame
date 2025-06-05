"use client"

import { useState, useEffect } from "react"
import { QuestionCard } from "@/components/question-card"
import { ScoreDisplay } from "@/components/score-display"
import { ProgressBar } from "@/components/progress-bar"
import { GameResults } from "@/components/game-results"
import { AiFunFact } from "@/components/ai-fun-fact"
import { triviaQuestions } from "@/lib/trivia-data"
import { GeminiService } from "@/lib/gemini-service"
import { shuffleArray } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, AlertTriangle } from "lucide-react"

interface AiEnhancedTriviaProps {
  onRestartGame: () => void
}

export function AiEnhancedTrivia({ onRestartGame }: AiEnhancedTriviaProps) {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [showFunFact, setShowFunFact] = useState(false)
  const [userAnswers, setUserAnswers] = useState<any[]>([])
  const [isLoadingAiQuestion, setIsLoadingAiQuestion] = useState(false)
  const [useAiQuestions, setUseAiQuestions] = useState(false)
  const [aiApiAvailable, setAiApiAvailable] = useState(true)
  const [aiError, setAiError] = useState<string | null>(null)

  useEffect(() => {
    initializeQuestions()
    checkAiAvailability()
  }, [useAiQuestions])

  const checkAiAvailability = async () => {
    try {
      const isAvailable = await GeminiService.checkApiAvailability()
      setAiApiAvailable(isAvailable)
      if (!isAvailable) {
        setAiError("AI features temporarily unavailable")
      }
    } catch (error) {
      setAiApiAvailable(false)
      setAiError("AI features offline")
    }
  }

  const initializeQuestions = async () => {
    if (useAiQuestions && aiApiAvailable) {
      // Mix of AI-generated and preset questions
      const aiQuestions = []
      const presetQuestions = shuffleArray([...triviaQuestions]).slice(0, 5)

      // Generate 5 AI questions with error handling
      for (let i = 0; i < 5; i++) {
        try {
          const aiQuestion = await GeminiService.generateTriviaQuestion()
          aiQuestions.push({ ...aiQuestion, isAiGenerated: true })
        } catch (error) {
          console.error("Failed to generate AI question:", error)
          // Add a fallback question instead
          const fallbackQuestion = GeminiService.getFallbackQuestion()
          aiQuestions.push({ ...fallbackQuestion, isAiGenerated: false })
        }
      }

      const mixedQuestions = shuffleArray([...aiQuestions, ...presetQuestions]).slice(0, 10)
      setQuestions(mixedQuestions)
    } else {
      const shuffledQuestions = shuffleArray([...triviaQuestions]).slice(0, 10)
      setQuestions(shuffledQuestions)
    }
  }

  const handleAnswerSelect = (selectedAnswer: string, isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex]
    const answerData = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      isAiGenerated: currentQuestion.isAiGenerated || false,
    }

    setUserAnswers((prev) => [...prev, answerData])

    if (isCorrect) {
      setScore((prev) => prev + (currentQuestion.isAiGenerated ? 150 : 100)) // Bonus points for AI questions
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
    setAiError(null)
    initializeQuestions()
  }

  const generateAiQuestion = async () => {
    if (!aiApiAvailable) {
      setAiError("AI features are currently unavailable")
      return
    }

    setIsLoadingAiQuestion(true)
    setAiError(null)

    try {
      const aiQuestion = await GeminiService.generateTriviaQuestion()
      const newQuestions = [...questions]
      newQuestions[currentQuestionIndex] = { ...aiQuestion, isAiGenerated: true }
      setQuestions(newQuestions)
    } catch (error) {
      console.error("Failed to generate AI question:", error)
      setAiError("Failed to generate AI question. Using fallback.")

      // Use fallback question
      const fallbackQuestion = GeminiService.getFallbackQuestion()
      const newQuestions = [...questions]
      newQuestions[currentQuestionIndex] = { ...fallbackQuestion, isAiGenerated: false }
      setQuestions(newQuestions)
    }

    setIsLoadingAiQuestion(false)
  }

  const toggleAiMode = () => {
    if (!aiApiAvailable) {
      setAiError("AI features are currently unavailable")
      return
    }
    setUseAiQuestions(!useAiQuestions)
    setAiError(null)
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl text-white font-serif">
            {useAiQuestions ? "Generating AI-powered questions..." : "Loading memories..."}
          </p>
          {aiError && (
            <p className="text-yellow-400 text-sm mt-2 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {aiError}
            </p>
          )}
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
    return <AiFunFact />
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* AI Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-4">
          <Button
            onClick={toggleAiMode}
            variant="outline"
            className={`${
              useAiQuestions && aiApiAvailable
                ? "border-purple-500 text-purple-300 bg-purple-900/20"
                : "border-gray-600 text-gray-300"
            } transition-all duration-300`}
            disabled={!aiApiAvailable}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {useAiQuestions ? "AI Mode ON" : "Enable AI Questions"}
            {!aiApiAvailable && <AlertTriangle className="w-4 h-4 ml-2 text-yellow-400" />}
          </Button>

          {aiError && (
            <div className="text-yellow-400 text-xs flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {aiError}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <ScoreDisplay score={score} />
        <div className="text-right">
          <p className="text-sm text-gray-400 font-serif">Question</p>
          <p className="text-2xl font-bold text-white font-serif">
            {currentQuestionIndex + 1} of {questions.length}
          </p>
          {currentQuestion?.isAiGenerated && (
            <div className="flex items-center text-purple-400 text-xs mt-1">
              <Zap className="w-3 h-3 mr-1" />
              AI Generated
            </div>
          )}
        </div>
      </div>

      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

      <div className="space-y-4">
        <QuestionCard
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          onTimeUp={handleTimeUp}
          questionNumber={currentQuestionIndex + 1}
        />

        {/* AI Question Generator */}
        {useAiQuestions && aiApiAvailable && (
          <div className="text-center">
            <Button
              onClick={generateAiQuestion}
              disabled={isLoadingAiQuestion}
              variant="ghost"
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isLoadingAiQuestion ? "Generating..." : "Generate New AI Question"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
