import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
    'Interaktywne kompendium dla studentów informatyki: tematy 1–4 z Zad_MDL, rozwiązania krok po kroku kolokwiów 2025/26 i 2022, kalkulator logiki i legalna ściąga A4.',
  openGraph: {
    title: 'Matematyka Dyskretna z Logiką — Kompendium Kolokwium',
    description:
      'Interaktywne kompendium dla studentów informatyki: tematy 1–4 z Zad_MDL, rozwiązania krok po kroku kolokwiów 2025/26 i 2022, kalkulator logiki i legalna ściąga A4.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matematyka Dyskretna z Logiką — Kompendium Kolokwium',
    description:
      'Interaktywne kompendium dla studentów informatyki: tematy 1–4 z Zad_MDL, rozwiązania krok po kroku kolokwiów 2025/26 i 2022.',
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var c=document.cookie||'';var m=c.match(/(?:^|;\\s*)mdl_theme=([^;]+)/);var t=m?decodeURIComponent(m[1]):null;if(!t){t=localStorage.getItem('mdl-ul-theme-v1');}if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className="font-sans antialiased bg-[#f5efe2] text-[#1c1917] dark:bg-[#0F1419] dark:text-[#E6EDF3] selection:bg-blue-200/70 dark:selection:bg-blue-900/60 transition-colors"
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
