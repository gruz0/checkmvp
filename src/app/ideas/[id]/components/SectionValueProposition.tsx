'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
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
        Value Proposition
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
              <Section header="Main Benefit:">
                <Paragraph>{data.mainBenefit}</Paragraph>
              </Section>

              <Section header="How to Pitch It:">
                <Paragraph>{data.problemSolving}</Paragraph>
              </Section>

              <Section header="Differentiation:">
                <Paragraph>{data.differentiation}</Paragraph>
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
