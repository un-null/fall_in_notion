'use client'

import { FC } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { signIn, signOut, useSession } from 'next-auth/react'

import Logo from '../../assets/svgs/logo.svg'

export const Header: FC = () => {
  const { data: session } = useSession()

  const path = usePathname()

  return (
    <header className="w-full h-14 border-b bg-white sticky top-0 px-4">
      <div className="h-full flex justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex space-x-2 items-center">
            <Logo width={28} height={28} />
            <p className="font-semibold">Fall in Notion</p>
          </div>
        </Link>

        <nav>
          {path === '/' && (
            <button
              onClick={() => {
                session ? signOut() : signIn()
              }}
              className="w-full bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-xs md:text-sm font-medium text-white"
            >
              {session ? 'SignOut' : 'SignIn'}
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
