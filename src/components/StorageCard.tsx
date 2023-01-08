import { FC } from 'react'

import { Card, Center, Grid, Progress, Stack, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconHeart } from '@tabler/icons'

type Props = {
  limit: number
}

export const StorageCard: FC<Props> = ({ limit }) => {
  const media = useMediaQuery('(max-width: 430px)')

  return (
    <Card shadow="md" maw={610} w="100%">
      <Grid justify="space-between" align="center">
        <Grid.Col span={3}>
          <Center>
            <IconHeart style={{ fill: '#f91980' }} color="#f91980" size={40} />
          </Center>
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack spacing={4}>
            <Title order={media ? 5 : 4}>Available Liked Tweets</Title>
            {/* Fix Text UI ? ↓ */}
            <Text size="sm" color="dimmed" weight="bold">
              {limit}
              <Text span size="xs" color="dimmed" weight="bold" mx={4}>
                of
              </Text>
              75 /
              <Text span ml={4} size="xs">
                15 min
              </Text>
            </Text>
            <Progress color="pink" value={limit} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
