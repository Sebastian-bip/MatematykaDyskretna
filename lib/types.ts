export type MainTabId = 'tematy' | 'zestaw-a' | 'zestaw-b' | 'zestaw-c' | 'narzedzia';

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface TableBlock {
  headers: string[];
  rows: string[][];
  highlightLastCol?: boolean;
  caption?: string;
}

export interface SolutionStep {
  title: string;
  explanation: string;
  formula?: string;
  note?: string;
  table?: TableBlock;
  treeFormula?: string; // Optional propositional formula to render SVG structure tree
}

export interface ExamOption {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  isMath?: boolean;
}

export interface ExamQuestion {
  id: string;
  number: number;
  title: string;
  category: string;
  prompt: string;
  formula?: string;
  reportQuote?: string;
  options: ExamOption[];
  correctLetters: ('A' | 'B' | 'C' | 'D')[];
  photoSrc: string;
  photoLabel: string;
  glossary: GlossaryItem[];
  steps: SolutionStep[];
  finalSummary: string;
}

export interface ExamSet {
  id: 'zestaw-a' | 'zestaw-b' | 'zestaw-c';
  shortLabel: string;
  title: string;
  subtitle: string;
  metaLine: string;
  description: string;
  questions: ExamQuestion[];
}

export interface WorkedExample {
  id: string;
  zadNumber: string; // e.g. "Zad. 1.27"
  title: string;
  prompt: string;
  formula?: string;
  glossary?: GlossaryItem[];
  steps: SolutionStep[];
  answer: string;
  photoSrc?: string;
  photoLabel?: string;
}

export interface TheoryBlock {
  code: string; // e.g. "T-1.1 – T-1.4"
  title: string;
  summary: string;
  bullets?: string[];
  formulas?: { label: string; expr: string; note?: string }[];
  table?: TableBlock;
  tip?: string;
  treeFormula?: string;
  photoSrc?: string;
  photoLabel?: string;
}

export interface TopicUnit {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  sourceRef: string;
  overview: string;
  examFrequency: string;
  keyTakeaways: GlossaryItem[];
  theoryBlocks: TheoryBlock[];
  workedExamples: WorkedExample[];
}
