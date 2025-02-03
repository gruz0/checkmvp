import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'

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
      ClarityScore.New(3, {
        problemClarity: 4,
        targetAudienceClarity: 5,
        scopeDefinition: 2,
        valuePropositionClarity: 7,
      }),
      LanguageAnalysis.New(
        ['users', 'better', 'solution', 'improve'],
        ['target market size', 'specific use cases', 'current alternatives'],
        ['Make the experience better', 'Solve user problems efficiently']
      )
    )
  }
}
