'use client'
import React, { useState } from 'react'

interface FeedbackFormProps {
  onSubmit: (feedback: string, contact: string) => void
  onClose: () => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, onClose }) => {
  const [feedback, setFeedback] = useState('')
  const [contact, setContact] = useState('')

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value)
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(feedback, contact)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
        Your Feedback Matters
      </h2>

      <p className="mb-4 md:text-lg">
        We appreciate your feedback! Please share what didn&apos;t work for you
        or how we can improve. Your insights are invaluable to us.
      </p>

      <textarea
        placeholder="Enter your feedback here (optional)"
        value={feedback}
        onChange={handleFeedbackChange}
        className="mb-4 w-full rounded border p-2 md:text-lg dark:text-gray-900"
        rows={4}
        maxLength={4096}
      />

      <input
        type="text"
        placeholder="Your contact details (optional)"
        value={contact}
        onChange={handleContactChange}
        className="mb-4 w-full rounded border p-2 md:text-lg dark:text-gray-900"
        maxLength={128}
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-600 md:text-lg"
        >
          Send Feedback
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded border bg-gray-300 px-4 py-2 text-gray-800 md:text-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default FeedbackForm
