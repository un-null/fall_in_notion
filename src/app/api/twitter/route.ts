import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { TwitterApi } from 'twitter-api-v2'

import { authOptions } from '../auth/[...nextauth]/route'

// Fix rename ↓
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  // Fix type ↓
  const limit = req.body

  console.log(limit)

  if (!session || !session.user.account_id) {
    return res.status(401).json({ message: 'You must be logged in.' })
  }

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }

  try {
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: session.user.oauth_token || '',
      accessSecret: session.user.oauth_token_secret || '',
    })

    const likedTweet = await twitterClient.v1.favoriteTimeline(
      session.user.account_id,
      {
        count: limit,
        include_entities: true,
      }
    )

    const sleep = (milliseconds: number) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds))
    }

    const notionClient = new Client({
      auth: session.user.integration_token || '',
    })

    const insertNotionDb = async () => {
      // Fix rename ↓
      const tweetsInfo = likedTweet.tweets.map((tweet) => {
        const url = tweet.entities.urls?.[0]?.expanded_url
        return {
          text: tweet.full_text || '',
          url: url || null,
        }
      })

      for (const tweet of tweetsInfo) {
        await notionClient.pages.create({
          parent: {
            database_id: session.user.database_id || '',
          },
          properties: {
            Name: {
              title: [
                {
                  text: {
                    content: tweet.text,
                  },
                },
              ],
            },
            URL: {
              type: 'url',
              url: tweet.url,
            },
          },
        })
        await sleep(300)
      }
      res.status(200).json({ message: 'OK' })
    }

    // insertNotionDb()
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
}
