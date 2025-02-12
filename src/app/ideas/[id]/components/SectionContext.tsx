'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionContextProps {
  data: {
    problem: string
    contextAnalysis: {
      problemDefinition: string
      region: string
      marketExistence: string[]
      existingSolutions: string[]
      mainChallenges: string[]
      targetUsers: string
      whyItMatters: string
      opportunities: string[]
      callToAction: string[]
    } | null
  }
}

const SectionContext: React.FC<SectionContextProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="context">
      <SectionHeader
        title="Context"
        emoji="🔎"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_context"
      />

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
            <SectionContainer>
              <Paragraph>
                {data.problem.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Paragraph>
            </SectionContainer>
          </Section>

          {data.contextAnalysis ? (
            <>
              <Section header="Rewritten Problem Statement:">
                <SectionContainer>
                  <Paragraph>
                    {data.contextAnalysis.problemDefinition}
                  </Paragraph>
                </SectionContainer>
              </Section>

              <Section header="Market Existence Details:">
                <SectionContainer>
                  <SimpleUnorderedList
                    items={data.contextAnalysis.marketExistence}
                  />
                </SectionContainer>
              </Section>

              <Section header="Existing Solutions:">
                <SectionContainer>
                  <SimpleUnorderedList
                    items={data.contextAnalysis.existingSolutions}
                  />
                </SectionContainer>
              </Section>

              <Section header="Main Challenges:">
                <SectionContainer>
                  <SimpleUnorderedList
                    items={data.contextAnalysis.mainChallenges}
                  />
                </SectionContainer>
              </Section>

              <Section header="Target Users:">
                <SectionContainer>
                  <Paragraph>{data.contextAnalysis.targetUsers}</Paragraph>
                </SectionContainer>
              </Section>

              <Section header="Why It Matters:">
                <SectionContainer>
                  <Paragraph>{data.contextAnalysis.whyItMatters}</Paragraph>
                </SectionContainer>
              </Section>

              <Section header="Opportunities:">
                <SectionContainer>
                  <SimpleUnorderedList
                    items={data.contextAnalysis.opportunities}
                  />
                </SectionContainer>
              </Section>

              <Section header="Next Steps:">
                <SectionContainer>
                  <SimpleUnorderedList
                    items={data.contextAnalysis.callToAction}
                  />
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

export default SectionContext
