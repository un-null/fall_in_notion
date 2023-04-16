'use client'
import { useState } from 'react'

import { Aside } from '../components/Layout/Aside'
import { SendTweetsForm } from '../components/SendTweetsForm'
import { FormContext, FormDispatchContext } from '../libs/context'

const SendTweets = () => {
  const [count, setCount] = useState(1)
  const [limit, setLimit] = useState<number | undefined>(0)

  const STEPS = ['How many send Likes', 'Sending ...', 'Completed']

  return (
    <FormContext.Provider value={{ count, limit }}>
      <FormDispatchContext.Provider value={{ setCount, setLimit }}>
        <div className="w-full h-full flex rounded-md">
          <Aside />
          <div className="w-[90%] sm:flex-1 mx-auto">
            <div className="max-w-2xl mx-auto px-4 md:px-0 mt-5">
              <ul
                aria-label="Steps"
                className="items-center text-gray-600 font-medium flex"
              >
                {STEPS.map((item, idx) => (
                  <li
                    key={idx}
                    aria-current={count == idx + 1 ? 'step' : false}
                    className="flex-1 last:flex-none flex items-center"
                  >
                    <div className="flex gap-x-2">
                      <div className="flex items-center flex-col">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${
                            count > idx + 1
                              ? 'bg-notion-red border-notion-red'
                              : '' || count == idx + 1
                              ? 'border-notion-red'
                              : ''
                          }`}
                        >
                          <span
                            className={` ${
                              count > idx + 1
                                ? 'hidden'
                                : '' || count == idx + 1
                                ? 'text-notion-red'
                                : ''
                            }`}
                          >
                            {idx + 1}
                          </span>
                          {count > idx + 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="h-8 flex items-center md:h-auto">
                        <h3
                          className={`text-sm ${
                            count == idx + 1
                              ? 'text-notion-red block'
                              : 'hidden'
                          } hidden sm:block`}
                        >
                          {item}
                        </h3>
                      </div>
                    </div>
                    <div
                      className={`flex-auto block ${
                        idx + 1 == STEPS.length ? 'hidden' : ''
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mx-auto text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div>
                <SendTweetsForm />
              </div>
            </div>
          </div>
        </div>
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  )
}

export default SendTweets
