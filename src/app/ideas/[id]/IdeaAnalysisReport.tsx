'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import MessageBox from '@/components/MessageBox'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'
import WaitlistForm from '@/components/WaitlistForm'

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
  }
}

const reloadInterval = 5000

export const IdeaAnalysisReport = ({ data }: Props) => {
  const router = useRouter()

  const [expandedSections, setExpandedSections] = useState<{
    context: boolean
    marketAnalysisOverview: boolean
    competitorOverview: boolean
    valueProposition: boolean
    targetAudiences: boolean
    swotAnalysis: boolean
    elevatorPitch: boolean
    potentialProductNames: boolean
    googleTrendsKeywords: boolean
    contentIdeasForMarketing: boolean
    actionableNextSteps: boolean
    twoWeekTestingPlan: boolean
    estimatedCostsAndTimeline: boolean
    earlyAdoptersAcquisitionIdeas: boolean
    networkingOpportunities: boolean
    initialFeedbackTemplates: boolean
    pitchDeckOutline: boolean
    roadmapSuggestions: boolean
    suggestedToolsAndResources: boolean
  }>({
    context: true,
    marketAnalysisOverview: false,
    competitorOverview: false,
    valueProposition: false,
    targetAudiences: false,
    swotAnalysis: false,
    elevatorPitch: false,
    potentialProductNames: false,
    googleTrendsKeywords: false,
    contentIdeasForMarketing: false,
    actionableNextSteps: false,
    twoWeekTestingPlan: false,
    estimatedCostsAndTimeline: false,
    earlyAdoptersAcquisitionIdeas: false,
    networkingOpportunities: false,
    initialFeedbackTemplates: false,
    pitchDeckOutline: false,
    roadmapSuggestions: false,
    suggestedToolsAndResources: false,
  })

  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    // TODO: Check for null in data.targetAudiences[].[why,painPoints,targetingStrategy]
    if (
      !data.valueProposition ||
      !data.marketAnalysis ||
      !data.competitorAnalysis
    ) {
      intervalId = setInterval(() => {
        router.refresh()
      }, reloadInterval)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    data.valueProposition,
    data.marketAnalysis,
    data.competitorAnalysis,
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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const onUpvote = () => {
    alert('Thanks! I will add this feature a bit later <3')
  }

  const onDownvote = () => {
    alert('Please contact @itmistakes_com on Twitter (X) <3')
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Your Idea Report
        </h1>
        <button
          onClick={handleSaveClick}
          className="rounded bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400"
        >
          Click Here
        </button>
      </div>

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

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-blue-600"
          onClick={() => toggleSection('context')}
          isExpanded={expandedSections.context}
          sectionId="context"
        >
          Context
        </SectionHeader>

        {expandedSections.context && (
          <div id="context">
            <SectionDescription>
              In this section, we summarize your original problem and analyze
              the market existence. It sets the stage for your idea by giving
              you a clearer understanding of what you&apos;re aiming to solve
              and whether others are facing similar challenges. Knowing the
              context helps you see how your product can fit into the larger
              picture.
            </SectionDescription>

            <Section header="How You Defined The Problem:">
              <Paragraph>
                {data.problem.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Paragraph>
            </Section>

            <Section
              header="Market Existence:"
              voteable
              onUpvote={onUpvote}
              onDownvote={onDownvote}
            >
              <Paragraph>{data.marketExistence}</Paragraph>
            </Section>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-blue-600"
          onClick={() => toggleSection('marketAnalysisOverview')}
          isExpanded={expandedSections.marketAnalysisOverview}
          sectionId="marketAnalysisOverview"
        >
          Market Analysis Overview
        </SectionHeader>

        {expandedSections.marketAnalysisOverview && (
          <div id="marketAnalysisOverview">
            <SectionDescription>
              Here, we take a closer look at the overall market landscape
              related to your idea. This overview helps you understand who your
              potential customers are, what trends are emerging, and how your
              product can fit into the market. It&apos;s important to know where
              your idea stands and what opportunities are out there.
            </SectionDescription>

            {data.marketAnalysis ? (
              <>
                <Section
                  header="Trends:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>{data.marketAnalysis.trends}</Paragraph>
                </Section>

                <Section
                  header="User Behaviors:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>{data.marketAnalysis.userBehaviors}</Paragraph>
                </Section>

                <Section
                  header="Market Gaps:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>{data.marketAnalysis.marketGaps}</Paragraph>
                </Section>

                <Section
                  header="Innovation Opportunities:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>
                    {data.marketAnalysis.innovationOpportunities}
                  </Paragraph>
                </Section>

                <Section
                  header="Strategic Direction:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>
                    {data.marketAnalysis.strategicDirection}
                  </Paragraph>
                </Section>
              </>
            ) : (
              <FetchingDataMessage />
            )}
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-blue-600"
          onClick={() => toggleSection('competitorOverview')}
          isExpanded={expandedSections.competitorOverview}
          sectionId="competitorOverview"
        >
          Competitor Overview
        </SectionHeader>

        {expandedSections.competitorOverview && (
          <div id="competitorOverview">
            <SectionDescription>
              This section highlights the main players in your space, showing
              you who else is offering similar solutions. Understanding your
              competitors can help you identify what makes your product unique
              and where there might be gaps in the market that you can fill.
              It&apos;s all about knowing your landscape!
            </SectionDescription>

            {data.competitorAnalysis ? (
              <>
                {data.competitorAnalysis.competitors.map((competitor, idx) => (
                  <Section
                    key={competitor.url}
                    header={`${idx + 1}. ${competitor.name}`}
                    voteable
                    onUpvote={onUpvote}
                    onDownvote={onDownvote}
                  >
                    <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6 lg:pb-0">
                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Product:
                      </h3>
                      <Paragraph>
                        <a
                          href={competitor.url}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="text-blue-700 underline hover:text-blue-600"
                        >
                          {competitor.productName}
                        </a>
                      </Paragraph>

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Value Proposition:
                      </h3>
                      <Paragraph>{competitor.valueProposition}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        User Acquisition:
                      </h3>
                      <Paragraph>{competitor.userAcquisition}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Strengths:
                      </h3>
                      <SimpleUnorderedList items={competitor.strengths} />

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Weaknesses:
                      </h3>
                      <SimpleUnorderedList items={competitor.weaknesses} />

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Differentiation Opportunities:
                      </h3>
                      <Paragraph>
                        {competitor.differentiationOpportunity}
                      </Paragraph>
                    </div>
                  </Section>
                ))}

                <Section
                  header="Comparison:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    Strengths:
                  </h3>
                  <SimpleUnorderedList
                    items={data.competitorAnalysis.comparison.strengths}
                  />

                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    Weaknesses:
                  </h3>
                  <SimpleUnorderedList
                    items={data.competitorAnalysis.comparison.weaknesses}
                  />
                </Section>

                <Section
                  header="Differentiation Suggestions:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <SimpleUnorderedList
                    items={data.competitorAnalysis.differentiationSuggestions}
                  />
                </Section>
              </>
            ) : (
              <FetchingDataMessage />
            )}
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-blue-600"
          onClick={() => toggleSection('valueProposition')}
          isExpanded={expandedSections.valueProposition}
          sectionId="valueProposition"
        >
          Value Proposition
        </SectionHeader>

        {expandedSections.valueProposition && (
          <div id="valueProposition">
            <SectionDescription>
              The value proposition explains what makes your product special.
              Here, we define the main benefits it provides to users and how it
              effectively solves their problems. A clear value proposition helps
              you articulate why someone should choose your product over others.
            </SectionDescription>

            {data.valueProposition ? (
              <>
                <Section
                  header="Main Benefit:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>{data.valueProposition.mainBenefit}</Paragraph>
                </Section>

                <Section
                  header="Problem Solving:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>{data.valueProposition.problemSolving}</Paragraph>
                </Section>

                <Section
                  header="Differentiation:"
                  voteable
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                >
                  <Paragraph>{data.valueProposition.differentiation}</Paragraph>
                </Section>
              </>
            ) : (
              <FetchingDataMessage />
            )}
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-blue-600"
          onClick={() => toggleSection('targetAudiences')}
          isExpanded={expandedSections.targetAudiences}
          sectionId="targetAudiences"
        >
          Target Audiences
        </SectionHeader>

        {expandedSections.targetAudiences && (
          <div id="targetAudiences">
            <SectionDescription>
              This section presents potential target audiences for your product,
              detailing their specific characteristics and needs. It&apos;s
              vital to understand who you’re trying to reach because tailoring
              your message to these groups can make your product more appealing.
              Knowing your audience is key to success!
            </SectionDescription>

            {data.targetAudiences.map((audience, idx) => (
              <Section
                key={audience.id}
                header={`${idx + 1}. ${audience.segment}`}
                voteable
                onUpvote={onUpvote}
                onDownvote={onDownvote}
              >
                <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6">
                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    Description:
                  </h3>
                  <Paragraph>{audience.description}</Paragraph>

                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    Challenges:
                  </h3>
                  <SimpleUnorderedList items={audience.challenges} />

                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    Why:
                  </h3>
                  {audience.why ? (
                    <Paragraph>{audience.why}</Paragraph>
                  ) : (
                    <FetchingDataMessage />
                  )}

                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    Pain Points:
                  </h3>
                  {audience.painPoints ? (
                    <SimpleUnorderedList items={audience.painPoints} />
                  ) : (
                    <FetchingDataMessage />
                  )}

                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    Targeting Strategy:
                  </h3>
                  {audience.targetingStrategy ? (
                    <Paragraph>{audience.targetingStrategy}</Paragraph>
                  ) : (
                    <FetchingDataMessage />
                  )}
                </div>
              </Section>
            ))}
          </div>
        )}
      </div>

      <hr className="my-6" />

      <MessageBox />

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-600"
          onClick={() => toggleSection('swotAnalysis')}
          isExpanded={expandedSections.swotAnalysis}
          sectionId="swotAnalysis"
        >
          This Week: SWOT Analysis
        </SectionHeader>

        {expandedSections.swotAnalysis && (
          <div id="swotAnalysis">
            <SectionDescription>
              SWOT stands for Strengths, Weaknesses, Opportunities, and Threats.
              In this section, we explore these aspects to provide a
              comprehensive view of your product&apos;s position. It&apos;s a
              helpful exercise that can reveal both challenges and potential
              advantages, guiding your strategy moving forward.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-600"
          onClick={() => toggleSection('elevatorPitch')}
          isExpanded={expandedSections.elevatorPitch}
          sectionId="elevatorPitch"
        >
          This Week: Elevator Pitch
        </SectionHeader>

        {expandedSections.elevatorPitch && (
          <div id="elevatorPitch">
            <SectionDescription>
              An elevator pitch is a brief summary of your idea that you can
              deliver quickly and effectively. This section helps you craft a
              compelling and concise way to explain your product to others,
              which can be especially useful when networking or seeking
              feedback.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-blue-600"
          onClick={() => toggleSection('potentialProductNames')}
          isExpanded={expandedSections.potentialProductNames}
          sectionId="potentialProductNames"
        >
          Potential Product Names
        </SectionHeader>

        {expandedSections.potentialProductNames && (
          <>
            <div id="potentialProductNames">
              <SectionDescription>
                Here, we brainstorm some catchy names for your product. A good
                name can leave a lasting impression and make your product more
                memorable. This is a fun part of the process that allows you to
                think creatively!
              </SectionDescription>
            </div>

            {data.productNames !== null ? (
              <>
                {data.productNames.map((productName, idx) => (
                  <Section
                    key={productName.productName}
                    header={`${idx + 1}. ${productName.productName} - ${productName.tagline}`}
                    voteable
                    onUpvote={onUpvote}
                    onDownvote={onDownvote}
                  >
                    <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6 lg:pb-0">
                      <Paragraph>
                        {productName.why} {productName.targetAudienceInsight}
                      </Paragraph>

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Branding Potential:
                      </h3>
                      <Paragraph>{productName.brandingPotential}</Paragraph>

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Potential Domains:
                      </h3>

                      <ul className="mb-4 list-disc pl-4">
                        {productName.domains.map((item, index) => (
                          <li
                            key={index}
                            className="mb-2 pl-1 md:pl-2 md:text-lg"
                          >
                            <Link
                              href={`https://www.namecheap.com/domains/registration/results/?domain=${item}`}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              className="text-blue-500 underline hover:text-blue-700"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        Similar Product Names:
                      </h3>
                      <SimpleUnorderedList items={productName.similarNames} />
                    </div>
                  </Section>
                ))}
              </>
            ) : (
              <FetchingDataMessage />
            )}
          </>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('googleTrendsKeywords')}
          isExpanded={expandedSections.googleTrendsKeywords}
          sectionId="googleTrendsKeywords"
        >
          Soon: Google Trends Keywords
        </SectionHeader>

        {expandedSections.googleTrendsKeywords && (
          <div id="googleTrendsKeywords">
            <SectionDescription>
              In this section, we look at popular search terms related to your
              product. Understanding which keywords are trending can inform your
              marketing strategy and help you attract the right audience.
              It&apos;s a practical way to connect your idea with what people
              are already searching for.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('contentIdeasForMarketing')}
          isExpanded={expandedSections.contentIdeasForMarketing}
          sectionId="contentIdeasForMarketing"
        >
          Soon: Content Ideas For Marketing
        </SectionHeader>

        {expandedSections.contentIdeasForMarketing && (
          <div id="contentIdeasForMarketing">
            <SectionDescription>
              This section provides you with fresh ideas for marketing content
              that resonates with your target audience. From blog posts to
              social media updates, having a content plan helps you engage
              potential users and create buzz around your product.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('actionableNextSteps')}
          isExpanded={expandedSections.actionableNextSteps}
          sectionId="actionableNextSteps"
        >
          Soon: Actionable Next Steps
        </SectionHeader>

        {expandedSections.actionableNextSteps && (
          <div id="actionableNextSteps">
            <SectionDescription>
              Here, we lay out clear steps for what to do next. This section is
              crucial because it helps you take your analysis and turn it into
              action, ensuring you stay on track and make progress with your
              idea.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('twoWeekTestingPlan')}
          isExpanded={expandedSections.twoWeekTestingPlan}
          sectionId="twoWeekTestingPlan"
        >
          Soon: Two-Week Testing Plan
        </SectionHeader>

        {expandedSections.twoWeekTestingPlan && (
          <div id="twoWeekTestingPlan">
            <SectionDescription>
              This section outlines a simple plan for testing your product idea
              with real users over two weeks. Getting feedback early can save
              you time and resources later on. It&apos;s about learning quickly
              and adjusting your approach based on what you discover.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('estimatedCostsAndTimeline')}
          isExpanded={expandedSections.estimatedCostsAndTimeline}
          sectionId="estimatedCostsAndTimeline"
        >
          Soon: Estimated Costs and Timeline for MVP Launch
        </SectionHeader>

        {expandedSections.estimatedCostsAndTimeline && (
          <div id="estimatedCostsAndTimeline">
            <SectionDescription>
              In this section, we provide an overview of what it might cost to
              bring your minimum viable product (MVP) to life and how long it
              could take. Knowing the budget and timeline helps you plan
              effectively and manage expectations as you move forward.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('earlyAdoptersAcquisitionIdeas')}
          isExpanded={expandedSections.earlyAdoptersAcquisitionIdeas}
          sectionId="earlyAdoptersAcquisitionIdeas"
        >
          Soon: Early Adopters Acquisition Ideas
        </SectionHeader>

        {expandedSections.earlyAdoptersAcquisitionIdeas && (
          <div id="earlyAdoptersAcquisitionIdeas">
            <SectionDescription>
              Here, we suggest ways to attract early adopters who can provide
              valuable feedback and help you refine your product. Engaging early
              users can build momentum and create a community around your idea.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('networkingOpportunities')}
          isExpanded={expandedSections.networkingOpportunities}
          sectionId="networkingOpportunities"
        >
          Soon: Networking Opportunities
        </SectionHeader>

        {expandedSections.networkingOpportunities && (
          <div id="networkingOpportunities">
            <SectionDescription>
              This section identifies potential networking opportunities that
              could benefit your product journey. Connecting with others can
              provide support, insights, and collaboration possibilities that
              enhance your project.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('initialFeedbackTemplates')}
          isExpanded={expandedSections.initialFeedbackTemplates}
          sectionId="initialFeedbackTemplates"
        >
          Soon: Initial Feedback Templates
        </SectionHeader>

        {expandedSections.initialFeedbackTemplates && (
          <div id="initialFeedbackTemplates">
            <SectionDescription>
              In this part, we offer templates for gathering feedback from users
              about your product. Having ready-made questions can streamline the
              process and ensure you get useful insights that guide your next
              steps.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('pitchDeckOutline')}
          isExpanded={expandedSections.pitchDeckOutline}
          sectionId="pitchDeckOutline"
        >
          Soon: Pitch Deck Outline
        </SectionHeader>

        {expandedSections.pitchDeckOutline && (
          <div id="pitchDeckOutline">
            <SectionDescription>
              This section helps you create a structured outline for a pitch
              deck, which is essential if you plan to present your idea to
              investors or stakeholders. A clear pitch can make a strong
              impression and open doors for opportunities.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('roadmapSuggestions')}
          isExpanded={expandedSections.roadmapSuggestions}
          sectionId="roadmapSuggestions"
        >
          Soon: Roadmap Suggestions
        </SectionHeader>

        {expandedSections.roadmapSuggestions && (
          <div id="roadmapSuggestions">
            <SectionDescription>
              Here, we provide suggestions for creating a roadmap that outlines
              the future direction of your product. It helps you visualize where
              you want to go and what steps are needed to get there.
            </SectionDescription>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <div>
        <SectionHeader
          color="text-gray-400"
          onClick={() => toggleSection('suggestedToolsAndResources')}
          isExpanded={expandedSections.suggestedToolsAndResources}
          sectionId="suggestedToolsAndResources"
        >
          Soon: Suggested Tools and Resources
        </SectionHeader>

        {expandedSections.suggestedToolsAndResources && (
          <div id="suggestedToolsAndResources">
            <SectionDescription>
              In this final section, we list helpful tools and resources that
              can support your product development process. Whether it&apos;s
              software for project management or articles on best practices,
              these resources can make your journey smoother.
            </SectionDescription>
          </div>
        )}
      </div>
    </div>
  )
}
