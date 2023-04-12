'use client'
import { FC, useState } from 'react'

import Image from 'next/image'

import { useSession } from 'next-auth/react'

import { NotionForm } from './NotionForm'

type Props = {
  name?: string | null
  email?: string | null
  image?: string | null
}

// const useStyles = createStyles(() => ({
//   textGroup: {
//     cursor: 'pointer',
//     '&:hover': {
//       color: '#1DA1F2',
//     },
//   },
//   chevronRight: {
//     '&:hover': {
//       color: '#1DA1F2',
//     },
//   },
// }))

export const UserCard: FC<Partial<Props>> = ({ name, email, image }) => {
  const [opened, setOpened] = useState(false)
  const { data: session } = useSession()

  // const media = useMediaQuery('(max-width: 430px)')

  return (
    <div className="w-full max-w-2xl shadow rounded">
      <div className="flex justify-between items-stretch p-4">
        <div className="flex flex-col justify-between">
          {/* Fix Action Icon ? ↓ */}
          <div className="flex space-x-2 justify-start">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${name}`}
              className="p-3 bg-gray-200 hover:text-red-400"
            >
              {/* <IconBrandTwitter size={media ? 20 : 24} /> */}
              Twi
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.notion.so/${session?.user.database_id}`}
              className="p-3 bg-gray-200 hover:text-red-400"
            >
              {/* <IconBrandNotion size={media ? 24 : 28} /> */}
              Not
            </a>
          </div>

          <a className="text-lg font-bold">@{name}</a>
        </div>
        <Image src={image ? image : ''} alt="" width={125} height={125} />
      </div>

      <p className="text-sm text-gray-500 px-4 pb-2">{email}</p>

      <div className="bg-gray-100 p-4">
        <div className="flex justify-between pl-3 pr-4">
          <div className="flex justify-start">
            {/* <IconBrandNotion color="#2C2E33" /> */}
            <p className="text-xs font-bold">Notion:DataTable</p>
          </div>
          <div className="flex justify-start space-x-4 cursor-pointer">
            <p
              className="text-xs font-bold"
              // onClick={() => setOpened((o) => !o)}
            >
              {opened ? 'Close' : 'Confirm'}
            </p>
            {/* <IconChevronRight size={16} className={classes.chevronRight} /> */}
            <p className="text-xs">--</p>
          </div>
        </div>

        <div className="my-5 grid place-items-center">
          <NotionForm mode="edit" />
        </div>
      </div>
    </div>
  )
}
