import React from 'react'

interface ParagraphProps {
  children: React.ReactNode
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => (
  <p className="mb-4 md:mb-6 md:text-lg">{children}</p>
)

export default Paragraph
