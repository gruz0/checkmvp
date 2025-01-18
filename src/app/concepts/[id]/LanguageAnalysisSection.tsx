import React from 'react'
import Section from '@/components/Section'

interface LanguageAnalysis {
  vagueTerms: string[]
  missingContext: string[]
  ambiguousStatements: string[]
}

interface Props {
  languageAnalysis: LanguageAnalysis
}

const LanguageAnalysisSection = ({ languageAnalysis }: Props) => {
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
    <>
      <hr className="my-6 md:my-8" />

      <Section header="🔍 Language Analysis">
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
      </Section>
    </>
  )
}

export default LanguageAnalysisSection
