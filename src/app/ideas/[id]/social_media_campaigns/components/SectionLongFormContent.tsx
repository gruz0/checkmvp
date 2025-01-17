'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionLongFormContentProps {
  data: Array<{
    header: string
    platform: string
    title: string
    content: string
    tips: string[]
    imagePrompt: string
  }>
}

const SectionLongFormContent: React.FC<SectionLongFormContentProps> = ({
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="long_form_content">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_long_form_content"
      >
        Long-Form Content
      </SectionHeader>

      {isExpanded && (
        <div id="section_long_form_content">
          <SectionDescription>
            This section offers you more detailed content ideas like blog posts
            or articles. Long-form content lets you explore topics in depth,
            giving valuable information to your readers. It&apos;s a great way
            to share your knowledge, tell stories, and connect with your
            audience on a deeper level.
          </SectionDescription>

          {data.map((content, idx) => (
            <Section key={`${content.platform}-${idx}`} header={content.header}>
              <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6 lg:pb-0 dark:bg-gray-900/50">
                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  Title:
                </h3>
                <Paragraph>{content.title}</Paragraph>

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
              </div>
            </Section>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionLongFormContent
