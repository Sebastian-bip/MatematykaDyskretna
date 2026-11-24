import type { ExamSet } from './types';

export function formatExamSetAnswersTxt(set: ExamSet): string {
  const header = `Kolokwium ${set.year} — ${set.tabLabel}`;
  const separator = '='.repeat(header.length);
  const lines = set.questions.map(
    (q) => `${q.number}. ${q.correctLetters.join(', ')}`
  );
  return [header, separator, ...lines].join('\n');
}

export function formatAllExamSetsAnswersTxt(sets: ExamSet[]): string {
  return sets.map((set) => formatExamSetAnswersTxt(set)).join('\n\n') + '\n';
}
