'use client'

import { useRouter } from 'next/navigation'
import { usePlausible } from 'next-plausible'
import React, { useState } from 'react'
import ConceptForm from '@/components/ConceptForm'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import { Goals } from '@/lib/goals'
import AssumptionsAnalysisSection from './AssumptionsAnalysisSection'
import ClarityScoreSection from './ClarityScoreSection'
import HypothesisFrameworkSection from './HypothesisFrameworkSection'
import LanguageAnalysisSection from './LanguageAnalysisSection'
import MarketExistenceSection from './MarketExistenceSection'
import RecommendationsSection from './RecommendationsSection'
import SharpenIdeaSection from './SharpenIdeaSection'
import TargetAudienceSection from './TargetAudienceSection'
import ValidationPlanSection from './ValidationPlanSection'
import { ProblemEvaluation } from './types'

interface Props {
  conceptId: string
  problem: string
  persona: string
  region: string
  productType: string
  stage: string
  evaluation: ProblemEvaluation
}

const ProblemRequiresChanges = ({
  conceptId,
  problem,
  persona,
  region,
  productType,
  stage,
  evaluation,
}: Props) => {
  const plausible = usePlausible()

  const [status, setStatus] = useState<string>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setStatus('loading')
      setErrorMessage(null)

      plausible(Goals.Analysis, {
        props: {
          page: 'ProblemRequiresChanges',
          buttonId: 'requires_changes',
        },
      })

      const res = await fetch(`/api/concepts/${conceptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 201) {
        const data = await res.json()
        router.push(`/ideas/${data.idea_id}`)
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

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-orange-600 md:text-4xl">
        Looks Good, But Let&apos;s Polish It Up
      </h1>

      {evaluation.marketExistence ? (
        <>
          <p className="mb-6 text-lg md:text-2xl">
            Your idea is off to a great start. We can either dive into the full
            analysis now, or you can refine your problem statement below for
            even more accurate insights.
          </p>

          <HorizontalLine />

          <MarketExistenceSection
            marketExistence={evaluation.marketExistence}
          />
        </>
      ) : (
        <Section header="Hmm, We Need More Clarity! 🤔">
          <Paragraph>
            No worries—sometimes ideas need a bit more detail. Let&apos;s make
            sure we fully capture what you&apos;re trying to build, so we can
            offer the best insights.
          </Paragraph>
        </Section>
      )}

      <HorizontalLine />

      <ClarityScoreSection clarityScore={evaluation.clarityScore} />

      <HorizontalLine />

      <LanguageAnalysisSection languageAnalysis={evaluation.languageAnalysis} />

      <HorizontalLine />

      <SharpenIdeaSection suggestions={evaluation.suggestions} />

      {evaluation.recommendations.length > 0 && (
        <>
          <HorizontalLine />

          <RecommendationsSection
            recommendations={evaluation.recommendations}
          />
        </>
      )}

      <HorizontalLine />

      <TargetAudienceSection targetAudience={evaluation.targetAudience} />

      <HorizontalLine />

      <AssumptionsAnalysisSection
        assumptionsAnalysis={evaluation.assumptionsAnalysis}
      />

      <HorizontalLine />

      <HypothesisFrameworkSection
        hypothesisFramework={evaluation.hypothesisFramework}
      />

      <HorizontalLine />

      <ValidationPlanSection validationPlan={evaluation.validationPlan} />

      <HorizontalLine />

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      {evaluation.marketExistence && evaluation.targetAudience.length > 0 ? (
        <div className="mt-6">
          <Section header="Ready for a Full Breakdown?">
            <p className="mb-6 text-lg md:text-xl">
              Explore complete competitor breakdowns, marketing angles, and
              more. In the next screen, we&apos;ll dive deeper into more than 10
              sections and prepare a comprehensive report based on your problem.
              This analysis might take up to a minute, depending on available
              information.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md border border-transparent bg-[#023840] px-4 py-2 text-xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 md:px-6 md:py-4 md:text-2xl dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Saving...' : 'Go To Detailed Analysis'}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="rounded-md border border-[#023840] bg-white px-4 py-2 text-xl font-medium text-[#023840] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 md:px-6 md:py-4 md:text-2xl dark:border-[#7bf179] dark:bg-transparent dark:text-[#7bf179] dark:hover:bg-gray-800"
              >
                Edit Your Input
              </button>
            </div>
          </Section>

          {showForm && (
            <>
              <HorizontalLine />

              <div className="mt-6">
                <Section header="📝 Make Changes to Your Original Statement:">
                  <p className="mb-6 text-lg md:text-xl">
                    Feel free to copy any text from this page and add additional
                    information to your prompt. This will help us re-generate a
                    basic analysis that better matches your needs. Just give it
                    one try and see how it goes.
                  </p>
                  <ConceptForm
                    problem={problem}
                    persona={persona}
                    region={region}
                    productType={productType}
                    stage={stage}
                    cta="Make Changes"
                  />
                </Section>
              </div>
            </>
          )}
        </div>
      ) : (
        <Section header="📝 Please Make Changes to Your Original Statement:">
          <ConceptForm
            problem={problem}
            persona={persona}
            region={region}
            productType={productType}
            stage={stage}
            cta="Make Changes"
          />
        </Section>
      )}
    </div>
  )
}

export default ProblemRequiresChanges
