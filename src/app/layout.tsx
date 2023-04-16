'use client'

import './libs/Tailwind.css'
import { FC, ReactNode } from 'react'

import ProvidersWrapper from './ProvidersWrapper'
import { Header } from './components/Layout'

type Props = {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <ProvidersWrapper>
      <html lang="ja">
        <body className="w-screen min-h-screen grid grid-rows-layout bg-[#FAFAFA]">
          <Header />
          {children}
        </body>
      </html>
    </ProvidersWrapper>
  )
}

export default RootLayout
