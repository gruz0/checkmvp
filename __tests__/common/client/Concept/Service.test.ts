import { Service } from '@/common/client/Concept/Service'
import { Identity } from '@/common/domain/Identity'

describe('Concept Service', () => {
  // Mock fetch globally
  const mockFetch = jest.fn()
  global.fetch = mockFetch

  let service: Service
  const baseURL = 'http://test-api'
  const mockConceptId = Identity.Generate().getValue()

  beforeEach(() => {
    service = new Service(baseURL)
    mockFetch.mockClear()
  })

  describe('getConceptForReservation', () => {
    it('should successfully get concept data', async () => {
      const mockResponse = {
        success: true,
        message: 'Success',
        content: {
          problem: 'Test Problem',
          region: 'Test Region',
          product_type: 'b2b',
          stage: 'idea',
          market_existence: 'Test Market',
          target_audience: [
            {
              id: '1',
              segment: 'Test Segment',
              description: 'Test Description',
              challenges: ['Challenge 1', 'Challenge 2'],
              why: 'Test Why',
              pain_points: ['Pain Point 1', 'Pain Point 2'],
              targeting_strategy: 'Test Targeting Strategy',
              validation_metrics: {
                market_size: 'Large',
                accessibility: 8,
                pain_point_intensity: 7,
                willingness_to_pay: 9,
              },
            },
          ],
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await service.getConceptForReservation(mockConceptId)

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/concepts/${mockConceptId}/reservation`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      expect(result).toEqual({
        success: true,
        message: 'Success',
        content: {
          problem: 'Test Problem',
          region: 'Test Region',
          productType: 'b2b',
          stage: 'idea',
          marketExistence: 'Test Market',
          targetAudience: [
            {
              id: '1',
              segment: 'Test Segment',
              description: 'Test Description',
              challenges: ['Challenge 1', 'Challenge 2'],
              why: 'Test Why',
              painPoints: ['Pain Point 1', 'Pain Point 2'],
              targetingStrategy: 'Test Targeting Strategy',
              validationMetrics: {
                marketSize: 'Large',
                accessibility: 8,
                painPointIntensity: 7,
                willingnessToPay: 9,
              },
            },
          ],
        },
      })
    })

    it('should handle response without content', async () => {
      const mockResponse = {
        success: true,
        message: 'Success',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await service.getConceptForReservation(mockConceptId)

      expect(result).toEqual({
        success: true,
        message: 'Success',
        content: undefined,
      })
    })

    it('should handle API error response', async () => {
      const errorMessage = 'API Error'
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      })

      const result = await service.getConceptForReservation(mockConceptId)

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

      const result = await service.getConceptForReservation(mockConceptId)

      expect(result).toEqual({
        success: false,
        message: 'Failed to get concept for reservation.',
      })
    })

    it('should handle network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.getConceptForReservation(mockConceptId)

      expect(result).toEqual({
        success: false,
        message: 'Network error',
      })
    })

    it('should handle unknown error', async () => {
      mockFetch.mockRejectedValueOnce('Unknown error')

      const result = await service.getConceptForReservation(mockConceptId)

      expect(result).toEqual({
        success: false,
        message: 'An unknown error occurred.',
      })
    })

    it('should handle invalid response data', async () => {
      const mockResponse = {
        success: true,
        message: 'Success',
        content: {
          problem: '',
          region: '',
          product_type: '',
          stage: '',
          market_existence: '',
          target_audience: [],
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await service.getConceptForReservation(mockConceptId)

      expect(result).toEqual({
        success: false,
        message:
          'Validation failed: content.problem: String must contain at least 1 character(s), content.region: String must contain at least 1 character(s), content.product_type: String must contain at least 1 character(s), content.stage: String must contain at least 1 character(s), content.market_existence: String must contain at least 1 character(s)',
      })
    })
  })
})
