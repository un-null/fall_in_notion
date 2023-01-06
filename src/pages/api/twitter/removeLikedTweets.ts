import { unstable_getServerSession } from 'next-auth'
import { TwitterApi } from 'twitter-api-v2'

import { authOptions } from '../auth/[...nextauth]'

import type { NextApiRequest, NextApiResponse } from 'next'

// Fix rename ↓
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  // Fix type ↓
  const limit = req.body

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

    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
}

export default handler
