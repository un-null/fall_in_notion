import { FC, ReactNode } from 'react'

import { Aside } from '../../components/Layout/Aside'

type Props = {
  children: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full flex">
      <Aside />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default AppLayout
