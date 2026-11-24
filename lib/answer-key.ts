import type { ExamQuestion, ExamSet } from './types';

function cleanOptionText(text: string): string {
  return text.trim().replace(/[,;.]$/, '').trim();
}

export function getQuestionCorrectTexts(question: ExamQuestion): string[] {
  return question.correctLetters.map((letter) => {
    const matched = question.options.find((opt) => opt.letter === letter);
    return matched ? cleanOptionText(matched.text) : letter;
  });
}

export function formatQuestionAnswersBody(questions: ExamQuestion[]): string {
  return questions
    .map((q) => {
      const answers = getQuestionCorrectTexts(q);
      if (answers.length === 1) {
        return `${q.number}. ${answers[0]}`;
      }
      return `${q.number}.\n${answers.map((ans) => `   - ${ans}`).join('\n')}`;
    })
    .join('\n');
}

export function formatExamSetAnswersTxt(set: ExamSet): string {
  const header = `Kolokwium ${set.year} — ${set.tabLabel}`;
  const separator = '='.repeat(header.length);
  return [header, separator, formatQuestionAnswersBody(set.questions)].join('\n');
}

export function formatAllExamSetsAnswersTxt(sets: ExamSet[]): string {
  return sets.map((set) => formatExamSetAnswersTxt(set)).join('\n\n') + '\n';
}
