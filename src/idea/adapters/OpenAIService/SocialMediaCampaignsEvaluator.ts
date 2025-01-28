import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

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

export class SocialMediaCampaignsEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'SocialMediaCampaignsEvaluator'
  }
  protected get promptName() {
    return '00-social-media-campaigns'
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
    return 'social_media_campaigns'
  }

  async evaluateSocialMediaCampaigns(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const messages = [
      {
        role: 'user' as const,
        content: [
          {
            type: 'text' as const,
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
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    const socialMediaCampaigns = response.social_media_campaigns
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
  }
}
