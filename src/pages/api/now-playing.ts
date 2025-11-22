import type { APIRoute } from 'astro';
import { getNowPlaying } from '../../services/spotify';
import type { SpotifyApiResponse, SpotifyNowPlayingResponse } from '../../types';

export const GET: APIRoute = async () => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    console.log('Spotify API Error or No Content:', response.status, response.statusText);
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const song: SpotifyApiResponse = await response.json();
  console.log('Spotify API Response:', JSON.stringify(song, null, 2));

  if (song.item === null || song.item === undefined) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const isPlaying = song.is_playing;
  const type = song.currently_playing_type;
  let title = '';
  let artist = '';
  let album = '';
  let albumImageUrl = '';
  let songUrl = '';

  if (type === 'episode') {
    title = song.item.name;
    artist = (song.item as any).show.name; // Episode type not in our simplified types
    albumImageUrl = (song.item as any).images?.[0]?.url || (song.item as any).show.images?.[0]?.url;
    songUrl = song.item.external_urls.spotify;
  } else if (type === 'track') {
    title = song.item.name;
    artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    album = song.item.album.name;
    albumImageUrl = song.item.album.images[0].url;
    songUrl = song.item.external_urls.spotify;
  }

  const nowPlayingResponse: SpotifyNowPlayingResponse = {
    isPlaying,
    track: isPlaying ? {
      name: title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      isPlaying,
    } : undefined,
  };

  return new Response(
    JSON.stringify(nowPlayingResponse),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    }
  );
};
