import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionContingencyPlans from './SectionContingencyPlans'
import SectionCoreAssumptions from './SectionCoreAssumptions'
import SectionDayByDayPlan from './SectionDayByDayPlan'
import SectionKeyMetrics from './SectionKeyMetrics'
import SectionResourceOptimization from './SectionResourceOptimization'
import SectionSoftLaunchStrategy from './SectionSoftLaunchStrategy'
import SectionTestingMethods from './SectionTestingMethods'

interface Props {
  ideaId: string
  testingPlan: {
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
  }
}

export const TwoWeekTestingPlanReport = ({ ideaId, testingPlan }: Props) => (
  <MainContainer
    ideaId={ideaId}
    activePath="two_week_testing_plan"
    reportIsReady
  >
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        📅 Two Week Testing Plan
      </h1>
    </div>

    <Paragraph>
      This section outlines a simple plan for testing your product idea with
      real users over two weeks. Getting feedback early can save you time and
      resources later on. It&apos;s about learning quickly and adjusting your
      approach based on what you discover.
    </Paragraph>

    <HorizontalLine />

    <SectionCoreAssumptions coreAssumptions={testingPlan.coreAssumptions} />

    <HorizontalLine />

    <SectionDayByDayPlan twoWeekPlan={testingPlan.twoWeekPlan} />

    <HorizontalLine />

    <SectionKeyMetrics keyMetrics={testingPlan.keyMetrics} />

    <HorizontalLine />

    <SectionTestingMethods testingMethods={testingPlan.testingMethods} />

    <HorizontalLine />

    <SectionContingencyPlans contingencyPlans={testingPlan.contingencyPlans} />

    <HorizontalLine />

    <SectionResourceOptimization
      resourceOptimization={testingPlan.resourceOptimization}
    />

    <HorizontalLine />

    <SectionSoftLaunchStrategy
      softLaunchStrategy={testingPlan.softLaunchStrategy}
    />

    <HorizontalLine />
  </MainContainer>
)
