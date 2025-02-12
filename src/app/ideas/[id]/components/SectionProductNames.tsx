'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'
import SectionContainer from '@/components/SectionContainer'
import SectionDescription from '@/components/SectionDescription'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionProductNamesProps {
  data: Array<{
    productName: string
    domains: string[]
    why: string
    tagline: string
    targetAudienceInsight: string
    similarNames: string[]
    brandingPotential: string
  }> | null
}

const SectionProductNames: React.FC<SectionProductNamesProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id="product_names">
      <SectionHeader
        title="Potential Product Names"
        emoji="✨"
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId="section_potential_product_names"
      />

      {isExpanded && (
        <div id="section_potential_product_names">
          <SectionDescription>
            Here, we brainstorm some catchy names for your product. A good name
            can leave a lasting impression and make your product more memorable.
            This is a fun part of the process that allows you to think
            creatively!
          </SectionDescription>

          {data !== null ? (
            <>
              {data.map((productName, idx) => (
                <Section
                  key={productName.productName}
                  header={`${idx + 1}. ${productName.productName} - ${productName.tagline}`}
                >
                  <SectionContainer>
                    <Paragraph>
                      {productName.why} {productName.targetAudienceInsight}
                    </Paragraph>

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Branding Potential:
                    </h3>
                    <Paragraph>{productName.brandingPotential}</Paragraph>

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Potential Domains (click to check availability):
                    </h3>

                    <ul className="mb-2 list-disc pl-5 md:mb-4">
                      {productName.domains.map((item, index) => (
                        <li key={index} className="mb-2 md:text-lg">
                          <Link
                            href={`https://www.namecheap.com/domains/registration/results/?domain=${item}`}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="text-blue-700 underline hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Similar Product Names:
                    </h3>
                    <SimpleUnorderedList items={productName.similarNames} />
                  </SectionContainer>
                </Section>
              ))}
            </>
          ) : (
            <FetchingDataMessage />
          )}
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionProductNames
