import React from 'react'

interface SectionDescriptionProps {
  children: React.ReactNode
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  children,
}) => (
  <div className="mb-8 rounded-lg border bg-white p-4 shadow-sm md:p-6 dark:bg-gray-900/50">
    <p className="text-gray-700 md:text-lg dark:text-gray-300">{children}</p>
  </div>
)

export default SectionDescription
