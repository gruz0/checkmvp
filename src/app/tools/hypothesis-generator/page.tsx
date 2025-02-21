import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import HypothesisGenerator from '@/components/HypothesisGenerator'
import Paragraph from '@/components/Paragraph'
import { getHypothesisCount } from '@/tools/hypothesis'

export const dynamic = 'force-dynamic'

async function HypothesisGeneratorPage() {
  const hypothesisCount = await getHypothesisCount()

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold text-[#023840] md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
        🎲 Random Hypothesis Generator
      </h1>

      <div className="space-y-4">
        <Paragraph>
          Ready to turn your random ideas into potential business gold? Drop in
          any keywords, thoughts, or wild ideas that have been bouncing around
          in your mind. Our AI wizard will transform them into a structured
          business hypothesis ready for validation! Just type in some keywords
          below and let the magic happen!
        </Paragraph>
      </div>

      <HypothesisGenerator />

      <HorizontalLine />

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        🎯 {hypothesisCount.toLocaleString()} hypotheses generated so far
      </p>
    </div>
  )
}

export default HypothesisGeneratorPage
