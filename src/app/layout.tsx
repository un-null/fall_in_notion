import '../app/libs/Tailwind.css'
import { FC, ReactNode } from 'react'

import { Footer, Header } from './components/Layout'

type Props = {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html>
      <body className="w-screen min-h-screen grid grid-rows-layout bg-[#FAFAFA]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
