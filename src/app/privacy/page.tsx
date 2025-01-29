import React from 'react'

export default function PrivacyPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-[#023840] md:mb-8 md:mt-4 md:text-4xl dark:text-gray-100">
        🔒 Privacy Policy
      </h1>

      <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed">
        <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/30">
          <p>
            Hey there! As fellow developers and founders, we understand how
            precious and sensitive your product ideas are. Here&apos;s our
            straightforward commitment to protecting your privacy and handling
            your data responsibly.
          </p>
        </div>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">💡</span> Your Ideas Are Yours
          </h2>
          <p className="mb-6">
            We treat your concepts and ideas with the utmost confidentiality. We
            don&apos;t share them with third parties, and we don&apos;t use them
            for anything other than generating your analysis reports.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">⏱️</span> Data Lifecycle
          </h2>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>
              Initial concepts are automatically archived once transformed into
              detailed analysis
            </li>
            <li>
              Detailed analysis reports are automatically archived after 3 days
            </li>
            <li>You can manually delete your analysis at any time</li>
            <li>
              We don&apos;t store any personal information beyond what&apos;s
              necessary for the service
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">🤖</span> AI Processing
          </h2>
          <p className="mb-6">
            We use AI models to analyze your ideas and generate insights.
            Here&apos;s what you should know:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>Your data is processed using secure API connections</li>
            <li>We don&apos;t use your ideas to train AI models</li>
            <li>AI processing is done on-demand and not stored permanently</li>
            <li>
              We use industry-standard encryption for all data transmission
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">📊</span> Analytics & Cookies
          </h2>
          <p className="mb-6">
            We use privacy-focused Plausible Analytics to understand how we can
            improve the platform. It&apos;s cookie-free and doesn&apos;t track
            personal information. We only collect anonymous usage metrics to
            make CheckMVP better for everyone.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">🎮</span> Your Control
          </h2>
          <p className="mb-6">You&apos;re in charge of your data. You can:</p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>Request deletion of your data at any time</li>
            <li>Export your analysis reports before they expire</li>
            <li>Contact us with any privacy concerns</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">📖</span> Open Source Commitment
          </h2>
          <p className="mb-6">
            CheckMVP is fully open source. You can inspect our code, including
            how we handle your data, on our GitHub repository. If you have any
            privacy concerns or suggestions, feel free to open an issue - we
            believe in transparency and community-driven development.
          </p>
        </section>

        <section className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/30">
          <p>
            We&apos;re builders just like you, and we treat your ideas with the
            same care we&apos;d want for our own. If you have any questions
            about our privacy practices, feel free to reach out.
          </p>
        </section>
      </div>
    </div>
  )
}
