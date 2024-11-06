import { z } from 'zod'

interface Reservation {
  success: boolean
  message: string
}

const ReservationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})

export class Service {
  constructor(private readonly baseURL: string) {}

  async reserve(ideaId: string, conceptId: string): Promise<Reservation> {
    try {
      const response = await fetch(`${this.baseURL}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_id: ideaId,
          concept_id: conceptId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to reserve idea.')
      }

      const data = await response.json()

      const parsedData = ReservationResponseSchema.parse(data)

      return {
        success: parsedData.success,
        message: parsedData.message,
      }
    } catch (error) {
      console.error('Error reserving idea:', error)

      return {
        success: false,
        message: (error as Error).message || 'An unknown error occurred.',
      }
    }
  }
}
