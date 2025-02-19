import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionContentIdea from './SectionContentIdea'

interface Props {
  ideaId: string
  contentIdeasForMarketing: Record<string, ContentIdea>
}

interface ContentIdea {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

export const MarketingReport = ({
  ideaId,
  contentIdeasForMarketing,
}: Props) => (
  <MainContainer ideaId={ideaId} activePath="marketing" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        💡 Content Ideas for Marketing
      </h1>
    </div>

    <Paragraph>
      This section provides you with fresh ideas for marketing content that
      resonates with your target audience. From blog posts to social media
      updates, having a content plan helps you engage potential users and create
      buzz around your product.
    </Paragraph>

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="social_media_campaigns"
      header="Social Media Campaigns"
      emoji="📱"
      contentIdea={contentIdeasForMarketing['socialMediaCampaigns']}
      generatableContent={true}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="blogging_and_guest_posts"
      header="Blogging and Guest Posts"
      emoji="✍️"
      contentIdea={contentIdeasForMarketing['bloggingAndGuestPosts']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="email_marketing"
      header="Email Marketing"
      emoji="📧"
      contentIdea={contentIdeasForMarketing['emailMarketing']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="surveys_and_polls"
      header="Surveys & Polls"
      emoji="📊"
      contentIdea={contentIdeasForMarketing['surveysAndPolls']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="video_content"
      header="Video Content"
      emoji="🎥"
      contentIdea={contentIdeasForMarketing['videoContent']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="infographics_and_visual_content"
      header="Infographics and Visual Content"
      emoji="🎨"
      contentIdea={contentIdeasForMarketing['infographicsAndVisualContent']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="community_engagement"
      header="Community Engagement"
      emoji="👥"
      contentIdea={contentIdeasForMarketing['communityEngagement']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="paid_advertising"
      header="Paid Advertising"
      emoji="💰"
      contentIdea={contentIdeasForMarketing['paidAdvertising']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="webinars_and_live_streams"
      header="Webinars and Live Streams"
      emoji="🎤"
      contentIdea={contentIdeasForMarketing['webinarsAndLiveStreams']}
      generatableContent={false}
    />

    <HorizontalLine />

    <SectionContentIdea
      ideaId={ideaId}
      section="partnerships_and_collaborations"
      header="Partnerships and Collaborations"
      emoji="🤝"
      contentIdea={contentIdeasForMarketing['partnershipsAndCollaborations']}
      generatableContent={false}
    />

    <HorizontalLine />
  </MainContainer>
)
