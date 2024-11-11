'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionTargetAudiencesProps {
  onReport: (section: string) => void
  data: Array<{
    id: string
    segment: string
    description: string
    challenges: string[]
    why: string | null
    painPoints: string[] | null
    targetingStrategy: string | null
  }>
}

const SectionTargetAudiences: React.FC<SectionTargetAudiencesProps> = ({
  onReport,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="target_audiences">
      <SectionHeader
        color="text-blue-600"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_target_audiences"
      >
        Target Audiences
      </SectionHeader>

      {isExpanded && (
        <div id="section_target_audiences">
          <SectionDescription>
            This section presents potential target audiences for your product,
            detailing their specific characteristics and needs. It&apos;s vital
            to understand who you&apos;re trying to reach because tailoring your
            message to these groups can make your product more appealing.
            Knowing your audience is key to success!
          </SectionDescription>

          {data.map((audience, idx) => (
            <Section
              key={audience.id}
              header={`${idx + 1}. ${audience.segment}`}
              onReport={() => onReport(`target_audiences.${audience.id}`)}
            >
              <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6">
                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Description:
                </h3>
                <Paragraph>{audience.description}</Paragraph>

                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Challenges:
                </h3>
                <SimpleUnorderedList items={audience.challenges} />

                <h3 className="mb-2 text-lg font-semibold md:text-xl">Why:</h3>
                {audience.why ? (
                  <Paragraph>{audience.why}</Paragraph>
                ) : (
                  <FetchingDataMessage />
                )}

                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Pain Points:
                </h3>
                {audience.painPoints ? (
                  <SimpleUnorderedList items={audience.painPoints} />
                ) : (
                  <FetchingDataMessage />
                )}

                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Targeting Strategy:
                </h3>
                {audience.targetingStrategy ? (
                  <Paragraph>{audience.targetingStrategy}</Paragraph>
                ) : (
                  <FetchingDataMessage />
                )}
              </div>
            </Section>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionTargetAudiences
