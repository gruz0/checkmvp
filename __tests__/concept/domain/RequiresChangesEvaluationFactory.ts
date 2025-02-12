import { AssumptionsAnalysis } from '@/concept/domain/AssumptionsAnalysis'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'
import { ValidationPlan } from '@/concept/domain/ValidationPlan'

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
      ),
      AssumptionsAnalysis.New(
        [
          'All companies face the same documentation challenges',
          'Teams will switch completely from existing tools',
          'One solution fits all company sizes',
          'Integration with all platforms is equally important',
        ],
        5,
        'high',
        [
          'Market size assumptions',
          'Technical feasibility',
          'Adoption barriers',
          'Revenue model uncertainty',
        ]
      ),
      HypothesisFramework.New(
        'If we build a cross-platform search tool, companies will improve their documentation practices because they can find information easier.',
        [
          'Search is the primary problem in documentation',
          'Companies will pay premium for search features',
          'Existing solutions are inadequate for all users',
        ]
      ),
      ValidationPlan.New(
        [
          'Survey potential users',
          'Analyze competitor products',
          'Build MVP prototype',
        ],
        ['User satisfaction', 'Search time', 'Number of users'],
        ['Online surveys', 'Market research data', 'Competitor websites'],
        [
          'Improve search efficiency',
          'Increase user satisfaction',
          'Reduce documentation time',
        ]
      )
    )
  }
}
