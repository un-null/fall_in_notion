import { useQuery } from '@tanstack/react-query'

import { LocalItem } from '../../types'

export const useQueryLimit = () => {
  const fetchLocalStorage = () => {
    const item = localStorage.getItem('limit')

    if (!item) return 0

    const limitObj: LocalItem = JSON.parse(item)

    if (new Date().getTime() > Number(limitObj.expiry)) {
      localStorage.removeItem('limit')
      return 0
    }

    return Number(limitObj.value)
  }

  return useQuery({
    queryKey: ['limit'],
    queryFn: fetchLocalStorage,
    onSuccess: (_data) => {},
  })
}
