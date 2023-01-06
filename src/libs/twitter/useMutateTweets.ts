import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LocalObj } from '../../types'

export const useMutateTweets = () => {
  const queryClient = useQueryClient()

  const sendTweetsMutation = useMutation(
    async (limit: number | undefined) => {
      await fetch('/api/twitter/getLikedTweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json',
        },
        body: JSON.stringify(limit),
      })
      return limit
    },
    {
      onSuccess: (data) => {
        if (data) {
          const prevLocal = localStorage.getItem('limit')
          console.log(data)

          // Fix ... ↓
          if (prevLocal) {
            const localObj: LocalObj = JSON.parse(prevLocal)
            const newItem = { ...localObj }
            newItem.value = String(data)
            console.log(newItem)

            localStorage.setItem('limit', JSON.stringify(newItem))
          } else {
            localStorage.setItem(
              'limit',
              JSON.stringify({
                value: String(data),
                expiry: new Date().getTime() + 60 * 15 * 1000,
              })
            )
          }
        }

        alert('Sending completed!')
      },
      onError: (error: Error) => {
        alert(error.message)
      },
    }
  )
  const removeTweetsMutation = useMutation(
    async (limit: number | undefined) => {
      await fetch('api/twitter/removeLikedTweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json',
        },
        // Fix rename ↓
        body: JSON.stringify(limit),
      })
    },
    {
      onSuccess: () => {
        // Fix ↓
        alert('Removeing completed')
      },
      onError: (error: Error) => {
        alert(error.message)
      },
    }
  )

  return { sendTweetsMutation, removeTweetsMutation }
}
