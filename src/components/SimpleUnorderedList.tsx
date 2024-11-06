import React from 'react'

interface SimpleUnorderedListProps {
  items: string[]
}

const SimpleUnorderedList: React.FC<SimpleUnorderedListProps> = ({ items }) => (
  <ul className="mb-4 list-disc pl-4">
    {items.map((item, index) => (
      <li key={index} className="mb-2 pl-1 md:pl-2 md:text-lg">
        {item}
      </li>
    ))}
  </ul>
)

export default SimpleUnorderedList