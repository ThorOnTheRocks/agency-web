import type { APIRoute } from 'astro';
import { getNowPlaying } from '../../lib/spotify';

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

  const song = await response.json();
  console.log('Spotify API Response:', JSON.stringify(song, null, 2));

  if (song.item === null) {
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
    artist = song.item.show.name;
    albumImageUrl = song.item.images?.[0]?.url || song.item.show.images?.[0]?.url;
    songUrl = song.item.external_urls.spotify;
  } else if (type === 'track') {
    title = song.item.name;
    artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    album = song.item.album.name;
    albumImageUrl = song.item.album.images[0].url;
    songUrl = song.item.external_urls.spotify;
  }

  return new Response(
    JSON.stringify({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    }
  );
};
