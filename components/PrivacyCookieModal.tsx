'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ExternalLink, Info, ShieldCheck, Trash2, X } from 'lucide-react';
import {
  COOKIE_DONE_TASKS,
  COOKIE_NOTICE,
  COOKIE_THEME,
  STORAGE_EXAM_ANSWERS,
} from '@/lib/cookies';

interface PrivacyCookieModalProps {
  completedIds: string[];
  darkMode: boolean;
  noticeAccepted: boolean;
  onClose: () => void;
  onAcceptNotice: () => void;
  onClearProgress: () => void;
  onResetTheme: () => void;
}

export default function PrivacyCookieModal({
  completedIds,
  darkMode,
  noticeAccepted,
  onClose,
  onAcceptNotice,
  onClearProgress,
  onResetTheme,
}: PrivacyCookieModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      onClick={onClose}
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-xs dark:bg-slate-950/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#e4dccb] bg-[#fffdf7] shadow-2xl dark:border-[#2B333E] dark:bg-[#161B22]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-[#ede6d7] bg-[#f7f1e3]/70 px-5 py-4 dark:border-[#242C37] dark:bg-[#12171F] sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e4dccb] bg-[#fffdf7] text-[#1D4ED8] dark:border-[#2F3946] dark:bg-[#1E2631] dark:text-[#60A5FA]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="privacy-policy-title"
                className="text-base font-bold text-[#1c1917] dark:text-[#F8FAFC] sm:text-lg"
              >
                Polityka prywatności i plików cookies
              </h2>
              <p className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                Zasady ochrony prywatności, zapisu postępów nauki i motywu strony
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij politykę prywatności"
            className="rounded-lg border border-[#e4dccb] bg-[#fffdf7] p-1.5 text-[#57534e] transition-colors hover:bg-[#efe7d6] dark:border-[#2F3946] dark:bg-[#1E2631] dark:text-[#94A3B8] dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1] sm:px-6">
          {/* 1. Privacy */}
          <section>
            <h3 className="text-sm font-bold text-[#1c1917] dark:text-[#F8FAFC]">
              1. Polityka prywatności i dane osobowe
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm">
              Serwis <strong>Matematyka Dyskretna z Logiką — Kompendium Kolokwium</strong> ma
              wyłącznie charakter edukacyjny i nie wymaga rejestracji ani logowania. Nie zbieramy,
              nie przetwarzamy ani nie udostępniamy żadnych danych osobowych (takich jak imię,
              nazwisko, adres e-mail czy dane profilujące). Wszystkie informacje o ukończonych
              zadaniach oraz wybranym motywie zapisywane są wyłącznie lokalnie w Twojej przeglądarce.
            </p>
          </section>

          {/* 2. Cookies explanation */}
          <section>
            <h3 className="text-sm font-bold text-[#1c1917] dark:text-[#F8FAFC]">
              2. Czym są pliki cookies i po co ich używamy?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm">
              Pliki cookies (ciasteczka) to niewielkie pliki tekstowe zapisywane w przeglądarce
              internetowej. Na naszej stronie służą wyłącznie do zapamiętania Twojego postępu w
              nauce (które działy i zadania z kolokwiów 2025/26 oraz 2022 oznaczyłeś jako zrobione),
              preferowanego motywu (dzienny kremowy lub nocny) oraz potwierdzenia komunikatu o
              ciasteczkach. Przy każdym wejściu na stronę aplikacja automatycznie odczytuje te
              ciasteczka od razu na początku ładowania.
            </p>
          </section>

          {/* 3. Detailed list of cookies */}
          <section>
            <h3 className="text-sm font-bold text-[#1c1917] dark:text-[#F8FAFC]">
              3. Wykaz używanych ciasteczek i mechanizmów pamięci
            </h3>
            <div className="mt-2.5 space-y-2.5">
              <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-3.5 dark:border-[#262F3B] dark:bg-[#12171F]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                    {COOKIE_DONE_TASKS}
                  </span>
                  <span className="text-[11px] font-medium text-[#6b6256] dark:text-[#94A3B8]">
                    Cookie funkcjonalne · Ważność: 365 dni
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#44403c] dark:text-[#CBD5E1]">
                  Przechowuje identyfikatory działów i zadań oznaczonych jako zrobione (np.{' '}
                  <code className="font-mono">t1,a-1,k22-1-1</code>). Przy otwarciu strony aplikacja
                  odczytuje to ciasteczko i automatycznie przywraca Twój postęp.
                </p>
              </div>

              <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-3.5 dark:border-[#262F3B] dark:bg-[#12171F]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                    {COOKIE_THEME}
                  </span>
                  <span className="text-[11px] font-medium text-[#6b6256] dark:text-[#94A3B8]">
                    Cookie preferencji wyglądu · Ważność: 365 dni
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#44403c] dark:text-[#CBD5E1]">
                  Zapamiętuje wybrany motyw strony (<code className="font-mono">light</code> —
                  dzienny kremowy lub <code className="font-mono">dark</code> — nocny) i wczytuje
                  go jeszcze przed wyrenderowaniem widoku, aby uniknąć migotania kolorów.
                </p>
              </div>

              <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-3.5 dark:border-[#262F3B] dark:bg-[#12171F]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                    {COOKIE_NOTICE}
                  </span>
                  <span className="text-[11px] font-medium text-[#6b6256] dark:text-[#94A3B8]">
                    Cookie niezbędne · Ważność: 365 dni
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#44403c] dark:text-[#CBD5E1]">
                  Zapamiętuje zaakceptowanie dolnego paska z informacją o plikach cookies, aby nie
                  wyświetlał się przy każdej kolejnej wizycie.
                </p>
              </div>

              <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-3.5 dark:border-[#262F3B] dark:bg-[#12171F]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#1c1917] dark:text-[#E2E8F0]">
                    {STORAGE_EXAM_ANSWERS} (localStorage)
                  </span>
                  <span className="text-[11px] font-medium text-[#6b6256] dark:text-[#94A3B8]">
                    Funkcjonalne · Pamięć lokalna
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#44403c] dark:text-[#CBD5E1]">
                  Przechowuje tymczasowo zaznaczone odpowiedzi w Trybie sprawdzianu (+1/−1/0 pkt),
                  aby nie zniknęły po przypadkowym odświeżeniu karty.
                </p>
              </div>

              <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-3.5 dark:border-[#262F3B] dark:bg-[#12171F]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#1c1917] dark:text-[#E2E8F0]">
                    Vercel Web Analytics &amp; Speed Insights
                  </span>
                  <span className="text-[11px] font-medium text-[#6b6256] dark:text-[#94A3B8]">
                    Statystyka i wydajność
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#44403c] dark:text-[#CBD5E1]">
                  Zbierają anonimowe, zagregowane statystyki odwiedzin oraz czasu ładowania strony
                  (Core Web Vitals). Nie używamy ciasteczek reklamowych, śledzących ani profilowania.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Live Cookie Preview & Controls */}
          <section className="rounded-xl border border-[#c8daf0] bg-[#eef4fb] p-4 dark:border-[#1E3A8A]/70 dark:bg-[#1E3A8A]/20">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A] dark:text-[#93C5FD]">
              <Info className="h-4 w-4 shrink-0" />
              <span>Podgląd danych zapisanych w Twoich plikach cookies</span>
            </div>

            <div className="mt-2.5 space-y-1.5 text-xs text-[#334155] dark:text-[#CBD5E1]">
              <p>
                Motyw w <code className="font-mono font-semibold">{COOKIE_THEME}</code>:{' '}
                <strong className="text-[#1c1917] dark:text-white">
                  {darkMode ? 'dark (Tryb nocny)' : 'light (Tryb dzienny kremowy)'}
                </strong>
              </p>
              <p>
                Zapisane zadania w{' '}
                <code className="font-mono font-semibold">{COOKIE_DONE_TASKS}</code>:{' '}
                <strong className="text-[#1c1917] dark:text-white">{completedIds.length}</strong>
                {completedIds.length > 0 ? (
                  <span className="ml-1 font-mono text-[11px] text-[#57534e] dark:text-[#94A3B8] break-all">
                    ({completedIds.join(', ')})
                  </span>
                ) : (
                  <span className="text-[#6b6256] dark:text-[#94A3B8]">
                    {' '}
                    — brak odznaczonych zadań.
                  </span>
                )}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={completedIds.length === 0}
                onClick={onClearProgress}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-[#fffdf7] px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-45 dark:border-rose-800 dark:bg-[#161B22] dark:text-rose-300 dark:hover:bg-rose-950/60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Wyczyść zapisane zadania (usuń ciasteczko)
              </button>

              <button
                type="button"
                onClick={onResetTheme}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#d6ccb8] bg-[#fffdf7] px-3 py-1.5 text-xs font-semibold text-[#44403c] transition-colors hover:bg-[#f7f1e3] dark:border-[#2F3946] dark:bg-[#161B22] dark:text-[#CBD5E1] dark:hover:bg-[#1E2631]"
              >
                <Cookie className="h-3.5 w-3.5" />
                Przywróć domyślny motyw (kremowy)
              </button>
            </div>
          </section>

          {/* 5. Managing cookies in browser */}
          <section>
            <h3 className="text-sm font-bold text-[#1c1917] dark:text-[#F8FAFC]">
              4. Zarządzanie plikami cookies w przeglądarce
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm">
              W każdej chwili możesz ograniczyć, zablokować lub usunąć pliki cookies w ustawieniach
              swojej przeglądarki internetowej (Chrome, Firefox, Edge, Safari). Zablokowanie
              ciasteczek nie ogranicza dostępu do żadnych zadań ani rozwiązań, ale sprawi, że
              odznaczone zadania i wybrany motyw nie zostaną zapamiętane po zamknięciu karty.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-[#ede6d7] bg-[#f7f1e3]/70 px-5 py-3.5 dark:border-[#242C37] dark:bg-[#12171F] sm:px-6">
          <Link
            href="/polityka-prywatnosci"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D4ED8] hover:underline dark:text-[#60A5FA]"
          >
            Otwórz jako pełną stronę
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#d6ccb8] bg-[#fffdf7] px-4 py-2 text-xs font-semibold text-[#44403c] transition-colors hover:bg-[#efe7d6] dark:border-[#2F3946] dark:bg-[#1E2631] dark:text-[#E2E8F0] dark:hover:bg-[#273140]"
            >
              Zamknij
            </button>

            {!noticeAccepted && (
              <button
                type="button"
                onClick={() => {
                  onAcceptNotice();
                  onClose();
                }}
                className="rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]"
              >
                Akceptuję i zamknij
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
