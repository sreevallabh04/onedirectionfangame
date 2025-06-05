const GEMINI_API_KEY = "AIzaSyCPK-TcfngXIZXoInz8nKkUei7hVYvBKRo"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"

export class GeminiService {
  static async generateTriviaQuestion() {
    try {
      const prompt = `Generate a unique One Direction trivia question with 4 multiple choice options. 
      Focus on band history, member facts, album information, or tour details. 
      Return ONLY a JSON object with this exact format:
      {
        "question": "question text here",
        "options": ["option1", "option2", "option3", "option4"],
        "correctAnswer": "correct option text",
        "category": "category name"
      }`

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Gemini API error: ${response.status} - ${errorText}`)
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Invalid response format from Gemini API")
      }

      const generatedText = data.candidates[0].content.parts[0].text

      // Parse the JSON response
      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, "").trim()
      const questionData = JSON.parse(cleanedText)

      // Validate the response structure
      if (!questionData.question || !questionData.options || !questionData.correctAnswer || !questionData.category) {
        throw new Error("Invalid question format from AI")
      }

      return questionData
    } catch (error) {
      console.error("Gemini API Error:", error)
      // Return a fallback question if API fails
      return this.getFallbackQuestion()
    }
  }

  static async generateFunFact() {
    try {
      const prompt = `Generate a short, interesting fun fact about One Direction. 
      Keep it under 100 words and focus on lesser-known facts about the band members, 
      their music, or their journey. Do not include song lyrics. 
      End with an appropriate emoji.`

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Invalid response format from Gemini API")
      }

      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error("Gemini API Error:", error)
      return this.getFallbackFunFact()
    }
  }

  static async generateStoryResponse(userStory: string) {
    try {
      const prompt = `A fan just shared this One Direction story: "${userStory}"
      
      Generate a short, heartfelt response (2-3 sentences) that acknowledges their story 
      and connects with their One Direction experience. Be supportive and understanding. 
      Use appropriate emojis and keep the tone warm and friendly.`

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 256,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Invalid response format from Gemini API")
      }

      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error("Gemini API Error:", error)
      return this.getFallbackStoryResponse()
    }
  }

  // Fallback methods for when API is unavailable
  static getFallbackQuestion() {
    const fallbackQuestions = [
      {
        question: "What year did One Direction go on hiatus?",
        options: ["2015", "2016", "2017", "2018"],
        correctAnswer: "2016",
        category: "Band History",
      },
      {
        question: "Which member was known for his fear of spoons?",
        options: ["Harry Styles", "Liam Payne", "Louis Tomlinson", "Niall Horan"],
        correctAnswer: "Liam Payne",
        category: "Fun Facts",
      },
      {
        question: "What was One Direction's first number one single in the UK?",
        options: ["What Makes You Beautiful", "Gotta Be You", "One Thing", "Live While We're Young"],
        correctAnswer: "What Makes You Beautiful",
        category: "Music",
      },
      {
        question: "Which member is from Mullingar, Ireland?",
        options: ["Harry Styles", "Niall Horan", "Louis Tomlinson", "Zayn Malik"],
        correctAnswer: "Niall Horan",
        category: "Members",
      },
      {
        question: "What was the name of One Direction's documentary film?",
        options: ["This Is Us", "Where We Are", "On the Road Again", "Made in the A.M."],
        correctAnswer: "This Is Us",
        category: "Movies",
      },
    ]

    return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
  }

  static getFallbackFunFact() {
    const fallbackFacts = [
      "One Direction was the first group in US Billboard 200 history to have their first four albums debut at number one! 🏆",
      "Harry Styles was working in a bakery before joining One Direction! 🥖",
      "Niall Horan taught himself to play guitar by watching YouTube videos! 🎸",
      "Louis Tomlinson was originally going to audition for The X Factor as part of a different group! 🎤",
      "Liam Payne auditioned for The X Factor twice before joining One Direction! ⭐",
      "Zayn Malik almost didn't show up to his X Factor audition because he was nervous! 😅",
    ]

    return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]
  }

  static getFallbackStoryResponse() {
    const fallbackResponses = [
      "Thank you for sharing your beautiful One Direction story! 💕 Your memories are what keep the 1D spirit alive in all of us. ✨",
      "What an amazing One Direction memory! 🖤 Stories like yours remind us why their music means so much to so many people. 💫",
      "Your One Direction story is so heartwarming! 💝 It's incredible how their music continues to bring joy and connection to fans worldwide. 🌟",
      "Thank you for opening your heart and sharing that with us! 💕 One Direction's impact on our lives is truly special. ✨",
    ]

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }

  // Check if API is available
  static async checkApiAvailability() {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Test",
                },
              ],
            },
          ],
        }),
      })

      return response.ok
    } catch (error) {
      console.error("API availability check failed:", error)
      return false
    }
  }
}
