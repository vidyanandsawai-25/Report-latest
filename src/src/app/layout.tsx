import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/common/Toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maharashtra Water Billing System | महाराष्ट्र पाणी बिलिंग प्रणाली',
  description: 'Comprehensive water billing and management system for Maharashtra government with bilingual support (English/Marathi)',
  keywords: [
    'water billing',
    'Maharashtra',
    'government portal',
    'water management',
    'billing system',
    'पाणी बिलिंग',
    'महाराष्ट्र',
  ],
  authors: [{ name: 'Maharashtra Water Department' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#005AA7',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
