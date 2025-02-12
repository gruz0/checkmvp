'use client'

import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
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
        title="Two-Week Testing Plan"
        emoji="📅"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_two_week_testing_plan"
      />

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
                  <div key={idx} className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      {idx + 1}. {assumption.assumption}
                    </h3>

                    <SectionContainer>
                      <h3 className="mb-2 text-lg font-semibold">
                        Why Critical:
                      </h3>
                      <Paragraph>{assumption.whyCritical}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        Validation Method:
                      </h3>
                      <Paragraph>{assumption.validationMethod}</Paragraph>
                    </SectionContainer>
                  </div>
                ))}
              </Section>

              <Section header="Day-by-Day Plan:">
                {data.twoWeekPlan.map((day) => (
                  <div key={day.day} className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      Day {day.day}: {day.focus}
                    </h3>

                    <SectionContainer>
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
                      <Paragraph>{day.estimatedTime}</Paragraph>
                    </SectionContainer>
                  </div>
                ))}
              </Section>

              <Section header="Key Metrics:">
                <SectionContainer>
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
                  />
                </SectionContainer>
              </Section>

              <Section header="Testing Methods:">
                {data.testingMethods.map((method, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      {idx + 1}. {method.method}
                    </h3>

                    <SectionContainer>
                      <Paragraph>{method.description}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        When to Use:
                      </h3>
                      <Paragraph>{method.whenToUse}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        Expected Outcome:
                      </h3>
                      <Paragraph>{method.expectedOutcome}</Paragraph>
                    </SectionContainer>
                  </div>
                ))}
              </Section>

              <Section header="Contingency Plans:">
                {data.contingencyPlans.map((plan, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold md:text-xl">
                      {idx + 1}. {plan.scenario}
                    </h3>

                    <SectionContainer>
                      <h3 className="mb-2 text-lg font-semibold">Solution:</h3>
                      <Paragraph>{plan.solution}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold">
                        Alternative Approach:
                      </h3>
                      <Paragraph>{plan.alternativeApproach}</Paragraph>
                    </SectionContainer>
                  </div>
                ))}
              </Section>

              <Section header="Resource Optimization:">
                <SectionContainer>
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
                  />
                </SectionContainer>
              </Section>

              <Section header="Soft Launch Strategy:">
                <div className="space-y-6">
                  <h3 className="mb-4 text-lg font-semibold md:text-xl">
                    Launch Overview
                  </h3>

                  <SectionContainer>
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
                    />
                  </SectionContainer>

                  <h3 className="mb-4 text-lg font-semibold md:text-xl">
                    Content Strategy
                  </h3>

                  <SectionContainer>
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

                    <SimpleUnorderedList
                      items={[
                        'Primary: ' +
                          data.softLaunchStrategy.contentTemplates.callToAction
                            .primary,
                        'Secondary: ' +
                          data.softLaunchStrategy.contentTemplates.callToAction
                            .secondary,
                        'Value Hook: ' +
                          data.softLaunchStrategy.contentTemplates.callToAction
                            .valueHook,
                      ]}
                    />

                    <h3 className="mb-2 text-lg font-semibold">
                      Key Benefits:
                    </h3>
                    <SimpleUnorderedList
                      items={
                        data.softLaunchStrategy.contentTemplates.keyBenefits
                      }
                    />
                  </SectionContainer>

                  {data.softLaunchStrategy.platformSpecific.map(
                    (platform, idx) => (
                      <div key={idx} className="mb-6">
                        <h3 className="mb-4 text-lg font-semibold md:text-xl">
                          {platform.platform} Launch Strategy
                        </h3>

                        <SectionContainer>
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
                          <Paragraph>{platform.engagementStrategy}</Paragraph>
                        </SectionContainer>
                      </div>
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
