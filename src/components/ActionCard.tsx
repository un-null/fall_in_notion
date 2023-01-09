import { FC } from 'react'

import {
  ActionIcon,
  Card,
  Center,
  createStyles,
  Flex,
  Text,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconBrandNotion,
  IconChevronsRight,
  IconHeart,
  IconHeartBroken,
} from '@tabler/icons'

import { Action } from '../types'

const useStyles = createStyles((theme, { color }: { color: string }) => {
  return {
    card: {
      ':hover': {
        color: color,
        cursor: 'pointer',
      },
    },
    actionIcon: {
      '&:hover': {
        backgroundColor: theme.white,
      },
    },
    chevronsRight: {
      '&:hover': {
        backgroundColor: theme.colors.gray[6],
      },
    },
  }
})

type Props = Action

export const ActionCard: FC<Props> = ({ name, isLimit }) => {
  const color = name === 'delete' ? '#868e96' : '#1DA1F2'
  const { classes } = useStyles({ color })

  const media = useMediaQuery('(max-width: 430px)')

  return (
    <Card
      miw={media ? '100%' : undefined}
      maw={300}
      shadow="md"
      component="a"
      href={name === 'send' ? (isLimit ? undefined : 'sendTweets') : undefined}
      className={classes.card}
    >
      {name === 'send' ? (
        <Flex justify="center" align="center" gap="xs" my={20}>
          <ActionIcon className={classes.actionIcon}>
            <IconHeart
              color={isLimit ? '#868e96' : '#f91980'}
              style={{ fill: isLimit ? '#868e96' : '#f91980' }}
              size={28}
            />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            size={16}
            className={classes.chevronsRight}
          >
            <IconChevronsRight size={16} />
          </ActionIcon>
          <ActionIcon className={classes.actionIcon}>
            <IconBrandNotion size={28} color={isLimit ? '#868e96' : 'black'} />
          </ActionIcon>
        </Flex>
      ) : (
        <Center my={20}>
          <ActionIcon sx={{ ':hover': { backgroundColor: 'white' } }}>
            <IconHeartBroken color="#868e96" size={28} />
          </ActionIcon>
        </Center>
      )}
      <Text
        size="md"
        weight="bold"
        align="center"
        color={name === 'send' ? (isLimit ? '#868e96' : undefined) : '#868e96'}
        td={color === '#868e96' ? 'line-through' : undefined}
      >
        {name === 'delete' ? 'Comming soon ...' : 'Send ♡ To Notion'}
      </Text>
    </Card>
  )
}
