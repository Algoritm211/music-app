import SpotifyWebApi from 'spotify-web-api-node';
import { URLSearchParams } from 'url'

const scopes = [
  'user-read-email',
  'playlist-read-email',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read'
].join(',');

const params = {
  scope: scopes
}

const queryStringParams = new URLSearchParams(params).toString();

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryStringParams}`

export const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})
