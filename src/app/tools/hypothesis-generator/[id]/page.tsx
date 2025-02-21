import Link from 'next/link'
import { notFound } from 'next/navigation'
import Paragraph from '@/components/Paragraph'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'
import { prisma } from '@/lib/prisma'

interface PageProps {
  params: {
    id: string
  }
}

const formatRegionName = (region: string): string =>
  region
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const formatProductType = (type: string): string => {
  const formattingMap: Record<string, string> = {
    b2b: 'B2B',
    b2c: 'B2C',
    b2b2c: 'B2B2C',
    saas: 'SaaS',
    marketplace: 'Marketplace',
  }

  return formattingMap[type.toLowerCase()] || type.toUpperCase()
}

export default async function HypothesisPage({ params }: PageProps) {
  const hypothesis = await prisma.generatedHypothesis.findUnique({
    where: { id: params.id },
  })

  if (!hypothesis) {
    notFound()
  }

  if (hypothesis.status === 'pending') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold">
            Generating your hypothesis...
          </div>
          <div className="mx-auto size-12 animate-spin rounded-full border-4 border-[#7bf179] border-t-transparent" />
        </div>
      </div>
    )
  }

  if (hypothesis.status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold text-red-600">
            Error generating hypothesis
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {hypothesis.error || 'An unexpected error occurred'}
          </div>
        </div>
      </div>
    )
  }

  if (!hypothesis.result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold text-red-600">
            No hypothesis result found
          </div>
        </div>
      </div>
    )
  }

  const result = JSON.parse(hypothesis.result)

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            Here Is Your Random Hypothesis ✨
          </h1>
        </div>

        <div className="mb-6 space-y-4 rounded-lg border p-4 md:space-y-6 md:p-6">
          <h2 className="text-xl font-bold">Based on Your Input:</h2>

          <Paragraph>{hypothesis.content}</Paragraph>
        </div>

        <div className="space-y-4 rounded-lg border p-4 md:space-y-6 md:p-6">
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Generated Assumption or Business Idea:
            </h2>

            <Paragraph>{result.hypothesis}</Paragraph>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Target Audiences:</h3>

            <SimpleUnorderedList items={result.targetAudiences} />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="rounded-full bg-[#023840]/10 px-4 py-2 font-medium text-[#023840] ring-1 ring-[#023840]/20 dark:bg-[#7bf179]/10 dark:text-[#7bf179] dark:ring-[#7bf179]/20">
              Suggested Region: {formatRegionName(result.region)}
            </div>
            <div className="rounded-full bg-[#023840]/10 px-4 py-2 font-medium text-[#023840] ring-1 ring-[#023840]/20 dark:bg-[#7bf179]/10 dark:text-[#7bf179] dark:ring-[#7bf179]/20">
              Product Type: {formatProductType(result.productType)}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Link
            href={{
              pathname: '/start',
              query: {
                problem: result.hypothesis,
                persona: result.targetAudiences.join('\n'),
                region: result.region,
                productType: result.productType,
                stage: 'idea',
              },
            }}
            target="_blank"
            className="inline-block rounded-md bg-[#023840] px-6 py-3 text-center text-lg font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 lg:text-xl dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
          >
            I Want to Go Deeper
          </Link>

          <Link
            href={{
              pathname: '/tools/hypothesis-generator',
            }}
            className="inline-block rounded-md border border-[#023840]/20 bg-transparent px-6 py-3 text-center text-lg font-medium text-[#023840] hover:bg-[#023840]/5 focus:outline-none focus:ring-2 focus:ring-[#023840]/20 focus:ring-offset-2 lg:text-xl dark:border-[#7bf179]/20 dark:text-[#7bf179] dark:hover:bg-[#7bf179]/5"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  )
}
