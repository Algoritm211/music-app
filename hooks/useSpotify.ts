import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

export const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})


export const useSpotify = () => {
  const {data: session} = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        void signIn()
      }

      // @ts-ignore
      spotifyAPI.setAccessToken(session.user.accessToken)
    }

  }, [session])

  return spotifyAPI;
}
