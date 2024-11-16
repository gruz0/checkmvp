'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionValuePropositionProps {
  onReport: (section: string) => void
  data: {
    mainBenefit: string
    problemSolving: string
    differentiation: string
  } | null
}

const SectionValueProposition: React.FC<SectionValuePropositionProps> = ({
  onReport,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="value_proposition">
      <SectionHeader
        color="text-blue-600"
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
              <Section
                header="Main Benefit:"
                onReport={() => onReport('value_proposition.main_benefit')}
              >
                <Paragraph>{data.mainBenefit}</Paragraph>
              </Section>

              <Section
                header="How to Pitch It:"
                onReport={() => onReport('value_proposition.problem_solving')}
              >
                <Paragraph>{data.problemSolving}</Paragraph>
              </Section>

              <Section
                header="Differentiation:"
                onReport={() => onReport('value_proposition.differentiation')}
              >
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
