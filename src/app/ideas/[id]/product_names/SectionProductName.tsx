'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Paragraph from '@/components/Paragraph'
import SectionContainer from '@/components/SectionContainer'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'

import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface SectionProductNameProps {
  position: number
  productName: string
  domains: string[]
  why: string
  tagline: string
  targetAudienceInsight: string
  similarNames: string[]
  brandingPotential: string
}

const numberEmojis = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
}

const SectionProductName: React.FC<SectionProductNameProps> = ({
  position,
  productName,
  domains,
  why,
  tagline,
  targetAudienceInsight,
  similarNames,
  brandingPotential,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <SectionWrapper id={`product_name_${position}`}>
      <SectionHeader
        title={`${productName} - ${tagline}`}
        emoji={numberEmojis[position as keyof typeof numberEmojis] || '📈'}
        onClick={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        sectionId={`section_product_name_${position}`}
      />

      {isExpanded && (
        <div id={`section_product_name_${position}`}>
          <SectionContainer>
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Why:</h3>
            <Paragraph>
              {why} {targetAudienceInsight}
            </Paragraph>

            <h3 className="mb-2 text-lg font-semibold md:text-xl">
              Branding Potential:
            </h3>
            <Paragraph>{brandingPotential}</Paragraph>

            <h3 className="mb-2 text-lg font-semibold md:text-xl">
              Potential Domains (click to check availability):
            </h3>

            <ul className="mb-2 list-disc pl-5 md:mb-4">
              {domains.map((item, index) => (
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
            <SimpleUnorderedList items={similarNames} />
          </SectionContainer>
        </div>
      )}
    </SectionWrapper>
  )
}

export default SectionProductName
