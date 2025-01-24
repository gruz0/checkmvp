import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Supporters from '../../../public/supporters.json'

export const dynamic = 'force-dynamic'

interface Supporter {
  name: string
  tagline: string
  url: string
  image: string
}

const SupportersPage: React.FC = () => {
  const supporters: Supporter[] = Supporters.sort(() => Math.random() - 0.5)

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-blue-600 md:mb-8 md:mt-4 md:text-4xl dark:text-gray-100">
          Meet the Supporters of CheckMVP ❤️
        </h1>

        <p className="text-justify text-lg md:text-center">
          These amazing individuals may not have directly contributed to
          building CheckMVP, but their support has been invaluable to me on this
          journey. Whether it was through sharing their thoughts, offering
          feedback, testing first versions, or simply bringing positive energy,
          they&apos;ve played a key role in helping me grow and improve!
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supporters.map((supporter, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border bg-gray-50 p-4 shadow-lg transition duration-300 hover:shadow-xl md:p-6 dark:bg-gray-900"
          >
            <Link
              href={supporter.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Image
                src={supporter.image}
                alt={`Meet ${supporter.name}`}
                className="mb-4 rounded-full"
                width={48}
                height={48}
              />
            </Link>

            <h2 className="text-xl font-semibold">
              <Link
                href={supporter.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-500"
              >
                {supporter.name}
              </Link>
            </h2>
            <p className="mt-2 text-center text-gray-700 dark:text-gray-300">
              {supporter.tagline}
            </p>
          </div>
        ))}
      </section>

      <hr className="my-6" />

      <div className="my-6 text-center">
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Want to be featured as a supporter?
        </p>

        <p className="text-lg text-gray-600">
          <Link
            href="https://x.com/itmistakes_com"
            className="mt-4 rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-200 hover:bg-blue-500"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Drop me a message on X
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SupportersPage
