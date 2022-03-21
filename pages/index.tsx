import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-scroll'>
      <Head>
        <title>Music app</title>
      </Head>

      <main>
        <Sidebar />
        {/*Center*/}
      </main>

      <div>{/*Player*/}</div>
    </div>
  )
}

export default Home
