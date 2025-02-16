import { FC } from 'react'

const ExperimentRecommendations: FC = () => (
  <div className="p-4 md:p-6 lg:p-8">
    {/* Main Content */}
    <main className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Next Steps & Recommendations
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Based on your 8.3% sign-up rate
        </p>
      </div>

      <div className="space-y-6">
        {/* Summary Card */}
        <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Experiment Summary
          </h2>
          <div className="mt-4 flex items-center space-x-2">
            <div className="size-2 rounded-full bg-yellow-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Moderate Market Validation
            </span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your landing page test showed promising interest, but there&apos;s
            room for optimization to strengthen market validation.
          </p>
        </div>

        {/* Recommended Actions */}
        <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Recommended Actions
          </h2>
          <div className="mt-4 space-y-4">
            {/* Action cards */}
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                1. Refine Your Value Proposition
              </h3>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                Review and enhance your messaging based on any feedback
                received. Consider A/B testing different headlines and value
                propositions.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                2. Conduct User Interviews
              </h3>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                Reach out to those who signed up for deeper insights. Understand
                their needs and pain points better.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                3. Plan Next Validation Phase
              </h3>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                Consider building a minimal prototype or conducting more
                targeted experiments based on gathered insights.
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Options */}
        <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Strategic Options
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-sm font-medium text-green-600 dark:text-green-300">
                  A
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Proceed with optimization and further validation
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-300">
                  B
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Pivot specific aspects of the solution
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <span className="text-sm font-medium text-red-600 dark:text-red-300">
                  C
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Consider major pivot or new hypothesis
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:ring-gray-700 dark:hover:bg-gray-700">
            Revise Hypothesis
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Plan Another Experiment
          </button>
        </div>
      </div>
    </main>
  </div>
)

export default ExperimentRecommendations
