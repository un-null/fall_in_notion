import { redirect } from 'next/navigation'

import { getServerSession } from 'next-auth'

import { ActionCard } from '../../components/ActionCard'
import { StorageCard } from '../../components/StorageCard'
import { UserCard } from '../../components/UserCard'
import { Action } from '../../types'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: 'DashBoard',
}

const App = async () => {
  const session = await getServerSession(authOptions)

  const actionArr: Action[] = [{ name: 'send' }, { name: 'delete' }]

  if (!session) {
    redirect('/')
  }

  if (!session.user.integration_token || !session.user.database_id) {
    redirect('/app/register')
  }

  return (
    <div className="w-full flex h-full px-4">
      <div className="flex-1 flex flex-col items-center mt-5">
        {/* @ts-expect-error Server Component */}
        <UserCard />

        <StorageCard />

        <div className="w-full max-w-2xl grid grid-cols-2 gap-4 my-10 md:hidden">
          {actionArr.map((action, index) => (
            <ActionCard key={index} name={action.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
