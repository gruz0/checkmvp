import { z } from 'zod'

interface IdeaSectionReportResponse {
  success: boolean
  message: string
}

const IdeaSectionReportResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})

export class Service {
  constructor(private readonly baseURL: string) {}

  async reportIdeaSection(
    ideaId: string,
    section: string,
    feedback: string,
    contact: string
  ): Promise<IdeaSectionReportResponse> {
    try {
      const response = await fetch(`${this.baseURL}/feedback/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_id: ideaId,
          section: section,
          feedback: feedback,
          contact: contact,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to store feedback.')
      }

      const data = await response.json()

      const parsedData = IdeaSectionReportResponseSchema.parse(data)

      return {
        success: parsedData.success,
        message: parsedData.message,
      }
    } catch (error) {
      console.error('Error storing a feedback:', error)

      return {
        success: false,
        message: (error as Error).message || 'An unknown error occurred.',
      }
    }
  }
}
