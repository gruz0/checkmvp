'use client'
import React from 'react'
import {
  FaBullhorn,
  FaChartLine,
  FaRegLightbulb,
  FaToolbox,
} from 'react-icons/fa'

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
    <h2 className="mb-6 flex items-center text-2xl font-semibold">
      <FaRegLightbulb className="mr-2 text-yellow-600" />
      Content Strategy & Growth Plan:{' '}
      {!contentStrategy && (
        <span className="ml-2 text-gray-600">Analyzing...</span>
      )}
    </h2>

    {contentStrategy && (
      <>
        <div className="mb-8">
          <h3 className="mb-4 flex items-center text-xl font-semibold">
            <FaBullhorn className="mr-2 text-blue-600" />
            Content Marketing Ideas:
          </h3>
          <ul className="list-disc pl-6">
            {contentStrategy.contentMarketingIdeas.map((idea, index) => (
              <li key={index} className="mb-2 text-lg">
                {idea}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center text-xl font-semibold">
            <FaChartLine className="mr-2 text-green-600" />
            Key Metrics to Track Post-Launch:
          </h3>
          <ul className="list-disc pl-6">
            {contentStrategy.keyMetricsToTrackPostLaunch.map(
              (metric, index) => (
                <li key={index} className="mb-2 text-lg">
                  {metric}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center text-xl font-semibold">
            <FaToolbox className="mr-2 text-purple-600" />
            Recommended Tools & Services:
          </h3>
          <ul className="list-disc pl-6">
            {contentStrategy.recommendedToolsAndServices.map((tool, index) => (
              <li key={index} className="mb-2 text-lg">
                <strong>{tool.tool}</strong>: {tool.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center text-xl font-semibold">
            <FaRegLightbulb className="mr-2 text-yellow-600" />
            Case Study Outline:
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Problem Statement:</h4>
              <p className="text-lg">
                {contentStrategy.caseStudyOutline.problemStatement}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Solution:</h4>
              <p className="text-lg">
                {contentStrategy.caseStudyOutline.solution}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Measurable Results:</h4>
              <p className="text-lg">
                {contentStrategy.caseStudyOutline.measurableResults}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">User Testimonials:</h4>
              <p className="text-lg">
                {contentStrategy.caseStudyOutline.userTestimonials}
              </p>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
)

export default ContentStrategyAndGrowthPlanPage
