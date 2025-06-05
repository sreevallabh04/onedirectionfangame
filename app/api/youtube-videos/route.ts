import { NextResponse } from "next/server"

const YOUTUBE_API_KEY = "AIzaSyBxuNzyDQNqKCPSHZznWbMaXohz9-rpJXg"
const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3"

export async function GET() {
  try {
    const searchQueries = [
      "One Direction What Makes You Beautiful official",
      "One Direction Night Changes official",
      "One Direction Live While We're Young official",
      "One Direction Best Song Ever official",
      "One Direction Story of My Life official",
      "One Direction Drag Me Down official",
      "One Direction Perfect official",
      "One Direction History official",
    ]

    const allVideos = []

    // Fetch videos for each search query
    for (const query of searchQueries.slice(0, 3)) {
      // Limit to avoid quota issues
      try {
        const response = await fetch(
          `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${YOUTUBE_API_KEY}`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        )

        if (response.ok) {
          const data = await response.json()
          if (data.items) {
            allVideos.push(...data.items)
          }
        }
      } catch (error) {
        console.error(`Error fetching videos for query "${query}":`, error)
      }
    }

    // If we got some videos, return them
    if (allVideos.length > 0) {
      return NextResponse.json({ items: allVideos })
    }

    // If no videos were fetched, return fallback
    return NextResponse.json({
      items: getFallbackPlaylist(),
      fallback: true,
    })
  } catch (error) {
    console.error("YouTube API Route Error:", error)

    // Return fallback playlist on any error
    return NextResponse.json({
      items: getFallbackPlaylist(),
      fallback: true,
      error: error.message,
    })
  }
}

function getFallbackPlaylist() {
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
        publishedAt: "2011-08-19T16:28:26Z",
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
        publishedAt: "2014-11-21T17:00:07Z",
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
        publishedAt: "2012-09-20T16:28:26Z",
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
        publishedAt: "2013-07-22T16:00:33Z",
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
        publishedAt: "2013-10-28T17:00:07Z",
      },
    },
  ]
}
