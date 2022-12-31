import { FC } from 'react'

import { Card, Center, Grid, Progress, Stack, Text, Title } from '@mantine/core'
import { IconHeart } from '@tabler/icons'

export const StorageCard: FC = () => {
  return (
    <Card shadow="md" w={610}>
      <Grid justify="space-between" align="center">
        <Grid.Col span={3}>
          <Center>
            <IconHeart style={{ fill: '#f91980' }} color="#f91980" size={40} />
          </Center>
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack spacing={4}>
            <Title order={4}>Available Liked Tweets</Title>
            {/* Fix Text UI ↓ */}
            <Text size="sm" color="dimmed" weight="bold">
              {`0`} of {`75`} /
              <Text span ml={4} size="xs">
                15 min
              </Text>
            </Text>
            <Progress color="#f91980" value={40} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
