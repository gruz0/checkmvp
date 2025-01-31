'use client'
import React from 'react'
import ConceptForm from '@/components/ConceptForm'

import Section from '@/components/Section'
import ClarityScoreSection from './ClarityScoreSection'
import LanguageAnalysisSection from './LanguageAnalysisSection'
import { ProblemEvaluation } from './types'

interface Props {
  problem: string
  region: string
  evaluation: ProblemEvaluation
}

const NotWellDefinedProblem = ({ problem, region, evaluation }: Props) => (
  <div>
    <h1 className="mb-6 text-3xl font-bold text-red-600 md:text-4xl">
      Hmm, We Need More Clarity! 🤔
    </h1>

    <p className="mb-6 text-lg md:text-2xl">
      No worries—sometimes ideas need a bit more detail. Let&apos;s make sure we
      fully capture what you&apos;re trying to build, so we can offer the best
      insights.
    </p>

    <ClarityScoreSection clarityScore={evaluation.clarityScore} />

    <LanguageAnalysisSection languageAnalysis={evaluation.languageAnalysis} />

    <hr className="my-6 md:my-8" />

    <Section header="✍️ Try These Steps to Sharpen Your Idea:">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {evaluation.suggestions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg dark:bg-gray-900/50"
          >
            {item}
          </div>
        ))}
      </div>
    </Section>

    <hr className="my-6 md:my-8" />

    <Section header="💡 Example of a Clear Problem Statement:">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg dark:bg-gray-900/50">
        I&apos;m building a mobile app that connects local freelancers with
        small businesses needing short-term services. My goal is to reduce the
        time freelancers spend searching for gigs and provide businesses with a
        quick hiring tool.
      </div>
    </Section>

    <hr className="my-6 md:my-8" />

    <ConceptForm problem={problem} region={region} cta="Give It Another Shot" />
  </div>
)

export default NotWellDefinedProblem
