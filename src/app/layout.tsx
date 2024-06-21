import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Idea Sales',
    default: 'Idea Sales',
  },
  description:
    'Aplicação web de relatórios de vendas da plataforma e-commerce IdeaHome.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-500/50`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
