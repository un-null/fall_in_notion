import { FC } from 'react'

import Link from 'next/link'

import { Button, Center, createStyles, Flex } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'

const useStyles = createStyles((theme) => ({
  header: {
    width: '100%',
    height: '56px',
    margin: '0 auto',
    padding: '0 16px',
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
    backgroundColor: 'white',
    display: 'grid',
    placeItems: 'center',
  },
}))

export const Header: FC = () => {
  const { data: session } = useSession()
  const { classes } = useStyles()

  return (
    <header className={classes.header}>
      <Flex
        justify="space-between"
        align="center"
        w="100%"
        maw={1200}
        mx="auto"
      >
        <Link href="/">Logo</Link>

        {session ? (
          <Button color="cyan" onClick={() => signOut()}>
            SignOut
          </Button>
        ) : (
          <Center>
            <Button color="red.4" onClick={() => signIn()}>
              SignIn
            </Button>
          </Center>
        )}
      </Flex>
    </header>
  )
}
