import React from 'react'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children }) => (
  <div className="pt-4 md:pt-6" id={id}>
    {children}
  </div>
)

export default SectionWrapper
