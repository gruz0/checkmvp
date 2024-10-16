'use client'

import React from 'react'

interface FormFieldProps {
  id: string
  label: string
  description?: string
  value: string
  onChange: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void
  type?: 'text' | 'textarea' | 'radio'
  placeholder?: string
  minLength?: number
  maxLength?: number
  options?: { label: string; value: string }[] // For radio buttons
  required?: boolean
}

const FormField = ({
  id,
  label,
  description,
  value,
  onChange,
  type = 'text',
  placeholder,
  minLength,
  maxLength,
  options,
  required = false,
}: FormFieldProps) => (
  <div className="mb-6 flex flex-col">
    <label htmlFor={id} className="mb-2 text-2xl font-bold">
      {label}
    </label>
    {description && <p className="mb-2 text-lg text-gray-600">{description}</p>}

    {type === 'textarea' ? (
      <textarea
        id={id}
        name={id}
        className="mt-1 block h-32 w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      />
    ) : type === 'radio' && options ? (
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${id}-${option.value}`}
              name={id}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="size-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="ml-3 text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    ) : (
      <input
        id={id}
        name={id}
        className="mt-1 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      />
    )}
  </div>
)

export default FormField
