import Link from 'next/link'
import { FC } from 'react'

type Status = 'active' | 'in-progress' | 'testing' | 'draft'

interface Hypothesis {
  id: string
  title: string
  description: string
  status: Status
  progress?: number
  targetUsers?: number
  interviewedUsers?: number
  insights?: number
  nextSteps?: Array<{
    id: number
    text: string
    isActive: boolean
  }>
}

const hypotheses: Hypothesis[] = [
  {
    id: '1',
    title: 'Gamified Habit Tracker with Buddy System',
    description:
      'Users will be more consistent with habits if paired with an accountability partner',
    status: 'active',
    progress: 67,
    targetUsers: 100,
    interviewedUsers: 45,
    insights: 12,
    nextSteps: [
      {
        id: 1,
        text: 'Launch MVP with core gamification features',
        isActive: true,
      },
      {
        id: 2,
        text: 'Collect user engagement metrics',
        isActive: false,
      },
    ],
  },
  {
    id: '2',
    title: 'Breed-Specific Pet Grooming Box',
    description: 'Survey potential customers about breed-specific needs',
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'Freelancer Team Formation Platform',
    description: 'Interview freelancers about collaboration pain points',
    status: 'testing',
  },
  {
    id: '4',
    title: 'AI-Powered Mental Health Journal',
    description: 'Define AI prompt strategy and initial user personas',
    status: 'draft',
  },
]

const getStatusStyles = (status: Status) => {
  const styles = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'in-progress':
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    testing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  }
  return styles[status]
}

const getStatusLabel = (status: Status) => {
  const labels = {
    active: 'Active',
    'in-progress': 'In Progress',
    testing: 'Testing',
    draft: 'Draft',
  }
  return labels[status]
}

const HypothesesDashboard: FC = () => (
  <div className="p-4 md:p-6 lg:p-8">
    {/* Main Content */}
    <main className="mx-auto max-w-7xl">
      {/* Adjust header layout for mobile */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
          Dashboard
        </h1>

        <Link
          href="/hypotheses/new"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700 sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Add Hypothesis
        </Link>
      </div>

      {/* Hypotheses List */}
      <div className="space-y-4">
        {hypotheses.map((hypothesis) => (
          <div
            key={hypothesis.id}
            className="rounded-lg border border-gray-200 p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900 sm:text-lg dark:text-white">
                  {hypothesis.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                  {hypothesis.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
                {hypothesis.progress && (
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Progress: {hypothesis.progress}%
                    </span>
                  </div>
                )}
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(hypothesis.status)}`}
                >
                  {getStatusLabel(hypothesis.status)}
                </span>
              </div>
            </div>

            {(hypothesis.targetUsers ||
              hypothesis.interviewedUsers ||
              hypothesis.insights) && (
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                {hypothesis.targetUsers && (
                  <div className="flex items-center">
                    <span className="mr-2">🎯</span>
                    <span>Target Users: {hypothesis.targetUsers}</span>
                  </div>
                )}
                {hypothesis.interviewedUsers && (
                  <div className="flex items-center">
                    <span className="mr-2">👥</span>
                    <span>Interviewed: {hypothesis.interviewedUsers}</span>
                  </div>
                )}
                {hypothesis.insights && (
                  <div className="flex items-center">
                    <span className="mr-2">💡</span>
                    <span>Insights: {hypothesis.insights}</span>
                  </div>
                )}
              </div>
            )}

            {hypothesis.nextSteps && (
              <div className="mt-4">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Next Steps
                </p>
                <div className="mt-2 space-y-2">
                  {hypothesis.nextSteps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-2">
                      <span
                        className={`flex size-6 items-center justify-center rounded-full ${
                          step.isActive
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {step.id}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end space-x-2">
              <button className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800">
                Edit
              </button>
              <button className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
)

export default HypothesesDashboard
