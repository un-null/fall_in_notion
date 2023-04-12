import { FC } from 'react'

import { Action } from '../../types'

type Props = Action

export const ActionCard: FC<Props> = ({ name, isLimit }) => {
  // const color = name === 'delete' ? '#868e96' : '#1DA1F2'

  return (
    <a
      href={name === 'send' ? (isLimit ? undefined : 'sendTweets') : undefined}
      className="w-full min-w-full sm:min-w-0 shadow gap-4 py-4 hover:text-red-400"
    >
      {name === 'send' ? (
        <div className="flex justify-center items-center gap-4 my-5">
          Fall in Notion ?
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 my-5">
          Are you Broken ?
        </div>
      )}
      <p className="text-md font-semibold text-center text-[#868e96]">
        {name === 'delete' ? 'Comming soon ...' : 'Send ♡ To Notion'}
      </p>
    </a>
  )
}
