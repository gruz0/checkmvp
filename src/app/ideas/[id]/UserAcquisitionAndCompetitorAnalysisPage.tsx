'use client'
import Link from 'next/link'
import React from 'react'
import { FaBullhorn, FaSpinner } from 'react-icons/fa'
import Paragraph from './Paragraph'
import Section from './Section'
import SectionHeader from './SectionHeader'
import SimpleUnorderedList from './SimpleUnorderedList'

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
    <SectionHeader Icon={FaBullhorn} color="text-purple-600">
      User Acquisition & Competitor Analysis:{' '}
      {!analysis && <FaSpinner className="inline animate-spin text-blue-500" />}
    </SectionHeader>

    {analysis && (
      <>
        <Section header="Early Adopters Acquisition Ideas:">
          <SimpleUnorderedList items={analysis.earlyAdoptersAcquisitionIdeas} />
        </Section>

        {analysis.competitorOverview.length > 0 && (
          <Section header="Competitor Overview:">
            <ul className="mb-6 list-disc pl-4">
              {analysis.competitorOverview.map((competitor, index) => (
                <li key={index} className="mb-2 pl-2 text-lg">
                  <Link
                    href={competitor.website}
                    target="_blank"
                    rel="nofollow noopener"
                    className="text-blue-600 underline"
                  >
                    <strong>{competitor.name}</strong>
                  </Link>

                  <Paragraph>
                    Strengths: {competitor.strengths.join(', ')}
                  </Paragraph>

                  <Paragraph>
                    Borrowed Ideas: {competitor.borrowedIdeas.join(', ')}
                  </Paragraph>

                  <Paragraph>
                    Investment Approach: {competitor.investmentApproach}
                  </Paragraph>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section header="Potential Product Names:">
          {analysis.potentialProductNames.length > 0 && (
            <ul className="mb-6 list-disc pl-4">
              {analysis.potentialProductNames.map((suggestion, index) => (
                <li key={index} className="mb-2 pl-2 text-lg">
                  <strong>{suggestion.name}</strong>

                  <Paragraph>
                    Domain Examples: {suggestion.domainExamples.join(', ')}
                  </Paragraph>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section header="Collaboration Opportunities:">
          {analysis.collaborationOpportunities.length > 0 && (
            <ul className="mb-6 list-disc pl-4">
              {analysis.collaborationOpportunities.map((opportunity, index) => (
                <li key={index} className="mb-2 pl-2 text-lg">
                  <strong>{opportunity.partner}</strong>

                  <Paragraph>Strategy: {opportunity.strategy}</Paragraph>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </>
    )}
  </div>
)

export default UserAcquisitionAndCompetitorAnalysisPage
