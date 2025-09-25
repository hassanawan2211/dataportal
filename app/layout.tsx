import { Toaster } from 'sonner'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DataPortal',
  description: 'Admin dashboard with Supabase + Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children} <Toaster richColors position="top-right" /></body>

    </html>
  )
}
