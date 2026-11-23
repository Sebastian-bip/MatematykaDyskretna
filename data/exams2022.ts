import { ExamSet } from '@/lib/types';
import { EXAM_SETS_2022_PART_A } from './exams2022-a';
import { EXAM_SETS_2022_PART_B } from './exams2022-b';
import { EXAM_SETS_2022_PART_C } from './exams2022-c';

export const EXAM_SETS_2022: ExamSet[] = [
  ...EXAM_SETS_2022_PART_A,
  ...EXAM_SETS_2022_PART_B,
  ...EXAM_SETS_2022_PART_C,
];
