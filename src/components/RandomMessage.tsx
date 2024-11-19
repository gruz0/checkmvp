'use client'

import React, { useEffect, useState } from 'react'

const messages: string[] = [
  '“CheckMVP doesn’t only validate your MVP, it helps you think through your business approach by asking the right questions. It clarifies your problem, suggests better phrasing, and summarizes your challenges clearly.” – Julia @clivassy on X',
  '“CheckMVP – excellent idea for anyone floating a few business plans around!” – Sarah @s4rah_dev on X',
  '“I’ve just used CheckMVP and it’s incredible! It’s given me immense value for the project I am currently working on, and I can’t wait to apply some suggestions. I will surely use it again in the near future.” – Marina Marques @shvvffle on X',
  '“I tried it out. No issues encountered. I found it really useful, I only gave it 3 sentences of my idea and it output a really comprehensive reply and report.” – Ciara Wearen @nocheerleader on X',
  '“Great, got a few suggestions on marketing channels like travel forums which I found really valuable.” – Rik Verbeek @Rvrbk on X',
  '“This is a great MVP, especially for people who have no experience. If such reports had been available earlier, there wouldn not have been a need to learn the hard way.” – Nick Nikalayeu @NickNikalayeu on X',
  '“I tested it and whoa, there is so much value! I am blown away, hands down. This is golden. 🤩” – Monika Majkowska @monikamajkowska on X',
]

const RandomMessage: React.FC = () => {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const getRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length)
      return messages[randomIndex]
    }

    setMessage(getRandomMessage())
  }, [])

  return (
    <div className="my-8 flex justify-center">
      {message && (
        <div className="max-w-3xl border-l-4 border-gray-300 px-4 md:px-6">
          <p className="py-2 text-lg italic text-gray-800 md:text-xl dark:text-gray-100">
            {message}
          </p>
        </div>
      )}
    </div>
  )
}

export default RandomMessage
