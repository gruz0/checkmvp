import React from 'react'

interface SectionProps {
  header?: string
  children: React.ReactNode
  onUpvote?: () => void
  onDownvote?: () => void
  voteable?: boolean
}

const Section: React.FC<SectionProps> = ({
  header,
  children,
  onUpvote,
  onDownvote,
  voteable = false,
}) => (
  <div className="mb-8">
    {header && (
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold md:text-2xl">{header}</h3>
        {voteable && (
          <div className="flex space-x-2 text-xl">
            {onUpvote && (
              <button
                onClick={onUpvote}
                aria-label="Upvote"
                className="flex items-center justify-center rounded border border-gray-300 px-2 py-1 hover:bg-green-100 focus:outline-none"
              >
                👍
              </button>
            )}
            {onDownvote && (
              <button
                onClick={onDownvote}
                aria-label="Downvote"
                className="flex items-center justify-center rounded border border-gray-300 px-2 py-1 hover:bg-red-100 focus:outline-none"
              >
                👎
              </button>
            )}
          </div>
        )}
      </div>
    )}
    {children}
  </div>
)

export default Section
