import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'

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
        TargetAudience.New(
          'Tech Startups',
          'Growing technology companies with remote teams',
          [
            'Scattered documentation',
            'Inefficient knowledge sharing',
            'Tool fragmentation',
          ],
          ValidationMetrics.New('500K startups', 6, 7, 6)
        ),
      ],
      ClarityScore.New(6, {
        problemClarity: 6,
        targetAudienceClarity: 5,
        scopeDefinition: 6,
        valuePropositionClarity: 6,
      }),
      LanguageAnalysis.New(
        ['efficient', 'growing', 'scattered'],
        ['specific industry focus', 'pricing expectations'],
        ['Teams waste time searching', 'Poor documentation practices']
      )
    )
  }
}
