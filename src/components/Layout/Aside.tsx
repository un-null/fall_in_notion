'use client'
import { FC } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { DashboardIcon, GearIcon, PaperPlaneIcon } from '@radix-ui/react-icons'

export const Aside: FC = () => {
  const path = usePathname()

  const navItems = [
    {
      icon: <DashboardIcon width={16} height={16} />,
      name: 'Home',
      slug: '/app',
    },
    {
      icon: <PaperPlaneIcon width={16} height={16} />,
      name: 'Send Likes',
      slug: '/app/sendTweets',
    },
  ]
  return (
    <aside className="hidden md:w-1/6 md:pt-5 md:px-2 md:border-r md:grid md:grid-rows-aside md:font-medium">
      <nav>
        <ul className="h-[90%] space-y-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`p-2 ${
                path === item.slug ? 'bg-notion-red/20' : ''
              } hover:bg-notion-red/50 rounded`}
            >
              <Link href={item.slug} className="flex items-center text-sm">
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="h-[10%]">
          <a
            href="/"
            className="flex items-center p-2 rounded text-sm hover:bg-notion-red/50"
          >
            <span className="mr-2">
              <GearIcon width={16} height={16} />
            </span>
            Settings
          </a>
        </div>
      </nav>
    </aside>
  )
}
