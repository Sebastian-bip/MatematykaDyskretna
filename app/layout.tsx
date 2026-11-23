import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Matematyka Dyskretna z Logiką — Kompendium Kolokwium',
  description:
    'Interaktywne kompendium dla studentów informatyki: tematy 1–4 z Zad_MDL, rozwiązania krok po kroku kolokwiów 2025/26, kalkulator logiki i legalna ściąga A4.',
  openGraph: {
    title: 'Matematyka Dyskretna z Logiką — Kompendium Kolokwium',
    description:
      'Interaktywne kompendium dla studentów informatyki: tematy 1–4 z Zad_MDL, rozwiązania krok po kroku kolokwiów 2025/26, kalkulator logiki i legalna ściąga A4.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matematyka Dyskretna z Logiką — Kompendium Kolokwium',
    description:
      'Interaktywne kompendium dla studentów informatyki: tematy 1–4 z Zad_MDL, rozwiązania krok po kroku kolokwiów 2025/26.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${plusJakarta.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased bg-[#F6F4EF] text-[#1C1B18] dark:bg-[#0F1419] dark:text-[#E6EDF3] selection:bg-blue-200/70 dark:selection:bg-blue-900/60"
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
