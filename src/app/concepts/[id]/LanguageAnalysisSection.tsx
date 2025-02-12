'use client'

import React, { useState } from 'react'

import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface LanguageAnalysis {
  vagueTerms: string[]
  missingContext: string[]
  ambiguousStatements: string[]
}

interface Props {
  languageAnalysis: LanguageAnalysis
}

const LanguageAnalysisSection = ({ languageAnalysis }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const hasIssues =
    languageAnalysis.vagueTerms.length > 0 ||
    languageAnalysis.missingContext.length > 0 ||
    languageAnalysis.ambiguousStatements.length > 0

  if (!hasIssues) return null

  const activeCardsCount = [
    languageAnalysis.vagueTerms.length > 0,
    languageAnalysis.missingContext.length > 0,
    languageAnalysis.ambiguousStatements.length > 0,
  ].filter(Boolean).length

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  }[activeCardsCount]

  return (
    <SectionWrapper id="language_analysis">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_language_analysis"
      >
        <span className="inline-block w-8 md:w-10">🔍</span> Language Analysis
      </SectionHeader>

      {isExpanded && (
        <div id="section_language_analysis">
          <p className="mb-6 text-lg md:text-xl">
            This section helps identify and improve the clarity of your
            statements. By analyzing vague terms, missing context, and ambiguous
            statements, you can ensure your message is precise and effective. If
            some sections are missing, it means that your input is clear and
            doesn&apos;t need any improvements.
          </p>

          <div className={`grid gap-6 ${gridColsClass}`}>
            {languageAnalysis.vagueTerms.length > 0 && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-900/50">
                <h4 className="mb-3 text-lg font-semibold text-yellow-600">
                  Vague Terms
                </h4>

                <ul className="list-inside list-disc space-y-2 md:text-base">
                  {languageAnalysis.vagueTerms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}

            {languageAnalysis.missingContext.length > 0 && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-900/50">
                <h4 className="mb-3 text-lg font-semibold text-orange-600">
                  Missing Context
                </h4>

                <ul className="list-inside list-disc space-y-2 md:text-base">
                  {languageAnalysis.missingContext.map((context, index) => (
                    <li key={index}>{context}</li>
                  ))}
                </ul>
              </div>
            )}

            {languageAnalysis.ambiguousStatements.length > 0 && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-gray-900/50">
                <h4 className="mb-3 text-lg font-semibold text-red-600">
                  Ambiguous Statements
                </h4>

                <ul className="list-inside list-disc space-y-2 md:text-base">
                  {languageAnalysis.ambiguousStatements.map(
                    (statement, index) => (
                      <li key={index}>{statement}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default LanguageAnalysisSection
