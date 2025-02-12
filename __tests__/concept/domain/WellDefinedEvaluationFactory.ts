import { AssumptionsAnalysis } from '@/concept/domain/AssumptionsAnalysis'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'
import { ValidationPlan } from '@/concept/domain/ValidationPlan'

export class WellDefinedEvaluationFactory {
  public static New(): Evaluation {
    return Evaluation.New(
      'well-defined',
      [],
      [],
      [
        'Remote workers spend 45+ minutes daily searching for documents across different platforms',
        'Current collaboration tools create information silos',
        'Context switching between apps reduces productivity by 40%',
      ],
      'Existing solutions like Dropbox and Google Drive lack unified search capabilities across platforms',
      [
        TargetAudience.New(
          'Remote Technology Companies',
          'Software companies with 50+ distributed team members',
          [
            'Information fragmentation across tools',
            'Reduced productivity from context switching',
            'Difficulty maintaining consistent documentation',
          ],
          ValidationMetrics.New('2.3M companies globally', 8, 9, 7)
        ),
        TargetAudience.New(
          'Digital Agencies',
          'Creative agencies with multiple client projects',
          [
            'Project asset management across clients',
            'Team collaboration across time zones',
          ],
          ValidationMetrics.New('850K agencies worldwide', 7, 8, 9)
        ),
      ],
      ClarityScore.New(9, {
        problemClarity: 10,
        targetAudienceClarity: 8,
        scopeDefinition: 7,
        valuePropositionClarity: 10,
      }),
      LanguageAnalysis.New([], [], []),
      AssumptionsAnalysis.New(
        [
          'Remote teams are willing to adopt a new tool in their workflow',
          'Companies are experiencing significant productivity loss due to information fragmentation',
          'Teams are actively looking for a unified search solution',
          'Integration with existing tools is technically feasible',
          'Users will pay for a solution that saves them 45+ minutes daily',
        ],
        3,
        'medium',
        [
          'Technical feasibility',
          'User adoption rate',
          'Integration complexity',
        ]
      ),
      HypothesisFramework.New(
        'If we provide remote teams with a unified search solution, they will experience a 40% reduction in document search time because they can access information across platforms from a single interface.',
        [
          'Remote teams waste significant time searching across platforms',
          'A unified search solution will reduce context switching',
          'Teams will prioritize efficiency over existing tool familiarity',
          'The solution can effectively index and search across multiple platforms',
        ]
      ),
      ValidationPlan.New(
        [
          'Conduct interviews with 50 remote tech companies',
          'Run a beta test with 5 digital agencies',
          'Measure actual time saved using product analytics',
          'Track user engagement and adoption rates',
        ],
        [
          'Time spent searching for documents',
          'Number of context switches per hour',
          'User satisfaction scores',
          'Platform adoption rate',
          'Customer retention rate',
        ],
        [
          'Survey responses from target users',
          'Usage analytics from beta testing',
          'Customer interview transcripts',
          'Competitor analysis reports',
        ],
        [
          'Achieve 80% reduction in search time',
          'Maintain 90% user satisfaction score',
          'Reach 60% adoption rate within first month',
          'Demonstrate 30% improvement in team productivity',
        ]
      )
    )
  }
}
