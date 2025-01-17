'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionVideoContentProps {
  data: Array<{
    header: string
    platform: string
    title: string
    script: string[]
    tips: string[]
    imagePrompt: string
  }>
}

const SectionVideoContent: React.FC<SectionVideoContentProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="video_content">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_video_content"
      >
        Video Content
      </SectionHeader>

      {isExpanded && (
        <div id="section_video_content">
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
                  Script Outline:
                </h3>

                <SimpleUnorderedList items={content.script} />

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

export default SectionVideoContent
