import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar/Sidebar'
import Center from '../components/Center/Center'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-scroll'>
      <Head>
        <title>Music app</title>
      </Head>

      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div>{/*Player*/}</div>
    </div>
  )
}

export default Home


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    }
  }
}
