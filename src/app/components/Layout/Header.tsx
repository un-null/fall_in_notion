import { FC } from 'react'

import Link from 'next/link'

import Logo from '../../assets/svgs/logo.svg'

export const Header: FC = () => {
  return (
    <header className="w-full h-14 border-b bg-white sticky top-0 px-4">
      <div className="max-w-screen-xl h-full flex justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex space-x-2 items-center">
            <Logo width={28} height={28} />
            <p className="font-semibold">Fall in Notion</p>
          </div>
        </Link>

        <nav>
          <button>Sign In</button>
        </nav>
      </div>
    </header>
  )
}
