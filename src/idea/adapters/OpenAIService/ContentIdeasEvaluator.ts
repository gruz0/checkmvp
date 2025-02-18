import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'
import { TargetAudience, ValueProposition } from './types'

type Section =
  | 'socialMediaCampaigns'
  | 'bloggingAndGuestPosts'
  | 'emailMarketing'
  | 'surveysAndPolls'
  | 'videoContent'
  | 'infographicsAndVisualContent'
  | 'communityEngagement'
  | 'paidAdvertising'
  | 'webinarsAndLiveStreams'
  | 'partnershipsAndCollaborations'

// NOTE: We need this to convert snake_cased keys from JSON to camelCased values
const snakeToCamelCaseMapping: Record<string, Section> = {
  social_media_campaigns: 'socialMediaCampaigns',
  blogging_and_guest_posts: 'bloggingAndGuestPosts',
  email_marketing: 'emailMarketing',
  surveys_and_polls: 'surveysAndPolls',
  video_content: 'videoContent',
  infographics_and_visual_content: 'infographicsAndVisualContent',
  community_engagement: 'communityEngagement',
  paid_advertising: 'paidAdvertising',
  webinars_and_live_streams: 'webinarsAndLiveStreams',
  partnerships_and_collaborations: 'partnershipsAndCollaborations',
}

interface ContentStrategy {
  section: Section
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

type Evaluation = ContentStrategy[]

const strategySectionSchema = z.object({
  platforms: z.array(z.string()),
  ideas: z.array(z.string()),
  benefits: z.array(z.string()),
})

const ResponseSchema = z.object({
  marketing_strategies: z.object({
    social_media_campaigns: strategySectionSchema,
    blogging_and_guest_posts: strategySectionSchema,
    email_marketing: strategySectionSchema,
    surveys_and_polls: strategySectionSchema,
    video_content: strategySectionSchema,
    infographics_and_visual_content: strategySectionSchema,
    community_engagement: strategySectionSchema,
    paid_advertising: strategySectionSchema,
    webinars_and_live_streams: strategySectionSchema,
    partnerships_and_collaborations: strategySectionSchema,
  }),
})

export class ContentIdeasEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'ContentIdeasEvaluator'
  }
  protected get promptName() {
    return '00-content-ideas-for-marketing'
  }
  protected get model() {
    return 'gpt-4o-mini'
  }
  protected get nucleusSampling() {
    return 0.9
  }
  protected get maxCompletionTokens() {
    return 4000
  }
  protected get responseSchema() {
    return ResponseSchema
  }
  protected get responseKey() {
    return 'marketing_strategies'
  }

  async evaluateContentIdeas(
    ideaId: string,
    problem: string,
    targetAudience: TargetAudience,
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const messages = [
      this.messageBuilder.createProblemMessage(problem),
      ...this.messageBuilder.createTargetAudienceMessages(targetAudience),
      this.messageBuilder.createValuePropositionMessage(valueProposition),
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    const strategies: ContentStrategy[] = []

    for (const [key, value] of Object.entries(response.marketing_strategies)) {
      const camelCasedName =
        snakeToCamelCaseMapping[key as keyof typeof snakeToCamelCaseMapping]

      if (!camelCasedName) {
        throw new Error(`Invalid snake_cased name: ${key}`)
      }

      strategies.push({
        section: camelCasedName,
        platforms: value.platforms,
        ideas: value.ideas,
        benefits: value.benefits,
      })
    }

    return strategies
  }
}
