'use client'

import { LockOpen2Icon, PaperPlaneIcon } from '@radix-ui/react-icons'
import { signIn, useSession } from 'next-auth/react'
import Balancer from 'react-wrap-balancer'

import Logo from '../assets/svgs/logo.svg'
import { DashBoard } from '../components'
import { Footer } from '../components/Layout'

const FEATURES = [
  {
    icon: <PaperPlaneIcon width={20} height={20} />,
    title: 'いいねツイートの即時保存',
    description:
      '一度に最大75個の最新のいいねツイートをNotionのデータベースに保存できます。',
  },
  {
    icon: <LockOpen2Icon width={20} height={20} />,
    title: 'いいねツイートの即時解除',
    description: '近日実装予定',
  },
]

const Page = () => {
  const { data: session } = useSession()

  return (
    <main className="w-full h-full mx-auto px-4">
      {!session ? (
        <div>
          <section className="w-full max-w-screen-xl mx-auto mt-20">
            <div className=" h-[400px] flex justify-between items-center">
              <div className="sm:flex-1 w-full text-center sm:text-left">
                <h1 className="mb-5 font-bold text-4xl">
                  <Balancer>いいねツイートをNotionで管理</Balancer>
                </h1>
                <h4 className="text-lg">
                  <Balancer>
                    いいねしたツイートをNotionのデータベースで管理しましょう。
                  </Balancer>
                </h4>
                <div className="flex gap-3 items-center mt-4 justify-center md:justify-start">
                  <button
                    className="bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-sm font-medium text-white"
                    onClick={() => signIn()}
                  >
                    SignIn
                  </button>
                  <a
                    href="https://www.notion.so/Notion-Twitter-55d4e1c9977e4c21882a5819c2bed275"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-sm font-medium text-white"
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
          <section className="w-full max-w-screen-xl mx-auto">
            <div className="my-16 text-center">
              <h1 className="font-bold text-4xl md:text-5xl">Features</h1>
            </div>

            <div className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <li key={index} className="flex gap-x-4">
                  <div className="flex-none w-12 h-12 bg-notion-red/10 text-notion-red rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 font-semibold">
                      {feature.title}
                    </h4>

                    <p className="mt-3">
                      <Balancer>{feature.description}</Balancer>
                    </p>
                  </div>
                </li>
              ))}
            </div>
          </section>
          <section className="mt-24 mb-20 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
                <Balancer>Fall in Notion を今すぐ使ってみる</Balancer>
              </h1>
              <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                完全無料で使うことができます
              </p>
            </div>
            <div className="mt-10 mb-2">
              <button
                className="bg-notion-red hover:bg-red-500 py-2 px-4 rounded text-sm font-medium text-white block mx-auto"
                onClick={() => signIn()}
              >
                Get started
              </button>
            </div>
            <p className="text-sm text-center">現在 β テスト中です</p>
          </section>
          <Footer />
        </div>
      ) : (
        <>
          <DashBoard />
        </>
      )}
    </main>
  )
}

export default Page
