import { FC } from 'react'

import { Button, createStyles, Flex, Text } from '@mantine/core'
import { signOut } from 'next-auth/react'

const useStyles = createStyles(() => ({
  header: {
    maxWidth: '1200px',
    padding: '0 16px',
    margin: '0 auto',
  },
}))

export const Header: FC = () => {
  const { classes } = useStyles()
  return (
    <header className={classes.header}>
      <Flex justify="space-between" align="center">
        <Text size="xl" weight="bold" span>
          Logo
        </Text>
        <Button mt={20} onClick={() => signOut()}>
          SignOut
        </Button>
      </Flex>
    </header>
  )
}
