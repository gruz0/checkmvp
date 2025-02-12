'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface Props {
  marketExistence: string | null
}

const MarketExistenceSection: React.FC<Props> = ({ marketExistence }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  if (!marketExistence) return null

  return (
    <SectionWrapper id="market_existence">
      <SectionHeader
        title="How Big Could This Get?"
        emoji="🔎"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_market_existence"
      />

      {isExpanded && (
        <div id="section_market_existence">
          <p className="mb-6 rounded-lg border border-yellow-200/30 bg-yellow-50/50 px-4 py-2 text-yellow-800 md:px-6 md:py-4 md:text-xl dark:border-yellow-900/30 dark:bg-yellow-900/20 dark:text-yellow-200">
            This market analysis is powered by OpenAI. While we aim for accuracy
            through carefully tuned prompts and detailed inputs, please do your
            own research as AI can sometimes provide incomplete or inaccurate
            information (in other words - hallucinate).
          </p>

          <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6 md:pb-0 dark:bg-gray-900/50">
            <Paragraph>
              {marketExistence.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Paragraph>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default MarketExistenceSection
