import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { env } from '@/lib/env'
import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  title: 'Validate Your Product or Startup Idea Fast | CheckMVP',
  description:
    'Stop wasting time on product ideas without a market. CheckMVP helps you validate your concept in just a minute.',
  openGraph: {
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain={env.DOMAIN} />
      </head>

      <body>
        <ThemeProvider attribute="data-mode">{children}</ThemeProvider>
      </body>
    </html>
  )
}
