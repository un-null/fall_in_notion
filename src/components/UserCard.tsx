import { FC, useState } from 'react'

import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Collapse,
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
import { useSession } from 'next-auth/react'

import { NotionForm } from './NotionForm'

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
  const [opened, setOpened] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      <Card shadow="sm" w={610}>
        <Flex justify="space-between" align="strech">
          <Stack justify="space-between">
            {/* Fix Action Icon ? ↓ */}
            <Group spacing="xs">
              <ActionIcon
                size="xl"
                color="cyan"
                variant="filled"
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/${name}`}
              >
                <IconBrandTwitter />
              </ActionIcon>
              <ActionIcon
                size="xl"
                color="dark"
                variant="outline"
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.notion.so/${session?.user.database_id}`}
              >
                <IconBrandNotion size={28} />
              </ActionIcon>
            </Group>

            <Text size="xl" weight="bold" color="dark">
              @{name}
            </Text>
          </Stack>
          <Avatar src={image} w={125} h={125} />
        </Flex>

        <Text size="sm" color="dimmed" pb={8}>
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
              <Text
                size="sm"
                weight="bold"
                onClick={() => setOpened((o) => !o)}
              >
                {opened ? 'Close' : 'Confirm'}
              </Text>
              <IconChevronRight size={16} className={classes.icon} />
            </Group>
          </Flex>

          <Collapse in={opened}>
            <Center my={20}>
              <NotionForm mode="edit" />
            </Center>
          </Collapse>
        </Card.Section>
      </Card>
    </>
  )
}
