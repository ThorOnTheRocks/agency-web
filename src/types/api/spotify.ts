// Spotify track information
export interface SpotifyTrack {
  name: string;
  artist: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  isPlaying: boolean;
}

// Spotify API response
export interface SpotifyNowPlayingResponse {
  isPlaying: boolean;
  track?: SpotifyTrack;
  error?: string;
}

// Raw Spotify API types (from their API)
export interface SpotifyApiTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyApiResponse {
  is_playing: boolean;
  currently_playing_type?: 'track' | 'episode'; item?: SpotifyApiTrack;
}
