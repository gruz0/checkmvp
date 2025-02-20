'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SocialShareButton from '@/components/SocialShareButton'

interface SectionHowToPitchProps {
  mainBenefit: string
  problemSolving: string
}

const SectionHowToPitch: React.FC<SectionHowToPitchProps> = ({
  mainBenefit,
  problemSolving,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
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
    <SectionWrapper id="how_to_pitch">
      <SectionHeader
        title="How to Pitch Your Idea or Start a Conversation"
        emoji="📢"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_how_to_pitch"
      />

      {isExpanded && (
        <div id="section_how_to_pitch">
          <SectionContainer>
            <Paragraph>{mainBenefit}</Paragraph>

            <Paragraph>{problemSolving}</Paragraph>
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
                onClick={() => handleSpeak(`${mainBenefit} ${problemSolving}`)}
                className="rounded bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-700 hover:text-white"
                disabled={isSpeaking}
              >
                🎙️ Play Voice
              </button>
            )}

            <SocialShareButton
              platform="twitter"
              content={`${mainBenefit}\n\n${problemSolving}`}
            />

            <SocialShareButton
              platform="linkedin"
              content={`${mainBenefit}\n\n${problemSolving}`}
            />
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionHowToPitch
