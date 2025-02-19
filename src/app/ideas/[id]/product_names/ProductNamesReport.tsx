import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
import SectionProductName from './SectionProductName'

interface Props {
  ideaId: string
  productNames: Array<{
    productName: string
    domains: string[]
    why: string
    tagline: string
    targetAudienceInsight: string
    similarNames: string[]
    brandingPotential: string
  }>
}

export const ProductNamesReport = ({ ideaId, productNames }: Props) => (
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar ideaId={ideaId} activePath="product_names" />
      </aside>

      <div className="flex-1 md:pl-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
            ✨ Potential Product Names
          </h1>
        </div>

        <Paragraph>
          Here, we brainstorm some catchy names for your product. A good name
          can leave a lasting impression and make your product more memorable.
          This is a fun part of the process that allows you to think creatively!
        </Paragraph>

        <HorizontalLine />

        {productNames.map((productName, idx) => (
          <React.Fragment key={idx}>
            <SectionProductName key={idx} position={idx + 1} {...productName} />
            <HorizontalLine />
          </React.Fragment>
        ))}
      </div>
    </div>

    <BackToTopButton />
  </div>
)
