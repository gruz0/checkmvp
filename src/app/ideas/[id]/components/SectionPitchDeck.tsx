'use client'

import React, { useState } from 'react'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

const SectionPitchDeck = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="pitch_deck">
      <SectionHeader
        color="text-gray-400"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_pitch_deck_outline"
      >
        Soon: Pitch Deck Outline
      </SectionHeader>

      {isExpanded && (
        <div id="section_pitch_deck_outline">
          <SectionDescription>
            This section helps you create a structured outline for a pitch deck,
            which is essential if you plan to present your idea to investors or
            stakeholders. A clear pitch can make a strong impression and open
            doors for opportunities.
          </SectionDescription>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionPitchDeck
