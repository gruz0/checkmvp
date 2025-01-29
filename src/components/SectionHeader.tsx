'use client'

import React from 'react'

interface SectionHeaderProps {
  children: React.ReactNode
  sectionId: string
  onClick?: () => void
  isExpanded?: boolean
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  sectionId,
  onClick,
  isExpanded,
}) => (
  <button
    type="button"
    className={`${isExpanded ? 'mb-6' : 'mb-0'} cursor-pointer text-xl font-semibold md:text-2xl ${
      isExpanded
        ? 'text-[#034e59] dark:text-blue-300'
        : 'text-[#023840] dark:text-blue-400'
    }`}
    onClick={onClick}
    aria-expanded={isExpanded}
    aria-controls={sectionId}
    style={{ width: '100%', textAlign: 'left' }}
  >
    {children}
    <span className="ml-2">{isExpanded ? '−' : '+'}</span>
  </button>
)

export default SectionHeader
