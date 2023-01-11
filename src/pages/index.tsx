import {
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconHeartBroken, IconSend } from '@tabler/icons'
import { signIn, useSession } from 'next-auth/react'

import Logo from '../assets/svgs/logo.svg'
import { DashBoard } from '../components'
import { Layout } from '../components/Layout'

const FEATURES = [
  {
    icon: IconSend,
    title: 'いいねツイートの即時保存',
    description:
      '一度に最大75個の最新のいいねツイートをNotionのデータベースに保存できます。',
  },
  {
    icon: IconHeartBroken,
    title: 'いいねツイートの解除',
    description:
      // '一度に最大75個の最新のいいねツイートのいいねを解除することができます。',
      '近日実装予定',
  },
]

const useStyles = createStyles((theme) => ({
  hero_header: {
    maxWidth: '480px',
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 10,
    },
  },

  hero_image: {
    flex: 1,
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  icon: {
    marginTop: '10px',
  },
}))

const Home = () => {
  const { classes } = useStyles()

  const { data: session } = useSession()

  return (
    <Layout label={!session ? 'Fall in Notion' : 'DashBoard'}>
      <Center mt={40}>
        {!session?.user ? (
          <Container w="100%">
            <section>
              <Flex h={400}>
                <Center>
                  <div className={classes.hero_header}>
                    <Title mb={20}>いいねツイートをNotionで管理</Title>
                    <Text>
                      いいねしたツイートをNotionのデータベースで管理しましょう。
                      <br />
                      {/* また、いいねを即時取り消すこともできます。 */}
                    </Text>
                    <Group>
                      <Button
                        color="red.4"
                        onClick={() => signIn()}
                        mt={20}
                        mb={5}
                      >
                        SignIn
                      </Button>
                      <Button
                        color="red.4"
                        component="a"
                        href="https://www.notion.so/Notion-Twitter-55d4e1c9977e4c21882a5819c2bed275"
                        target="_blank"
                        rel="noopener noreferrer"
                        mt={20}
                        mb={5}
                      >
                        始め方
                      </Button>
                    </Group>
                  </div>
                  <div className={classes.hero_image}>
                    <Logo width={300} height={300} />
                  </div>
                </Center>
              </Flex>
            </section>
            <section>
              <Center mt={60} mb={40}>
                <Title order={1}>Features</Title>
              </Center>

              <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                {FEATURES.map((feature, index) => (
                  <Card key={index} shadow="md" radius="md">
                    <feature.icon size={36} className={classes.icon} />
                    <Title order={4} my={10}>
                      {feature.title}
                    </Title>
                    <Text size="sm" weight="bold" color="dimmed">
                      {feature.description}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </section>
            <section>
              <Stack
                spacing={0}
                mt={60}
                mb={40}
                justify="center"
                align="center"
              >
                <Title order={1}>Fall in Notion を今すぐ使ってみる</Title>
                <Text size="lg" color="dimmed" mt={5}>
                  完全無料で使うことができます
                </Text>
                <Button color="red.4" onClick={() => signIn()} mt={20} mb={10}>
                  SignIn
                </Button>
                <Text size="md" color="dimmed">
                  現在βテスト中です
                </Text>
              </Stack>
            </section>
          </Container>
        ) : (
          <DashBoard />
        )}
      </Center>
    </Layout>
  )
}

export default Home
