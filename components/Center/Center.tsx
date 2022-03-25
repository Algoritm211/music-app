import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../../recoilAtoms/playlistAtom'
import { useSpotify } from '../../hooks/useSpotify'
import { Songs } from '../Songs/Songs'

const colors = [
  'from-indigo-700',
  'from-blue-700',
  'from-green-700',
  'from-red-700',
  'from-yellow-700',
  'from-pink-700',
  'from-purple-700',
]

const Center: React.FC = () => {
  const {data: session} = useSession();
  const spotifyAPI = useSpotify();
  const [color, setColor] = useState('from-green-700');
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(colors[Math.round(Math.random() * colors.length - 1)])
  }, [playlistId]);

  useEffect(() => {
    spotifyAPI.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body)
    })
      .catch((err) => console.log('Something went wrong', err))
  }, [spotifyAPI, playlistId])

  return (
    <div className='bg-black flex-grow text-white h-screen overflow-y-scroll'>
      <header className='absolute top-5 right-8'>
        <div className='flex items-center space-x-3
        bg-black cursor-pointer rounded-full p-1 pr-2 hover:opacity-80'
        onClick={() => signOut()}
        >
          <img
            className='rounded-full w-10 h-10 f-10 object-cover'
            src='https://www.ubackground.com/_ph/84/696598180.jpg'
            alt='user_avatar' />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section className={`flex items-end space-x-7 h-80
        bg-gradient-to-b bg-black ${color}`}>
        <img className='w-44 h-44 shadow-2xl' src={playlist?.images?.[0].url} alt='album_cover'/>
        <div>
          <p>Playlist</p>
          <h1 className='font-bold md:text-3xl lg:text-4xl'>{playlist?.name}</h1>
        </div>
      </section>

      <section>
        <Songs />
      </section>
    </div>
  )
}

export default Center
