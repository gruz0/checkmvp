'use client'

import React, { useState } from 'react'

import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface ClarityScore {
  overallScore: number
  metrics: {
    problemClarity: number
    targetAudienceClarity: number
    scopeDefinition: number
    valuePropositionClarity: number
  }
}

interface Props {
  clarityScore: ClarityScore
}

const getScoreColorClass = (score: number): string => {
  if (score >= 7) return 'text-green-600'
  if (score >= 4) return 'text-orange-500'
  return 'text-red-600'
}

const ClarityScoreSection = ({ clarityScore }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="clarity_score">
      <SectionHeader
        title="Statement Clarity Analysis"
        emoji="📊"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_clarity_score"
      />

      {isExpanded && (
        <div id="section_clarity_score">
          <p className="mb-6 md:text-lg lg:text-xl">
            This section provides a quantitative assessment of the clarity of
            your statement. Every metric is scored from 0 to 10, and to improve
            the score, you can apply the suggestions from the following
            sections.
          </p>

          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Overall Score</span>
              <span
                className={`text-2xl font-bold ${getScoreColorClass(clarityScore.overallScore)}`}
              >
                {clarityScore.overallScore}/10
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(clarityScore.metrics).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-900/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="md:text-base">
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .trim()
                        .split(' ')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </span>
                    <span className="font-semibold">{value}</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default ClarityScoreSection
