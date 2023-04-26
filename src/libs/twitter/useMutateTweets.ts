import { useMutation } from '@tanstack/react-query'

import { LocalItem } from '../../types'

export const useMutateTweets = () => {
  const sendTweetsMutation = useMutation(
    async (limit: number | undefined) => {
      await fetch('/api/twitter', {
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
      },
      onError: (error: Error) => {
        alert(error.message)
      },
    }
  )

  return { sendTweetsMutation }
}

// export const fetchTweets = async (limit: number | undefined) => {
//   try {
//     await fetch('/api/twitter', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application.json' },
//       body: JSON.stringify(limit),
//     })
//     return limit
//   } catch (error: any) {
//     alert(error.message)
//   } finally {
//     if (limit) {
//       const prevLocal = localStorage.getItem('limit')

//       if (prevLocal) {
//         const localItem: LocalItem = JSON.parse(prevLocal)
//         const cloneItem = { ...localItem }
//         cloneItem.value = localItem.value + limit

//         localStorage.setItem('limit', JSON.stringify(cloneItem))
//       } else {
//         localStorage.setItem(
//           'limit',
//           JSON.stringify({
//             value: limit,
//             expiry: new Date().getTime() + 60 * 15 * 1000,
//           })
//         )
//       }
//     }
//   }
// }
