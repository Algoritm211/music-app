import React from 'react'
import { HeartIcon, HomeIcon, LibraryIcon, LogoutIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'

const Sidebar: React.FC = () => {
  return (
    <nav className='text-gray-500 p-5'>
      <div className='space-y-4'>
        <button
          className='flex items-center space-x-2 hover:text-white'
          onClick={() => signOut()}
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
        <p className='cursor-pointer hover:text-white'>
          Some playlist...
        </p>
      </div>
    </nav>
  )
}

export default Sidebar
