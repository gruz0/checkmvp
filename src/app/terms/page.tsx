import Link from 'next/link'
import React from 'react'

export default function TermsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-[#023840] md:mb-8 md:mt-4 md:text-4xl dark:text-gray-100">
        📋 Terms of Service
      </h1>

      <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed">
        <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/30">
          <p>
            Hey there! Let&apos;s keep this simple and clear. These terms are
            designed to protect both you and us while using CheckMVP. We want to
            make sure we&apos;re on the same page about how the service works.
          </p>
        </div>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">🎯</span> Service Purpose
          </h2>
          <p className="mb-6">
            CheckMVP is an AI-powered platform that helps validate your product
            ideas. We provide analysis and insights, but remember - the final
            decision on how to use these insights is always yours. We&apos;re
            here to assist, not to make decisions for you.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">🤝</span> Using Our Service
          </h2>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>You must be at least 16 years old to use CheckMVP</li>
            <li>
              You agree to provide accurate information when using our service
            </li>
            <li>
              You&apos;re responsible for maintaining the confidentiality of
              your analysis reports
            </li>
            <li>
              Don&apos;t use the service for any illegal or unauthorized purpose
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">⚡</span> Service Limitations
          </h2>
          <p className="mb-6">
            While we strive for accuracy, please understand that:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>AI analysis may sometimes provide imperfect results</li>
            <li>
              Market conditions and trends mentioned in reports can change
              rapidly
            </li>
            <li>
              We can&apos;t guarantee the success of any business idea or
              concept
            </li>
            <li>
              Service availability might vary due to maintenance or updates
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">💭</span> Your Content
          </h2>
          <p className="mb-6">
            The ideas and concepts you submit remain yours. However, you grant
            us the necessary rights to:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>Process your input to generate analysis reports</li>
            <li>Store your data according to our privacy policy</li>
            <li>
              Use anonymized data to improve our service (never your actual
              ideas)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">🛠️</span> Service Changes
          </h2>
          <p className="mb-6">
            We&apos;re constantly improving CheckMVP, which means we might:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>Modify or discontinue features</li>
            <li>Update our AI models and analysis methods</li>
            <li>Change our pricing structure (with advance notice)</li>
            <li>Adjust report formats and content structure</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">🔐</span> Security
          </h2>
          <p className="mb-6">
            While we take security seriously, you can help by:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>Not sharing your analysis reports unnecessarily</li>
            <li>
              Downloading important reports before they&apos;re automatically
              archived
            </li>
            <li>
              Reporting any security concerns to us immediately via{' '}
              <Link
                href="https://github.com/gruz0/checkmvp/issues"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                GitHub Issues
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-200">
            <span className="text-2xl">📱</span> API Usage
          </h2>
          <p className="mb-6">
            As an open-source project, you can access our API, but please:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>Don&apos;t overwhelm our servers with excessive requests</li>
            <li>Respect rate limits and usage guidelines</li>
            <li>Consider contributing improvements back to the community</li>
          </ul>
        </section>

        <section className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/30">
          <p>
            By using CheckMVP, you agree to these terms. We&apos;re here to help
            you succeed, and these guidelines help us maintain a service that
            benefits everyone. If you have questions, feel free to{' '}
            <Link
              href="https://github.com/gruz0/checkmvp/issues"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              open an issue
            </Link>{' '}
            or reach out on social media.
          </p>
        </section>
      </div>
    </div>
  )
}
