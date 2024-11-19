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
          <button
            onClick={onReport}
            aria-label="Report"
            className="flex items-center justify-center rounded bg-gray-50 px-2 py-1 text-sm hover:bg-red-100 dark:bg-gray-600 dark:hover:bg-red-700"
          >
            Dislike
          </button>
        )}
      </div>
    )}
    {children}
  </div>
)

export default Section
