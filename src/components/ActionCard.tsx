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
  const color = name === 'Remove ♡ On Twitter' ? '#f91980' : '#1DA1F2'

  return (
    // Fix code and pointer↓
    <Card
      w={300}
      shadow="md"
      component="a"
      href="/"
      sx={{ ':hover': { color: color } }}
    >
      {name === 'Remove ♡ On Twitter' ? (
        <Center my={20}>
          <ActionIcon
            sx={{ ':hover': { backgroundColor: 'white' }, cursor: 'default' }}
          >
            <IconHeartBroken color="#f91980" size={28} />
          </ActionIcon>
        </Center>
      ) : (
        <Flex justify="center" align="center" gap="xs" my={20}>
          <ActionIcon
            sx={{ ':hover': { backgroundColor: 'white' }, cursor: 'default' }}
          >
            <IconHeart color="#f91980" style={{ fill: '#f91980' }} size={28} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            size={16}
            sx={{
              ':hover': { backgroundColor: '#868E96' },
              cursor: 'default',
            }}
          >
            <IconChevronsRight size={16} />
          </ActionIcon>
          <ActionIcon
            sx={{ ':hover': { backgroundColor: 'white', cursor: 'default' } }}
          >
            <IconBrandNotion size={28} color="black" />
          </ActionIcon>
        </Flex>
      )}
      <Text size="md" weight="bold" align="center">
        {name}
      </Text>
    </Card>
  )
}
