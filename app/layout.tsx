import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ClientProvider } from '@/components/client-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SisParques - Sistema de Mantenimiento de Parques',
  description: 'Sistema de Mantenimiento de Parques',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/img/logomuni3.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/img/logomuni3.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/img/logomuni3.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}