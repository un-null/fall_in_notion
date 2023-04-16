import { useMutation } from '@tanstack/react-query'

import { LocalItem } from '../../../types'

export const useMutateTweets = () => {
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

          if (prevLocal) {
            const localItem: LocalItem = JSON.parse(prevLocal)
            const cloneItem = { ...localItem }
            cloneItem.value = localItem.value + data

            localStorage.setItem('limit', JSON.stringify(cloneItem))
          } else {
            localStorage.setItem(
              'limit',
              JSON.stringify({
                value: data,
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
        body: JSON.stringify(limit),
      })
    },
    {
      onSuccess: () => {
        alert('Removeing completed')
      },
      onError: (error: Error) => {
        alert(error.message)
      },
    }
  )

  return { sendTweetsMutation, removeTweetsMutation }
}
