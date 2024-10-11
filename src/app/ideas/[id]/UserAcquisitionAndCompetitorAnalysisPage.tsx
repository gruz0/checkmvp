'use client'
import React from 'react'
import {
  FaBullhorn,
  FaHandshake,
  FaLightbulb,
  FaSearch,
  FaUsers,
} from 'react-icons/fa'

type Competitor = {
  name: string
  website: string
  strengths: string[]
  borrowedIdeas: string[]
  investmentApproach: string
}

type ProductNameSuggestion = {
  name: string
  domainExamples: string[]
}

type CollaborationOpportunity = {
  partner: string
  strategy: string
}

export interface UserAcquisitionAndCompetitorAnalysisProps {
  earlyAdoptersAcquisitionIdeas: string[]
  competitorOverview: Competitor[]
  potentialProductNames: ProductNameSuggestion[]
  collaborationOpportunities: CollaborationOpportunity[]
}

type Props = {
  analysis: UserAcquisitionAndCompetitorAnalysisProps | null
}

const UserAcquisitionAndCompetitorAnalysisPage = ({ analysis }: Props) => (
  <div>
    <h2 className="flex items-center text-2xl font-semibold">
      <FaBullhorn className="mr-2 text-purple-600" />
      <p>
        User Acquisition & Competitor Analysis:{' '}
        {!analysis && <span className="text-gray-600">Analyzing...</span>}
      </p>
    </h2>

    {analysis && (
      <>
        <div className="mb-8">
          <h3 className="mt-8 flex items-center text-xl font-semibold">
            <FaUsers className="mr-2 text-blue-600" /> Early Adopters
            Acquisition Ideas:
          </h3>
          {analysis.earlyAdoptersAcquisitionIdeas.length > 0 && (
            <ul className="mb-8 list-disc pl-6">
              {analysis.earlyAdoptersAcquisitionIdeas.map((idea, index) => (
                <li key={index} className="mb-2 text-lg">
                  {idea}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-8">
          <h3 className="mb-6 flex items-center text-xl font-semibold">
            <FaSearch className="mr-2 text-green-600" /> Competitor Overview:
          </h3>
          {analysis.competitorOverview.length > 0 && (
            <ul className="mb-8 list-disc pl-6">
              {analysis.competitorOverview.map((competitor, index) => (
                <li key={index} className="mb-2 text-lg">
                  <strong>{competitor.name}</strong> ({competitor.website})
                  <br />
                  <strong>Strengths:</strong> {competitor.strengths.join(', ')}
                  <br />
                  <strong>Borrowed Ideas:</strong>{' '}
                  {competitor.borrowedIdeas.join(', ')}
                  <br />
                  <strong>Investment Approach:</strong>{' '}
                  {competitor.investmentApproach}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-8">
          <h3 className="mb-6 flex items-center text-xl font-semibold">
            <FaLightbulb className="mr-2 text-yellow-600" /> Potential Product
            Names:
          </h3>
          {analysis.potentialProductNames.length > 0 && (
            <ul className="mb-8 list-disc pl-6">
              {analysis.potentialProductNames.map((suggestion, index) => (
                <li key={index} className="mb-2 text-lg">
                  <strong>{suggestion.name}</strong>
                  <br />
                  <strong>Domain Examples:</strong>{' '}
                  {suggestion.domainExamples.join(', ')}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-8">
          <h3 className="mb-6 flex items-center text-xl font-semibold">
            <FaHandshake className="mr-2 text-teal-600" /> Collaboration
            Opportunities:
          </h3>
          {analysis.collaborationOpportunities.length > 0 && (
            <ul className="mb-8 list-disc pl-6">
              {analysis.collaborationOpportunities.map((opportunity, index) => (
                <li key={index} className="mb-2 text-lg">
                  <strong>Partner:</strong> {opportunity.partner}
                  <br />
                  <strong>Strategy:</strong> {opportunity.strategy}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )}
  </div>
)

export default UserAcquisitionAndCompetitorAnalysisPage
