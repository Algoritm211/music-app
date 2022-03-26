import { useSpotify } from './useSpotify'
import { useEffect, useState } from 'react'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../recoilAtoms/songAtom'

export const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<TrackObjectFull | null>(null);

  const loadSongInfo = async () => {
    if (currentTrackId) {
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          }
        }
      ).then((res) => res.json()) as TrackObjectFull

      setSongInfo(trackInfo);
    }
  }

  useEffect(() => {
    loadSongInfo();
  }, [currentTrackId, spotifyApi]);


  return songInfo;
}
