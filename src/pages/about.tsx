import { NextPage } from 'next'

import { useSession } from '../libs/session'

const About: NextPage = () => {
  const [session] = useSession({})
  console.log(session)

  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

export default About
