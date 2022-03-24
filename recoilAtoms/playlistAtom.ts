import { atom } from 'recoil';
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse

export const playlistState = atom({
  key: 'playlistAtomState',
  default: null as unknown as SinglePlaylistResponse,
})

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '4LnTQT9pZuyXG96WS9RNzU',
})
