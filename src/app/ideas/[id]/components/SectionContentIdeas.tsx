'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

interface ContentIdeaProps {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

interface SectionContentIdeasProps {
  ideaId: string
  onReport: (section: string) => void
  data: Record<string, ContentIdeaProps> | null
}

interface ContentIdeaSectionProps {
  ideaId: string
  onReport: (section: string) => void
  section: string
  header: string
  downloadableContent?: boolean
  data: ContentIdeaProps
}

const SectionContentIdeas: React.FC<SectionContentIdeasProps> = ({
  ideaId,
  onReport,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="content_ideas">
      <SectionHeader
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_content_ideas_for_marketing"
      >
        Content Ideas For Marketing
      </SectionHeader>

      {isExpanded && (
        <div id="section_content_ideas_for_marketing">
          <SectionDescription>
            This section provides you with fresh ideas for marketing content
            that resonates with your target audience. From blog posts to social
            media updates, having a content plan helps you engage potential
            users and create buzz around your product.
          </SectionDescription>

          {data ? (
            <>
              <ContentIdea
                ideaId={ideaId}
                header="Social Media Campaigns"
                section="social_media_campaigns"
                onReport={onReport}
                data={data['socialMediaCampaigns']}
                downloadableContent
              />

              <ContentIdea
                ideaId={ideaId}
                header="Blogging and Guest Posts"
                section="blogging_and_guest_posts"
                onReport={onReport}
                data={data['bloggingAndGuestPosts']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Email Marketing"
                section="email_marketing"
                onReport={onReport}
                data={data['emailMarketing']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Surveys & Polls"
                section="surveys_and_polls"
                onReport={onReport}
                data={data['surveysAndPolls']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Video Content"
                section="video_content"
                onReport={onReport}
                data={data['videoContent']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Infographics and Visual Content"
                section="infographics_and_visual_content"
                onReport={onReport}
                data={data['infographicsAndVisualContent']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Community Engagement"
                section="community_engagement"
                onReport={onReport}
                data={data['communityEngagement']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Paid Advertising"
                section="paid_advertising"
                onReport={onReport}
                data={data['paidAdvertising']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Webinars & Live Streams"
                section="webinars_and_live_streams"
                onReport={onReport}
                data={data['webinarsAndLiveStreams']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Partnerships & Collaborations"
                section="partnerships_and_collaborations"
                onReport={onReport}
                data={data['partnershipsAndCollaborations']}
              />
            </>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

const ContentIdea: React.FC<ContentIdeaSectionProps> = ({
  ideaId,
  onReport,
  section,
  header,
  data,
  downloadableContent = false,
}) => (
  <Section
    header={header}
    onReport={() => onReport(`content_ideas_for_marketing.${section}`)}
  >
    <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6 lg:pb-4 dark:bg-gray-900/50">
      <h3 className="mb-2 text-lg font-semibold">Platforms:</h3>

      <Paragraph>{data.platforms.join(', ')}</Paragraph>

      <h3 className="mb-2 text-lg font-semibold">Ideas:</h3>

      <ul className="mb-4 list-disc pl-4 md:text-lg">
        {data.ideas.map((idea, idx) => (
          <li key={idx} className="mb-2 pl-1 md:pl-2">
            {idea}
          </li>
        ))}
      </ul>

      <h3 className="mb-2 text-lg font-semibold">Benefits:</h3>

      <ul className="mb-4 list-disc pl-4 md:text-lg">
        {data.benefits.map((benefit, idx) => (
          <li key={idx} className="mb-2 pl-1 md:pl-2">
            {benefit}
          </li>
        ))}
      </ul>

      {downloadableContent && (
        <div className="mb-2">
          <Link
            href={`/ideas/${ideaId}/${section}`}
            target="_blank"
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Generate Content
          </Link>
        </div>
      )}
    </div>
  </Section>
)

export default SectionContentIdeas
