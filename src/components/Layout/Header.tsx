'use client'

import { FC } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { signIn, signOut, useSession } from 'next-auth/react'

import Logo from '../../assets/svgs/logo.svg'

export const Header: FC = () => {
  const { data: session, status } = useSession()

  const path = usePathname()

  return (
    <header className="w-full h-14 border-b bg-white sticky top-0 px-4">
      <div className="h-full flex justify-between items-center mx-auto">
        <Link
          href={session ? '/app' : '/'}
          className="flex space-x-2 items-center"
        >
          <Logo width={28} height={28} />
          <p className="font-semibold">Fall in Notion</p>
        </Link>

        <>
          {path === '/app' && (
            <button
              onClick={() => {
                session
                  ? signOut({ callbackUrl: '/' })
                  : signIn('twitter', { callbackUrl: '/app' })
              }}
              className="w-fit bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-xs md:text-sm font-medium text-white"
            >
              {status === 'loading' ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 text-white border-t-transparent"></div>
              ) : session ? (
                'SignOut'
              ) : (
                'SignIn'
              )}
            </button>
          )}
          {path === '/' && (
            <button
              onClick={() => {
                signIn('twitter', { callbackUrl: '/app' })
              }}
              className="w-fit bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-xs md:text-sm font-medium text-white"
            >
              SignIn
            </button>
          )}
        </>
      </div>
    </header>
  )
}
