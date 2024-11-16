import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

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

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ValueProposition {
  mainBenefit: string
  problemSolving: string
}

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

export class ContentIdeasEvaluator {
  static className = 'ContentIdeasEvaluator'
  static prompt = '00-content-ideas-for-marketing'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 4000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateContentIdeas(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', ContentIdeasEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(ContentIdeasEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${ContentIdeasEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: ContentIdeasEvaluator.model,
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: promptContent.trim(),
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Here is the problem my product aims to solve: """
${problem.trim()}"""

Here are my segments: """
${targetAudiences
  .map((targetAudience, idx) => {
    let content = ''

    content += `Segment ${idx + 1}: ${targetAudience.segment}\n`
    content += `Description: ${targetAudience.description}\n`
    content += `Challenges:\n${targetAudience.challenges.join('; ')}\n\n`

    return content
  })
  .join('\n\n')}
"""

And here is my value proposition:
- Main benefit: ${valueProposition.mainBenefit}
- Problem solving: ${valueProposition.problemSolving}`,
              },
            ],
          },
        ],
        temperature: ContentIdeasEvaluator.nucleusSampling,
        max_completion_tokens: ContentIdeasEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(
          ResponseSchema,
          'marketing_strategies'
        ),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${ContentIdeasEvaluator.className} called`,
        data: {
          model: ContentIdeasEvaluator.model,
          top_p: ContentIdeasEvaluator.nucleusSampling,
          max_completion_tokens: ContentIdeasEvaluator.maxCompletionTokens,
          usage: response.usage,
          choices: response.choices.length,
        },
        level: 'info',
      })

      const message = response.choices[0].message

      if (message.refusal) {
        // TODO: Handle refusal
        throw new Error('Message refusal: ' + message.refusal)
      }

      if (!message.parsed) {
        // TODO: Add Sentry message context
        throw new Error('Message was not parsed')
      }

      const marketingStrategies = message.parsed.marketing_strategies

      const strategies: ContentStrategy[] = []

      for (const [key, value] of Object.entries(marketingStrategies)) {
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
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
