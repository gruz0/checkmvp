import { FC } from 'react'

const ExperimentResults: FC = () => {
  // Calculate conversion rate
  const visitors = 300
  const signups = 25
  const conversionRate = ((signups / visitors) * 100).toFixed(1)

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Experiment Results: Landing Page Smoke Test
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Track and analyze your experiment metrics
          </p>
        </div>

        {/* Metrics Cards - updated styling */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Each metric card updated */}
          <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-medium text-gray-500 dark:text-gray-400">
              Page Visitors
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {visitors}
            </p>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-medium text-gray-500 dark:text-gray-400">
              Sign-ups
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {signups}
            </p>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-medium text-gray-500 dark:text-gray-400">
              Conversion Rate
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {conversionRate}%
            </p>
          </div>
        </div>

        {/* Results Analysis - updated styling */}
        <div className="mt-6 flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            AI Analysis
          </h3>
          <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {`${conversionRate}% is typical for a pre-launch B2C SaaS. The conversion rate suggests moderate market interest. Consider these next steps:`}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-blue-700 dark:text-blue-300">
              <li>Refine your value proposition to improve conversion</li>
              <li>A/B test different headlines and CTAs</li>
              <li>
                Consider conducting follow-up interviews with early sign-ups
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Notes - updated styling */}
        <div className="mt-6 flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Additional Notes
          </h3>
          <textarea
            rows={4}
            placeholder="Add your observations and insights..."
            className="mt-4 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Action Buttons - updated styling */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:ring-gray-700 dark:hover:bg-gray-700">
            Plan Another Experiment
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Mark Experiment Complete
          </button>
        </div>
      </main>
    </div>
  )
}

export default ExperimentResults
