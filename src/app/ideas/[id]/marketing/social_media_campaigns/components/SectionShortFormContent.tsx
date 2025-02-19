'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionShortFormContentProps {
  data: Array<{
    header: string
    platform: string
    content: string
    tips: string[]
    imagePrompt: string
  }>
}

const SectionShortFormContent: React.FC<SectionShortFormContentProps> = ({
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="short_form_content">
      <SectionHeader
        title="Short-Form Content"
        emoji="📝"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_short_form_content"
      />

      {isExpanded && (
        <div id="section_short_form_content">
          <SectionDescription>
            This section provides you with quick and catchy messages ideal for
            platforms where you need to be brief, like Twitter. Short-form
            content helps you share your main ideas in a few words, making it
            easy to grab people&apos;s attention. It&apos;s perfect for sharing
            updates, tips, or interesting thoughts that can engage your audience
            without taking much of their time.
          </SectionDescription>

          {data.map((content, idx) => (
            <Section key={`${content.platform}-${idx}`} header={content.header}>
              <SectionContainer>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Content:
                </h3>

                <Paragraph>
                  {content.content.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Paragraph>

                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Adaptation Tips:
                </h3>

                <SimpleUnorderedList items={content.tips} />

                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Image Prompt for AI:
                </h3>

                <Paragraph>{content.imagePrompt}</Paragraph>
              </SectionContainer>
            </Section>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionShortFormContent
