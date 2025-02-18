import Link from 'next/link'
import React from 'react'

const MessageBox = () => (
  <div className="mb-4 mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 shadow-lg lg:p-6">
    <h2 className="mb-2 text-lg font-semibold text-gray-800 md:text-xl">
      Was this report helpful? ❤️
    </h2>
    <p className="mt-4 text-gray-700 md:text-lg">
      <span>
        If you have any ideas, suggestions for improvement, or issues, feel free
        to reach out via{' '}
      </span>
      <Link
        href="https://x.com/itmistakes_com"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-blue-500 underline hover:text-blue-700"
        title="Twitter (X)"
      >
        Twitter (X)
      </Link>
      {', '}
      <Link
        href="https://www.linkedin.com/in/alexanderkadyrov/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-blue-500 underline hover:text-blue-700"
        title="LinkedIn"
      >
        LinkedIn
      </Link>
      <span>, or open an issue on </span>
      <Link
        href="https://github.com/gruz0/checkmvp/issues"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-blue-500 underline hover:text-blue-700"
        title="GitHub Repo"
      >
        GitHub
      </Link>
      <span>
        . I would love to get your honest feedback. Soon you&apos;ll see more
        sections available.
      </span>
    </p>
  </div>
)

export default MessageBox
