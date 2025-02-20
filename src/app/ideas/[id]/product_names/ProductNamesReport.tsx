import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
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
  <MainContainer ideaId={ideaId} activePath="product_names" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        ✨ Potential Product Names
      </h1>
    </div>

    <Paragraph>
      Here, we brainstorm some catchy names for your product. A good name can
      leave a lasting impression and make your product more memorable. This is a
      fun part of the process that allows you to think creatively!
    </Paragraph>

    <HorizontalLine />

    {productNames.map((productName, idx) => (
      <React.Fragment key={idx}>
        <SectionProductName key={idx} position={idx + 1} {...productName} />
        <HorizontalLine />
      </React.Fragment>
    ))}
  </MainContainer>
)
