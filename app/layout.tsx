import type { Metadata } from 'next';
import { site } from '@/lib/content';
import './globals.css';
export const metadata: Metadata = {
  title: 'NordicWebz | Moderne nettsider til rimelige priser',
  description: site.description,
  openGraph: {
    title: 'NordicWebz | Moderne nettsider til rimelige priser',
    description: site.description,
    locale: 'nb_NO',
    type: 'website',
    siteName: site.name,
  },
  twitter: {
    card: 'summary',
    title: 'NordicWebz | Moderne nettsider til rimelige priser',
    description: site.description,
  },
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb">
      <body>
        <a className="skip-link" href="#main">
          Hopp til innhold
        </a>
        {children}
      </body>
    </html>
  );
}
