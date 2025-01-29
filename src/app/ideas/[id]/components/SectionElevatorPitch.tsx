'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SocialShareButton from '@/components/SocialShareButton'

interface ElevatorPitch {
  hook: string
  problem: string
  solution: string
  valueProposition: string
  cta: string
}

interface SectionElevatorPitchProps {
  data: Array<ElevatorPitch> | null
}

const SectionElevatorPitch: React.FC<SectionElevatorPitchProps> = ({
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="elevator_pitch">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_elevator_pitch"
      >
        🎤 Elevator Pitch
      </SectionHeader>

      {isExpanded && (
        <div id="section_elevator_pitch">
          <SectionDescription>
            An elevator pitch is a brief summary of your idea that you can
            deliver quickly and effectively. This section helps you craft a
            compelling and concise way to explain your product to others, which
            can be especially useful when networking or seeking feedback.
          </SectionDescription>

          {data !== null ? (
            <>
              {data.map((pitch, idx) => (
                <Pitch key={idx} idx={idx} pitch={pitch} />
              ))}
            </>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

interface PitchProps {
  idx: number
  pitch: ElevatorPitch
}

const Pitch: React.FC<PitchProps> = ({ idx, pitch }) => {
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
    <Section header={`${idx + 1}. ${pitch.hook}`}>
      <SectionContainer>
        <Paragraph>
          {pitch.problem} {pitch.solution} {pitch.valueProposition}
        </Paragraph>

        <Paragraph>{pitch.cta}</Paragraph>
      </SectionContainer>

      <div className="flex justify-end space-x-2 py-2">
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
                `${pitch.problem} ${pitch.solution} ${pitch.valueProposition} ${pitch.cta}`
              )
            }
            className="rounded bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-700 hover:text-white"
            disabled={isSpeaking}
          >
            🎙️ Pitch It
          </button>
        )}

        <SocialShareButton
          platform="twitter"
          content={`${pitch.problem}\n\n${pitch.solution} ${pitch.valueProposition}\n\n${pitch.cta}`}
        />

        <SocialShareButton
          platform="linkedin"
          content={`${pitch.problem}\n\n${pitch.solution} ${pitch.valueProposition}\n\n${pitch.cta}`}
        />
      </div>
    </Section>
  )
}

export default SectionElevatorPitch
