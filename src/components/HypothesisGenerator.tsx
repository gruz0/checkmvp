'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const wordGroups = {
  tech: [
    'Artificial intelligence',
    'Machine learning',
    'Blockchain',
    'Augmented reality',
    'Virtual reality',
    'Internet of Things (IoT)',
    'Big data',
    'Cloud computing',
    'Edge computing',
    'Quantum computing',
    'Serverless architecture',
    'Data analytics',
    'Robotic process automation',
    'Natural language processing',
    'Computer vision',
    'Cybersecurity',
    '5G technology',
    'Biometrics',
    'DevOps',
    'Microservices',
    'Neural networks',
    'Deep learning',
    'Robotics',
    'Autonomous systems',
    'Cryptocurrency',
  ],
  industry: [
    'Fintech',
    'Healthtech',
    'Edtech',
    'E-commerce',
    'Retail',
    'Gaming',
    'Logistics',
    'Traveltech',
    'Foodtech',
    'Real estate (Proptech)',
    'Agritech',
    'Automotive',
    'Energy',
    'Cybersecurity',
    'Cleantech',
    'Biotech',
    'Insurtech',
    'Legaltech',
    'Sportstech',
    'Manufacturing',
    'Entertainment',
    'Social media',
    'Space technology',
    'Wellness tech',
  ],
  businessModel: [
    'B2B',
    'B2C',
    'B2B2C',
    'D2C (direct-to-consumer)',
    'SaaS',
    'Marketplace',
    'Subscription-based',
    'Freemium',
    'On-demand',
    'White-label solutions',
    'Platform as a Service (PaaS)',
    'Infrastructure as a Service (IaaS)',
    'Pay-per-use',
    'Franchise model',
    'Licensing',
    'Advertising-based',
    'Commission-based',
    'Hybrid model',
    'Crowdfunding',
    'Data monetization',
  ],
  startupConcepts: [
    'Disruption',
    'Scalability',
    'Hypergrowth',
    'Personalization',
    'Customer-centric',
    'Lean methodology',
    'MVP (minimum viable product)',
    'Growth hacking',
    'Pivoting',
    'Monetization',
    'User retention',
    'Network effects',
    'Product-market fit',
    'Customer acquisition',
    'Viral marketing',
    'Unit economics',
    'Bootstrapping',
    'First-mover advantage',
    'Market validation',
    'Brand positioning',
    'Customer lifetime value',
    'Churn rate',
  ],
  trends: [
    'Sustainability',
    'Climate tech',
    'Gig economy',
    'Decentralization',
    'Microservices',
    'Web3',
    'Metaverse',
    'Privacy & compliance',
    'Carbon footprint reduction',
    'Circular economy',
    'Digital twins',
    'Remote work',
    'Smart cities',
    'Digital transformation',
    'Zero trust security',
    'Low-code/No-code',
    'Green technology',
    'Voice commerce',
    'Autonomous vehicles',
    'Edge AI',
    'Synthetic data',
  ],
}

const getRandomWord = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)]

const HypothesisGenerator: React.FC = () => {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [, setHypothesisId] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'polling'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const contentMaxLength = 1000
  const remainingCharacters = contentMaxLength - content.length

  const generateRandomWords = () => {
    const words = [
      getRandomWord(wordGroups.tech),
      getRandomWord(wordGroups.industry),
      getRandomWord(wordGroups.businessModel),
      getRandomWord(wordGroups.startupConcepts),
      getRandomWord(wordGroups.trends),
    ]
    setContent(words.join(', '))
  }

  const pollHypothesis = async (id: string) => {
    try {
      const res = await fetch(`/api/apps/hypothesis_generator/${id}`)
      if (!res.ok) throw new Error('Failed to fetch hypothesis')

      const data = await res.json()

      if (data.status === 'error') {
        setErrorMessage(data.error || 'Failed to generate hypothesis')
        setStatus('idle')
        return false
      }

      if (data.status === 'completed' && data.result) {
        router.push(`/tools/hypothesis-generator/${id}`)
        return false
      }

      return true // continue polling
    } catch (error) {
      console.error('Failed to check hypothesis status', error)

      setErrorMessage('Failed to check hypothesis status')
      setStatus('idle')
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (content.length < 20) {
      setErrorMessage('Please enter at least 20 characters')
      return
    }

    try {
      setStatus('loading')
      setErrorMessage(null)

      const res = await fetch('/api/apps/hypothesis_generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (res.ok) {
        const { id } = await res.json()
        setHypothesisId(id)
        setStatus('polling')

        const pollInterval = setInterval(async () => {
          const shouldContinue = await pollHypothesis(id)
          if (!shouldContinue) {
            clearInterval(pollInterval)
          }
        }, 2000)

        setTimeout(() => {
          clearInterval(pollInterval)
          if (status === 'polling') {
            setErrorMessage('Generation is taking too long. Please try again.')
            setStatus('idle')
          }
        }, 30000)
      } else {
        const errorData = await res.json()
        setErrorMessage(errorData.error || 'Something went wrong')
        setStatus('idle')
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again')
      setStatus('idle')
      console.error('Error generating hypothesis:', error)
    }
  }

  const getButtonText = () => {
    switch (status) {
      case 'loading':
        return 'Submitting...'
      case 'polling':
        return 'Generating... (~30 seconds)'
      default:
        return "I'm Feeling Lucky"
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 md:mt-8 md:space-y-6"
    >
      <div>
        <textarea
          id="content"
          className="block h-32 w-full rounded-md border-gray-300 shadow-sm focus:border-[#023840] focus:ring-[#023840] md:h-48 md:text-lg dark:bg-gray-900 dark:text-gray-200 dark:focus:border-[#7bf179] dark:focus:ring-[#7bf179]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="e.g., remote work, productivity, time management, calendar, AI, etc."
          minLength={20}
          maxLength={contentMaxLength}
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {remainingCharacters} characters remaining
          </p>
          <button
            type="button"
            onClick={generateRandomWords}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus:ring-[#023840] focus:ring-offset-2 md:py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-[#7bf179]"
            title="Generate random keywords"
          >
            <span className="text-base">🔄</span>
            <span>Randomize</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-red-700 dark:text-red-300">{errorMessage}</p>
        </div>
      )}

      <div className="rounded-lg border-2 border-[#023840] bg-[#023840]/5 p-4 md:text-lg dark:border-[#7bf179] dark:bg-[#7bf179]/5">
        🎉 This is an experimental tool meant for creative exploration! We might
        showcase the most amusing and entertaining ideas on our platform to
        spread joy and inspire others. If you have a serious business idea that
        you want to keep confidential, please use our{' '}
        <Link
          href="/start"
          className="text-[#023840] underline decoration-2 underline-offset-2 transition-colors hover:text-[#034e59] dark:text-[#7bf179] dark:hover:text-[#5ed15b]"
        >
          Hypothesis Validator
        </Link>{' '}
        instead - it keeps your data private and secure.
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={status !== 'idle'}
          className="rounded-md border border-transparent bg-[#023840] px-6 py-3 text-xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:py-4 md:text-2xl dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
        >
          {getButtonText()}
        </button>
      </div>
    </form>
  )
}

export default HypothesisGenerator
