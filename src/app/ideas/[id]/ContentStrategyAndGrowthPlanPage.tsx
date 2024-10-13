'use client'
import React from 'react'
import { FaRegLightbulb, FaSpinner } from 'react-icons/fa'
import Paragraph from './Paragraph'
import Section from './Section'
import SectionHeader from './SectionHeader'
import SimpleUnorderedList from './SimpleUnorderedList'

type RecommendedTool = {
  tool: string
  description: string
}

type CaseStudyOutline = {
  problemStatement: string
  solution: string
  measurableResults: string
  userTestimonials: string
}

export interface ContentStrategyAndGrowthPlanProps {
  contentMarketingIdeas: string[]
  keyMetricsToTrackPostLaunch: string[]
  recommendedToolsAndServices: RecommendedTool[]
  caseStudyOutline: CaseStudyOutline
}

type Props = {
  contentStrategy: ContentStrategyAndGrowthPlanProps | null
}

const ContentStrategyAndGrowthPlanPage = ({ contentStrategy }: Props) => (
  <div>
    <SectionHeader Icon={FaRegLightbulb} color="text-yellow-600">
      Content Strategy & Growth Plan:{' '}
      {!contentStrategy && (
        <FaSpinner className="inline animate-spin text-blue-500" />
      )}
    </SectionHeader>

    {contentStrategy && (
      <>
        <Section header="Content Marketing Ideas:">
          <SimpleUnorderedList items={contentStrategy.contentMarketingIdeas} />
        </Section>

        <Section header="Key Metrics to Track Post-Launch:">
          <SimpleUnorderedList
            items={contentStrategy.keyMetricsToTrackPostLaunch}
          />
        </Section>

        <Section header="Recommended Tools & Services:">
          <ul className="mb-6 list-disc pl-4">
            {contentStrategy.recommendedToolsAndServices.map((tool, index) => (
              <li key={index} className="mb-2 pl-2 text-lg">
                <strong>{tool.tool}</strong>: {tool.description}
              </li>
            ))}
          </ul>
        </Section>

        <Section header="Case Study Outline:">
          <div className="mb-6">
            <h4 className="mb-2 text-lg font-semibold md:text-xl">
              Problem Statement:
            </h4>

            <Paragraph>
              {contentStrategy.caseStudyOutline.problemStatement}
            </Paragraph>
          </div>

          <div className="mb-6">
            <h4 className="mb-2 text-lg font-semibold md:text-xl">Solution:</h4>

            <Paragraph>{contentStrategy.caseStudyOutline.solution}</Paragraph>
          </div>

          <div className="mb-6">
            <h4 className="mb-2 text-lg font-semibold md:text-xl">
              Measurable Results:
            </h4>

            <Paragraph>
              {contentStrategy.caseStudyOutline.measurableResults}
            </Paragraph>
          </div>

          <div className="mb-6">
            <h4 className="mb-2 text-lg font-semibold md:text-xl">
              User Testimonials:
            </h4>

            <Paragraph>
              {contentStrategy.caseStudyOutline.userTestimonials}
            </Paragraph>
          </div>
        </Section>
      </>
    )}
  </div>
)

export default ContentStrategyAndGrowthPlanPage
