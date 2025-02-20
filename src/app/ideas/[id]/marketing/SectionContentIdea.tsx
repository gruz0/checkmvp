'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionContentIdeaProps {
  ideaId: string
  section: string
  header: string
  emoji: string
  contentIdea: ContentIdea
  generatableContent: boolean
}

interface ContentIdea {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

const SectionContentIdea: React.FC<SectionContentIdeaProps> = ({
  ideaId,
  section,
  header,
  emoji,
  contentIdea,
  generatableContent,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id={`section_${section}`}>
      <SectionHeader
        title={header}
        emoji={emoji}
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId={`${section}_content_idea`}
      />

      {isExpanded && (
        <div id={`${section}_content_idea`}>
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold">Platforms:</h3>

            <Paragraph>{contentIdea.platforms.join(', ')}</Paragraph>

            <h3 className="mb-2 text-lg font-semibold">Ideas:</h3>

            <SimpleUnorderedList items={contentIdea.ideas} />

            <h3 className="mb-2 text-lg font-semibold">Benefits:</h3>

            <SimpleUnorderedList items={contentIdea.benefits} />

            {generatableContent && (
              <div className="mb-6 mt-4 lg:mt-2">
                <Link
                  href={`/ideas/${ideaId}/marketing/${section}`}
                  target="_blank"
                  className="rounded bg-[#023840] px-4 py-2 font-semibold text-[#7bf179] hover:bg-[#034e59] dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
                >
                  Generate Content
                </Link>
              </div>
            )}
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionContentIdea
