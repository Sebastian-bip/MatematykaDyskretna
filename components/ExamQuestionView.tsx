'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  X,
  XCircle,
} from 'lucide-react';
import { ExamQuestion } from '@/lib/types';
import { scoreExamQuestion } from '@/lib/logic-engine';
import StepByStepViewer from './StepByStepViewer';

interface ExamQuestionViewProps {
  setLabel: string;
  question: ExamQuestion;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  examMode: boolean;
  selectedAnswers: ('A' | 'B' | 'C' | 'D')[];
  isCheckedInExamMode: boolean;
  onToggleAnswer: (letter: 'A' | 'B' | 'C' | 'D') => void;
  onCheckAnswer: () => void;
  onResetAnswer: () => void;
}

export default function ExamQuestionView({
  setLabel,
  question,
  isCompleted,
  onToggleCompleted,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  examMode,
  selectedAnswers,
  isCheckedInExamMode,
  onToggleAnswer,
  onCheckAnswer,
  onResetAnswer,
}: ExamQuestionViewProps) {
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const showSolution = !examMode || isCheckedInExamMode;
  const scoreResult = scoreExamQuestion(selectedAnswers, question.correctLetters);

  return (
    <div className="space-y-5">
      {/* Main Task Card */}
      <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-7">
        {/* Top Metadata & Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#6b6256] dark:text-[#94A3B8]">
            <span className="font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
              {setLabel.replace(/\s*\([^)]*\)/, '')}
            </span>
            <span aria-hidden="true">·</span>
            <span>Zad. {question.number}</span>
            <span aria-hidden="true">·</span>
            <span>{question.category}</span>
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
              {isCompleted ? 'Zrobione' : 'Oznacz jako zrobione'}
            </button>

            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Poprzednie
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            >
              Następne
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC] text-balance">
          Zadanie {question.number}. {question.title}
        </h1>

        {/* Prompt Inset Box */}
        <div className="mt-4 rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4 sm:p-5">
          {question.reportQuote && (
            <blockquote className="mb-3 rounded-lg border border-[#e4dccb] dark:border-[#2A3341] bg-[#fffdf7] dark:bg-[#0F1419] p-3.5 text-sm leading-relaxed text-[#292524] dark:text-[#E2E8F0] italic">
              „{question.reportQuote}”
            </blockquote>
          )}

          <p className="text-sm sm:text-base leading-relaxed text-[#1c1917] dark:text-[#E2E8F0]">
            {question.prompt}
          </p>

          {question.formula && (
            <div className="mt-3 rounded-lg border border-[#e4dccb] dark:border-[#2A3341] bg-[#fffdf7] dark:bg-[#0F1419] px-4 py-3 font-mono text-sm sm:text-base font-medium text-[#1c1917] dark:text-[#F8FAFC] overflow-x-auto text-center">
              <span className="whitespace-nowrap">{question.formula}</span>
            </div>
          )}
        </div>

        {/* Answer Options A–D */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
              {examMode
                ? 'Tryb sprawdzianu — zaznacz 1 lub 2 odpowiedzi (+1 pkt poprawna, −1 pkt błędna, 0 pkt brak):'
                : 'Warianty odpowiedzi z arkusza:'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {question.options.map((opt) => {
              const isCorrect = question.correctLetters.includes(opt.letter);
              const isSelected = selectedAnswers.includes(opt.letter);

              let cardClass =
                'border-[#e4dccb] dark:border-[#2B3442] bg-[#fffdf7] dark:bg-[#131922] text-[#1c1917] dark:text-[#E2E8F0]';

              if (!examMode) {
                if (isCorrect) {
                  cardClass =
                    'border-[#10B981] bg-[#ebf7f0] dark:border-[#059669] dark:bg-[#064E3B]/35 text-[#065F46] dark:text-[#A7F3D0]';
                }
              } else if (isCheckedInExamMode) {
                if (isCorrect && isSelected) {
                  cardClass =
                    'border-[#10B981] bg-[#ebf7f0] dark:border-[#059669] dark:bg-[#064E3B]/35 text-[#065F46] dark:text-[#A7F3D0]';
                } else if (isCorrect && !isSelected) {
                  cardClass =
                    'border-[#10B981] border-dashed bg-[#ebf7f0]/60 dark:border-[#059669] dark:bg-[#064E3B]/20 text-[#065F46] dark:text-[#A7F3D0]';
                } else if (!isCorrect && isSelected) {
                  cardClass =
                    'border-[#DC2626] bg-[#FEF2F2] dark:border-[#EF4444] dark:bg-[#7F1D1D]/35 text-[#991B1B] dark:text-[#FCA5A5]';
                }
              } else if (isSelected) {
                cardClass =
                  'border-[#1D4ED8] bg-[#eef4fb] dark:border-[#3B82F6] dark:bg-[#1E3A8A]/35 text-[#1E3A8A] dark:text-[#BFDBFE]';
              }

              const interactive = examMode && !isCheckedInExamMode;

              return (
                <button
                  key={opt.letter}
                  type="button"
                  disabled={!interactive}
                  onClick={() => interactive && onToggleAnswer(opt.letter)}
                  aria-pressed={examMode ? isSelected : undefined}
                  className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${cardClass} ${
                    interactive
                      ? 'cursor-pointer hover:border-[#1D4ED8] dark:hover:border-[#60A5FA]'
                      : 'cursor-default'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="font-mono text-sm font-bold shrink-0">
                      {opt.letter}.
                    </span>
                    <span
                      className={`text-sm leading-snug break-words ${
                        opt.isMath ? 'font-mono' : ''
                      }`}
                    >
                      {opt.text}
                    </span>
                  </div>

                  <span className="shrink-0 mt-0.5">
                    {!examMode && isCorrect && (
                      <CheckCircle2
                        className="w-4 h-4 text-[#059669] dark:text-[#34D399]"
                        aria-label="Poprawna odpowiedź"
                      />
                    )}
                    {examMode && !isCheckedInExamMode && isSelected && (
                      <Check className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA]" />
                    )}
                    {examMode && isCheckedInExamMode && isCorrect && (
                      <CheckCircle2
                        className="w-4 h-4 text-[#059669] dark:text-[#34D399]"
                        aria-label="Poprawna odpowiedź"
                      />
                    )}
                    {examMode && isCheckedInExamMode && !isCorrect && isSelected && (
                      <XCircle
                        className="w-4 h-4 text-[#DC2626] dark:text-[#F87171]"
                        aria-label="Błędna odpowiedź"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Row: Correct Answer / Exam Check + Original Exam Photo Button */}
        <div className="mt-5 pt-4 border-t border-[#ede6d7] dark:border-[#242C37] flex flex-wrap items-center justify-between gap-3">
          {!examMode ? (
            <div className="text-sm text-[#44403c] dark:text-[#CBD5E1]">
              Poprawna odpowiedź:{' '}
              <span className="font-mono font-bold text-[#059669] dark:text-[#34D399]">
                {question.correctLetters.join(', ')}
              </span>
              <span className="text-xs text-[#6b6256] dark:text-[#94A3B8] ml-2">
                (
                {question.correctLetters.length === 1
                  ? '1 poprawna'
                  : `${question.correctLetters.length} poprawne`}
                )
              </span>
            </div>
          ) : !isCheckedInExamMode ? (
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onCheckAnswer}
                className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors whitespace-nowrap shrink-0"
              >
                Sprawdź odpowiedź
              </button>
              <span className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                {selectedAnswers.length === 0
                  ? 'Zostawienie pustej kratki daje 0 pkt (brak punktów ujemnych)'
                  : `Zaznaczono: ${selectedAnswers.join(', ')}`}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`text-sm font-semibold tabular-nums ${
                  scoreResult.points > 0
                    ? 'text-[#059669] dark:text-[#34D399]'
                    : scoreResult.points < 0
                    ? 'text-[#DC2626] dark:text-[#F87171]'
                    : 'text-[#6b6256] dark:text-[#94A3B8]'
                }`}
              >
                Wynik za zadanie: {scoreResult.points > 0 ? `+${scoreResult.points}` : scoreResult.points} pkt
              </span>
              <span className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                Poprawne: <strong className="font-mono">{question.correctLetters.join(', ')}</strong>
              </span>
              <button
                type="button"
                onClick={onResetAnswer}
                className="text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:underline whitespace-nowrap shrink-0"
              >
                Spróbuj ponownie
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setPhotoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] text-[#1D4ED8] dark:text-[#60A5FA] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] transition-colors whitespace-nowrap shrink-0"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Pokaż zdjęcie arkusza
          </button>
        </div>
      </section>

      {/* "Co jest czym w tym zadaniu?" Glossary Card (matching reference site!) */}
      {showSolution ? (
        <>
          <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#1c1917] dark:text-[#F1F5F9] mb-4">
              <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA] shrink-0" />
              Co jest czym w tym zadaniu?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.glossary.map((item, idx) => (
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
          </section>

          {/* Step-by-Step Solution Card (keyed by question.id so it ALWAYS opens at Step 1!) */}
          <StepByStepViewer
            key={question.id}
            steps={question.steps}
            finalSummary={question.finalSummary}
          />
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#131921] p-6 text-center">
          <p className="text-sm font-medium text-[#44403c] dark:text-[#CBD5E1]">
            Tryb sprawdzianu jest aktywny — słowniczek i rozwiązanie krok po kroku są ukryte.
          </p>
          <p className="text-xs text-[#6b6256] dark:text-[#94A3B8] mt-1">
            Zaznacz swoje odpowiedzi powyżej i kliknij „Sprawdź odpowiedź”, aby odblokować pełny zapis krok po kroku.
          </p>
        </section>
      )}

      {/* Original Exam Sheet Lightbox Modal */}
      {photoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={question.photoLabel}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setPhotoModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#ede6d7] dark:border-[#242C37]">
              <div className="text-sm font-semibold text-[#1c1917] dark:text-[#F1F5F9] truncate">
                {question.photoLabel}
              </div>
              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                aria-label="Zamknij podgląd zdjęcia arkusza"
                className="p-1.5 rounded-lg text-[#6b6256] hover:text-[#1c1917] dark:text-[#94A3B8] dark:hover:text-white hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-4 bg-[#f5efe2] dark:bg-[#0F1419] flex justify-center">
              <Image
                src={question.photoSrc}
                alt={question.photoLabel}
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
