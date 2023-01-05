import { FC } from 'react'

import { Button, createStyles, Flex, Text } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'

const useStyles = createStyles((theme) => ({
  header: {
    padding: '0 16px 16px 16px',
    margin: '0 auto',
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
  },
}))

export const Header: FC = () => {
  const { data: session } = useSession()
  const { classes } = useStyles()

  return (
    <header className={classes.header}>
      <Flex
        justify={!session ? 'center' : 'space-between'}
        align="center"
        maw={1200}
        mx="auto"
      >
        <div>
          <Text size="xl" weight="bold" align="center">
            Logo
          </Text>
        </div>

        {session ? (
          <Button mt={20} onClick={() => signOut()}>
            SignOut
          </Button>
        ) : (
          <Button mt={20} onClick={() => signIn()}>
            SignIn
          </Button>
        )}
      </Flex>
    </header>
  )
}
