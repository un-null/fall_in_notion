import { FC } from 'react'

import {
  DoubleArrowRightIcon,
  HeartIcon,
  LockOpen2Icon,
  NotionLogoIcon,
} from '@radix-ui/react-icons'

import { Action } from '../../types'

type Props = Action

export const ActionCard: FC<Props> = ({ name, isLimit }) => {
  return (
    <a
      href={name === 'send' ? (isLimit ? undefined : 'sendTweets') : undefined}
      className="w-full min-w-full sm:min-w-0 shadow gap-4 py-4 hover:text-notion-red"
    >
      {name === 'send' ? (
        <div className="flex justify-center items-center gap-4 my-5">
          <HeartIcon width={20} height={20} />
          <DoubleArrowRightIcon width={12} height={12} />
          <NotionLogoIcon width={20} height={20} />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 my-5">
          <LockOpen2Icon width={20} height={20} />
        </div>
      )}
      <p className="text-sm font-medium text-center">
        {name === 'delete' ? 'Broken ♡' : 'Send ♡ To Notion'}
      </p>
    </a>
  )
}
