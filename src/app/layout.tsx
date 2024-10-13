import React from 'react'
import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Validate Your Product Idea Quickly | CheckMVP',
  description:
    'Stop wasting time on product ideas without a market. CheckMVP helps you validate your concept in just a minute.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
