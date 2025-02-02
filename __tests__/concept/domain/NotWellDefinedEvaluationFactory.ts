import { Evaluation } from '@/concept/domain/Evaluation'

export class NotWellDefinedEvaluationFactory {
  public static New(): Evaluation {
    return Evaluation.New(
      'not-well-defined',
      [
        'The problem statement needs to be more specific about what issues users are facing',
        'Define the target audience more clearly - who exactly is experiencing this problem?',
        "Clarify the scope of the solution you're proposing",
      ],
      [],
      [],
      '',
      [],
      {
        overallScore: 3,
        metrics: {
          problemClarity: 4,
          targetAudienceClarity: 5,
          scopeDefinition: 2,
          valuePropositionClarity: 7,
        },
      },
      {
        vagueTerms: ['users', 'better', 'solution', 'improve'],
        missingContext: [
          'target market size',
          'specific use cases',
          'current alternatives',
        ],
        ambiguousStatements: [
          'Make the experience better',
          'Solve user problems efficiently',
        ],
      }
    )
  }
}
