import { env } from '../../lib/env';

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const refresh_token = env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

/**
 * Get Spotify access token using refresh token
 */
async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
}

/**
 * Get currently playing track from Spotify
 */
export async function getNowPlaying(): Promise<Response> {
  const { access_token } = await getAccessToken();

  return fetch(`${NOW_PLAYING_ENDPOINT}?additional_types=episode`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
