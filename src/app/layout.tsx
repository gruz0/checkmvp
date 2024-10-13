import React from 'react'
import { env } from '@/lib/env'
import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
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
