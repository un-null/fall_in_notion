import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, Center, createStyles, Flex, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { signIn, signOut, useSession } from 'next-auth/react'

import Logo from '../../assets/svgs/logo.svg'

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
  link: {
    textDecoration: 'none',
    color: theme.colors.dark,
  },
  icon: {
    display: 'block',
  },
}))

export const Header: FC = () => {
  const { data: session } = useSession()
  const { classes } = useStyles()

  const router = useRouter()
  const isHome = router.asPath === '/'

  const media = useMediaQuery('(max-width: 430px)')

  return (
    <header className={classes.header}>
      <Flex
        justify="space-between"
        align="center"
        w="100%"
        maw={1200}
        mx="auto"
      >
        <Link href="/" className={classes.link}>
          <Flex justify="center" align="center" gap={5}>
            <Logo width={28} height={28} className={classes.icon} />
            <Text size="lg" weight="bold">
              Fall in Notion
            </Text>
          </Flex>
        </Link>

        {session ? (
          <Button
            size={media ? 'xs' : 'sm'}
            color="cyan"
            disabled={!isHome}
            onClick={() => signOut()}
          >
            SignOut
          </Button>
        ) : (
          <Center>
            <Button
              size={media ? 'xs' : 'sm'}
              color="red.4"
              onClick={() => signIn()}
            >
              SignIn
            </Button>
          </Center>
        )}
      </Flex>
    </header>
  )
}
