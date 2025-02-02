import { Evaluation } from '@/concept/domain/Evaluation'

export class RequiresChangesEvaluationFactory {
  public static New(): Evaluation {
    return Evaluation.New(
      'requires_changes',
      [
        'Include specific metrics about current productivity losses',
        'Add more detail about target company size and industry',
        'Clarify the technical implementation requirements',
      ],
      [
        'Conduct user interviews with at least 20 potential customers',
        'Research competing solutions in the market',
      ],
      ['Teams waste time searching across multiple tools'],
      'Current market solutions like Notion and Confluence partially address documentation, but lack cross-platform search capabilities',
      [
        {
          segment: 'Tech Startups',
          description: 'Growing technology companies with remote teams',
          challenges: [
            'Scattered documentation',
            'Inefficient knowledge sharing',
            'Tool fragmentation',
          ],
          validationMetrics: {
            marketSize: '500K startups',
            accessibility: 6,
            painPointIntensity: 7,
            willingnessToPay: 6,
          },
        },
      ],
      {
        overallScore: 6,
        metrics: {
          problemClarity: 6,
          targetAudienceClarity: 5,
          scopeDefinition: 6,
          valuePropositionClarity: 6,
        },
      },
      {
        vagueTerms: ['efficient', 'growing', 'scattered'],
        missingContext: ['specific industry focus', 'pricing expectations'],
        ambiguousStatements: [
          'Teams waste time searching',
          'Poor documentation practices',
        ],
      }
    )
  }
}
