'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, RotateCcw } from 'lucide-react';
import { SolutionStep } from '@/lib/types';
import FormulaTreeSvg from './FormulaTreeSvg';

interface StepByStepViewerProps {
  steps: SolutionStep[];
  heading?: string;
  finalSummary?: string;
  defaultShowAll?: boolean;
}

export default function StepByStepViewer({
  steps,
  heading = 'Rozwiązanie pisemne krok po kroku (układ na kolokwium)',
  finalSummary,
  defaultShowAll = false,
}: StepByStepViewerProps) {
  const [visibleCount, setVisibleCount] = useState<number>(
    defaultShowAll ? steps.length : 1
  );

  const isAllVisible = visibleCount >= steps.length;
  const shownSteps = steps.slice(0, visibleCount);

  return (
    <section className="rounded-2xl border border-[#E6E2D8] dark:border-[#2B333E] bg-white dark:bg-[#161B22] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EFECE4] dark:border-[#242C37]">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-[#1C1B18] dark:text-[#F1F5F9]">
            {heading}
          </h3>
          <p className="text-xs text-[#6B665C] dark:text-[#94A3B8] mt-0.5 tabular-nums">
            Wyświetlono krok {Math.min(visibleCount, steps.length)} z {steps.length}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setVisibleCount(1)}
            disabled={visibleCount <= 1}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E2DDD2] dark:border-[#2F3946] text-[#4A463E] dark:text-[#CBD5E1] hover:bg-[#F6F4EF] dark:hover:bg-[#1E2631] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Od kroku 1
          </button>

          {!isAllVisible && (
            <button
              type="button"
              onClick={() => setVisibleCount(steps.length)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E2DDD2] dark:border-[#2F3946] text-[#4A463E] dark:text-[#CBD5E1] hover:bg-[#F6F4EF] dark:hover:bg-[#1E2631] transition-colors whitespace-nowrap shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              Pokaż wszystkie
            </button>
          )}
        </div>
      </div>

      <ol className="mt-5 space-y-4">
        {shownSteps.map((step, idx) => (
          <li
            key={idx}
            className="rounded-xl border border-[#EAE6DC] dark:border-[#262F3B] bg-[#FBF9F5] dark:bg-[#131921] p-4 sm:p-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA] shrink-0 tabular-nums">
                Krok {idx + 1}.
              </span>
              <h4 className="text-sm sm:text-base font-semibold text-[#1C1B18] dark:text-[#F1F5F9]">
                {step.title}
              </h4>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-[#38352E] dark:text-[#CBD5E1] whitespace-pre-line">
              {step.explanation}
            </p>

            {step.formula && (
              <div className="mt-3 rounded-lg border border-[#E4DFD4] dark:border-[#2B3544] bg-white dark:bg-[#0F1419] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#1C1B18] dark:text-[#E2E8F0] overflow-x-auto">
                {step.formula}
              </div>
            )}

            {step.treeFormula && <FormulaTreeSvg formula={step.treeFormula} />}

            {step.table && (
              <div className="mt-3 overflow-x-auto rounded-lg border border-[#E4DFD4] dark:border-[#2B3544] bg-white dark:bg-[#0F1419]">
                <table className="w-full text-left border-collapse font-mono text-xs sm:text-sm tabular-nums">
                  <thead>
                    <tr className="border-b border-[#E6E2D8] dark:border-[#2B333E] bg-[#F6F4EF] dark:bg-[#18202B]">
                      {step.table.headers.map((h, i) => (
                        <th
                          key={i}
                          className="px-3 py-2 font-semibold text-[#1C1B18] dark:text-[#F1F5F9] whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {step.table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="border-b last:border-b-0 border-[#EFECE4] dark:border-[#222B36]"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3 py-2 whitespace-nowrap ${
                              cIdx === row.length - 1 && step.table?.highlightLastCol
                                ? 'font-semibold text-[#1D4ED8] dark:text-[#60A5FA]'
                                : 'text-[#38352E] dark:text-[#CBD5E1]'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {step.table.caption && (
                  <div className="px-3 py-2 text-xs text-[#6B665C] dark:text-[#94A3B8] border-t border-[#EFECE4] dark:border-[#222B36] bg-[#FBF9F5] dark:bg-[#141A22]">
                    {step.table.caption}
                  </div>
                )}
              </div>
            )}

            {step.note && (
              <p className="mt-2.5 text-xs text-[#6B665C] dark:text-[#94A3B8]">
                Wskazówka: {step.note}
              </p>
            )}
          </li>
        ))}
      </ol>

      {isAllVisible && finalSummary && (
        <div className="mt-4 rounded-xl border border-[#A7F3D0] dark:border-[#065F46] bg-[#ECFDF5] dark:bg-[#064E3B]/30 px-4 py-3 text-sm text-[#065F46] dark:text-[#A7F3D0]">
          <span className="font-semibold">Podsumowanie na kartkę: </span>
          {finalSummary}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-[#EFECE4] dark:border-[#242C37] flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setVisibleCount((c) => Math.max(1, c - 1))}
          disabled={visibleCount <= 1}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-[#E2DDD2] dark:border-[#2F3946] text-[#38352E] dark:text-[#CBD5E1] hover:bg-[#F6F4EF] dark:hover:bg-[#1E2631] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          Poprzedni krok
        </button>

        {!isAllVisible ? (
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(steps.length, c + 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors whitespace-nowrap shrink-0"
          >
            Następny krok ({visibleCount + 1} / {steps.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <span className="text-xs font-medium text-[#059669] dark:text-[#34D399]">
            Wszystkie kroki rozwiązania zostały odsłonięte
          </span>
        )}
      </div>
    </section>
  );
}
