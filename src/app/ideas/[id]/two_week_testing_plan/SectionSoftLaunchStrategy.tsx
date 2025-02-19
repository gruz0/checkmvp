'use client'

import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionSoftLaunchStrategyProps {
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
}

const SectionSoftLaunchStrategy: React.FC<SectionSoftLaunchStrategyProps> = ({
  softLaunchStrategy,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  return (
    <SectionWrapper id="soft_launch_strategy">
      <SectionHeader
        title="Soft Launch Strategy"
        emoji="🚀"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_soft_launch_strategy"
      />

      {isExpanded && (
        <div id="section_soft_launch_strategy">
          <div className="space-y-6">
            <h3 className="mb-4 text-lg font-semibold md:text-xl">
              Launch Overview
            </h3>

            <SectionContainer>
              <h3 className="mb-2 text-lg font-semibold">Timing:</h3>
              <Paragraph>{softLaunchStrategy.timing}</Paragraph>

              <h3 className="mb-2 text-lg font-semibold">Target Platforms:</h3>
              <SimpleUnorderedList items={softLaunchStrategy.platforms} />

              <h3 className="mb-2 text-lg font-semibold">Preparation Steps:</h3>
              <SimpleUnorderedList
                items={softLaunchStrategy.preparationSteps}
              />

              <h3 className="mb-2 text-lg font-semibold">
                Engagement Tactics:
              </h3>
              <SimpleUnorderedList
                items={softLaunchStrategy.engagementTactics}
              />
            </SectionContainer>

            <h3 className="mb-4 text-lg font-semibold md:text-xl">
              Content Strategy
            </h3>

            <SectionContainer>
              <h3 className="mb-2 text-lg font-semibold">Content Titles:</h3>
              <SimpleUnorderedList
                items={softLaunchStrategy.contentTemplates.titles}
              />

              <h3 className="mb-2 text-lg font-semibold">Problem Statement:</h3>
              <Paragraph>
                {softLaunchStrategy.contentTemplates.problemStatement}
              </Paragraph>

              <h3 className="mb-2 text-lg font-semibold">Solution Preview:</h3>
              <Paragraph>
                {softLaunchStrategy.contentTemplates.solutionPreview}
              </Paragraph>

              <h3 className="mb-2 text-lg font-semibold">Call to Action:</h3>

              <SimpleUnorderedList
                items={[
                  'Primary: ' +
                    softLaunchStrategy.contentTemplates.callToAction.primary,
                  'Secondary: ' +
                    softLaunchStrategy.contentTemplates.callToAction.secondary,
                  'Value Hook: ' +
                    softLaunchStrategy.contentTemplates.callToAction.valueHook,
                ]}
              />

              <h3 className="mb-2 text-lg font-semibold">Key Benefits:</h3>
              <SimpleUnorderedList
                items={softLaunchStrategy.contentTemplates.keyBenefits}
              />

              <h3 className="mb-2 text-lg font-semibold">Social Proof Plan:</h3>
              <Paragraph>
                {softLaunchStrategy.contentTemplates.socialProofPlan}
              </Paragraph>

              <h3 className="mb-2 text-lg font-semibold">Engagement Hooks:</h3>
              <SimpleUnorderedList
                items={softLaunchStrategy.contentTemplates.engagementHooks}
              />
            </SectionContainer>

            {softLaunchStrategy.platformSpecific.map((platform, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="mb-4 text-lg font-semibold md:text-xl">
                  {platform.platform} Launch Strategy
                </h3>

                <SectionContainer>
                  <h3 className="mb-2 text-lg font-semibold">Format:</h3>
                  <Paragraph>{platform.contentFormat}</Paragraph>

                  <h3 className="mb-2 text-lg font-semibold">Best Timing:</h3>
                  <Paragraph>{platform.bestTiming}</Paragraph>

                  <h3 className="mb-2 text-lg font-semibold">
                    Community Rules:
                  </h3>
                  <SimpleUnorderedList items={platform.communityRules} />

                  <h3 className="mb-2 text-lg font-semibold">
                    Engagement Strategy:
                  </h3>
                  <Paragraph>{platform.engagementStrategy}</Paragraph>
                </SectionContainer>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionSoftLaunchStrategy
