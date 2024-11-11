'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionElevatorPitchProps {
  onReport: (section: string) => void
  data: Array<{
    hook: string
    problem: string
    solution: string
    valueProposition: string
    cta: string
  }> | null
}

const SectionElevatorPitch: React.FC<SectionElevatorPitchProps> = ({
  onReport,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="elevator_pitch">
      <SectionHeader
        color="text-blue-600"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_elevator_pitch"
      >
        Elevator Pitch
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
                <Section
                  key={pitch.hook}
                  header={`${idx + 1}. ${pitch.hook}`}
                  onReport={() => onReport(`elevator_pitch.${idx}`)}
                >
                  <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6 lg:pb-0">
                    <Paragraph>
                      {pitch.problem} {pitch.solution} {pitch.valueProposition}
                    </Paragraph>

                    <Paragraph>{pitch.cta}</Paragraph>
                  </div>
                </Section>
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

export default SectionElevatorPitch
