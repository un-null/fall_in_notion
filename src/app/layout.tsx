'use client'

import '../app/libs/Tailwind.css'
import { FC, ReactNode } from 'react'

import ProvidersWrapper from './ProvidersWrapper'
import { Footer, Header } from './components/Layout'

type Props = {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <ProvidersWrapper>
      <html>
        <body className="w-screen min-h-screen grid grid-rows-layout bg-[#FAFAFA]">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ProvidersWrapper>
  )
}

export default RootLayout
