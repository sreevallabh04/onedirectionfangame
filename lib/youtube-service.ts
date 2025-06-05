const YOUTUBE_API_KEY = "AIzaSyBxuNzyDQNqKCPSHZznWbMaXohz9-rpJXg"

export class YouTubeService {
  static async getOneDirectionVideos() {
    try {
      // Use a Next.js API route to avoid CORS issues
      const response = await fetch("/api/youtube-videos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.items || this.getFallbackPlaylist()
    } catch (error) {
      console.error("YouTube API Error:", error)
      return this.getFallbackPlaylist()
    }
  }

  static getFallbackPlaylist() {
    return [
      {
        id: { videoId: "QJO3ROT-A4E" },
        snippet: {
          title: "One Direction - What Makes You Beautiful (Official Video)",
          thumbnails: {
            medium: { url: "/placeholder.svg?height=180&width=320" },
            default: { url: "/placeholder.svg?height=120&width=160" },
          },
          description: "Official music video for What Makes You Beautiful",
        },
      },
      {
        id: { videoId: "syFZfO_wfMQ" },
        snippet: {
          title: "One Direction - Night Changes (Official Video)",
          thumbnails: {
            medium: { url: "/placeholder.svg?height=180&width=320" },
            default: { url: "/placeholder.svg?height=120&width=160" },
          },
          description: "Official music video for Night Changes",
        },
      },
      {
        id: { videoId: "AbPED9bisSc" },
        snippet: {
          title: "One Direction - Live While We're Young (Official Video)",
          thumbnails: {
            medium: { url: "/placeholder.svg?height=180&width=320" },
            default: { url: "/placeholder.svg?height=120&width=160" },
          },
          description: "Official music video for Live While We're Young",
        },
      },
      {
        id: { videoId: "W-TE_Ys4iwM" },
        snippet: {
          title: "One Direction - Best Song Ever (Official Video)",
          thumbnails: {
            medium: { url: "/placeholder.svg?height=180&width=320" },
            default: { url: "/placeholder.svg?height=120&width=160" },
          },
          description: "Official music video for Best Song Ever",
        },
      },
      {
        id: { videoId: "o_v9MY_FMcw" },
        snippet: {
          title: "One Direction - Story of My Life (Official Video)",
          thumbnails: {
            medium: { url: "/placeholder.svg?height=180&width=320" },
            default: { url: "/placeholder.svg?height=120&width=160" },
          },
          description: "Official music video for Story of My Life",
        },
      },
    ]
  }
}
