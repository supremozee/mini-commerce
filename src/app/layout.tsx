import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mini-commerce-theta-hazel.vercel.app/'),
  title: {
    default: 'Mini-Commerce - Quality Products at Great Prices',
    template: '%s | Mini-Commerce'
  },
  description: 'Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more with fast shipping and excellent customer service.',
  keywords: ['ecommerce', 'online shopping', 'electronics', 'fashion', 'home goods', 'quality products'],
  authors: [{ name: 'Mini-Commerce Team' }],
  creator: 'Mini-Commerce',
  publisher: 'Mini-Commerce',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mini-commerce-theta-hazel.vercel.app/',
    title: 'Mini-Commerce - Quality Products at Great Prices',
    description: 'Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more.',
    siteName: 'Mini-Commerce',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
        width: 1200,
        height: 630,
        alt: 'Mini-Commerce - Quality Products at Great Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mini-Commerce - Quality Products at Great Prices',
    description: 'Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more.',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center'],
    creator: '@abdulazeez',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://mini-commerce-theta-hazel.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mini-Commerce',
              url: 'https://mini-commerce-theta-hazel.vercel.app/',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://mini-commerce-theta-hazel.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
