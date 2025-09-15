import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css'
import { Header } from '@/components/header'
import { RoscaFooter } from '@/components/rosca-footer'
import { Providers } from '@/contexts/provider'
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RoscaSecure - Decentralized Community Savings Circles',
  description: 'Secure community savings platform with collateral-protected ROSCA circles. Join trusted savings groups, earn reliable returns, and build financial resilience with blockchain technology on Somnia Network.',
  keywords: [
    'ROSCA',
    'community savings',
    'collateral protection',
    'rotating savings',
    'decentralized finance',
    'savings circles',
    'financial cooperation',
    'blockchain savings',
    'Web3 finance',
    'peer-to-peer savings'
  ],
  authors: [{ name: 'RoscaSecure Team' }],
  creator: 'RoscaSecure',
  publisher: 'RoscaSecure',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className='bg-background' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <RoscaFooter />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
