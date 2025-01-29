'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionValuePropositionProps {
  data: {
    mainBenefit: string
    problemSolving: string
    differentiation: string
  } | null
}

const SectionValueProposition: React.FC<SectionValuePropositionProps> = ({
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="value_proposition">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_value_proposition"
      >
        💎 Value Proposition
      </SectionHeader>

      {isExpanded && (
        <div id="section_value_proposition">
          <SectionDescription>
            The value proposition explains what makes your product special.
            Here, we define the main benefits it provides to users and how it
            effectively solves their problems. A clear value proposition helps
            you articulate why someone should choose your product over others.
          </SectionDescription>

          {data ? (
            <>
              <Section header="How to Pitch Your Idea or Start a Conversation:">
                <SectionContainer>
                  <Paragraph>{data.mainBenefit}</Paragraph>

                  <Paragraph>{data.problemSolving}</Paragraph>
                </SectionContainer>
              </Section>

              <Section header="Differentiation:">
                <SectionContainer>
                  <Paragraph>{data.differentiation}</Paragraph>
                </SectionContainer>
              </Section>
            </>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionValueProposition
