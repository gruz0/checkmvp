'use client'
import React from 'react'
import ConceptForm from '@/components/ConceptForm'

import HorizontalLine from '@/components/HorizontalLine'
import ClarityScoreSection from './ClarityScoreSection'
import LanguageAnalysisSection from './LanguageAnalysisSection'
import SharpenIdeaSection from './SharpenIdeaSection'
import WelcomeBanner from './WelcomeBanner'
import { ProblemEvaluation } from './types'

interface Props {
  problem: string
  persona: string
  region: string
  productType: string
  stage: string
  evaluation: ProblemEvaluation
}

const NotWellDefinedProblem = ({
  problem,
  persona,
  region,
  productType,
  stage,
  evaluation,
}: Props) => (
  <div>
    <h1 className="mb-6 text-3xl font-bold text-red-600 md:text-4xl">
      Hmm, We Need More Clarity! 🤔
    </h1>

    <p className="mb-6 text-lg md:text-2xl">
      No worries—sometimes ideas need a bit more detail. Let&apos;s make sure we
      fully capture what you&apos;re trying to build, so we can offer the best
      insights.
    </p>

    <WelcomeBanner />

    <HorizontalLine />

    <ClarityScoreSection clarityScore={evaluation.clarityScore} />

    <LanguageAnalysisSection languageAnalysis={evaluation.languageAnalysis} />

    <HorizontalLine />

    <SharpenIdeaSection suggestions={evaluation.suggestions} />

    <HorizontalLine />

    <ConceptForm
      problem={problem}
      persona={persona}
      region={region}
      productType={productType}
      stage={stage}
      cta="Give It Another Shot"
    />
  </div>
)

export default NotWellDefinedProblem
