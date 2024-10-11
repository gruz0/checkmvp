'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormField from '@/components/FormField'

const NewIdeaPage = () => {
  const [status, setStatus] = useState<string>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    problem: '',
    targetAudience: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setStatus('loading')
      setErrorMessage(null)

      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: formData.problem,
          targetAudience: formData.targetAudience,
        }),
      })

      if (res.status === 201) {
        setStatus('success')
        const data = await res.json()
        router.push(`/ideas/${data.id}`)
      } else {
        setStatus('error')
        const errorData = await res.json()
        setErrorMessage(errorData.error || 'Something went wrong.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('An error occurred. Please try again.')
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-4xl font-bold">
        Validate Your Product Idea Quickly
      </h1>

      <p className="mb-2 text-xl">
        Answer first two key questions to start and we&apos;ll help you
        understand if your idea solves a real problem and whether your target
        audience is well-defined. If you&apos;re having trouble answering these
        questions, don&apos;t worry! Just give us your best guess, and
        we&apos;ll help refine it in the next step.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <hr className="my-8" />

        <FormField
          id="problem"
          label="Describe the Problem Your Product Aims to Solve"
          description="Tell us about the specific issue your product addresses. The clearer the problem, the more valuable our feedback will be."
          placeholder="e.g., I'm developing a tool that automates the process of generating monthly financial reports for small businesses. The problem I'm addressing is that many small business owners struggle with time-consuming and complex reporting tasks, which often require professional help they can't afford."
          value={formData.problem}
          onChange={handleChange}
          type="textarea"
          required
          minLength={20}
          maxLength={1024}
        />

        <FormField
          id="targetAudience"
          label="Who Is Your Target Audience?"
          description="Describe your ideal users. Include details like their profession, age, and any specific needs or challenges they face."
          placeholder="e.g., My target audience is small business owners and solo entrepreneurs who manage their own finances but lack the time or expertise to generate detailed financial reports. They are usually between 30 and 50 years old, with limited experience in accounting, and operate in industries like retail, hospitality, or consulting."
          value={formData.targetAudience}
          onChange={handleChange}
          type="textarea"
          required
          minLength={20}
          maxLength={1024}
        />

        {status === 'error' && errorMessage && (
          <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
            {errorMessage}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xl font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewIdeaPage
