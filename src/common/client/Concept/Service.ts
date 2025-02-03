import { z } from 'zod'

interface ConceptForReservation {
  success: boolean
  message: string
  content?: {
    problem: string
    region: string
    marketExistence: string
    targetAudience: {
      segment: string
      description: string
      challenges: string[]
      validationMetrics: {
        marketSize: string
        accessibility: number
        painPointIntensity: number
        willingnessToPay: number
      }
    }[]
  }
}

const ConceptForReservationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  content: z
    .object({
      problem: z.string().min(1),
      region: z.string().min(1),
      market_existence: z.string().min(1),
      target_audience: z.array(
        z.object({
          segment: z.string().min(1),
          description: z.string().min(1),
          challenges: z.array(z.string().min(1)),
          validation_metrics: z.object({
            market_size: z.string().min(1),
            accessibility: z.number().min(0).max(10),
            pain_point_intensity: z.number().min(0).max(10),
            willingness_to_pay: z.number().min(0).max(10),
          }),
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

      const json = await response.json()

      const parsedData = ConceptForReservationResponseSchema.safeParse(json)

      if (!parsedData.success) {
        // Create a more specific error message based on the validation errors
        const errorMessages = parsedData.error.issues.map((issue) => {
          const field = issue.path.join('.')
          return `${field}: ${issue.message}`
        })

        const userFriendlyMessage =
          errorMessages.length > 0
            ? `Validation failed: ${errorMessages.join(', ')}`
            : 'The data received from the server was invalid.'

        throw new Error(userFriendlyMessage)
      }

      const { data } = parsedData

      return {
        success: data.success,
        message: data.message,
        content: data.content
          ? {
              problem: data.content.problem,
              region: data.content.region,
              marketExistence: data.content.market_existence,
              targetAudience: data.content.target_audience.map(
                (targetAudience) => ({
                  segment: targetAudience.segment,
                  description: targetAudience.description,
                  challenges: targetAudience.challenges,
                  validationMetrics: {
                    marketSize: targetAudience.validation_metrics.market_size,
                    accessibility:
                      targetAudience.validation_metrics.accessibility,
                    painPointIntensity:
                      targetAudience.validation_metrics.pain_point_intensity,
                    willingnessToPay:
                      targetAudience.validation_metrics.willingness_to_pay,
                  },
                })
              ),
            }
          : undefined,
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message || 'An unknown error occurred.',
      }
    }
  }
}
