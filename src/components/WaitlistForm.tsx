'use client'
import React, { useState } from 'react'

interface WaitlistFormProps {
  onSubmit: (email: string) => void
  onClose: () => void
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSubmit, onClose }) => {
  const [email, setEmail] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
        Join Waitlist
      </h2>

      <p className="mb-4 md:text-lg">
        By sharing your email, you{' '}
        <strong>help me validate the needs of this product</strong> and motivate
        me to move forward. When we go live,{' '}
        <strong>you&apos;ll receive special benefits</strong> as a thank you for
        being part of this journey!
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
        className="mb-4 w-full rounded border p-2 md:text-lg"
        required
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-600 md:text-lg"
        >
          I&apos;m with you!
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded border bg-gray-300 px-4 py-2 text-gray-800 md:text-lg"
        >
          Nah, I&apos;m done
        </button>
      </div>
    </form>
  )
}

export default WaitlistForm
