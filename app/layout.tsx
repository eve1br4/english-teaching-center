import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'English Teaching Center | Aprende inglés a tu ritmo',
  description: 'Lecciones claras, práctica real y una comunidad para aprender inglés con confianza.',
  generator: 'English Teaching Center',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0066ff',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
