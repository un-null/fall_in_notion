import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    },
    {
      onSuccess: () => {
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
