import React from 'react'

interface ParagraphProps {
  children: React.ReactNode
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => (
  <p className="mb-6 text-lg">{children}</p>
)

export default Paragraph
