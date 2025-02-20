'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SocialShareButton from '@/components/SocialShareButton'

interface SectionElevatorPitchProps {
  id: number
  hook: string
  problem: string
  solution: string
  valueProposition: string
  cta: string
}

const SectionElevatorPitch: React.FC<SectionElevatorPitchProps> = ({
  id,
  hook,
  problem,
  solution,
  valueProposition,
  cta,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  const handleSpeak = (pitchText: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(pitchText)
      utterance.lang = 'en-US'
      utterance.rate = 1.1
      utterance.pitch = 1.1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      speechSynthesis.speak(utterance)
    } else {
      alert('Speech synthesis not supported in this browser.')
    }
  }

  const handleStop = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <SectionWrapper id={`elevator_pitch_${id}`}>
      <SectionHeader
        title={`Version ${id}`}
        emoji="🎤"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId={`section_elevator_pitch_${id}`}
      />

      {isExpanded && (
        <div id={`section_elevator_pitch_${id}`}>
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Problem:</h3>
            <Paragraph>{problem}</Paragraph>

            <h3 className="mb-2 text-lg font-semibold md:text-xl">Hook:</h3>
            <Paragraph>{hook}</Paragraph>

            <h3 className="mb-2 text-lg font-semibold md:text-xl">Solution:</h3>
            <Paragraph>{solution}</Paragraph>

            <h3 className="mb-2 text-lg font-semibold md:text-xl">
              Value Proposition:
            </h3>
            <Paragraph>{valueProposition}</Paragraph>

            <h3 className="mb-2 text-lg font-semibold md:text-xl">CTA:</h3>
            <Paragraph>{cta}</Paragraph>
          </SectionContainer>

          <div className="mt-2 flex justify-end space-x-2 py-2">
            {isSpeaking ? (
              <button
                onClick={handleStop}
                className="rounded bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-700 hover:text-white"
                disabled={!isSpeaking}
              >
                ⏹️ Stop
              </button>
            ) : (
              <button
                onClick={() =>
                  handleSpeak(
                    `${problem} ${hook} ${solution} ${valueProposition} ${cta}`
                  )
                }
                className="rounded bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-700 hover:text-white"
                disabled={isSpeaking}
              >
                🎙️ Play Voice
              </button>
            )}

            <SocialShareButton
              platform="twitter"
              content={`${problem}\n\n${hook}\n\n${solution} ${valueProposition}\n\n${cta}`}
            />

            <SocialShareButton
              platform="linkedin"
              content={`${problem}\n\n${hook}\n\n${solution} ${valueProposition}\n\n${cta}`}
            />
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionElevatorPitch
