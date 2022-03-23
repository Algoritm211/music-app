import React, { ProviderProps } from 'react'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

interface LoginProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const Login: React.FC<LoginProps> = ({ providers }) => {
  return (
    <div className='bg-black flex flex-col items-center justify-center min-h-screen'>
      <img className='w-52 mb-5' src='https://links.papareact.com/9xl' alt='logo' />
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button
              className='bg-green-400 text-white p-4 rounded-full'
              onClick={() => signIn(provider.id, {callbackUrl: '/'})}
            >
              Login with {provider.name}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Login

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  }
}
