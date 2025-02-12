'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const BANNER_COOKIE_NAME = 'welcome_banner_hidden'
const COOKIE_EXPIRY_DAYS = 7

const WelcomeBanner: React.FC = () => {
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
    <div className="mb-8 rounded-lg bg-blue-50 p-4 md:p-6 dark:border-blue-900 dark:bg-blue-900/20">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-blue-900 dark:text-blue-100">
            👋 Quick Note from Alex
          </h2>
          <div className="space-y-4">
            <p className="text-blue-800 dark:text-blue-200">
              This is not the final UI - I&apos;m working on it daily to provide
              you with a better experience. If you find any sections
              overwhelming or need more information, feel free to reach out to
              me on{' '}
              <Link
                href="https://x.com/itmistakes_com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Twitter
              </Link>
              {', '}
              <Link
                href="https://www.linkedin.com/in/alexanderkadyrov"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                LinkedIn
              </Link>
              {', or '}
              <Link
                href="mailto:kadyrov.dev@gmail.com"
                className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                email me
              </Link>
              . I would be super happy to have a chat with you!
            </p>
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

export default WelcomeBanner
