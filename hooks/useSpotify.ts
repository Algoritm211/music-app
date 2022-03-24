import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

export const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})


export const useSpotify = () => {
  const {data: session} = useSession();

  const setupAPI = async () => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        await signIn()
      }

      // @ts-ignore
      await spotifyAPI.setAccessToken(session.user.accessToken)
    }
  }

  useEffect(() => {
    setupAPI();
  }, [session])

  return spotifyAPI;
}
