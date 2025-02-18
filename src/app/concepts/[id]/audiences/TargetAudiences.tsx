'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ConceptFormData } from '@/app/api/concepts/[id]/route'
import HorizontalLine from '@/components/HorizontalLine'

import Paragraph from '@/components/Paragraph'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'
import ConfirmationPopup from './ConfirmationPopup'
import { TargetAudience } from './types'

type Props = {
  conceptId: string
  targetAudiences: TargetAudience[]
}

const TargetAudiences = ({ conceptId, targetAudiences }: Props) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(
    targetAudiences.reduce(
      (acc, audience) => ({
        ...acc,
        [audience.id]: false,
      }),
      {}
    )
  )
  const [audienceInputs, setAudienceInputs] = useState<
    Record<string, { statement: string; hypotheses: string[] }>
  >(
    targetAudiences.reduce(
      (acc, audience) => ({
        ...acc,
        [audience.id]: {
          statement: audience.statement,
          hypotheses: audience.hypotheses,
        },
      }),
      {}
    )
  )
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const [selectedAudience, setSelectedAudience] =
    useState<TargetAudience | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const toggleSection = (audienceId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [audienceId]: !prev[audienceId],
    }))
  }

  const handleStatementChange = (audienceId: string, value: string) => {
    setAudienceInputs((prev) => ({
      ...prev,
      [audienceId]: {
        ...prev[audienceId],
        statement: value,
      },
    }))
  }

  const handleHypothesesChange = (audienceId: string, value: string) => {
    setAudienceInputs((prev) => ({
      ...prev,
      [audienceId]: {
        ...prev[audienceId],
        hypotheses: value.split('\n\n').filter(Boolean),
      },
    }))
  }

  const handleTargetAudienceClick = (targetAudience: TargetAudience) => {
    setSelectedAudience(targetAudience)
    setIsPopupOpen(true)
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false)
    setSelectedAudience(null)
  }

  const handleTargetAudienceSubmit = async (targetAudience: TargetAudience) => {
    try {
      setStatus('loading')
      setErrorMessage(null)

      const audienceInput = audienceInputs[targetAudience.id]

      const formData: ConceptFormData = {
        target_audience_id: targetAudience.id,
        statement: audienceInput.statement,
        hypotheses: audienceInput.hypotheses.join('\n\n'),
      }

      const res = await fetch(`/api/concepts/${conceptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    } finally {
      handlePopupClose()
    }
  }

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="mb-6 text-3xl font-bold text-[#023840] md:text-4xl dark:text-gray-100">
          Potential Target Audiences
        </h1>

        <p className="mb-6 text-lg md:text-2xl">
          Below you&apos;ll find several potential target audiences for your
          idea. Choose one that resonates most with your vision - the audience
          you want to focus on first.
        </p>

        <p className="mb-6 text-lg md:text-2xl">
          Your selection will help us prepare the next steps and provide
          relevant information specific to reaching and serving this audience
          effectively. Remember, while you may eventually expand to multiple
          audiences, it&apos;s strategic to start with one clear focus.
        </p>

        {targetAudiences.map((targetAudience) => (
          <React.Fragment key={targetAudience.id}>
            <HorizontalLine />
            <SectionWrapper key={targetAudience.id} id={targetAudience.id}>
              <SectionHeader
                title={targetAudience.segment}
                emoji=""
                sectionId={`section_${targetAudience.id}`}
                onClick={() => toggleSection(targetAudience.id)}
                isExpanded={expandedSections[targetAudience.id]}
              />

              {expandedSections[targetAudience.id] && (
                <div id={`section_${targetAudience.id}`}>
                  <p className="mb-6 md:text-lg lg:text-xl">
                    {targetAudience.why}
                  </p>

                  <div className="mb-6">
                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:border-gray-700 dark:bg-gray-900/50">
                      <p className="mb-4 font-semibold md:text-lg">
                        🚧 Their Challenges:
                      </p>

                      <SimpleUnorderedList items={targetAudience.challenges} />
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:border-gray-700 dark:bg-gray-900/50">
                      <p className="mb-4 font-semibold md:text-lg">
                        😣 Their Pain Points:
                      </p>
                      <SimpleUnorderedList items={targetAudience.painPoints} />
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:border-gray-700 dark:bg-gray-900/50">
                      <p className="mb-4 font-semibold md:text-lg">
                        🎯 How to Reach Them?
                      </p>

                      <Paragraph>{targetAudience.targetingStrategy}</Paragraph>
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:border-gray-700 dark:bg-gray-900/50">
                      <p className="mb-4 font-semibold md:text-lg">
                        🎯 Testable Statement:
                      </p>
                      <p className="mb-4 md:text-lg">
                        Refine this statement to clearly define what you want to
                        test with this audience.
                        <br />
                        Your input will help shape the validation strategy.
                      </p>
                      <textarea
                        className="block h-32 w-full rounded-md border-gray-300 shadow-sm focus:border-[#023840] focus:ring-[#023840] md:mt-0 md:text-lg dark:bg-gray-900 dark:text-gray-200 dark:focus:border-[#7bf179] dark:focus:ring-[#7bf179]"
                        value={audienceInputs[targetAudience.id].statement}
                        onChange={(e) =>
                          handleStatementChange(
                            targetAudience.id,
                            e.target.value
                          )
                        }
                        placeholder="Enter your testable statement here..."
                        minLength={10}
                        maxLength={2048}
                      />
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 dark:border-gray-700 dark:bg-gray-900/50">
                      <p className="mb-4 font-semibold md:text-lg">
                        🧪 Hypotheses:
                      </p>
                      <p className="mb-4 md:text-lg">
                        Modify or add your key hypotheses about this audience.
                        <br />
                        These will be used to create your validation experiments
                        and research plan.
                      </p>
                      <textarea
                        className="block h-64 w-full rounded-md border-gray-300 shadow-sm focus:border-[#023840] focus:ring-[#023840] md:mt-0 md:text-lg dark:bg-gray-900 dark:text-gray-200 dark:focus:border-[#7bf179] dark:focus:ring-[#7bf179]"
                        value={audienceInputs[
                          targetAudience.id
                        ].hypotheses.join('\n\n')}
                        onChange={(e) =>
                          handleHypothesesChange(
                            targetAudience.id,
                            e.target.value
                          )
                        }
                        placeholder="Enter your hypotheses here..."
                        minLength={10}
                        maxLength={2048}
                      />
                    </div>

                    <button
                      onClick={() => handleTargetAudienceClick(targetAudience)}
                      className="rounded-md border border-transparent bg-[#023840] px-4 py-2 font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 md:px-6 md:py-3 md:text-xl dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
                    >
                      Continue with {targetAudience.segment}
                    </button>

                    {errorMessage && (
                      <p className="mt-2 text-sm text-red-600">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </SectionWrapper>
          </React.Fragment>
        ))}
      </div>

      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onConfirm={() =>
          selectedAudience && handleTargetAudienceSubmit(selectedAudience)
        }
        audience={
          selectedAudience
            ? {
                segment: selectedAudience.segment,
                statement: audienceInputs[selectedAudience.id].statement,
                hypotheses: audienceInputs[selectedAudience.id].hypotheses,
              }
            : null
        }
        isLoading={status === 'loading'}
      />
    </>
  )
}

export default TargetAudiences
