import React from 'react'

interface SectionProps {
  header?: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ header, children }) => (
  <div className="mb-8">
    {header && (
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold md:text-2xl">{header}</h3>
      </div>
    )}
    {children}
  </div>
)

export default Section
