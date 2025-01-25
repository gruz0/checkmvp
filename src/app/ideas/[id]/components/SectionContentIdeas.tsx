'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface ContentIdeaProps {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

interface SectionContentIdeasProps {
  ideaId: string
  data: Record<string, ContentIdeaProps> | null
}

interface ContentIdeaSectionProps {
  ideaId: string
  section: string
  header: string
  generatableContent?: boolean
  data: ContentIdeaProps
}

const SectionContentIdeas: React.FC<SectionContentIdeasProps> = ({
  ideaId,
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
                data={data['socialMediaCampaigns']}
                generatableContent
              />

              <ContentIdea
                ideaId={ideaId}
                header="Blogging and Guest Posts"
                section="blogging_and_guest_posts"
                data={data['bloggingAndGuestPosts']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Email Marketing"
                section="email_marketing"
                data={data['emailMarketing']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Surveys & Polls"
                section="surveys_and_polls"
                data={data['surveysAndPolls']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Video Content"
                section="video_content"
                data={data['videoContent']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Infographics and Visual Content"
                section="infographics_and_visual_content"
                data={data['infographicsAndVisualContent']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Community Engagement"
                section="community_engagement"
                data={data['communityEngagement']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Paid Advertising"
                section="paid_advertising"
                data={data['paidAdvertising']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Webinars & Live Streams"
                section="webinars_and_live_streams"
                data={data['webinarsAndLiveStreams']}
              />

              <ContentIdea
                ideaId={ideaId}
                header="Partnerships & Collaborations"
                section="partnerships_and_collaborations"
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
  section,
  header,
  data,
  generatableContent = false,
}) => (
  <Section header={header}>
    <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 hover:shadow-lg md:p-6 lg:pb-4 dark:bg-gray-900/50">
      <h3 className="mb-2 text-lg font-semibold">Platforms:</h3>

      <Paragraph>{data.platforms.join(', ')}</Paragraph>

      <h3 className="mb-2 text-lg font-semibold">Ideas:</h3>

      <SimpleUnorderedList items={data.ideas} />

      <h3 className="mb-2 text-lg font-semibold">Benefits:</h3>

      <SimpleUnorderedList items={data.benefits} last />

      {generatableContent && (
        <div className="mb-2 mt-4">
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
