'use client'
import { ComponentProps, FC, useContext } from 'react'

import { useRouter } from 'next/navigation'

import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import Balancer from 'react-wrap-balancer'

import { FormContext, FormDispatchContext } from '../libs/context'
import { fetchLimit, useMutateTweets } from '../libs/twitter'

export const SendTweetsForm: FC = () => {
  const router = useRouter()

  const { count, limit } = useContext(FormContext)
  const { setCount, setLimit } = useContext(FormDispatchContext)

  const limitCache = fetchLimit()
  const { sendTweetsMutation } = useMutateTweets()

  const max = limitCache ? 75 - limitCache : 75
  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault()

    try {
      setCount(2)
      await sendTweetsMutation.mutateAsync(limit)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setCount(3)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        {count === 1 && (
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="mt-10 w-full p-4 rounded bg-white shadow">
              <p className="text-sm sm:text-base font-medium text-center leading-6">
                <Balancer>
                  Notionのデータベースに送るいいねツイートの数を入力してください。
                  <br />
                  一度に最大で 75 ツイートを送信することができます。
                </Balancer>
              </p>
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={limit}
              max={max}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-14 px-3 py-2 mt-1 my-4 text-sm bg-transparent outline-none border focus:border-notion-red rounded"
            />
            <button
              type="submit"
              className="bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-sm font-medium text-white flex items-center"
            >
              Next
              <span className="ml-2">
                <DoubleArrowRightIcon width={16} height={16} />
              </span>
            </button>
          </div>
        )}
      </form>

      {(count === 2 || sendTweetsMutation.isLoading) && (
        <div className="flex flex-col justify-center items-center mt-5 space-y-4">
          <div className="mt-10 w-full p-4 rounded bg-white shadow">
            <p className="text-sm sm:text-base font-medium text-center leading-6">
              Wait a minute...
            </p>
          </div>
          <div className="animate-spin h-8 w-8 border-2 border-notion-red rounded-full border-t-transparent"></div>
        </div>
      )}

      {count === 3 && (
        <div className="grid place-items-center">
          <div className="mt-10 w-full p-4 rounded bg-white shadow">
            <p className="text-sm sm:text-base font-medium text-center leading-6">
              🎉 Completed !!!
            </p>
          </div>
          <button
            onClick={() => router.push('/app')}
            className="bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-sm font-medium text-white flex items-center mt-4"
          >
            Go Home
          </button>
        </div>
      )}
    </div>
  )
}
