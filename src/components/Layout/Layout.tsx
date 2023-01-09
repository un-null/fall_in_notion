import { FC, ReactNode } from 'react'

import Head from 'next/head'

import { createStyles } from '@mantine/core'

import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  label: string
  children: ReactNode
}

const useStyles = createStyles(() => ({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    margin: '0 auto',
    backgroundColor: '#FAFAFA',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
  },
  main: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  },
}))

export const Layout: FC<Props> = ({ label, children }) => {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Head>
        <title>{label}</title>
      </Head>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  )
}
