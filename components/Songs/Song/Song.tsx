import React, { useState } from 'react'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { useSpotify } from '../../../hooks/useSpotify'
import { msToMinutesAndSeconds } from '../../../lib/time'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../../../recoilAtoms/songAtom'

interface SongProps {
  track: TrackObjectFull,
  order: number
}

const Song: React.FC<SongProps> = ({track, order}) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const onPlaySong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    // void spotifyApi.play({
    //   uris: [track.uri],
    // })
  }

  return (
    <div className='grid grid-cols-2 text-gray-500 py-4 rounded-lg cursor-pointer
    hover:bg-gray-900 px-5'
    onClick={onPlaySong}
    >
      <div className='flex items-center space-x-4'>
        <p>{order}</p>
        <img className='w-10 h-10' src={track.album.images[0].url} alt='track_img' />
        <div>
          <p className='w-36 lg:w-64 text-white truncate'>{track.name}</p>
          <p className='w-40'>{track.artists[0].name}</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='w-40 hidden md:inline'>{track.album.name}</p>
        <p>{msToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
