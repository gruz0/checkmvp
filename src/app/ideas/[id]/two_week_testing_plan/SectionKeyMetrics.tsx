'use client'

import React, { useState } from 'react'

import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionKeyMetricsProps {
  keyMetrics: {
    qualitative: string[]
    quantitative: string[]
    minimumSuccessCriteria: string[]
  }
}

const SectionKeyMetrics: React.FC<SectionKeyMetricsProps> = ({
  keyMetrics,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="key_metrics">
      <SectionHeader
        title="Key Metrics"
        emoji="📊"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_key_metrics"
      />

      {isExpanded && (
        <div id="section_key_metrics">
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold">Qualitative Metrics:</h3>
            <SimpleUnorderedList items={keyMetrics.qualitative} />

            <h3 className="mb-2 text-lg font-semibold">
              Quantitative Metrics:
            </h3>
            <SimpleUnorderedList items={keyMetrics.quantitative} />

            <h3 className="mb-2 text-lg font-semibold">
              Minimum Success Criteria:
            </h3>
            <SimpleUnorderedList items={keyMetrics.minimumSuccessCriteria} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionKeyMetrics
