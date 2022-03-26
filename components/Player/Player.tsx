import React, { useCallback, useEffect, useState } from 'react'
import { useSpotify } from '../../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../../recoilAtoms/songAtom'
import { useSongInfo } from '../../hooks/useSongInfo'
import { useSession } from 'next-auth/react'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon as VolumeDownIcon,
  VolumeUpIcon
} from '@heroicons/react/solid'
import debounce from 'lodash.debounce';

const Player: React.FC = () => {
  const spotifyApi = useSpotify();
  const {data: session} = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const loadCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id! || '19vWDttuR4ZVBzUfQFsfPS')

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      loadCurrentSong()
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    })
  };

  const onChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(+event.target.value)
  }

  const debouncedAdjustVolume = useCallback(
    debounce((volume: number) => {
      console.log('changed')
      // spotifyApi.setVolume(volume)
    }, 500), [])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume]);
  return (
    <div className='grid grid-cols-3 text-xs md:text-base px-2 md:px-8 h-24
    bg-gradient-to-b from-black to-gray-900 text-white'>
      {/* Left */}
      <div className='flex items-center space-x-4'>
        <img
          className='hidden md:inline w-10 h-10'
          src={songInfo?.album.images[0].url} alt='current_song_img' />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists[0].name}</p>
        </div>
      </div>

      {/* Center */}
      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='button' />
        <RewindIcon className='button' />

        {isPlaying ? (
          <PauseIcon
            className='button w-10 h-10'
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className='button w-10 h-10'
            onClick={handlePlayPause}
          />
        )}

        <FastForwardIcon className='button' />
        <ReplyIcon className='button' />
      </div>

      {/* Right */}
      <div className='flex items-center space-x-3 md:space-x-4 justify-end'>
        <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className='button'/>
          <input
            className='w-14 md:w-28'
            type='range'
            min={0}
            max={100}
            value={volume}
            onChange={onChangeVolume}
          />
        <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className='button'/>
      </div>
    </div>
  )
}

export default Player
