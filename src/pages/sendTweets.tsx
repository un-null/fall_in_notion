import { createContext, Dispatch, SetStateAction, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Button,
  Center,
  createStyles,
  Paper,
  Text,
  Timeline,
} from '@mantine/core'
import { IconCheck, IconHeart, IconHeartBroken, IconSend } from '@tabler/icons'
import { NextPage } from 'next'

import { SendTweetsForm } from '../components'
import { Layout } from '../components/Layout'

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm')

  return {
    wrapper: {
      display: 'flex',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      boxSizing: 'border-box',
      borderRadius: theme.radius.lg - 2,
      backgroundColor: '#1DA1F2',
      backgroundPosition: 'center',
      border: '1px solid transparent',
      padding: theme.spacing.xl,
      flex: '0 0 400px',

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  }
})

export const CounterContext = createContext(0)

export const CounterDispatchContext = createContext<
  Dispatch<SetStateAction<number>>
>(() => {
  throw new Error('No default value!')
})

const SendTweets: NextPage = () => {
  const { classes } = useStyles()

  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  const router = useRouter()

  if (count === 5) {
    // router.push('/')
    alert('count = 5')
    setCount(0)
  }

  return (
    <CounterContext.Provider value={count}>
      <CounterDispatchContext.Provider value={setCount}>
        <Layout label="Send Liked Tweets to Notion">
          <Paper shadow="md" radius="lg" mt={40}>
            <div className={classes.wrapper}>
              <div className={classes.contacts}>
                <Text
                  size="lg"
                  weight={700}
                  className={classes.title}
                  sx={{ color: '#fff' }}
                >
                  Flow
                </Text>

                {/* Fix color pink ↓ */}
                <Timeline
                  active={count}
                  bulletSize={24}
                  lineWidth={2}
                  color={'pink'}
                >
                  <Timeline.Item
                    bullet={<IconHeart size={12} />}
                    title="How many send ♡"
                    c="white"
                    fw="bolder"
                  >
                    <Text color="gray.3" size="xs">
                      You can send up to 75 of them to Notion Database in 15
                      minutes
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    bullet={<IconSend size={12} />}
                    title="Sending ..."
                    lineVariant="dashed"
                    c="white"
                    fw="bolder"
                  />

                  <Timeline.Item
                    title="Do you remove liked tweets on your twitter?"
                    bullet={<IconHeartBroken size={12} />}
                    c="white"
                    fw="bolder"
                  >
                    <Text color="gray.3" size="xs">
                      You can decide whether or not to remove them
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    bullet={<IconSend size={12} />}
                    title="Sending ..."
                    lineVariant="dashed"
                    c="white"
                    fw="bolder"
                  />
                  <Timeline.Item
                    bullet={<IconCheck size={12} />}
                    title="Completed"
                    c="white"
                    fw="bolder"
                  />
                </Timeline>
              </div>

              <div className={classes.form}>
                <Text size="lg" weight={700} className={classes.title}>
                  {/* Fix ↓ */}
                  {count ? count + 1 : 1} / 5
                </Text>

                <div className={classes.fields}>
                  <SendTweetsForm />
                  {/* {count === 3 && (
                    <Flex
                      direction="column"
                      justify="center"
                      align="center"
                      gap={10}
                      mt={20}
                    >
                      <Text weight="bold">Now Sending...</Text>
                      Fix color
                      <Loader variant="bars" color="pink" size="sm" />
                    </Flex>
                  )}
                  {count === 4 && <>Success</>} */}

                  <Center mt={20}>
                    <Button color="pink" onClick={handleClick}>
                      Next
                    </Button>
                  </Center>
                </div>
              </div>
            </div>
          </Paper>
        </Layout>
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
  )
}

export default SendTweets
