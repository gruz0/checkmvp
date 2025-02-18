import { Service } from '@/common/client/Idea/Service'
import { Identity } from '@/common/domain/Identity'

describe('Idea Service', () => {
  // Mock fetch globally
  const mockFetch = jest.fn()
  global.fetch = mockFetch

  let service: Service
  const baseURL = 'http://test-api'
  const mockIdeaId = Identity.Generate().getValue()
  const mockConceptId = Identity.Generate().getValue()
  const mockTargetAudienceId = Identity.Generate().getValue()

  beforeEach(() => {
    service = new Service(baseURL)
    mockFetch.mockClear()
  })

  describe('reserve', () => {
    const mockStatement = 'Test Statement'
    const mockHypotheses = 'Test Hypotheses'

    it('should successfully reserve an idea', async () => {
      const mockResponse = {
        success: true,
        message: 'Successfully reserved idea',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await service.reserve(
        mockIdeaId,
        mockConceptId,
        mockTargetAudienceId,
        mockStatement,
        mockHypotheses
      )

      expect(mockFetch).toHaveBeenCalledWith(`${baseURL}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_id: mockIdeaId,
          concept_id: mockConceptId,
          target_audience_id: mockTargetAudienceId,
          statement: mockStatement,
          hypotheses: mockHypotheses,
        }),
      })

      expect(result).toEqual({
        success: true,
        message: 'Successfully reserved idea',
      })
    })

    it('should handle API error response', async () => {
      const errorMessage = 'API Error'
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      })

      const result = await service.reserve(
        mockIdeaId,
        mockConceptId,
        mockTargetAudienceId,
        mockStatement,
        mockHypotheses
      )

      expect(result).toEqual({
        success: false,
        message: errorMessage,
      })
    })

    it('should handle API error without message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      })

      const result = await service.reserve(
        mockIdeaId,
        mockConceptId,
        mockTargetAudienceId,
        mockStatement,
        mockHypotheses
      )

      expect(result).toEqual({
        success: false,
        message: 'Failed to reserve idea.',
      })
    })

    it('should handle network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.reserve(
        mockIdeaId,
        mockConceptId,
        mockTargetAudienceId,
        mockStatement,
        mockHypotheses
      )

      expect(result).toEqual({
        success: false,
        message: 'Network error',
      })
    })

    it('should handle unknown error', async () => {
      mockFetch.mockRejectedValueOnce('Unknown error')

      const result = await service.reserve(
        mockIdeaId,
        mockConceptId,
        mockTargetAudienceId,
        mockStatement,
        mockHypotheses
      )

      expect(result).toEqual({
        success: false,
        message: 'An unknown error occurred.',
      })
    })

    it('should handle invalid response data', async () => {
      const mockResponse = {
        invalid: 'data',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await service.reserve(
        mockIdeaId,
        mockConceptId,
        mockTargetAudienceId,
        mockStatement,
        mockHypotheses
      )

      expect(result.success).toBe(false)
      expect(result.message).toContain('Required')
    })
  })
})
