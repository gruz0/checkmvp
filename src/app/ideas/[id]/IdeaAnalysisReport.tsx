'use client'

import { useRouter } from 'next/navigation'
import { usePlausible } from 'next-plausible'
import React, { useEffect, useState } from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import MessageBox from '@/components/MessageBox'
import { Goals } from '@/lib/goals'
import AboutReport from './components/AboutReport'
import DownloadPDFButton from './components/DownloadPDFButton'
import ExpirationNotice from './components/ExpirationNotice'
import { NavBar } from './components/NavBar'
import SectionCompetitors from './components/SectionCompetitors'
import SectionContentIdeas from './components/SectionContentIdeas'
import SectionContext from './components/SectionContext'
import SectionEarlyAdopters from './components/SectionEarlyAdopters'
import SectionElevatorPitch from './components/SectionElevatorPitch'
import SectionEstimatedCosts from './components/SectionEstimatedCosts'
import SectionFeedbackTemplates from './components/SectionFeedbackTemplates'
import SectionGoogleTrends from './components/SectionGoogleTrends'
import SectionMarketAnalysis from './components/SectionMarketAnalysis'
import SectionNetworkingOpportunities from './components/SectionNetworkingOpportunities'
import SectionPitchDeck from './components/SectionPitchDeck'
import SectionProductNames from './components/SectionProductNames'
import SectionRoadmap from './components/SectionRoadmap'
import SectionSWOTAnalysis from './components/SectionSWOTAnalysis'
import SectionTargetAudiences from './components/SectionTargetAudiences'
import SectionToolsAndResources from './components/SectionToolsAndResources'
import SectionTwoWeekTestingPlan from './components/SectionTwoWeekTestingPlan'
import SectionValueProposition from './components/SectionValueProposition'

interface Props {
  data: {
    id: string
    problem: string
    marketExistence: string
    valueProposition: {
      mainBenefit: string
      problemSolving: string
      differentiation: string
    } | null
    targetAudience: {
      id: string
      segment: string
      description: string
      why: string
      painPoints: string[]
      targetingStrategy: string
    }
    marketAnalysis: {
      trends: string
      userBehaviors: string
      marketGaps: string
      innovationOpportunities: string
      strategicDirection: string
    } | null
    competitorAnalysis: {
      competitors: Array<{
        name: string
        productName: string
        url: string
        coreFeatures: string[]
        valueProposition: string
        userAcquisition: string
        strengths: string[]
        weaknesses: string[]
        differentiationOpportunity: string
      }>
      comparison: {
        strengths: string[]
        weaknesses: string[]
      }
      differentiationSuggestions: string[]
    } | null
    productNames: Array<{
      productName: string
      domains: string[]
      why: string
      tagline: string
      targetAudienceInsight: string
      similarNames: string[]
      brandingPotential: string
    }> | null
    swotAnalysis: {
      strengths: string[]
      weaknesses: string[]
      opportunities: string[]
      threats: string[]
    } | null
    elevatorPitches: Array<{
      hook: string
      problem: string
      solution: string
      valueProposition: string
      cta: string
    }> | null
    googleTrendsKeywords: Array<string> | null
    // FIXME: Replace the key with typed value
    contentIdeasForMarketing: Record<string, ContentIdeaProps> | null
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
    } | null
    contextAnalysis: {
      problemDefinition: string
      marketExistence: string[]
      existingSolutions: string[]
      mainChallenges: string[]
      targetUsers: string
      whyItMatters: string
      opportunities: string[]
      callToAction: string[]
    } | null
  }
  expirationDays: number
}

interface ContentIdeaProps {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

const reloadInterval = 5000

export const IdeaAnalysisReport = ({ data, expirationDays }: Props) => {
  const plausible = usePlausible()
  const router = useRouter()

  const [readyForReport, setReadyForReport] = useState<boolean>(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    // TODO: Check for null in data.targetAudiences[].[why,painPoints,targetingStrategy]
    if (
      !data.valueProposition ||
      !data.marketAnalysis ||
      !data.competitorAnalysis ||
      !data.swotAnalysis ||
      !data.elevatorPitches ||
      !data.productNames ||
      !data.googleTrendsKeywords ||
      !data.contentIdeasForMarketing ||
      !data.testingPlan ||
      !data.contextAnalysis
    ) {
      intervalId = setInterval(() => {
        router.refresh()
      }, reloadInterval)
    } else {
      setReadyForReport(true)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    data.valueProposition,
    data.marketAnalysis,
    data.competitorAnalysis,
    data.swotAnalysis,
    data.elevatorPitches,
    data.productNames,
    data.googleTrendsKeywords,
    data.contentIdeasForMarketing,
    data.testingPlan,
    data.contextAnalysis,
    router,
  ])

  const handleRemove = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }

    try {
      plausible(Goals.ArchiveReport)

      const res = await fetch(`/api/ideas/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 200) {
        router.push('/')
      } else {
        const errorData = await res.json()

        alert(errorData.error || 'Something went wrong.')
      }
    } catch (error) {
      alert(`Error archiving the idea: ${error}`)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row">
        <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
          <NavBar />
        </aside>

        <div className="flex-1 md:pl-8">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
              Your Report
            </h1>

            {readyForReport ? (
              <DownloadPDFButton
                ideaId={data.id}
                onClick={() =>
                  plausible(Goals.DownloadPDF, {
                    props: {
                      buttonId: 'top_button',
                    },
                  })
                }
              />
            ) : (
              <span className="rounded bg-gray-500 px-4 py-2 font-semibold text-white">
                Loading...
              </span>
            )}
          </div>

          <AboutReport />

          <ExpirationNotice expirationDays={expirationDays} />

          <SectionContext
            data={{
              problem: data.problem,
              contextAnalysis: data.contextAnalysis,
            }}
          />

          <HorizontalLine />

          <SectionMarketAnalysis data={data.marketAnalysis} />

          <HorizontalLine />

          <SectionCompetitors data={data.competitorAnalysis} />

          <HorizontalLine />

          <SectionValueProposition data={data.valueProposition} />

          <HorizontalLine />

          <SectionTargetAudiences data={data.targetAudience} />

          <HorizontalLine />

          <SectionSWOTAnalysis data={data.swotAnalysis} />

          <HorizontalLine />

          <SectionElevatorPitch data={data.elevatorPitches} />

          <HorizontalLine />

          <SectionProductNames data={data.productNames} />

          <HorizontalLine />

          <SectionGoogleTrends data={data.googleTrendsKeywords} />

          <HorizontalLine />

          <SectionContentIdeas
            ideaId={data.id}
            data={data.contentIdeasForMarketing}
          />

          <HorizontalLine />

          <SectionTwoWeekTestingPlan data={data.testingPlan} />

          <HorizontalLine />

          <div className="my-4 flex items-center justify-between">
            <p className="text-xl font-bold text-gray-700 md:text-2xl dark:text-gray-300">
              Your PDF Report:
            </p>

            {readyForReport ? (
              <DownloadPDFButton
                ideaId={data.id}
                onClick={() =>
                  plausible(Goals.DownloadPDF, {
                    props: {
                      buttonId: 'bottom_button',
                    },
                  })
                }
              />
            ) : (
              <span className="rounded bg-gray-500 px-4 py-2 font-semibold text-white">
                Loading...
              </span>
            )}
          </div>

          <MessageBox />

          <HorizontalLine />

          <SectionEstimatedCosts />

          <HorizontalLine />

          <SectionEarlyAdopters />

          <HorizontalLine />

          <SectionNetworkingOpportunities />

          <HorizontalLine />

          <SectionFeedbackTemplates />

          <HorizontalLine />

          <SectionPitchDeck />

          <HorizontalLine />

          <SectionRoadmap />

          <HorizontalLine />

          <SectionToolsAndResources />
        </div>
      </div>

      <HorizontalLine />

      <div className="mt-6 text-right">
        <button
          onClick={handleRemove}
          className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
        >
          Remove Idea
        </button>
      </div>

      <BackToTopButton />
    </div>
  )
}
