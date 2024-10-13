import React from 'react'

interface SectionProps {
  header?: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ header, children }) => (
  <div className="mb-8">
    {header && (
      <h3 className="mb-4 text-lg font-semibold md:text-xl xl:text-2xl">
        {header}
      </h3>
    )}

    {children}
  </div>
)

export default Section
