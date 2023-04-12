'use client'

import { signIn, useSession } from 'next-auth/react'

import { DashBoard } from './components'
import Logo from '../app/assets/svgs/logo.svg'

const FEATURES = [
  {
    // icon: <IconSend />,
    icon: 'Send',
    title: 'いいねツイートの即時保存',
    description:
      '一度に最大75個の最新のいいねツイートをNotionのデータベースに保存できます。',
  },
  {
    // icon: <IconHeartBroken />,
    icon: 'Heart',
    title: 'いいねツイートの解除',
    description:
      // '一度に最大75個の最新のいいねツイートのいいねを解除することができます。',
      '近日実装予定',
  },
]

const Page = () => {
  const { data: session } = useSession()

  return (
    <main className="w-full h-full max-w-screen-xl mx-auto px-4">
      {!session ? (
        <>
          <section>
            <div className=" h-[400px] flex justify-between items-center">
              <div className="sm:flex-1 w-full text-center sm:text-left">
                <h1 className="mb-5 font-bold text-4xl">
                  いいねツイートをNotionで管理
                </h1>
                <h4 className="text-lg">
                  いいねしたツイートをNotionのデータベースで管理しましょう。
                </h4>
                <div className="flex gap-3 items-center mt-4 justify-center md:justify-start">
                  <button className="mt-5 mb-2" onClick={() => signIn()}>
                    SignIn
                  </button>
                  <a
                    href="https://www.notion.so/Notion-Twitter-55d4e1c9977e4c21882a5819c2bed275"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 mb-2"
                    // component="a"
                  >
                    始め方
                  </a>
                </div>
              </div>
              <div className="hidden sm:flex-1 sm:block">
                <Logo width={300} height={300} className="mx-auto" />
              </div>
            </div>
          </section>
          <section>
            <div className="my-16 text-center">
              <h1 className="font-bold text-4xl md:text-5xl">Features</h1>
            </div>

            <div className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <li key={index} className="flex gap-x-4">
                  <div className="flex-none w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 font-semibold">
                      {feature.title}
                    </h4>
                    <p className="mt-3">{feature.description}</p>
                  </div>
                </li>
              ))}
            </div>
          </section>
          <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
                Fall in Notion を今すぐ使ってみる
              </h1>
              <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                完全無料で使うことができます
              </p>
            </div>
            <div className="mt-10 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex flex-col">
              <button className="mb-4 block mx-auto" onClick={() => signIn()}>
                Get started
              </button>
              <p className="text-center text-sm">現在βテスト中です</p>
            </div>
          </section>
        </>
      ) : (
        <>
          <DashBoard />
        </>
      )}
    </main>
  )
}

export default Page
