import React, { useEffect, useState } from 'react'
import { HeartIcon, HomeIcon, LibraryIcon, LogoutIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useSpotify } from '../../hooks/useSpotify'
import ListOfUsersPlaylistsResponse = SpotifyApi.ListOfUsersPlaylistsResponse
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../../recoilAtoms/playlistAtom'

const Sidebar: React.FC = () => {
  const spotifyApi = useSpotify();
  const {data: session} = useSession();
  const [playlists, setPlaylists] = useState<ListOfUsersPlaylistsResponse['items']>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      })
    }
  }, [session, spotifyApi])

  const onPickPlaylist = (id: string) => {
    setPlaylistId(id)
  }

  const playlistsBlock = playlists.map((playlist) => {
    return (
      <p
        key={playlist.id}
        onClick={() => onPickPlaylist(playlist.id)}
        className='cursor-pointer hover:text-white'>
        {playlist.name}
      </p>
    )
  })

  return (
    <nav className='text-gray-500 text-xs lg:text-sm p-5 overflow-y-scroll
    h-screen sm:max-w=[12rem] lg:max-w-[15rem] hidden md:block'>
      <div className='space-y-4'>
        <button
          className='flex items-center space-x-2 hover:text-white'
          onClick={() => signOut({callbackUrl: '/'})}
        >
          <LogoutIcon className='h-5 w-5' />
          <p>Logout</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Your library</p>
        </button>

        <hr className='border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Create playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your episodes</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Liked songs</p>
        </button>

        <hr className='border-gray-900' />
        {/* Here will be playlists... */}
        {playlistsBlock}
      </div>
    </nav>
  )
}

export default Sidebar
