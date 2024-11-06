import { z } from 'zod'

interface ConceptForReservation {
  success: boolean
  message: string
  content?: {
    problem: string
    marketExistence: string
    targetAudience: {
      segment: string
      description: string
      challenges: string[]
    }[]
  }
}

const ConceptForReservationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  content: z
    .object({
      problem: z.string().min(1),
      market_existence: z.string().min(1),
      target_audience: z.array(
        z.object({
          segment: z.string().min(1),
          description: z.string().min(1),
          challenges: z.array(z.string().min(1)),
        })
      ),
    })
    .optional(),
})

export class Service {
  constructor(private readonly baseURL: string) {}

  async getConceptForReservation(
    conceptId: string
  ): Promise<ConceptForReservation> {
    try {
      const response = await fetch(
        `${this.baseURL}/concepts/${conceptId}/reservation`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || 'Failed to get concept for reservation.'
        )
      }

      const data = await response.json()

      const parsedData = ConceptForReservationResponseSchema.parse(data)

      return {
        success: parsedData.success,
        message: parsedData.message,
        content: parsedData.content
          ? {
              problem: parsedData.content.problem,
              marketExistence: parsedData.content.market_existence,
              targetAudience: parsedData.content.target_audience.map(
                (targetAudience) => ({
                  segment: targetAudience.segment,
                  description: targetAudience.description,
                  challenges: targetAudience.challenges,
                })
              ),
            }
          : undefined,
      }
    } catch (error) {
      console.error('Error getting concept:', error)

      return {
        success: false,
        message: (error as Error).message || 'An unknown error occurred.',
      }
    }
  }
}
