'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import FeedbackForm from '@/components/FeedbackForm'
import HorizontalLine from '@/components/HorizontalLine'
import MessageBox from '@/components/MessageBox'
import WaitlistForm from '@/components/WaitlistForm'
import { NavBar } from './components/NavBar'
import SectionActionableNextSteps from './components/SectionActionableNextSteps'
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
    targetAudiences: Array<{
      id: string
      segment: string
      description: string
      challenges: string[]
      why: string | null
      painPoints: string[] | null
      targetingStrategy: string | null
    }>
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
  }
}

interface ContentIdeaProps {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

const reloadInterval = 5000

export const IdeaAnalysisReport = ({ data }: Props) => {
  const router = useRouter()

  const [showPopup, setShowPopup] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [wrongSection, setWrongSection] = useState<string | null>(null)

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
      !data.contentIdeasForMarketing
    ) {
      intervalId = setInterval(() => {
        router.refresh()
      }, reloadInterval)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    data.targetAudiences,
    data.valueProposition,
    data.marketAnalysis,
    data.competitorAnalysis,
    data.swotAnalysis,
    data.elevatorPitches,
    data.productNames,
    data.googleTrendsKeywords,
    data.contentIdeasForMarketing,
    router,
  ])

  const handleSaveClick = () => {
    setShowPopup(true)
  }

  const handleSubmit = (email: string) => {
    console.debug('Email saved:', email)

    alert('Thanks! I will add this feature a bit later <3')

    setShowPopup(false)
  }

  const handleRemove = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }

    try {
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

  const onReport = (section: string) => {
    if (!section) {
      return
    }

    setWrongSection(section)

    setShowFeedbackForm(true)
  }

  const handleFeedbackSubmit = async (feedback: string, contact: string) => {
    if (!wrongSection) {
      return
    }

    try {
      setWrongSection(null)
      setShowFeedbackForm(false)

      const res = await fetch(`/api/ideas/${data.id}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: wrongSection,
          feedback: feedback.trim(),
          contact: contact.trim(),
        }),
      })

      if (res.status === 201) {
        setWrongSection(null)
        setShowFeedbackForm(false)
      } else {
        const errorData = await res.json()

        alert(errorData.error || 'Something went wrong.')

        setWrongSection(null)
        setShowFeedbackForm(false)
      }
    } catch (error) {
      alert(`Error submitting report: ${error}`)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row">
        <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4">
          <NavBar />
        </aside>

        <div className="flex-1 md:pl-8">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl">
              Your Idea Report
            </h1>

            <button
              onClick={handleSaveClick}
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Join Waitlist
            </button>
          </div>

          <HorizontalLine />

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="max-w-2xl rounded bg-white p-4 shadow-md md:p-8">
                <WaitlistForm
                  onSubmit={handleSubmit}
                  onClose={() => setShowPopup(false)}
                />
              </div>
            </div>
          )}

          {showFeedbackForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="max-w-2xl rounded bg-white p-4 shadow-md md:p-8">
                <FeedbackForm
                  onSubmit={handleFeedbackSubmit}
                  onClose={() => setShowFeedbackForm(false)}
                />
              </div>
            </div>
          )}

          <SectionContext
            onReport={onReport}
            data={{
              problem: data.problem,
              marketExistence: data.marketExistence,
            }}
          />

          <HorizontalLine />

          <SectionMarketAnalysis
            onReport={onReport}
            data={data.marketAnalysis}
          />

          <HorizontalLine />

          <SectionCompetitors
            onReport={onReport}
            data={data.competitorAnalysis}
          />

          <HorizontalLine />

          <SectionValueProposition
            onReport={onReport}
            data={data.valueProposition}
          />

          <HorizontalLine />

          <SectionTargetAudiences
            onReport={onReport}
            data={data.targetAudiences}
          />

          <HorizontalLine />

          <SectionSWOTAnalysis onReport={onReport} data={data.swotAnalysis} />

          <HorizontalLine />

          <SectionElevatorPitch
            onReport={onReport}
            data={data.elevatorPitches}
          />

          <HorizontalLine />

          <SectionProductNames onReport={onReport} data={data.productNames} />

          <HorizontalLine />

          <SectionGoogleTrends
            onReport={onReport}
            data={data.googleTrendsKeywords}
          />

          <HorizontalLine />

          <SectionContentIdeas
            onReport={onReport}
            data={data.contentIdeasForMarketing}
          />

          <HorizontalLine />

          <MessageBox />

          <HorizontalLine />

          <SectionActionableNextSteps />

          <HorizontalLine />

          <SectionTwoWeekTestingPlan />

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
