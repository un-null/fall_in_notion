import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMutateTweets = () => {
  const queryClient = useQueryClient()

  const sendTweetsMutation = useMutation(
    async (limit: number | undefined) => {
      const res = await fetch('/api/twitter/getLikedTweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json',
        },
        body: JSON.stringify(limit),
      })
      const data = res.json()
      return data
    },
    {
      onSuccess: (_data) => {
        alert('Sending completed!')
      },
      onError: (error: Error) => {
        alert(error.message)
      },
    }
  )

  return { sendTweetsMutation }
}
