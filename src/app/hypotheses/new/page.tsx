import { FC } from 'react'

const NewHypothesis: FC = () => (
  <div className="p-4 md:p-6 lg:p-8">
    {/* Main Content */}
    <main className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Hypothesis
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Define your hypothesis by filling out the form below
        </p>
      </div>

      <form className="space-y-6">
        {/* Primary Fields */}
        <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
          {/* Hypothesis Title Field */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block font-medium text-gray-700 dark:text-gray-100"
            >
              Hypothesis Title:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="title"
                placeholder="e.g. Quick Validation Platform for Solo Founders"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
              <button
                type="button"
                className="whitespace-nowrap rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
              >
                Ask AI
              </button>
            </div>
          </div>

          {/* Testable Statement Field */}
          <div className="space-y-2">
            <label
              htmlFor="testableStatement"
              className="block font-medium text-gray-700 dark:text-gray-100"
            >
              Testable Statement:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="testableStatement"
                placeholder="e.g. Solo developers will validate their ideas 3x faster with a dedicated experimentation platform"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
              <button
                type="button"
                className="whitespace-nowrap rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
              >
                Ask AI
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
            >
              <span className="text-xl">✨</span>
              Let AI help you fill out the details
            </button>
          </div>
        </div>

        {/* Audience Field */}
        <div>
          <label
            htmlFor="audience"
            className="block font-medium text-gray-700 dark:text-gray-100"
          >
            Audience:
          </label>
          <input
            type="text"
            id="audience"
            placeholder="e.g. Solo devs building B2C SaaS..."
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Problem and Solution Fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Problem Field */}
          <div>
            <label
              htmlFor="problem"
              className="block font-medium text-gray-700 dark:text-gray-100"
            >
              Problem:
            </label>
            <textarea
              id="problem"
              rows={3}
              placeholder="e.g. They struggle with quick validation"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>

          {/* Solution Field */}
          <div>
            <label
              htmlFor="solution"
              className="block font-medium text-gray-700 dark:text-gray-100"
            >
              Solution:
            </label>
            <textarea
              id="solution"
              rows={3}
              placeholder="e.g. A fast experiment platform..."
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Benefit Field */}
        <div>
          <label
            htmlFor="benefit"
            className="block font-medium text-gray-700 dark:text-gray-100"
          >
            Benefit:
          </label>
          <textarea
            id="benefit"
            rows={3}
            placeholder="e.g. Build correct features, less waste."
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Region Field */}
        <div>
          <label
            htmlFor="region"
            className="block font-medium text-gray-700 dark:text-gray-100"
          >
            Region:
          </label>
          <select
            id="region"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          >
            <option value="worldwide">Worldwide</option>
            <option value="europe">Europe</option>
            <option value="northAmerica">North America</option>
            <option value="asia">Asia</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save Hypothesis
          </button>
          <button
            type="button"
            className="rounded-md bg-white px-4 py-2 font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:ring-gray-700 dark:hover:bg-gray-700"
          >
            Get Feedback
          </button>
        </div>
      </form>
    </main>
  </div>
)

export default NewHypothesis
