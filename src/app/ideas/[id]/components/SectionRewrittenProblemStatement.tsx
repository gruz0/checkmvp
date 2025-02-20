'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface SectionRewrittenProblemStatementProps {
  rewrittenProblemStatement: string
}

const SectionRewrittenProblemStatement: React.FC<
  SectionRewrittenProblemStatementProps
> = ({ rewrittenProblemStatement }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="rewritten_problem_statement">
      <SectionHeader
        title="Rewritten Problem Statement"
        emoji="✍️"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_rewritten_problem_statement"
      />

      {isExpanded && (
        <div id="section_rewritten_problem_statement">
          <SectionContainer>
            <Paragraph>{rewrittenProblemStatement.split('\n')}</Paragraph>
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionRewrittenProblemStatement
