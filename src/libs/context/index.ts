import { createContext, Dispatch, SetStateAction } from 'react'

export const FormContext = createContext<{
  limit: number | undefined
  count: number
}>({
  limit: 0,
  count: 1,
})

export const FormDispatchContext = createContext<{
  setLimit: Dispatch<SetStateAction<number | undefined>>
  setCount: Dispatch<SetStateAction<number>>
}>({
  setLimit: () => {
    throw new Error('No default value!')
  },
  setCount: () => {
    throw new Error('No default value!')
  },
})
