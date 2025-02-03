import { NextResponse } from 'next/server'
import { GET } from '@/app/api/concepts/[id]/reservation/route'
import { Identity } from '@/common/domain/Identity'
import { SystemTimeProvider } from '@/common/domain/TimeProvider'
import { Concept } from '@/concept/domain/Aggregate'
import { App } from '@/concept/service/Service'
import { WellDefinedEvaluationFactory } from '__tests__/concept/domain/WellDefinedEvaluationFactory'

// Mock the Sentry module
jest.mock('@sentry/nextjs', () => ({
  setTag: jest.fn(),
  setContext: jest.fn(),
  captureException: jest.fn(),
}))

describe('GET /api/concepts/[id]/reservation', () => {
  const mockRequest = new Request('http://localhost:3000')
  const mockParams = { id: Identity.Generate().getValue() }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return concept data when concept is evaluated and not archived', async () => {
    // Create a real Concept aggregate
    const concept = Concept.New(
      mockParams.id,
      'Long description of the problem',
      'europe',
      3,
      new SystemTimeProvider()
    )

    const evaluation = WellDefinedEvaluationFactory.New()

    concept.evaluate(evaluation)

    // Mock the GetConcept query with the real aggregate
    jest.spyOn(App.Queries.GetConcept, 'handle').mockResolvedValue(concept)

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(200)
    expect(responseData).toEqual({
      success: true,
      message: 'Concept is ready for the reservation',
      content: {
        problem: 'Long description of the problem',
        region: 'europe',
        market_existence: evaluation.getMarketExistence(),
        target_audience: [
          {
            segment: 'Remote Technology Companies',
            description: 'Software companies with 50+ distributed team members',
            challenges: [
              'Information fragmentation across tools',
              'Reduced productivity from context switching',
              'Difficulty maintaining consistent documentation',
            ],
            validation_metrics: {
              market_size: '2.3M companies globally',
              accessibility: 8,
              pain_point_intensity: 9,
              willingness_to_pay: 7,
            },
          },
          {
            segment: 'Digital Agencies',
            description: 'Creative agencies with multiple client projects',
            challenges: [
              'Project asset management across clients',
              'Team collaboration across time zones',
            ],
            validation_metrics: {
              market_size: '850K agencies worldwide',
              accessibility: 7,
              pain_point_intensity: 8,
              willingness_to_pay: 9,
            },
          },
        ],
      },
    })
  })

  it('should return error when concept is not evaluated', async () => {
    const concept = Concept.New(
      mockParams.id,
      'Long description of the problem',
      'europe',
      3,
      new SystemTimeProvider()
    )

    jest.spyOn(App.Queries.GetConcept, 'handle').mockResolvedValue(concept)

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData).toEqual({
      error: `Concept ${mockParams.id} was not evaluated`,
    })
  })

  it('should return error when concept is archived', async () => {
    const concept = Concept.New(
      mockParams.id,
      'Long description of the problem',
      'europe',
      3,
      new SystemTimeProvider()
    )

    const evaluation = WellDefinedEvaluationFactory.New()

    concept.evaluate(evaluation)
    concept.accept(Identity.Generate())
    concept.archive()

    jest.spyOn(App.Queries.GetConcept, 'handle').mockResolvedValue(concept)

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData).toEqual({
      error: `Concept ${mockParams.id} was archived`,
    })
  })

  it('should return error when GetConcept query fails', async () => {
    jest
      .spyOn(App.Queries.GetConcept, 'handle')
      .mockRejectedValue(new Error('Database error'))

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData).toEqual({
      error: 'Error while getting the concept for reservation.',
    })
  })
})
