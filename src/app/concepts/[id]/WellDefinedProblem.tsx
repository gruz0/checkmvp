'use client'
import { useRouter } from 'next/navigation'
import { usePlausible } from 'next-plausible'
import React, { useState } from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import { Goals } from '@/lib/goals'
import ClarityScoreSection from './ClarityScoreSection'
import LanguageAnalysisSection from './LanguageAnalysisSection'
import MarketExistenceSection from './MarketExistenceSection'
import PainPointsSection from './PainPointsSection'
import WelcomeBanner from './WelcomeBanner'
import { ProblemEvaluation } from './types'

interface Props {
  conceptId: string
  evaluation: ProblemEvaluation
}

const WellDefinedProblem: React.FC<Props> = ({ conceptId, evaluation }) => {
  const plausible = usePlausible()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    plausible(Goals.Analysis, {
      props: {
        page: 'WellDefinedProblem',
        buttonId: 'well_defined',
      },
    })

    router.push(`/concepts/${conceptId}/audiences`)
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-green-600 md:text-4xl">
        Great news! Your Idea Looks Solid!
      </h1>

      <p className="mb-6 text-lg md:text-2xl">
        Based on your concept, here&apos;s a quick look at your market gaps,
        clarity analysis, and common pain points. This snapshot uses a GPT-4o AI
        model, so treat it as an informed starting point - not the final word.
      </p>

      <WelcomeBanner />

      <HorizontalLine />

      <MarketExistenceSection marketExistence={evaluation.marketExistence} />

      <HorizontalLine />

      <ClarityScoreSection clarityScore={evaluation.clarityScore} />

      <HorizontalLine />

      <LanguageAnalysisSection languageAnalysis={evaluation.languageAnalysis} />

      <HorizontalLine />

      <PainPointsSection painPoints={evaluation.painPoints} />

      <HorizontalLine />

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-md border border-transparent bg-[#023840] px-4 py-2 text-xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-4 md:text-2xl dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
        >
          {isSubmitting ? 'Processing...' : 'Discover Your Target Audience'}
        </button>
      </div>
    </div>
  )
}

export default WellDefinedProblem
