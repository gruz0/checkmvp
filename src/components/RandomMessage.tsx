'use client'

import React, { useEffect, useState } from 'react'
import Testimonials from '../../public/testimonials.json'

type Testimonial = {
  quote: string
  author: string
  handle: string
  platform: string
}

const RandomMessage: React.FC = () => {
  const [message, setMessage] = useState<Testimonial | null>(null)

  useEffect(() => {
    const getRandomMessage = () => {
      const { testimonials } = Testimonials
      const randomIndex = Math.floor(Math.random() * testimonials.length)
      return testimonials[randomIndex]
    }

    setMessage(getRandomMessage())
  }, [])

  if (!message) return null

  return (
    <div className="my-8 flex justify-center">
      <div className="max-w-3xl rounded-lg bg-gradient-to-br from-gray-50 to-white p-6 shadow-md dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <svg
              className="absolute -left-2 -top-4 size-8 text-blue-500/20 dark:text-blue-400/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <div className="pl-4 pt-2 md:pl-6">
              <p className="italic leading-relaxed text-gray-700 md:text-lg dark:text-gray-300">
                {message.quote}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
            <div className="text-right">
              <a
                href={`https://x.com/${message.handle.substring(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {message.author} on {message.platform}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RandomMessage
