'use client'

import React from 'react'

interface SectionHeaderProps {
  color: string
  children: React.ReactNode
  sectionId: string
  onClick?: () => void
  isExpanded?: boolean
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  color,
  children,
  sectionId,
  onClick,
  isExpanded,
}) => (
  <button
    type="button"
    className={`${isExpanded ? 'mb-6' : 'mb-0'} text-2xl font-semibold xl:text-3xl ${color} cursor-pointer ${
      isExpanded ? 'text-blue-700' : 'text-blue-600'
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
