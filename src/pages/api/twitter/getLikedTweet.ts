import { unstable_getServerSession } from 'next-auth'
import { TwitterApi } from 'twitter-api-v2'

import { authOptions } from '../auth/[...nextauth]'

import type { NextApiRequest, NextApiResponse } from 'next'

const getLikedTweet = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  // Fix type? ↓
  const limit = req.body

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' })
  }

  const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: session.user.oauth_token || '',
    accessSecret: session.user.oauth_token_secret || '',
  })

  const likedTweet = await twitterClient.v1.favoriteTimeline(
    session.user.account_id || '',
    {
      count: limit,
    }
  )

  console.log(likedTweet)

  return res.status(200).json({ message: 'OK !' })
}

export default getLikedTweet
