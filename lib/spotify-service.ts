import { AudioService } from "./audio-service"

export interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  preview_url: string | null
  external_urls: {
    spotify: string
  }
  duration_ms: number
}

export class SpotifyService {
  private static readonly CLIENT_ID = "907080387c894283a5b5d8a8af48e78c"
  private static readonly CLIENT_SECRET = "6f29d3ce787d49f1a2fbf9c5aa1b221d"
  private static accessToken: string | null = null
  private static tokenExpiry = 0

  static async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`)}`,
        },
        body: "grant_type=client_credentials",
      })

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status}`)
      }

      const data = await response.json()
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + data.expires_in * 1000 - 60000 // Refresh 1 minute early

      return this.accessToken
    } catch (error) {
      console.error("Failed to get Spotify access token:", error)
      throw error
    }
  }

  static async getOneDirectionTracks(): Promise<SpotifyTrack[]> {
    try {
      const accessToken = await this.getAccessToken()

      // Search for One Direction tracks
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=artist:"One Direction"&type=track&limit=50&market=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (!searchResponse.ok) {
        throw new Error(`Spotify search failed: ${searchResponse.status}`)
      }

      const searchData = await searchResponse.json()

      // Filter to only include tracks where One Direction is the main artist
      const oneDirectionTracks = searchData.tracks.items.filter((track: any) =>
        track.artists.some((artist: any) => artist.name === "One Direction"),
      )

      // Sort tracks to prioritize those with preview URLs
      oneDirectionTracks.sort((a: any, b: any) => {
        // First prioritize tracks with preview URLs
        if (a.preview_url && !b.preview_url) return -1
        if (!a.preview_url && b.preview_url) return 1
        // Then sort by popularity
        return b.popularity - a.popularity
      })

      return oneDirectionTracks.slice(0, 20) // Return top 20 tracks
    } catch (error) {
      console.error("Spotify API Error:", error)
      return this.getFallbackTracks()
    }
  }

  static async getOneDirectionAlbums(): Promise<any[]> {
    try {
      const accessToken = await this.getAccessToken()

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=artist:"One Direction"&type=album&limit=50&market=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Spotify albums search failed: ${response.status}`)
      }

      const data = await response.json()

      // Filter to only include One Direction albums
      const oneDirectionAlbums = data.albums.items.filter((album: any) =>
        album.artists.some((artist: any) => artist.name === "One Direction"),
      )

      return oneDirectionAlbums
    } catch (error) {
      console.error("Failed to fetch One Direction albums:", error)
      return []
    }
  }

  static async getAlbumTracks(albumId: string): Promise<SpotifyTrack[]> {
    try {
      const accessToken = await this.getAccessToken()

      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?market=US`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Album tracks fetch failed: ${response.status}`)
      }

      const data = await response.json()
      return data.items
    } catch (error) {
      console.error("Failed to fetch album tracks:", error)
      return []
    }
  }

  static getFallbackTracks(): SpotifyTrack[] {
    return [
      {
        id: "4Km5HrUvYTaSUfiSGPJeQR",
        name: "What Makes You Beautiful",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Up All Night",
          images: [{ url: "/images/up-all-night.jpeg" }],
        },
        preview_url: "/audio/what-makes-you-beautiful.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/4Km5HrUvYTaSUfiSGPJeQR",
        },
        duration_ms: 30000,
      },
      {
        id: "7MXVkk9YMctZqd1Srtv4MB",
        name: "Story of My Life",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Midnight Memories",
          images: [{ url: "/images/midnight-memories.jpeg" }],
        },
        preview_url: "/audio/story-of-my-life.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
        },
        duration_ms: 30000,
      },
      {
        id: "1iNZlqnKLdRK5trOaByMgb",
        name: "Night Changes",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Four",
          images: [{ url: "/images/four-album.jpeg" }],
        },
        preview_url: "/audio/night-changes.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/1iNZlqnKLdRK5trOaByMgb",
        },
        duration_ms: 30000,
      },
      {
        id: "3Kkjo3cT83cw09VJyrLNwX",
        name: "Drag Me Down",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Made in the A.M.",
          images: [{ url: "/images/made-in-am.jpeg" }],
        },
        preview_url: "/audio/drag-me-down.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/3Kkjo3cT83cw09VJyrLNwX",
        },
        duration_ms: 30000,
      },
      {
        id: "4W8niZpiMy6qz1jCUdwzKo",
        name: "Perfect",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Made in the A.M.",
          images: [{ url: "/images/made-in-am.jpeg" }],
        },
        preview_url: "/audio/perfect.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/4W8niZpiMy6qz1jCUdwzKo",
        },
        duration_ms: 30000,
      },
      {
        id: "3QGsuHI8jO1Rx4JWLUh9jd",
        name: "Best Song Ever",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Midnight Memories",
          images: [{ url: "/images/midnight-memories.jpeg" }],
        },
        preview_url: "/audio/best-song-ever.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/3QGsuHI8jO1Rx4JWLUh9jd",
        },
        duration_ms: 30000,
      },
      {
        id: "0BxE4FqsDD1Ot4YuBXwn8F",
        name: "Live While We're Young",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Take Me Home",
          images: [{ url: "/images/this-is-us.jpeg" }],
        },
        preview_url: "/audio/live-while-were-young.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/0BxE4FqsDD1Ot4YuBXwn8F",
        },
        duration_ms: 30000,
      },
      {
        id: "1ZMiCix7XSAbfAJlEZWMCp",
        name: "History",
        artists: [{ name: "One Direction" }],
        album: {
          name: "Made in the A.M.",
          images: [{ url: "/images/made-in-am.jpeg" }],
        },
        preview_url: "/audio/history.mp3",
        external_urls: {
          spotify: "https://open.spotify.com/track/1ZMiCix7XSAbfAJlEZWMCp",
        },
        duration_ms: 30000,
      },
    ]
  }

  // Get tracks with guaranteed preview URLs
  static async getTracksWithPreviews(): Promise<SpotifyTrack[]> {
    try {
      const allTracks = await this.getOneDirectionTracks()
      // Filter to only include tracks with preview URLs
      const tracksWithPreviews = allTracks.filter((track) => track.preview_url)

      if (tracksWithPreviews.length > 0) {
        return tracksWithPreviews
      }

      // If no tracks with previews, return fallback tracks with local audio
      return this.getFallbackTracksWithPreviews()
    } catch (error) {
      console.error("Failed to get tracks with previews:", error)
      return this.getFallbackTracksWithPreviews()
    }
  }

  // Get fallback tracks with local audio files
  static getFallbackTracksWithPreviews(): SpotifyTrack[] {
    return AudioService.convertToSpotifyFormat(AudioService.getOneDirectionTracks())
  }
}
