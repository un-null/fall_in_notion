'use client'

import { FC } from 'react'

import { signIn, signOut } from 'next-auth/react'

type ButtonProps = {
  children: string
  mode?: 'signIn' | 'singOut'
  href?: string
}

export const Button: FC<ButtonProps> = ({ children, mode, href }) => {
  return !href ? (
    <button
      className="bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-sm font-medium text-white"
      onClick={() =>
        mode && mode === 'signIn'
          ? signIn('twitter', { callbackUrl: '/app' })
          : signOut({ callbackUrl: '/' })
      }
    >
      {children}
    </button>
  ) : (
    <a
      className="bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-sm font-medium text-white"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  )
}
