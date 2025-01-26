import { NextResponse } from 'next/server'
import { GET } from '@/app/api/concepts/[id]/reservation/route'
import { Concept } from '@/concept/domain/Aggregate'
import { App } from '@/concept/service/Service'

// Mock the Sentry module
jest.mock('@sentry/nextjs', () => ({
  setTag: jest.fn(),
  setContext: jest.fn(),
  captureException: jest.fn(),
}))

describe('GET /api/concepts/[id]/reservation', () => {
  const mockRequest = new Request('http://localhost:3000')
  const mockParams = { id: 'test-concept-id' }

  const mockTargetAudience = [
    {
      segment: 'Young Professionals',
      description: 'People aged 25-35',
      challenges: ['Time management', 'Work-life balance'],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return concept data when concept is evaluated and not archived', async () => {
    // Mock concept data
    const mockConcept = {
      isEvaluated: () => true,
      isArchived: () => false,
      getProblem: () => ({ getValue: () => 'Test Problem' }),
      getRegion: () => ({ getValue: () => 'North America' }),
      getEvaluation: () => ({
        getMarketExistence: () => 'existing',
        getTargetAudience: () => mockTargetAudience,
      }),
    } as unknown as Concept

    // Mock the GetConcept query
    jest.spyOn(App.Queries.GetConcept, 'handle').mockResolvedValue(mockConcept)

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(200)
    expect(responseData).toEqual({
      success: true,
      message: 'Concept is ready for the reservation',
      content: {
        problem: 'Test Problem',
        region: 'North America',
        market_existence: 'existing',
        target_audience: mockTargetAudience,
      },
    })
  })

  it('should return error when concept is not evaluated', async () => {
    const mockConcept = {
      isEvaluated: () => false,
    } as unknown as Concept

    jest.spyOn(App.Queries.GetConcept, 'handle').mockResolvedValue(mockConcept)

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData).toEqual({
      error: `Concept ${mockParams.id} was not evaluated`,
    })
  })

  it('should return error when concept is archived', async () => {
    const mockConcept = {
      isEvaluated: () => true,
      isArchived: () => true,
    } as unknown as Concept

    jest.spyOn(App.Queries.GetConcept, 'handle').mockResolvedValue(mockConcept)

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData).toEqual({
      error: `Concept ${mockParams.id} was archived`,
    })
  })

  it('should return error when concept evaluation is missing', async () => {
    const mockConcept = {
      isEvaluated: () => true,
      isArchived: () => false,
      getEvaluation: () => null,
    } as unknown as Concept

    jest.spyOn(App.Queries.GetConcept, 'handle').mockResolvedValue(mockConcept)

    const response = await GET(mockRequest, { params: mockParams })
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData).toEqual({
      error: `Concept ${mockParams.id} does not have evaluation`,
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
