'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionContextProps {
  data: {
    problem: string
    marketExistence: string
  }
}

const SectionContext: React.FC<SectionContextProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="context">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_context"
      >
        Context
      </SectionHeader>

      {isExpanded && (
        <div id="section_context">
          <SectionDescription>
            In this section, we summarize your original problem and analyze the
            market existence. It sets the stage for your idea by giving you a
            clearer understanding of what you&apos;re aiming to solve and
            whether others are facing similar challenges. Knowing the context
            helps you see how your product can fit into the larger picture.
          </SectionDescription>

          <Section header="How You Defined The Problem:">
            <Paragraph>
              {data.problem.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Paragraph>
          </Section>

          <Section header="Market Existence:">
            <Paragraph>
              {data.marketExistence.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Paragraph>
          </Section>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionContext
