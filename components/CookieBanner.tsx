'use client';

import React from 'react';
import { Cookie } from 'lucide-react';

interface CookieBannerProps {
  onOpenPolicy: () => void;
  onAccept: () => void;
}

export default function CookieBanner({ onOpenPolicy, onAccept }: CookieBannerProps) {
  return (
    <aside
      aria-label="Informacja o plikach cookies i prywatności"
      className="no-print fixed right-4 bottom-4 left-4 z-40 mx-auto max-w-4xl rounded-2xl border border-[#e4dccb] bg-[#fffdf7]/95 p-4 shadow-xl backdrop-blur-sm dark:border-[#2B333E] dark:bg-[#161B22]/95"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e4dccb] bg-[#f7f1e3] text-amber-700 dark:border-[#2F3946] dark:bg-[#1E2631] dark:text-amber-400">
            <Cookie className="h-4 w-4" />
          </div>
          <p className="text-xs leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
            Ta strona wykorzystuje pliki{' '}
            <strong className="text-[#1c1917] dark:text-[#F8FAFC]">cookies (ciasteczka)</strong>,
            aby automatycznie zapisywać i wczytywać zadania odznaczone przez Ciebie jako zrobione
            oraz wybrany motyw (kremowy lub nocny). Zbieramy też anonimowe statystyki wydajności.
            Szczegóły znajdziesz w naszej polityce prywatności.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={onOpenPolicy}
            className="rounded-lg border border-[#d6ccb8] bg-[#fffdf7] px-3 py-1.5 text-xs font-semibold text-[#44403c] transition-colors hover:bg-[#f7f1e3] dark:border-[#2F3946] dark:bg-[#1E2631] dark:text-[#E2E8F0] dark:hover:bg-[#273140] whitespace-nowrap"
          >
            Polityka prywatności
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-lg bg-[#1D4ED8] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] whitespace-nowrap"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </aside>
  );
}
