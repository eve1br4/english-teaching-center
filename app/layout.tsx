import { Analytics } from '@vercel/analytics/next'
import { Fredoka } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka' })

export const metadata: Metadata = {
  title: 'English Teaching Center | Aprende inglés con confianza',
  description: 'Descubre una nueva forma interactiva de hablar inglés con confianza.',
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
      <body className={`${fredoka.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
