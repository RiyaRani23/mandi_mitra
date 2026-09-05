import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MandiMitra — Sahi Mandi, Sahi Daam',
  description: 'Smart market connections and price discovery for India’s farmers, buyers, and FPOs.',
  generator: 'MandiMitra',
  icons: {
    icon: '/mandimitra-favicon.svg',
    apple: '/mandimitra-favicon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1f6846',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
