'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionDayByDayPlanProps {
  twoWeekPlan: Array<{
    day: number
    focus: string
    tasks: string[]
    successMetrics: string[]
    toolsNeeded: string[]
    estimatedTime: string
  }>
}

const SectionDayByDayPlan: React.FC<SectionDayByDayPlanProps> = ({
  twoWeekPlan,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="day_by_day_plan">
      <SectionHeader
        title="Day-by-Day Plan"
        emoji="📅"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_day_by_day_plan"
      />

      {isExpanded && (
        <div id="section_day_by_day_plan">
          {twoWeekPlan.map((day) => (
            <div key={day.day} className="mb-6">
              <h3 className="mb-4 text-lg font-semibold md:text-xl">
                Day {day.day}: {day.focus}
              </h3>

              <SectionContainer>
                <h3 className="mb-2 text-lg font-semibold">Tasks:</h3>
                <SimpleUnorderedList items={day.tasks} />

                <h3 className="mb-2 text-lg font-semibold">Success Metrics:</h3>
                <SimpleUnorderedList items={day.successMetrics} />

                <h3 className="mb-2 text-lg font-semibold">Tools Needed:</h3>
                <SimpleUnorderedList items={day.toolsNeeded} />

                <h3 className="mb-2 text-lg font-semibold">Estimated Time:</h3>
                <Paragraph>{day.estimatedTime}</Paragraph>
              </SectionContainer>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionDayByDayPlan
