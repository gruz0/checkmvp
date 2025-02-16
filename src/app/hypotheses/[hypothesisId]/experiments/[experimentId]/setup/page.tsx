import { FC } from 'react'
import HorizontalLine from '@/components/HorizontalLine'

const ExperimentSetup: FC = () => (
  <div className="p-4 md:p-6 lg:p-8">
    <main className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Set Up Your Experiment: Landing Page Smoke Test
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Configure your experiment parameters and success criteria
        </p>
      </div>

      <form>
        <div className="grid grid-cols-1 gap-8 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0 dark:divide-gray-700">
          {/* Left Column - Experiment Details */}
          <div className="space-y-6 md:pr-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Configure Your Experiment
            </h3>

            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block font-medium text-gray-700 dark:text-gray-100"
              >
                Experiment Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder="Landing Page MVP"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            {/* Objective Field */}
            <div>
              <label
                htmlFor="objective"
                className="block font-medium text-gray-700 dark:text-gray-100"
              >
                Objective:
              </label>
              <textarea
                id="objective"
                rows={3}
                placeholder="Measure email sign-up conversion"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            {/* Success Metric Field */}
            <div>
              <label
                htmlFor="successMetric"
                className="block font-medium text-gray-700 dark:text-gray-100"
              >
                Success Metric:
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="number"
                  id="successMetric"
                  min="0"
                  max="100"
                  placeholder="10"
                  className="block w-24 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  % sign-up rate
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Landing Page Content */}
          <div className="space-y-6 pt-6 md:pl-8 md:pt-0">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Landing Page Content
            </h3>

            {/* Headline */}
            <div>
              <label
                htmlFor="headline"
                className="block font-medium text-gray-700 dark:text-gray-100"
              >
                Headline:
              </label>
              <input
                type="text"
                id="headline"
                placeholder="Your compelling headline here"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            {/* Subheadline */}
            <div>
              <label
                htmlFor="subheadline"
                className="block font-medium text-gray-700 dark:text-gray-100"
              >
                Subheadline:
              </label>
              <input
                type="text"
                id="subheadline"
                placeholder="Supporting text to reinforce your value proposition"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            {/* Call to Action */}
            <div>
              <label
                htmlFor="cta"
                className="block font-medium text-gray-700 dark:text-gray-100"
              >
                Call to Action:
              </label>
              <input
                type="text"
                id="cta"
                placeholder="e.g., Get Early Access"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            {/* Generate Landing Page Copy Button */}
            <button
              type="button"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:ring-gray-700 dark:hover:bg-gray-700"
            >
              Generate Landing Page Copy with AI
            </button>
          </div>
        </div>

        <HorizontalLine />

        {/* Additional Notes Field */}
        <div className="mt-4">
          <label
            htmlFor="notes"
            className="block font-medium text-gray-700 dark:text-gray-100"
          >
            Additional Notes:
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="e.g., Will run FB ads for 3 days"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save Experiment
          </button>
        </div>
      </form>
    </main>
  </div>
)

export default ExperimentSetup
