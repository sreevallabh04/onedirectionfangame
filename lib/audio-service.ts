// This service provides local audio files as a fallback when Spotify previews aren't available

export interface AudioTrack {
  id: string
  name: string
  artist: string
  album: string
  albumCover: string
  audioUrl: string
  duration: number
}

export class AudioService {
  static getOneDirectionTracks(): AudioTrack[] {
    return [
      {
        id: "1",
        name: "What Makes You Beautiful",
        artist: "One Direction",
        album: "Up All Night",
        albumCover: "/images/up-all-night.jpeg",
        audioUrl: "/audio/what-makes-you-beautiful.mp3",
        duration: 30,
      },
      {
        id: "2",
        name: "Story of My Life",
        artist: "One Direction",
        album: "Midnight Memories",
        albumCover: "/images/midnight-memories.jpeg",
        audioUrl: "/audio/story-of-my-life.mp3",
        duration: 30,
      },
      {
        id: "3",
        name: "Night Changes",
        artist: "One Direction",
        album: "Four",
        albumCover: "/images/four-album.jpeg",
        audioUrl: "/audio/night-changes.mp3",
        duration: 30,
      },
      {
        id: "4",
        name: "Drag Me Down",
        artist: "One Direction",
        album: "Made in the A.M.",
        albumCover: "/images/made-in-am.jpeg",
        audioUrl: "/audio/drag-me-down.mp3",
        duration: 30,
      },
      {
        id: "5",
        name: "Perfect",
        artist: "One Direction",
        album: "Made in the A.M.",
        albumCover: "/images/made-in-am.jpeg",
        audioUrl: "/audio/perfect.mp3",
        duration: 30,
      },
      {
        id: "6",
        name: "Best Song Ever",
        artist: "One Direction",
        album: "Midnight Memories",
        albumCover: "/images/midnight-memories.jpeg",
        audioUrl: "/audio/best-song-ever.mp3",
        duration: 30,
      },
      {
        id: "7",
        name: "Live While We're Young",
        artist: "One Direction",
        album: "Take Me Home",
        albumCover: "/images/this-is-us.jpeg",
        audioUrl: "/audio/live-while-were-young.mp3",
        duration: 30,
      },
      {
        id: "8",
        name: "History",
        artist: "One Direction",
        album: "Made in the A.M.",
        albumCover: "/images/made-in-am.jpeg",
        audioUrl: "/audio/history.mp3",
        duration: 30,
      },
    ]
  }

  static convertToSpotifyFormat(tracks: AudioTrack[]) {
    return tracks.map((track) => ({
      id: track.id,
      name: track.name,
      artists: [{ name: track.artist }],
      album: {
        name: track.album,
        images: [{ url: track.albumCover }],
      },
      preview_url: track.audioUrl,
      external_urls: {
        spotify: `https://open.spotify.com/search/${encodeURIComponent(track.name + " " + track.artist)}`,
      },
      duration_ms: track.duration * 1000,
    }))
  }
}
