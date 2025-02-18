'use client'

import { useEffect, useState } from 'react'

const NOTICE_COOKIE_NAME = 'expiration_notice_hidden'
const COOKIE_EXPIRY_DAYS = 7

interface Props {
  expirationDays: number
}

const ExpirationNotice = ({ expirationDays }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isHidden = document.cookie
      .split('; ')
      .find((row) => row.startsWith(NOTICE_COOKIE_NAME + '='))

    setIsVisible(!isHidden)
  }, [])

  const handleDismiss = () => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS)
    document.cookie = `${NOTICE_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/`
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="mt-6 rounded-lg bg-yellow-50 p-4 md:p-6 dark:bg-yellow-900/30">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-yellow-800 dark:text-yellow-100">
            ⚡ Important Notice
          </h2>
          <p className="text-yellow-800 dark:text-yellow-200">
            This report will only be accessible for {expirationDays} days. After
            that, it will be archived automatically, and you won&apos;t be able
            to access it online. Download the PDF report now to save your data
            locally.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
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

export default ExpirationNotice
