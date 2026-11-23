'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Lightbulb,
  X,
} from 'lucide-react';
import { TopicUnit } from '@/lib/types';
import FormulaTreeSvg from './FormulaTreeSvg';
import StepByStepViewer from './StepByStepViewer';

interface TopicViewProps {
  topic: TopicUnit;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function TopicView({
  topic,
  isCompleted,
  onToggleCompleted,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: TopicViewProps) {
  const [activePhoto, setActivePhoto] = useState<{ src: string; label: string } | null>(null);
  const [selectedExampleId, setSelectedExampleId] = useState<string>(
    topic.workedExamples[0]?.id ?? ''
  );

  const activeExample =
    topic.workedExamples.find((e) => e.id === selectedExampleId) ??
    topic.workedExamples[0];

  return (
    <div className="space-y-5">
      {/* Header & Overview Card */}
      <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6b6256] dark:text-[#94A3B8]">
            <span className="font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
              Zad_MDL · Dział {topic.number}
            </span>
            <span aria-hidden="true">·</span>
            <span>{topic.sourceRef}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onToggleCompleted}
              aria-pressed={isCompleted}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                isCompleted
                  ? 'border-[#059669] bg-[#ebf7f0] text-[#065F46] dark:border-[#10B981] dark:bg-[#064E3B]/40 dark:text-[#A7F3D0]'
                  : 'border-[#d6ccb8] dark:border-[#2F3946] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isCompleted ? 'Opanowany dział' : 'Oznacz dział jako opanowany'}
            </button>

            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Poprzedni
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            >
              Następny
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC] text-balance">
          {topic.title}
        </h1>
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
          {topic.overview}
        </p>

        <div className="mt-4 text-xs text-[#6b6256] dark:text-[#94A3B8]">
          Waga na kolokwium: <strong className="text-[#1c1917] dark:text-[#E2E8F0]">{topic.examFrequency}</strong>
        </div>

        {/* Key Takeaways 2x2 Grid */}
        <div className="mt-5 pt-5 border-t border-[#ede6d7] dark:border-[#242C37]">
          <h2 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#1c1917] dark:text-[#F1F5F9] mb-3">
            <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA]" />
            Najważniejsze zasady z działu (must-have na kolokwium)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topic.keyTakeaways.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4"
              >
                <div className="text-sm font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                  {item.term}
                </div>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theory Blocks */}
      <div className="space-y-4">
        {topic.theoryBlocks.map((block, bIdx) => (
          <section
            key={bIdx}
            className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
                {block.code}
              </span>
              {block.photoSrc && block.photoLabel && (
                <button
                  type="button"
                  onClick={() =>
                    setActivePhoto({ src: block.photoSrc!, label: block.photoLabel! })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] text-[#1D4ED8] dark:text-[#60A5FA] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] transition-colors whitespace-nowrap shrink-0"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Pokaż slajd z wykładu
                </button>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#1c1917] dark:text-[#F8FAFC]">
              {block.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
              {block.summary}
            </p>

            {block.bullets && (
              <ul className="mt-3.5 space-y-2 list-disc list-outside pl-5 text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                {block.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

            {block.formulas && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {block.formulas.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-3.5"
                  >
                    <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                      {f.label}
                    </div>
                    <div className="mt-1 font-mono text-xs sm:text-sm font-semibold text-[#1c1917] dark:text-[#F1F5F9] overflow-x-auto">
                      {f.expr}
                    </div>
                    {f.note && (
                      <div className="mt-1 text-xs text-[#6b6256] dark:text-[#94A3B8]">
                        {f.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {block.treeFormula && <FormulaTreeSvg formula={block.treeFormula} />}

            {block.table && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#e4dccb] dark:border-[#2B3544] bg-[#fffdf7] dark:bg-[#0F1419]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
                  <thead>
                    <tr className="border-b border-[#e4dccb] dark:border-[#2B333E] bg-[#f5efe2] dark:bg-[#18202B]">
                      {block.table.headers.map((h, i) => (
                        <th
                          key={i}
                          className="px-3 py-2.5 font-semibold text-[#1c1917] dark:text-[#F1F5F9] whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="border-b last:border-b-0 border-[#ede6d7] dark:border-[#222B36]"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3 py-2 ${
                              cIdx === 0 ? 'font-medium text-[#1c1917] dark:text-[#F1F5F9]' : 'text-[#44403c] dark:text-[#CBD5E1]'
                            } ${cell.includes('∀') || cell.includes('∃') || cell.includes('=') || cell === '0' || cell === '1' ? 'font-mono' : ''}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {block.table.caption && (
                  <div className="px-3.5 py-2 text-xs text-[#6b6256] dark:text-[#94A3B8] border-t border-[#ede6d7] dark:border-[#222B36] bg-[#f7f1e3] dark:bg-[#141A22]">
                    {block.table.caption}
                  </div>
                )}
              </div>
            )}

            {block.tip && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] dark:border-[#1E3A8A] bg-[#eef4fb] dark:bg-[#1E3A8A]/25 px-4 py-3 text-xs sm:text-sm text-[#1E3A8A] dark:text-[#BFDBFE]">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-[#1D4ED8] dark:text-[#60A5FA]" />
                <span>{block.tip}</span>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Interactive Solved Zad_MDL Examples */}
      {activeExample && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                  Rozwiązane przykłady z listy Zad_MDL (Dział {topic.number})
                </h2>
                <p className="text-xs text-[#6b6256] dark:text-[#94A3B8] mt-0.5">
                  Wybierz zadanie reprezentatywne i prześledź zapis krok po kroku
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#f5efe2] dark:bg-[#0F1419] border border-[#e4dccb] dark:border-[#242C37]">
              {topic.workedExamples.map((ex) => {
                const active = ex.id === activeExample.id;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setSelectedExampleId(ex.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#fffdf7] dark:bg-[#1E2631] text-[#1D4ED8] dark:text-[#60A5FA] shadow-xs'
                        : 'text-[#44403c] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white'
                    }`}
                  >
                    {ex.zadNumber}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                  {activeExample.zadNumber}: {activeExample.title}
                </h3>
                {activeExample.photoSrc && activeExample.photoLabel && (
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhoto({
                        src: activeExample.photoSrc!,
                        label: activeExample.photoLabel!,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] bg-[#fffdf7] dark:bg-[#161B22] text-[#1D4ED8] dark:text-[#60A5FA] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] transition-colors whitespace-nowrap shrink-0"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Pokaż zdjęcie z tablicy
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1] whitespace-pre-line">
                {activeExample.prompt}
              </p>
              {activeExample.formula && (
                <div className="mt-3 rounded-lg border border-[#e4dccb] dark:border-[#2A3341] bg-[#fffdf7] dark:bg-[#0F1419] px-3.5 py-2.5 font-mono text-sm text-[#1c1917] dark:text-[#F8FAFC] text-center overflow-x-auto">
                  {activeExample.formula}
                </div>
              )}
            </div>
          </div>

          <StepByStepViewer
            key={activeExample.id}
            steps={activeExample.steps}
            heading={`Krok po kroku — ${activeExample.zadNumber}`}
            finalSummary={activeExample.answer}
          />
        </section>
      )}

      {/* Photo Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#ede6d7] dark:border-[#242C37]">
              <div className="text-sm font-semibold text-[#1c1917] dark:text-[#F1F5F9] truncate">
                {activePhoto.label}
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Zamknij podgląd zdjęcia"
                className="p-1.5 rounded-lg text-[#6b6256] hover:text-[#1c1917] dark:text-[#94A3B8] dark:hover:text-white hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-4 bg-[#f5efe2] dark:bg-[#0F1419] flex justify-center">
              <Image
                src={activePhoto.src}
                alt={activePhoto.label}
                width={1200}
                height={1600}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
