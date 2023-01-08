import { FC } from 'react'

import { ActionIcon, Card, Center, Flex, Text } from '@mantine/core'
import {
  IconBrandNotion,
  IconChevronsRight,
  IconHeart,
  IconHeartBroken,
} from '@tabler/icons'

type Props = {
  name: string
}

export const ActionCard: FC<Props> = ({ name }) => {
  const color = name === 'delete' ? '#868e96' : '#1DA1F2'

  return (
    // Fix color and actionIcon?
    <Card
      miw="100%"
      maw={300}
      shadow="md"
      component="a"
      href={name === 'delete' ? undefined : '/sendTweets'}
      sx={{ ':hover': { color: color, cursor: 'pointer' } }}
    >
      {name === 'delete' ? (
        <Center my={20}>
          <ActionIcon sx={{ ':hover': { backgroundColor: 'white' } }}>
            <IconHeartBroken color="#868e96" size={28} />
          </ActionIcon>
        </Center>
      ) : (
        <Flex justify="center" align="center" gap="xs" my={20}>
          <ActionIcon sx={{ ':hover': { backgroundColor: 'white' } }}>
            <IconHeart color="#f91980" style={{ fill: '#f91980' }} size={28} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            size={16}
            sx={{
              ':hover': { backgroundColor: '#868E96' },
            }}
          >
            <IconChevronsRight size={16} />
          </ActionIcon>
          <ActionIcon sx={{ ':hover': { backgroundColor: 'white' } }}>
            <IconBrandNotion size={28} color="black" />
          </ActionIcon>
        </Flex>
      )}
      <Text
        size="md"
        weight="bold"
        align="center"
        color={name === 'delete' ? '#868e96' : undefined}
        td={color === '#868e96' ? 'line-through' : undefined}
      >
        {name === 'delete' ? 'Comming soon ...' : 'Send ♡ To Notion'}
      </Text>
    </Card>
  )
}
