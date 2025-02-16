import Link from 'next/link'
import { FC } from 'react'
import HorizontalLine from '@/components/HorizontalLine'

const ExperimentTemplates: FC = () => {
  const templates = [
    {
      id: 1,
      title: 'Landing Page Smoke Test',
      description: 'Publish a simple landing page, measure signups',
      details:
        'Create a simple landing page to validate interest in your solution. Track visitor-to-signup conversion rate to gauge market demand.',
    },
    {
      id: 2,
      title: 'Fake Door / Feature Teaser',
      description: 'Add a "Coming Soon" button to gauge interest',
      details:
        'Test market demand by creating a mockup of your feature and measuring click-through rates on a "Coming Soon" call-to-action.',
    },
    {
      id: 3,
      title: 'Short Survey / Interview',
      description: 'Ask target users for direct feedback on your hypothesis',
      details:
        'Gather qualitative insights through structured interviews or surveys with your target audience to validate assumptions.',
    },
  ]

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Select an Experiment Template
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Choose the most suitable experiment type for validating your
            hypothesis
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-full flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {template.title}
                    </h3>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">
                    {template.details}
                  </p>
                </div>

                <HorizontalLine />

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/hypotheses/random-id/experiments/random-id/setup"
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Use Template
                  </Link>
                  <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:ring-gray-700 dark:hover:bg-gray-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ExperimentTemplates
