import { LocalItem } from '../../types'

export const fetchLimit = () => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem('limit')

    if (!item) return 0

    const limitObj: LocalItem = JSON.parse(item)

    if (new Date().getTime() > Number(limitObj.expiry)) {
      localStorage.removeItem('limit')
      return 0
    }

    return Number(limitObj.value)
  }
}
