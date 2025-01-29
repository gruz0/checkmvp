'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface Props {
  problem: string
  region: string
  cta?: string
  skipIntro?: boolean
}

const DefineConceptForm = ({ problem, region, cta, skipIntro }: Props) => {
  const [status, setStatus] = useState<string>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    problem: problem,
    region: region,
  })

  const regions = [
    'worldwide',
    'north_america',
    'south_america',
    'europe',
    'asia',
    'africa',
    'oceania',
  ] as const

  type Region = (typeof regions)[number]

  const formatRegionName = (region: Region): string =>
    region
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
        >
      | { target: { name: string; value: string } }
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

      const res = await fetch('/api/concepts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: formData.problem,
          region: formData.region,
        }),
      })

      if (res.status === 201) {
        const data = await res.json()
        router.push(`/concepts/${data.id}`)
      } else {
        const errorData = await res.json()
        setErrorMessage(errorData.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
      setStatus('error')
      console.error('Error submitting form:', error)
    }
  }

  const problemMaxLength = 2048
  const remainingCharacters = problemMaxLength - formData.problem.length

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6 flex flex-col">
        {!skipIntro && (
          <>
            <Paragraph>
              Focus on the challenges or frustrations people face, and how your
              product can help solve them.
              <br className="hidden md:block" />
              <span className="visible md:hidden"> </span>
              Not sure where to start? Just describe your idea briefly —
              we&apos;ll help refine it in 30 seconds!
            </Paragraph>

            <label
              htmlFor="problem"
              className="mb-4 text-xl font-bold md:text-2xl"
            >
              What to Include:
            </label>

            <SimpleUnorderedList
              items={[
                'Your target audience: Who are you solving this for? (e.g., age, profession, demographics)',
                'Current alternatives: How are people solving this problem now?',
              ]}
            />
          </>
        )}

        <textarea
          id="problem"
          name="problem"
          className="mt-1 block h-64 w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-[#023840] focus:ring-[#023840] dark:bg-gray-900 dark:text-gray-200 dark:focus:border-[#7bf179] dark:focus:ring-[#7bf179]"
          value={formData.problem}
          onChange={handleChange}
          required
          placeholder={`I want to create an app that connects individuals seeking emotional support with trained professionals or peer support groups. This platform would ensure users receive the help they need in times of crisis or emotional distress.

Target Audience:
1. Individuals experiencing mental health challenges
2. Parents seeking support
3. Caregivers of individuals with mental health issues`}
          minLength={20}
          maxLength={2048}
        />

        <p className="mt-2 text-right text-sm text-gray-600 dark:text-gray-300">
          {remainingCharacters} characters remaining
        </p>
      </div>

      <HorizontalLine />

      <div className="mb-6">
        <h2 className="mb-6 block text-xl font-bold md:text-2xl">
          Where Will You Start?
        </h2>

        <Paragraph>
          Starting with a specific region can help you validate your idea more
          effectively. It allows you to focus your research, understand local
          needs, and adapt to specific market conditions before expanding
          globally.
        </Paragraph>

        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() =>
                handleChange({ target: { name: 'region', value: region } })
              }
              className={`rounded-full px-4 py-2 font-medium transition-colors
                ${
                  formData.region === region
                    ? 'bg-[#023840] text-[#7bf179] dark:bg-[#7bf179] dark:text-[#023840]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-800'
                }`}
            >
              {formatRegionName(region)}
            </button>
          ))}
        </div>
      </div>

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      <HorizontalLine />

      <div className="pb-2 text-center">
        <button
          type="submit"
          className="rounded-md border border-transparent bg-[#023840] px-6 py-4 text-2xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Saving...' : cta || 'Show Me Insights'}
        </button>
      </div>
    </form>
  )
}

export default DefineConceptForm
