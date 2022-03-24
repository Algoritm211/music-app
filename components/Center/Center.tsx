import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

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
  const [color, setColor] = useState('from-green-700')

  useEffect(() => {
    setColor(colors[Math.round(Math.random() * colors.length)])
  }, [])

  return (
    <div className='bg-white flex-grow text-white'>
      <header className='absolute top-5 right-8'>
        <div className='flex items-center space-x-3
        bg-black cursor-pointer rounded-full p-1 pr-2 hover:opacity-80'>
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
        <h1>Some text</h1>
      </section>
    </div>
  )
}

export default Center
