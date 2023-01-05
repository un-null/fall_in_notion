import { FC } from 'react'

import {
  ActionIcon,
  Avatar,
  Card,
  createStyles,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core'
import {
  IconBrandNotion,
  IconBrandTwitter,
  IconChevronRight,
} from '@tabler/icons'

type Props = {
  name?: string | null
  email?: string | null
  image?: string | null
}

const useStyles = createStyles(() => ({
  icon: {
    '&:hover': {
      color: '#1DA1F2',
    },
  },
}))

export const UserCard: FC<Partial<Props>> = ({ name, email, image }) => {
  const { classes } = useStyles()
  return (
    <Card shadow="sm" w={610}>
      <Flex justify="space-between" align="strech">
        <Stack justify="space-between">
          <ActionIcon
            size="xl"
            color="#1DA1F2"
            variant="filled"
            component="a"
            href="#"
          >
            <IconBrandTwitter />
          </ActionIcon>
          <Text size="xl" weight="bold" color="dark">
            {name}
          </Text>
        </Stack>
        <Avatar src={image} w={125} h={125} />
      </Flex>

      <Text size="sm" color="dimmed" pb={4}>
        {email}
      </Text>

      <Card.Section bg="gray.1" py={8}>
        <Flex pl={12} pr={16} justify="space-between">
          <Group spacing={0}>
            <IconBrandNotion color="#2C2E33" />
            <Text size="xs" weight="bold" color="dark.5">
              DataTable
            </Text>
          </Group>
          <Group
            spacing="xs"
            sx={{ cursor: 'pointer', ':hover': { color: '#1DA1F2' } }}
          >
            <Text size="sm" weight="bold">
              Edit
            </Text>
            <IconChevronRight size={16} className={classes.icon} />
          </Group>
        </Flex>
      </Card.Section>
    </Card>
  )
}
