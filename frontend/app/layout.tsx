import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css'
import { Header } from '@/components/header'
import { ArtiFusionFooter } from '@/components/artifusion-footer'
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
  title: 'ArtiFusion - AI-Powered No-Loss NFT Auctions',
  description: 'Revolutionary NFT platform combining AI-powered creation with no-loss auction mechanics. Generate unique NFTs using AI prompts, participate in risk-free auctions, and launch tokenbound collections on Shape Network.',
  keywords: [
    'NFT auction',
    'AI NFT generation',
    'no-loss auction',
    'tokenbound NFT',
    'Shape Network',
    'NFT launchpad',
    'AI art generation',
    'blockchain auction',
    'Web3 platform',
    'NFT marketplace'
  ],
  authors: [{ name: 'ArtiFusion Team' }],
  creator: 'ArtiFusion',
  publisher: 'ArtiFusion',
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
          <ArtiFusionFooter />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
