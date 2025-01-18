import React from 'react'
import Section from '@/components/Section'

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

const ClarityScoreSection = ({ clarityScore }: Props) => (
  <>
    <hr className="my-6 md:my-8" />
    <Section header="📊 Clarity Analysis">
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
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
    </Section>
  </>
)

export default ClarityScoreSection
