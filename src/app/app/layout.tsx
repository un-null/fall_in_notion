import { FC, ReactNode, Suspense } from 'react'

import { Aside } from '../../components/Layout/Aside'
import Spinner from '../../components/Spinner'

type Props = {
  children: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full flex">
      <Aside />
      <div className="flex-1">
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </div>
    </div>
  )
}

export default AppLayout
