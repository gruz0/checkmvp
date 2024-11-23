import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

interface ShortFormContent {
  header: string
  platform: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface LongFormContent {
  header: string
  platform: string
  title: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface VideoContent {
  header: string
  platform: string
  title: string
  script: string[]
  tips: string[]
  imagePrompt: string
}

type Evaluation = {
  shortFormContents: ShortFormContent[]
  longFormContents: LongFormContent[]
  videoContents: VideoContent[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ValueProposition {
  mainBenefit: string
  problemSolving: string
}

const shortFormContentSchema = z.object({
  header: z.string(),
  platform: z.string(),
  content: z.string(),
  tips: z.array(z.string()),
  image_prompt: z.string(),
})

const longFormContentSchema = z.object({
  header: z.string(),
  platform: z.string(),
  title: z.string(),
  content: z.string(),
  tips: z.array(z.string()),
  image_prompt: z.string(),
})

const videoContentSchema = z.object({
  header: z.string(),
  platform: z.string(),
  title: z.string(),
  script: z.array(z.string()),
  tips: z.array(z.string()),
  image_prompt: z.string(),
})

const ResponseSchema = z.object({
  social_media_campaigns: z.object({
    short_form_content: z.array(shortFormContentSchema),
    long_form_content: z.array(longFormContentSchema),
    video_content: z.array(videoContentSchema),
  }),
})

export class SocialMediaCampaignsEvaluator {
  static className = 'SocialMediaCampaignsEvaluator'
  static prompt = '00-social-media-campaigns'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 4000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateSocialMediaCampaigns(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', SocialMediaCampaignsEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(
        SocialMediaCampaignsEvaluator.prompt
      )

      if (!promptContent) {
        throw new Error(
          `Prompt content ${SocialMediaCampaignsEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: SocialMediaCampaignsEvaluator.model,
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
        temperature: SocialMediaCampaignsEvaluator.nucleusSampling,
        max_completion_tokens:
          SocialMediaCampaignsEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(
          ResponseSchema,
          'social_media_campaigns'
        ),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${SocialMediaCampaignsEvaluator.className} called`,
        data: {
          model: SocialMediaCampaignsEvaluator.model,
          top_p: SocialMediaCampaignsEvaluator.nucleusSampling,
          max_completion_tokens:
            SocialMediaCampaignsEvaluator.maxCompletionTokens,
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

      const socialMediaCampaigns = message.parsed.social_media_campaigns

      return {
        shortFormContents: socialMediaCampaigns.short_form_content.map(
          (content) => ({
            header: content.header,
            platform: content.platform,
            content: content.content,
            tips: content.tips,
            imagePrompt: content.image_prompt,
          })
        ),
        longFormContents: socialMediaCampaigns.long_form_content.map(
          (content) => ({
            header: content.header,
            platform: content.platform,
            title: content.title,
            content: content.content,
            tips: content.tips,
            imagePrompt: content.image_prompt,
          })
        ),
        videoContents: socialMediaCampaigns.video_content.map((content) => ({
          header: content.header,
          platform: content.platform,
          title: content.title,
          script: content.script,
          tips: content.tips,
          imagePrompt: content.image_prompt,
        })),
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
