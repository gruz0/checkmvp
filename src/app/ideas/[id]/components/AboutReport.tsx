'use client'

import { useEffect, useState } from 'react'

const BANNER_COOKIE_NAME = 'about_report_hidden'
const COOKIE_EXPIRY_DAYS = 7

const AboutReport = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isHidden = document.cookie
      .split('; ')
      .find((row) => row.startsWith(BANNER_COOKIE_NAME + '='))

    setIsVisible(!isHidden)
  }, [])

  const handleDismiss = () => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS)
    document.cookie = `${BANNER_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/`
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="mt-6 rounded-lg bg-blue-50 p-4 md:p-6 dark:border-blue-900 dark:bg-blue-900/20">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-blue-900 dark:text-blue-100">
            ❤️ Hey there!
          </h2>
          <div className="space-y-4">
            <p className="text-blue-800 dark:text-blue-200">
              If you need help with your idea - whether it&apos;s brainstorming,
              development, or anything else - just reach out to me on social
              media or book a call. I&apos;d be happy to help!
            </p>
            <p className="text-blue-800 dark:text-blue-200">
              Please keep in mind, this analysis is powered by OpenAI. While the
              insights are valuable, they should complement - not replace - your
              own research and intuition.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="https://www.linkedin.com/newsletters/7275106167452782593/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                Follow My Building Journey
              </a>
              <a
                href="https://cal.com/alexkadyrov/checkmvp"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full rounded-md bg-blue-100 px-4 py-2 text-center text-sm font-medium text-blue-700 transition hover:bg-blue-200 sm:w-auto dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          aria-label="Dismiss message"
        >
          <svg
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AboutReport
