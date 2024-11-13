import OpenAI from 'openai'
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
  differentiation: string
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
  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateContentIdeas(
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const promptContent = getPromptContent('00-content-ideas-for-marketing')

    if (!promptContent) {
      throw new Error('Prompt content not found')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
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
- Problem solving: ${valueProposition.problemSolving}
- Differentiation: ${valueProposition.differentiation}`,
            },
          ],
        },
      ],
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const analysis = ResponseSchema.parse(JSON.parse(content))

    const strategies: ContentStrategy[] = []

    for (const [key, value] of Object.entries(analysis.marketing_strategies)) {
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
