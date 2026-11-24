'use client';

import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Download, FileDown } from 'lucide-react';
import {
  formatAllExamSetsAnswersTxt,
  formatExamSetAnswersTxt,
  formatQuestionAnswersBody,
} from '@/lib/answer-key';
import { ExamSet, ExamSetId } from '@/lib/types';

interface HiddenAnswerKeyViewProps {
  examSets: ExamSet[];
  activeFallbackSetId: ExamSetId;
  onSelectSet: (setId: ExamSetId) => void;
}

function triggerTxtDownload(filename: string, content: string) {
  const normalized = content.endsWith('\n') ? content : `${content}\n`;
  const blob = new Blob([normalized], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function HiddenAnswerKeyView({
  examSets,
  activeFallbackSetId,
  onSelectSet,
}: HiddenAnswerKeyViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(key);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === key ? null : prev));
      }, 1800);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleDownloadSingle = (set: ExamSet) => {
    const filename = `odpowiedzi-kolokwium-2025-26-${set.id}.txt`;
    triggerTxtDownload(filename, formatExamSetAnswersTxt(set));
  };

  const handleDownloadAll = () => {
    const filename = 'odpowiedzi-kolokwium-2025-26-wszystkie.txt';
    triggerTxtDownload(filename, formatAllExamSetsAnswersTxt(examSets));
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
            <span className="text-[#1D4ED8] dark:text-[#60A5FA] font-semibold">
              Kolokwium 2025/26
            </span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>Klucz pełnych odpowiedzi (.txt)</span>
          </div>

          <button
            type="button"
            onClick={() => onSelectSet(activeFallbackSetId)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Wróć do arkusza
          </button>
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC] text-balance">
          Pobieranie pełnych odpowiedzi (TXT)
        </h1>

        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#44403c] dark:text-[#CBD5E1] max-w-2xl">
          Pliki <span className="font-mono text-xs sm:text-sm">.txt</span>{' '}
          zawierają pełną treść poprawnych odpowiedzi (zamiast samych liter
          A/B/C/D) na wypadek zmiany kolejności podpunktów na kolokwium.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors whitespace-nowrap shrink-0"
          >
            <FileDown className="w-4 h-4" />
            Pobierz wszystkie (A + B + C) .txt
          </button>

          <button
            type="button"
            onClick={() =>
              handleCopy('all', formatAllExamSetsAnswersTxt(examSets))
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#1c1917] dark:text-[#E2E8F0] hover:border-[#1D4ED8] hover:bg-[#efe7d6] dark:hover:border-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
          >
            {copiedId === 'all' ? (
              <>
                <Check className="w-4 h-4 text-[#059669] dark:text-[#34D399]" />
                Skopiowano całość
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Kopiuj wszystkie
              </>
            )}
          </button>
        </div>
      </section>

      <section className="space-y-4">
        {examSets.map((set) => {
          const txtPreview = formatQuestionAnswersBody(set.questions);
          const fullTxt = formatExamSetAnswersTxt(set);
          const isCopied = copiedId === set.id;

          return (
            <div
              key={set.id}
              className="flex flex-col rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#ede6d7] dark:border-[#242C37]">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="text-base sm:text-lg font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                    {set.tabLabel}
                  </h2>
                  <span className="text-xs font-mono text-[#6b6256] dark:text-[#94A3B8]">
                    {set.questions.length} zadań
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(set)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    Pobierz {set.tabLabel}.txt
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(set.id, fullTxt)}
                    title={`Kopiuj odpowiedzi (${set.tabLabel})`}
                    aria-label={`Kopiuj odpowiedzi (${set.tabLabel})`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#44403c] dark:text-[#CBD5E1] hover:border-[#1D4ED8] hover:bg-[#efe7d6] dark:hover:border-[#60A5FA] transition-colors shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399]" />
                        Skopiowano
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Kopiuj
                      </>
                    )}
                  </button>
                </div>
              </div>

              <pre className="mt-3.5 rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3]/80 dark:bg-[#12171F] p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-[#1c1917] dark:text-[#E2E8F0] whitespace-pre-wrap break-words select-all">
                {txtPreview}
              </pre>
            </div>
          );
        })}
      </section>
    </div>
  );
}
