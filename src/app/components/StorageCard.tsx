import { FC } from 'react'

type Props = {
  limit: number
}

export const StorageCard: FC<Props> = ({ limit }) => {
  return (
    <div className="w-full max-w-2xl shadow mt-10 py-4">
      <div className="flex justify-between items-center">
        <div className="w-1/3 grid place-items-center">
          ♡{/* <IconHeart /> */}
        </div>
        <div className="flex-1 flex flex-col space-y-2 justify-items-center">
          <h4 className="text-xl font-semibold">Available Liked Tweets</h4>
          <p className="text-xs text-gray-500 font-semibold">
            {limit}
            <span className="text-xs text-gray-500 font-semibold mx-1">of</span>
            75 /<span className="ml-1 text-xs">15 min</span>
          </p>
          {/* <Progress color="pink" value={limit} /> */}
          <p>{limit}</p>
        </div>
      </div>
    </div>
  )
}
