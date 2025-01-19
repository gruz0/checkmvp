'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionTwoWeekTestingPlanProps {
  data: {
    coreAssumptions: Array<{
      assumption: string
      whyCritical: string
      validationMethod: string
    }>
    twoWeekPlan: Array<{
      day: number
      focus: string
      tasks: string[]
      successMetrics: string[]
      toolsNeeded: string[]
      estimatedTime: string
    }>
    keyMetrics: {
      qualitative: string[]
      quantitative: string[]
      minimumSuccessCriteria: string[]
    }
    testingMethods: Array<{
      method: string
      description: string
      whenToUse: string
      expectedOutcome: string
    }>
    contingencyPlans: Array<{
      scenario: string
      solution: string
      alternativeApproach: string
    }>
    resourceOptimization: {
      minimumBudget: string
      timeSavingTips: string[]
      freeTools: string[]
      paidAlternatives: string[]
    }
    softLaunchStrategy: {
      platforms: string[]
      preparationSteps: string[]
      timing: string
      engagementTactics: string[]
      contentTemplates: {
        titles: string[]
        shortDescription: string
        problemStatement: string
        solutionPreview: string
        callToAction: {
          primary: string
          secondary: string
          valueHook: string
        }
        keyBenefits: string[]
        socialProofPlan: string[]
        engagementHooks: string[]
      }
      platformSpecific: Array<{
        platform: string
        contentFormat: string
        bestTiming: string
        communityRules: string[]
        engagementStrategy: string
      }>
    }
  } | null
}

const SectionTwoWeekTestingPlan: React.FC<SectionTwoWeekTestingPlanProps> = ({
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="two_week_testing_plan">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_two_week_testing_plan"
      >
        Two-Week Testing Plan
      </SectionHeader>

      {isExpanded && (
        <div id="section_two_week_testing_plan">
          <SectionDescription>
            This section outlines a simple plan for testing your product idea
            with real users over two weeks. Getting feedback early can save you
            time and resources later on. It&apos;s about learning quickly and
            adjusting your approach based on what you discover.
          </SectionDescription>

          {data ? (
            <>
              <Section header="Core Assumptions to Test:">
                {data.coreAssumptions.map((assumption, idx) => (
                  <React.Fragment key={idx}>
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      {idx + 1}. {assumption.assumption}
                    </h3>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                      <h3 className="mb-2 text-lg font-semibold">
                        Why Critical:
                      </h3>
                      <Paragraph>{assumption.whyCritical}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        Validation Method:
                      </h3>
                      <Paragraph last>{assumption.validationMethod}</Paragraph>
                    </div>
                  </React.Fragment>
                ))}
              </Section>

              <Section header="Day-by-Day Plan:">
                {data.twoWeekPlan.map((day) => (
                  <React.Fragment key={day.day}>
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      Day {day.day}: {day.focus}
                    </h3>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                      <h3 className="mb-2 text-lg font-semibold">Tasks:</h3>
                      <SimpleUnorderedList items={day.tasks} />

                      <h3 className="mb-2 text-lg font-semibold">
                        Success Metrics:
                      </h3>
                      <SimpleUnorderedList items={day.successMetrics} />

                      <h3 className="mb-2 text-lg font-semibold">
                        Tools Needed:
                      </h3>
                      <SimpleUnorderedList items={day.toolsNeeded} />

                      <h3 className="mb-2 text-lg font-semibold">
                        Estimated Time:
                      </h3>
                      <Paragraph last>{day.estimatedTime}</Paragraph>
                    </div>
                  </React.Fragment>
                ))}
              </Section>

              <Section header="Key Metrics:">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                  <h3 className="mb-2 text-lg font-semibold">
                    Qualitative Metrics:
                  </h3>
                  <SimpleUnorderedList items={data.keyMetrics.qualitative} />

                  <h3 className="mb-2 text-lg font-semibold">
                    Quantitative Metrics:
                  </h3>
                  <SimpleUnorderedList items={data.keyMetrics.quantitative} />

                  <h3 className="mb-2 text-lg font-semibold">
                    Minimum Success Criteria:
                  </h3>
                  <SimpleUnorderedList
                    items={data.keyMetrics.minimumSuccessCriteria}
                    last
                  />
                </div>
              </Section>

              <Section header="Testing Methods:">
                {data.testingMethods.map((method, idx) => (
                  <React.Fragment key={idx}>
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      {idx + 1}. {method.method}
                    </h3>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                      <Paragraph>{method.description}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        When to Use:
                      </h3>
                      <Paragraph>{method.whenToUse}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        Expected Outcome:
                      </h3>
                      <Paragraph last>{method.expectedOutcome}</Paragraph>
                    </div>
                  </React.Fragment>
                ))}
              </Section>

              <Section header="Contingency Plans:">
                {data.contingencyPlans.map((plan, idx) => (
                  <React.Fragment key={idx}>
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      {idx + 1}. {plan.scenario}
                    </h3>

                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                      <h3 className="mb-2 text-lg font-semibold">Solution:</h3>
                      <Paragraph>{plan.solution}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        Alternative Approach:
                      </h3>
                      <Paragraph last>{plan.alternativeApproach}</Paragraph>
                    </div>
                  </React.Fragment>
                ))}
              </Section>

              <Section header="Resource Optimization:">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                  <h3 className="mb-2 text-lg font-semibold">
                    Minimum Budget:
                  </h3>
                  <Paragraph>
                    {data.resourceOptimization.minimumBudget}
                  </Paragraph>

                  <h3 className="mb-2 text-lg font-semibold">
                    Time-Saving Tips:
                  </h3>
                  <SimpleUnorderedList
                    items={data.resourceOptimization.timeSavingTips}
                  />

                  <h3 className="mb-2 text-lg font-semibold">Free Tools:</h3>
                  <SimpleUnorderedList
                    items={data.resourceOptimization.freeTools}
                  />

                  <h3 className="mb-2 text-lg font-semibold">
                    Paid Alternatives:
                  </h3>
                  <SimpleUnorderedList
                    items={data.resourceOptimization.paidAlternatives}
                    last
                  />
                </div>
              </Section>

              <Section header="Soft Launch Strategy:">
                <div className="space-y-6">
                  <h3 className="mb-4 text-lg font-semibold md:text-xl">
                    Launch Overview
                  </h3>

                  <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                    <h3 className="mb-2 text-lg font-semibold">Timing:</h3>
                    <Paragraph>{data.softLaunchStrategy.timing}</Paragraph>

                    <h3 className="mb-2 text-lg font-semibold">
                      Target Platforms:
                    </h3>
                    <SimpleUnorderedList
                      items={data.softLaunchStrategy.platforms}
                    />

                    <h3 className="mb-2 text-lg font-semibold">
                      Preparation Steps:
                    </h3>
                    <SimpleUnorderedList
                      items={data.softLaunchStrategy.preparationSteps}
                      last
                    />
                  </div>

                  <h3 className="mb-4 text-lg font-semibold md:text-xl">
                    Content Strategy
                  </h3>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                    <h3 className="mb-2 text-lg font-semibold">
                      Content Titles:
                    </h3>
                    <SimpleUnorderedList
                      items={data.softLaunchStrategy.contentTemplates.titles}
                    />

                    <h3 className="mb-2 text-lg font-semibold">
                      Problem Statement:
                    </h3>
                    <Paragraph>
                      {
                        data.softLaunchStrategy.contentTemplates
                          .problemStatement
                      }
                    </Paragraph>

                    <h3 className="mb-2 text-lg font-semibold">
                      Solution Preview:
                    </h3>
                    <Paragraph>
                      {data.softLaunchStrategy.contentTemplates.solutionPreview}
                    </Paragraph>

                    <h3 className="mb-2 text-lg font-semibold">
                      Call to Action:
                    </h3>

                    <ul className="mb-4 list-disc pl-4">
                      <li className="mb-2 pl-1 md:pl-2 md:text-lg">
                        Primary:{' '}
                        {
                          data.softLaunchStrategy.contentTemplates.callToAction
                            .primary
                        }
                      </li>
                      <li className="mb-2 pl-1 md:pl-2 md:text-lg">
                        Secondary:{' '}
                        {
                          data.softLaunchStrategy.contentTemplates.callToAction
                            .secondary
                        }
                      </li>
                      <li className="mb-2 pl-1 md:pl-2 md:text-lg">
                        Value Hook:{' '}
                        {
                          data.softLaunchStrategy.contentTemplates.callToAction
                            .valueHook
                        }
                      </li>
                    </ul>

                    <h3 className="mb-2 text-lg font-semibold">
                      Key Benefits:
                    </h3>
                    <SimpleUnorderedList
                      items={
                        data.softLaunchStrategy.contentTemplates.keyBenefits
                      }
                      last
                    />
                  </div>

                  {data.softLaunchStrategy.platformSpecific.map(
                    (platform, idx) => (
                      <React.Fragment key={idx}>
                        <h3 className="mb-4 text-lg font-semibold md:text-xl">
                          {platform.platform} Launch Strategy
                        </h3>

                        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg dark:bg-gray-900/50">
                          <h3 className="mb-2 text-lg font-semibold">
                            Format:
                          </h3>
                          <Paragraph>{platform.contentFormat}</Paragraph>

                          <h3 className="mb-2 text-lg font-semibold">
                            Best Timing:
                          </h3>
                          <Paragraph>{platform.bestTiming}</Paragraph>

                          <h3 className="mb-2 text-lg font-semibold">
                            Community Rules:
                          </h3>
                          <SimpleUnorderedList
                            items={platform.communityRules}
                          />

                          <h3 className="mb-2 text-lg font-semibold">
                            Engagement Strategy:
                          </h3>
                          <Paragraph last>
                            {platform.engagementStrategy}
                          </Paragraph>
                        </div>
                      </React.Fragment>
                    )
                  )}
                </div>
              </Section>
            </>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionTwoWeekTestingPlan
