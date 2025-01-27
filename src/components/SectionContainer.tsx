import React, { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => (
  <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 pb-0 hover:shadow-lg md:p-6 lg:pb-0 dark:bg-gray-900/50">
    {children}
  </div>
)

export default SectionContainer
