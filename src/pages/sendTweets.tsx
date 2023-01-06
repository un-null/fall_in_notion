import { createContext, Dispatch, SetStateAction, useState } from 'react'

import { createStyles, Paper, Text, Timeline } from '@mantine/core'
import { IconCheck, IconHeart, IconSend } from '@tabler/icons'
import { NextPage } from 'next'

import { SendTweetsForm } from '../components'
import { Layout } from '../components/Layout'

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm')

  return {
    wrapper: {
      minHeight: '400px',
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
      backgroundColor: theme.colors.cyan[6],
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

export const FormContext = createContext<{
  limit: number | undefined
  count: number
}>({
  limit: 0,
  count: 0,
})

export const FormDispatchContext = createContext<{
  setLimit: Dispatch<SetStateAction<number | undefined>>
  setCount: Dispatch<SetStateAction<number>>
}>({
  setLimit: () => {
    throw new Error('No default value!')
  },
  setCount: () => {
    throw new Error('No default value!')
  },
})

const SendTweets: NextPage = () => {
  const { classes } = useStyles()

  const [count, setCount] = useState(0)
  const [limit, setLimit] = useState<number | undefined>(1)

  return (
    <FormContext.Provider value={{ count, limit }}>
      <FormDispatchContext.Provider value={{ setCount, setLimit }}>
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
                  color="pink"
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

                  {/* <Timeline.Item
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
                  /> */}

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
                  {count ? count + 1 : 1} / 3
                </Text>

                <div className={classes.fields}>
                  <SendTweetsForm />
                </div>
              </div>
            </div>
          </Paper>
        </Layout>
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  )
}

export default SendTweets
