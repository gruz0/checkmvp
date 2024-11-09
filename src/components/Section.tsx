import React from 'react'

interface SectionProps {
  header?: string
  children: React.ReactNode
  onReport?: () => void
}

const Section: React.FC<SectionProps> = ({ header, children, onReport }) => (
  <div className="mb-8">
    {header && (
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold md:text-2xl">{header}</h3>
        {onReport && (
          <div className="flex space-x-2 text-sm">
            <button
              onClick={onReport}
              aria-label="Report"
              className="flex items-center justify-center rounded border border-gray-300 px-2 py-1 hover:bg-red-100 focus:outline-none"
            >
              🚨 Don&apos;t Like It?
            </button>
          </div>
        )}
      </div>
    )}
    {children}
  </div>
)

export default Section
