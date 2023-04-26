import { NextRequest, NextResponse } from 'next/server'

import { Client } from '@notionhq/client'
import { getServerSession } from 'next-auth'
import { TwitterApi } from 'twitter-api-v2'

import { authOptions } from '../auth/[...nextauth]/route'

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)

  const limit: number = await req.json()

  if (!session || !session.user.account_id) {
    return NextResponse.json({ message: 'You must be logged in.' })
  }

  if (req.method !== 'POST') {
    return NextResponse.json({
      message: `${req.method} requests are not allowed`,
    })
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
        console.log(tweet.text)
        await sleep(300)
      }
    }
    // insertNotionDb()
    NextResponse.json({ message: 'OK' })
  } catch (error) {
    NextResponse.json({ message: 'Error' })
  }
}
