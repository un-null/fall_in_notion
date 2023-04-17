import { FC } from 'react'

import { HeartFilledIcon } from '@radix-ui/react-icons'
import * as Progress from '@radix-ui/react-progress'

type Props = {
  limit: number
}

export const StorageCard: FC<Props> = ({ limit }) => {
  return (
    <div className="w-full max-w-2xl shadow mt-10 py-4">
      <div className="flex justify-between items-center">
        <div className="w-1/3 grid place-items-center">
          <HeartFilledIcon
            width={28}
            height={28}
            className="text-twitter-pink md:w-9 md:h-9"
          />
        </div>
        <div className="flex-1 flex flex-col space-y-1 justify-items-center">
          <h4 className="text-lg font-semibold">Available Liked Tweets</h4>
          <p className="text-xs text-gray-500 font-semibold">
            {limit}
            <span className="text-xs text-gray-500 font-semibold mx-1">of</span>
            75 /<span className="ml-1 text-xs">15 min</span>
          </p>
          <Progress.Root
            value={limit}
            max={75}
            className="w-[90%] md:w-[60%] h-2 rounded relative overflow-hidden bg-gray-200"
          >
            <Progress.Indicator
              className="bg-twitter-pink w-full h-full"
              style={{ transform: `translateX(-${75 - limit}%)` }}
            />
          </Progress.Root>
        </div>
      </div>
    </div>
  )
}
