import { FC } from 'react'

const ExperimentsPage: FC = () => (
  <div className="p-4 md:p-6 lg:p-8">
    <main className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Experiments of Gamified Habit Tracker with Buddy System
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Users will be more consistent with habits if paired with an
            accountability partner
          </p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Add Experiment
        </button>
      </div>

      {/* Experiments List Section */}
      <div className="mb-6">
        <div className="space-y-4">
          {/* Experiment Card */}
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Landing Page Smoke Test
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Objective: Collect sign-ups to measure initial interest
                </p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                Running
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-gray-600 dark:text-gray-400">
                Key Metric (sign-ups):
                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                  15/100 (15% so far)
                </span>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800">
                  View Details
                </button>
                <button className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900">
                  Enter Results
                </button>
              </div>
            </div>
          </div>

          {/* More experiment cards with different statuses */}
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Short Survey for Freelancers
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Objective: Validate biggest pain points around team
                  collaboration
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                Draft
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-gray-600 dark:text-gray-400">
                Key Metric (responses):
                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                  0 so far
                </span>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800">
                  View Details
                </button>
                <button className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900">
                  Start Experiment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
)

export default ExperimentsPage
