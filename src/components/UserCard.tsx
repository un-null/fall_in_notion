import { FC } from 'react'

import Image from 'next/image'

import {
  ChevronDownIcon,
  ChevronUpIcon,
  NotionLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'

import { NotionForm } from './NotionForm'

type Props = {
  name?: string | null
  email?: string | null
  image?: string | null
  iToken: string | undefined
  databaseId: string | undefined
}

export const UserCard: FC<Partial<Props>> = ({
  name,
  email,
  image,
  iToken,
  databaseId,
}) => {
  return (
    <div className="w-full max-w-2xl shadow rounded">
      <div className="flex justify-between items-stretch px-4 pt-4">
        <div className="flex flex-col justify-between">
          <div className="flex space-x-2 justify-start">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${name}`}
              className="p-2 sm:p-3 border hover:text-twitter-blue rounded"
            >
              <TwitterLogoIcon
                width={20}
                height={20}
                className="sm:w-6 sm:h-6"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.notion.so/${databaseId}`}
              className="p-2 sm:p-3 border hover:text-notion-red rounded"
            >
              <NotionLogoIcon
                width={20}
                height={20}
                className="sm:w-6 sm:h-6"
              />
            </a>
          </div>

          <a className="text-lg font-bold">@{name}</a>
        </div>
        <Image
          src={image ? image : ''}
          alt=""
          width={96}
          height={96}
          priority
          className="rounded md:w-32 md:h-32"
        />
      </div>

      <p className="text-sm text-gray-500 px-4 py-3">{email}</p>

      <details className="bg-gray-100 p-4 group">
        <summary className="flex justify-between">
          <div className="flex justify-start items-center space-x-1">
            <NotionLogoIcon width={16} height={16} />
            <p className="text-xs font-semibold">DataTable</p>
          </div>
          <div className="flex justify-start space-x-2 cursor-pointer hover:text-notion-red">
            <p className="text-xs font-semibold group-open:hidden">Confirm</p>
            <p className="text-xs font-semibold hidden group-open:inline">
              Close
            </p>

            <ChevronDownIcon
              width={16}
              height={16}
              className="group-open:hidden"
            />
            <ChevronUpIcon
              width={16}
              height={16}
              className="hidden group-open:inline"
            />
          </div>
        </summary>

        <div className="my-5 grid place-items-center">
          <NotionForm mode="edit" integration={iToken} database={databaseId} />
        </div>
      </details>
    </div>
  )
}
