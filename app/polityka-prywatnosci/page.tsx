import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie, ShieldCheck } from 'lucide-react';
import {
  COOKIE_DONE_TASKS,
  COOKIE_NOTICE,
  COOKIE_THEME,
  STORAGE_EXAM_ANSWERS,
} from '@/lib/cookies';

export const metadata: Metadata = {
  title: 'Polityka prywatności i plików cookies — Matematyka Dyskretna z Logiką',
  description:
    'Zasady ochrony prywatności oraz wykorzystania plików cookies do zapisu postępów w nauce i preferencji motywu strony.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f5efe2] text-[#1c1917] dark:bg-[#0F1419] dark:text-[#E6EDF3]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-[#d6ccb8] bg-[#fffdf7] px-3.5 py-2 text-xs font-semibold text-[#44403c] transition-colors hover:bg-[#f7f1e3] dark:border-[#2F3946] dark:bg-[#161B22] dark:text-[#CBD5E1] dark:hover:bg-[#1E2631]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Wróć do kompendium
        </Link>

        <article className="mt-6 rounded-2xl border border-[#e4dccb] bg-[#fffdf7] p-6 shadow-sm dark:border-[#2B333E] dark:bg-[#161B22] sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-[#ede6d7] dark:border-[#242C37]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e4dccb] bg-[#f7f1e3] text-[#1D4ED8] dark:border-[#2F3946] dark:bg-[#1E2631] dark:text-[#60A5FA]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC] sm:text-2xl">
                Polityka prywatności i plików cookies
              </h1>
              <p className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                Matematyka Dyskretna z Logiką — Kompendium Kolokwium (I rok Informatyki)
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
            <section>
              <h2 className="text-base font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                1. Informacje ogólne i ochrona danych osobowych
              </h2>
              <p className="mt-2">
                Strona ma charakter otwartego, bezpłatnego kompendium edukacyjnego przygotowanego
                do nauki do kolokwium z Matematyki Dyskretnej z Logiką. Korzystanie z serwisu nie
                wymaga zakładania konta ani podawania jakichkolwiek danych osobowych. Nie
                gromadzimy danych identyfikujących użytkowników, nie stosujemy profilowania ani
                narzędzi reklamowych.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                2. Wykorzystanie plików cookies (ciasteczek)
              </h2>
              <p className="mt-2">
                Aplikacja wykorzystuje pliki cookies wyłącznie w celach funkcjonalnych — aby
                automatycznie wczytywać przy starcie strony Twoje odznaczone zadania oraz
                preferowany motyw graficzny. Ciasteczka są przechowywane wyłącznie w Twojej
                przeglądarce.
              </p>

              <div className="mt-3 space-y-2.5">
                <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-4 dark:border-[#262F3B] dark:bg-[#12171F]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                      <Cookie className="h-3.5 w-3.5" />
                      {COOKIE_DONE_TASKS}
                    </span>
                    <span className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                      Funkcjonalne · 365 dni
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm">
                    Zapisuje listę identyfikatorów działów i zadań oznaczonych jako zrobione (z
                    Tematów 1–4, Kolokwium 2025/26 oraz Kolokwium 2022). Przy otwarciu strony
                    ciasteczko jest automatycznie odczytywane.
                  </p>
                </div>

                <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-4 dark:border-[#262F3B] dark:bg-[#12171F]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                      <Cookie className="h-3.5 w-3.5" />
                      {COOKIE_THEME}
                    </span>
                    <span className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                      Preferencja wyglądu · 365 dni
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm">
                    Zapisuje wybrany przez użytkownika motyw (<code className="font-mono">light</code>{' '}
                    — kremowy dzienny lub <code className="font-mono">dark</code> — nocny) i
                    wczytuje go natychmiast przy uruchamianiu strony.
                  </p>
                </div>

                <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-4 dark:border-[#262F3B] dark:bg-[#12171F]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                      <Cookie className="h-3.5 w-3.5" />
                      {COOKIE_NOTICE}
                    </span>
                    <span className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                      Niezbędne · 365 dni
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm">
                    Zapamiętuje zamknięcie lub zaakceptowanie paska z informacją o plikach cookies.
                  </p>
                </div>

                <div className="rounded-xl border border-[#e4dccb] bg-[#f7f1e3]/75 p-4 dark:border-[#262F3B] dark:bg-[#12171F]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#1c1917] dark:text-[#E2E8F0]">
                      {STORAGE_EXAM_ANSWERS} (localStorage)
                    </span>
                    <span className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                      Pamięć lokalna przeglądarki
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm">
                    Przechowuje tymczasowo odpowiedzi zaznaczone w Trybie sprawdzianu (+1/−1/0 pkt).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                3. Anonimowe statystyki wydajności
              </h2>
              <p className="mt-2">
                Serwis korzysta z usług <strong>Vercel Web Analytics</strong> oraz{' '}
                <strong>Vercel Speed Insights</strong> w celu monitorowania ogólnej liczby
                odwiedzin i wydajności ładowania (Core Web Vitals). Dane te są zanonimizowane i nie
                służą do identyfikacji ani śledzenia użytkowników pomiędzy serwisami.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                4. Jak usunąć lub zablokować ciasteczka?
              </h2>
              <p className="mt-2">
                Zapisane postępy i preferencje możesz wyczyścić w dowolnym momencie w oknie
                „Polityka prywatności i cookies” w stopce strony albo bezpośrednio w ustawieniach
                swojej przeglądarki internetowej (Chrome, Firefox, Safari, Edge). Wyłączenie plików
                cookies nie blokuje dostępu do materiałów edukacyjnych, a jedynie uniemożliwia
                zapamiętywanie stanu ukończonych zadań i motywu między wizytami.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
