'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  FileText,
  Network,
  Printer,
  XCircle,
} from 'lucide-react';
import {
  analyzeFormula,
  analyzeRelation,
  FormulaAnalysis,
  RelationAnalysis,
} from '@/lib/logic-engine';
import FormulaTreeSvg from './FormulaTreeSvg';

export type ToolSubTab = 'kalkulator' | 'relacje' | 'sciaga';

interface ToolsAndCheatSheetProps {
  activeTool: ToolSubTab;
  onSelectTool: (tool: ToolSubTab) => void;
}

const LOGIC_PRESETS: { label: string; mode: 'infix' | 'polish'; value: string }[] = [
  {
    label: 'Zestaw A · Zad. 1',
    mode: 'infix',
    value: '(r ∨ p ∨ q → ¬p) → ¬p ∧ (q ∨ r)',
  },
  {
    label: 'Zestaw A · Zad. 4',
    mode: 'infix',
    value: '(p ∨ ¬q) ↔ ¬(¬p ∧ q)',
  },
  {
    label: 'Zestaw A · Zad. 5 (PN)',
    mode: 'polish',
    value: '→ ∨ → ¬p q ↔ q r ∧ p q',
  },
  {
    label: 'Zestaw B · Zad. 1',
    mode: 'infix',
    value: '((p → q) → r) ∨ (r → p)',
  },
  {
    label: 'Wykład 1 · Drzewo',
    mode: 'infix',
    value: '(q ↔ p) → (q → ¬(p ∧ q))',
  },
];

const QUICK_SYMBOLS = ['¬', '∧', '∨', '→', '↔', '(', ')', '⊥'];

interface RelationPreset {
  id: string;
  label: string;
  description: string;
  elements: string[];
  predicate: (x: number, y: number) => boolean;
}

const RELATION_PRESETS: RelationPreset[] = [
  {
    id: 'a10',
    label: 'Kolokwium A.10: x² < y',
    description: 'Zbiór X = {1, …, 10}, relacja R(x, y) ⇔ x² < y',
    elements: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    predicate: (x, y) => x * x < y,
  },
  {
    id: 'b9',
    label: 'Kolokwium B.9: x + y = 6',
    description: 'Zbiór X = {1, …, 6}, relacja R(x, y) ⇔ x + y = 6',
    elements: ['1', '2', '3', '4', '5', '6'],
    predicate: (x, y) => x + y === 6,
  },
  {
    id: 'b10',
    label: 'Kolokwium B.10: x² ≥ y',
    description: 'Zbiór X = {1, …, 10}, relacja R(x, y) ⇔ x² ≥ y',
    elements: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    predicate: (x, y) => x * x >= y,
  },
  {
    id: 'c10',
    label: 'Kolokwium C.10: x | y',
    description: 'Zbiór X = {1, …, 10}, relacja R(x, y) ⇔ x jest dzielnikiem y',
    elements: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    predicate: (x, y) => y % x === 0,
  },
  {
    id: 'a9',
    label: 'Kolokwium A.9: 2 | (x − y)',
    description: 'Zbiór X = {1, …, 6}, relacja R(x, y) ⇔ x − y jest podzielne przez 2',
    elements: ['1', '2', '3', '4', '5', '6'],
    predicate: (x, y) => (x - y) % 2 === 0,
  },
];

function buildPairsFromPreset(preset: RelationPreset): string {
  const pairs: string[] = [];
  for (const sx of preset.elements) {
    for (const sy of preset.elements) {
      if (preset.predicate(Number(sx), Number(sy))) {
        pairs.push(`(${sx},${sy})`);
      }
    }
  }
  return pairs.join(', ');
}

function parseCustomRelation(
  elementsInput: string,
  pairsInput: string
): { analysis: RelationAnalysis | null; error: string | null } {
  const elements = elementsInput
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const uniqueElements = Array.from(new Set(elements));
  if (uniqueElements.length === 0) {
    return { analysis: null, error: 'Podaj co najmniej jeden element zbioru X (np. 1, 2, 3, 4).' };
  }
  if (uniqueElements.length > 20) {
    return {
      analysis: null,
      error: 'Zbiór X może zawierać maksymalnie 20 elementów w trybie interaktywnym.',
    };
  }

  const trimmedPairs = pairsInput.trim();
  const pairs: [string, string][] = [];
  if (trimmedPairs.length > 0) {
    const regex = /\(\s*([^,()\s]+)\s*,\s*([^,()\s]+)\s*\)/g;
    let match: RegExpExecArray | null;
    let consumed = '';
    while ((match = regex.exec(trimmedPairs)) !== null) {
      const a = match[1];
      const b = match[2];
      if (!uniqueElements.includes(a) || !uniqueElements.includes(b)) {
        return {
          analysis: null,
          error: `Para (${a}, ${b}) zawiera element spoza zbioru X = {${uniqueElements.join(', ')}}.`,
        };
      }
      pairs.push([a, b]);
      consumed += match[0];
    }
    const stripped = trimmedPairs.replace(/\(\s*[^,()\s]+\s*,\s*[^,()\s]+\s*\)/g, '').replace(/[,;\s]/g, '');
    if (stripped.length > 0 || (pairs.length === 0 && consumed.length === 0)) {
      return {
        analysis: null,
        error: 'Niepoprawny format par. Wpisz pary w formacie: (1,2), (2,3), (1,3).',
      };
    }
  }

  return { analysis: analyzeRelation(uniqueElements, pairs), error: null };
}

export default function ToolsAndCheatSheet({
  activeTool,
  onSelectTool,
}: ToolsAndCheatSheetProps) {
  // Logic Calculator State
  const [logicMode, setLogicMode] = useState<'infix' | 'polish'>('infix');
  const [formulaInput, setFormulaInput] = useState<string>(
    '(p ∨ ¬q) ↔ ¬(¬p ∧ q)'
  );

  const logicResult = useMemo<{
    analysis: FormulaAnalysis | null;
    error: string | null;
  }>(() => {
    try {
      const analysis = analyzeFormula(formulaInput, logicMode);
      return { analysis, error: null };
    } catch (err) {
      return {
        analysis: null,
        error: err instanceof Error ? err.message : 'Błąd parsowania formuły.',
      };
    }
  }, [formulaInput, logicMode]);

  // Relation Analyzer State
  const [activeRelPreset, setActiveRelPreset] = useState<string>('a10');
  const [elementsInput, setElementsInput] = useState<string>(
    RELATION_PRESETS[0].elements.join(', ')
  );
  const [pairsInput, setPairsInput] = useState<string>(() =>
    buildPairsFromPreset(RELATION_PRESETS[0])
  );

  const relationResult = useMemo(
    () => parseCustomRelation(elementsInput, pairsInput),
    [elementsInput, pairsInput]
  );

  const applyRelationPreset = (preset: RelationPreset) => {
    setActiveRelPreset(preset.id);
    setElementsInput(preset.elements.join(', '));
    setPairsInput(buildPairsFromPreset(preset));
  };

  const classificationLabel = (c: FormulaAnalysis['classification']) => {
    if (c === 'tautologia') {
      return {
        title: 'Tautologia (i formuła spełnialna)',
        desc: 'Wartość logiczna wynosi 1 dla każdego wartościowania zmiennych.',
        tone: 'text-[#059669] dark:text-[#34D399]',
      };
    }
    if (c === 'sprzeczna') {
      return {
        title: 'Formuła sprzeczna (kontrtautologia)',
        desc: 'Wartość logiczna wynosi 0 dla każdego wartościowania zmiennych.',
        tone: 'text-[#DC2626] dark:text-[#F87171]',
      };
    }
    return {
      title: 'Spełnialna i nie jest tautologią',
      desc: 'W tabeli prawdy występują zarówno jedynki (1), jak i zera (0).',
      tone: 'text-[#1D4ED8] dark:text-[#60A5FA]',
    };
  };

  return (
    <div className="space-y-5">
      {/* Sub-navigation Switcher (hidden on print) */}
      <div className="no-print rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC]">
              Narzędzia i legalna ściąga A4
            </h1>
            <p className="text-xs sm:text-sm text-[#6b6256] dark:text-[#94A3B8] mt-0.5">
              Sprawdź własne formuły, przetestuj własności relacji lub wydrukuj wzór ściągi na kolokwium.
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Wybór narzędzia"
          className="mt-4 flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#f5efe2] dark:bg-[#0F1419] border border-[#e4dccb] dark:border-[#242C37]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTool === 'kalkulator'}
            onClick={() => onSelectTool('kalkulator')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border whitespace-nowrap shrink-0 ${
              activeTool === 'kalkulator'
                ? 'bg-[#fffdf7] border-[#d6ccb8] text-[#1D4ED8] dark:bg-[#1E3A8A]/40 dark:border-[#3B82F6] dark:text-[#93C5FD] shadow-xs'
                : 'border-transparent text-[#44403c] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Kalkulator logiki i notacji polskiej
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTool === 'relacje'}
            onClick={() => onSelectTool('relacje')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border whitespace-nowrap shrink-0 ${
              activeTool === 'relacje'
                ? 'bg-[#fffdf7] border-[#d6ccb8] text-[#1D4ED8] dark:bg-[#1E3A8A]/40 dark:border-[#3B82F6] dark:text-[#93C5FD] shadow-xs'
                : 'border-transparent text-[#44403c] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white'
            }`}
          >
            <Network className="w-4 h-4" />
            Analizator relacji (7 własności)
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTool === 'sciaga'}
            onClick={() => onSelectTool('sciaga')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border whitespace-nowrap shrink-0 ${
              activeTool === 'sciaga'
                ? 'bg-[#fffdf7] border-[#d6ccb8] text-[#1D4ED8] dark:bg-[#1E3A8A]/40 dark:border-[#3B82F6] dark:text-[#93C5FD] shadow-xs'
                : 'border-transparent text-[#44403c] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Legalna ściąga A4 i zasady
          </button>
        </div>
      </div>

      {/* ================================================================
          TOOL 1: LOGIC & POLISH NOTATION CALCULATOR
         ================================================================ */}
      {activeTool === 'kalkulator' && (
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-base sm:text-lg font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                Wpisz formułę zdaniową
              </h2>

              <div className="inline-flex rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#0F1419] p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    if (logicMode !== 'infix') {
                      setLogicMode('infix');
                      if (logicResult.analysis) {
                        setFormulaInput(logicResult.analysis.infix);
                      }
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    logicMode === 'infix'
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-[#44403c] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white'
                  }`}
                >
                  Zapis klasyczny
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (logicMode !== 'polish') {
                      setLogicMode('polish');
                      if (logicResult.analysis) {
                        setFormulaInput(logicResult.analysis.polishSpaced);
                      }
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    logicMode === 'polish'
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-[#44403c] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white'
                  }`}
                >
                  Notacja polska
                </button>
              </div>
            </div>

            <label
              htmlFor="logic-formula-input"
              className="block text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] mb-1.5"
            >
              {logicMode === 'infix'
                ? 'Akceptuje symbole (¬, ∧, ∨, →, ↔, ⊥) oraz skróty ASCII (!, &, |, ->, <->)'
                : 'Notacja polska (beznawiasowa), np. → ∨ → ¬p q ↔ q r ∧ p q'}
            </label>

            <input
              id="logic-formula-input"
              type="text"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              placeholder={
                logicMode === 'infix'
                  ? 'np. (p ∨ ¬q) ↔ ¬(¬p ∧ q)'
                  : 'np. ↔ ∨ p ¬q ¬ ∧ ¬p q'
              }
              className="w-full rounded-xl border border-[#d6ccb8] dark:border-[#334155] bg-[#f7f1e3] dark:bg-[#0F1419] px-4 py-3 font-mono text-sm sm:text-base text-[#1c1917] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#60A5FA]"
            />

            {/* Quick Symbol Insert Bar */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#6b6256] dark:text-[#94A3B8] mr-1">
                Wstaw symbol:
              </span>
              {QUICK_SYMBOLS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => setFormulaInput((prev) => `${prev}${sym}`)}
                  className="px-2.5 py-1 font-mono text-xs font-semibold rounded-md border border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#1c1917] dark:text-[#E2E8F0] hover:border-[#1D4ED8] dark:hover:border-[#60A5FA] transition-colors"
                >
                  {sym}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFormulaInput('')}
                className="ml-auto text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white transition-colors"
              >
                Wyczyść
              </button>
            </div>

            {/* Presets from Kolokwium */}
            <div className="mt-4 pt-4 border-t border-[#ede6d7] dark:border-[#242C37]">
              <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] mb-2">
                Przykłady z kolokwium 2025/26 i wykładów:
              </div>
              <div className="flex flex-wrap gap-2">
                {LOGIC_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setLogicMode(preset.mode);
                      setFormulaInput(preset.value);
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] bg-[#fffdf7] dark:bg-[#131922] text-[#44403c] dark:text-[#CBD5E1] hover:border-[#1D4ED8] hover:text-[#1D4ED8] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Error Display */}
          {logicResult.error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-[#FCA5A5] dark:border-[#991B1B] bg-[#FEF2F2] dark:bg-[#7F1D1D]/25 p-4 text-sm text-[#991B1B] dark:text-[#FCA5A5]"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Nie można przeanalizować formuły</div>
                <p className="mt-0.5 text-xs sm:text-sm">{logicResult.error}</p>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {logicResult.analysis && (
            <div className="space-y-5">
              {/* Summary Metrics & Translations */}
              <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6">
                {(() => {
                  const info = classificationLabel(logicResult.analysis.classification);
                  const ones = logicResult.analysis.rows.filter((r) => r.result === 1).length;
                  const total = logicResult.analysis.rows.length;
                  return (
                    <div className="pb-4 border-b border-[#ede6d7] dark:border-[#242C37]">
                      <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                        Klasyfikacja semantyczna ({ones} / {total} wierszy daje wartość 1)
                      </div>
                      <div className={`mt-1 text-lg sm:text-xl font-bold ${info.tone}`}>
                        {info.title}
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-[#44403c] dark:text-[#CBD5E1]">
                        {info.desc}
                      </p>
                    </div>
                  );
                })()}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                    <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                      Notacja polska (zapis zwarty · jak na arkuszu)
                    </div>
                    <div className="mt-1.5 font-mono text-sm sm:text-base font-semibold text-[#1c1917] dark:text-[#F8FAFC] overflow-x-auto">
                      {logicResult.analysis.polish}
                    </div>
                    <div className="mt-1 font-mono text-xs text-[#6b6256] dark:text-[#94A3B8] overflow-x-auto">
                      Rozstrzelona: {logicResult.analysis.polishSpaced}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                    <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                      Zapis klasyczny (pełne nawiasowanie)
                    </div>
                    <div className="mt-1.5 font-mono text-sm sm:text-base font-semibold text-[#1c1917] dark:text-[#F8FAFC] overflow-x-auto">
                      {logicResult.analysis.infix}
                    </div>
                    <div className="mt-1 text-xs text-[#6b6256] dark:text-[#94A3B8]">
                      Zmienne: {logicResult.analysis.variables.join(', ') || 'brak (stała)'}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                    <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                      Kanoniczna DPN (dysjunkcyjna postać normalna)
                    </div>
                    <div className="mt-1.5 font-mono text-xs sm:text-sm text-[#1c1917] dark:text-[#F1F5F9] overflow-x-auto">
                      {logicResult.analysis.dnf}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                    <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                      Kanoniczna KPN (koniunkcyjna postać normalna)
                    </div>
                    <div className="mt-1.5 font-mono text-xs sm:text-sm text-[#1c1917] dark:text-[#F1F5F9] overflow-x-auto">
                      {logicResult.analysis.cnf}
                    </div>
                  </div>
                </div>

                {/* Live SVG Structure Tree */}
                <FormulaTreeSvg ast={logicResult.analysis.ast} />
              </section>

              {/* Truth Table */}
              <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6">
                <h3 className="text-base font-bold text-[#1c1917] dark:text-[#F8FAFC] mb-3">
                  Pełna tabela prawdziwości ({logicResult.analysis.rows.length} wartościowań)
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[#e4dccb] dark:border-[#2B3544]">
                  <table className="w-full text-center border-collapse font-mono text-xs sm:text-sm tabular-nums">
                    <thead>
                      <tr className="border-b border-[#e4dccb] dark:border-[#2B333E] bg-[#f5efe2] dark:bg-[#18202B]">
                        {logicResult.analysis.variables.map((v) => (
                          <th
                            key={v}
                            className="px-3 py-2.5 font-semibold text-[#1c1917] dark:text-[#F1F5F9]"
                          >
                            {v}
                          </th>
                        ))}
                        <th className="px-4 py-2.5 font-semibold text-[#1D4ED8] dark:text-[#60A5FA] bg-[#eef4fb] dark:bg-[#1E3A8A]/30">
                          Wynik φ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {logicResult.analysis.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b last:border-b-0 border-[#ede6d7] dark:border-[#222B36]"
                        >
                          {logicResult.analysis!.variables.map((v) => (
                            <td
                              key={v}
                              className="px-3 py-2 text-[#44403c] dark:text-[#CBD5E1]"
                            >
                              {row.valuation[v]}
                            </td>
                          ))}
                          <td
                            className={`px-4 py-2 font-bold ${
                              row.result === 1
                                ? 'bg-[#ebf7f0] dark:bg-[#064E3B]/35 text-[#059669] dark:text-[#34D399]'
                                : 'bg-[#FEF2F2] dark:bg-[#7F1D1D]/25 text-[#DC2626] dark:text-[#F87171]'
                            }`}
                          >
                            {row.result}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </div>
      )}

      {/* ================================================================
          TOOL 2: 7-PROPERTY RELATION ANALYZER
         ================================================================ */}
      {activeTool === 'relacje' && (
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-[#1c1917] dark:text-[#F8FAFC]">
              Sprawdź 7 własności relacji z kontrprzykładami
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#6b6256] dark:text-[#94A3B8]">
              Wybierz gotową relację z kolokwium 2025/26 lub edytuj zbiór X i listę par relacji R.
            </p>

            {/* Presets */}
            <div className="mt-4 flex flex-wrap gap-2">
              {RELATION_PRESETS.map((preset) => {
                const isActive = activeRelPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyRelationPreset(preset)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'border-[#1D4ED8] bg-[#eef4fb] text-[#1D4ED8] dark:border-[#60A5FA] dark:bg-[#1E3A8A]/35 dark:text-[#BFDBFE]'
                        : 'border-[#d6ccb8] dark:border-[#2F3946] bg-[#fffdf7] dark:bg-[#131922] text-[#44403c] dark:text-[#CBD5E1] hover:border-[#1D4ED8]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="rel-elements-input"
                  className="block text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] mb-1.5"
                >
                  Zbiór bazowy X (elementy rozdzielone przecinkami)
                </label>
                <input
                  id="rel-elements-input"
                  type="text"
                  value={elementsInput}
                  onChange={(e) => {
                    setActiveRelPreset('custom');
                    setElementsInput(e.target.value);
                  }}
                  className="w-full rounded-xl border border-[#d6ccb8] dark:border-[#334155] bg-[#f7f1e3] dark:bg-[#0F1419] px-3.5 py-2.5 font-mono text-sm text-[#1c1917] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>

              <div>
                <label
                  htmlFor="rel-pairs-input"
                  className="block text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] mb-1.5"
                >
                  Pary należące do relacji R (format: (x,y), np. (1,2), (2,4))
                </label>
                <textarea
                  id="rel-pairs-input"
                  rows={3}
                  value={pairsInput}
                  onChange={(e) => {
                    setActiveRelPreset('custom');
                    setPairsInput(e.target.value);
                  }}
                  className="w-full rounded-xl border border-[#d6ccb8] dark:border-[#334155] bg-[#f7f1e3] dark:bg-[#0F1419] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#1c1917] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>
            </div>
          </section>

          {relationResult.error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-[#FCA5A5] dark:border-[#991B1B] bg-[#FEF2F2] dark:bg-[#7F1D1D]/25 p-4 text-sm text-[#991B1B] dark:text-[#FCA5A5]"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Błąd danych wejściowych relacji</div>
                <p className="mt-0.5 text-xs sm:text-sm">{relationResult.error}</p>
              </div>
            </div>
          )}

          {relationResult.analysis && (
            <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6 space-y-5">
              {/* High-level Classification Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                  <div className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                    Relacja równoważności
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-bold">
                    {relationResult.analysis.isEquivalence ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        <span className="text-[#059669] dark:text-[#34D399]">TAK</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-[#6b6256]" />
                        <span className="text-[#44403c] dark:text-[#94A3B8]">NIE</span>
                      </>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-[#6b6256] dark:text-[#94A3B8]">
                    Zwrotna + symetryczna + przechodnia
                  </div>
                </div>

                <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                  <div className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                    Porządek częściowy
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-bold">
                    {relationResult.analysis.isPartialOrder ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        <span className="text-[#059669] dark:text-[#34D399]">TAK</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-[#6b6256]" />
                        <span className="text-[#44403c] dark:text-[#94A3B8]">NIE</span>
                      </>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-[#6b6256] dark:text-[#94A3B8]">
                    Zwrotna + antysymetryczna + przechodnia
                  </div>
                </div>

                <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                  <div className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                    Porządek liniowy
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-bold">
                    {relationResult.analysis.isLinearOrder ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        <span className="text-[#059669] dark:text-[#34D399]">TAK</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-[#6b6256]" />
                        <span className="text-[#44403c] dark:text-[#94A3B8]">NIE</span>
                      </>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-[#6b6256] dark:text-[#94A3B8]">
                    Porządek częściowy + spójna
                  </div>
                </div>
              </div>

              {/* 7-Property Detailed Table */}
              <div>
                <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] mb-2">
                  Analiza dla |X| = {relationResult.analysis.elements.length}, |R| ={' '}
                  {relationResult.analysis.pairs.length} par
                </div>
                <div className="overflow-x-auto rounded-xl border border-[#e4dccb] dark:border-[#2B3544]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#e4dccb] dark:border-[#2B333E] bg-[#f5efe2] dark:bg-[#18202B]">
                        <th className="px-3.5 py-2.5 font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                          Własność
                        </th>
                        <th className="px-3.5 py-2.5 font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                          Definicja
                        </th>
                        <th className="px-3.5 py-2.5 font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                          Wynik
                        </th>
                        <th className="px-3.5 py-2.5 font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                          Uzasadnienie / kontrprzykład
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {relationResult.analysis.properties.map((prop) => (
                        <tr
                          key={prop.key}
                          className="border-b last:border-b-0 border-[#ede6d7] dark:border-[#222B36]"
                        >
                          <td className="px-3.5 py-2.5 font-semibold text-[#1c1917] dark:text-[#F1F5F9] whitespace-nowrap">
                            {prop.label}
                          </td>
                          <td className="px-3.5 py-2.5 font-mono text-xs text-[#44403c] dark:text-[#CBD5E1] whitespace-nowrap">
                            {prop.definition}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold whitespace-nowrap">
                            {prop.holds ? (
                              <span className="text-[#059669] dark:text-[#34D399]">TAK</span>
                            ) : (
                              <span className="text-[#DC2626] dark:text-[#F87171]">NIE</span>
                            )}
                          </td>
                          <td className="px-3.5 py-2.5 text-[#44403c] dark:text-[#CBD5E1]">
                            {prop.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ================================================================
          TOOL 3: PRINTABLE LEGALNA ŚCIĄGA A4 + EXAM RULES
         ================================================================ */}
      {activeTool === 'sciaga' && (
        <div className="space-y-5">
          {/* Print CTA & Official Rules Card */}
          <section className="no-print rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-base sm:text-lg font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                  Oficjalne zasady kolokwium (WFiIS UŁ)
                </h2>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                  Na kolokwium wolno korzystać z jednej strony A4 <strong>własnoręcznie zapisanych notatek</strong> (bez kserokopii i wydruków). Poniższa ściąga zbiera komplet wzorów z działów 1–4 do przepisania na własną kartkę A4 lub wydrukowania do powtórki.
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Printer className="w-4 h-4" />
                Drukuj ściągę (A4)
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                <div className="font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                  Przebieg i wymagania (Zasady pisania kolokwium)
                </div>
                <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[#44403c] dark:text-[#CBD5E1]">
                  <li>12 zadań testowych wielokrotnego wyboru · czas trwania: 75 minut.</li>
                  <li>Obowiązkowa legitymacja studencka (lub dowód tożsamości) na ławce.</li>
                  <li>Legalna ściąga: max 1 strona A4 zapisana ręcznie (brak urządzeń elektronicznych).</li>
                  <li>Zakaz opuszczania sali przed oddaniem arkusza.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4">
                <div className="font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                  Punktacja i progi ocen (2026/27)
                </div>
                <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[#44403c] dark:text-[#CBD5E1] tabular-nums">
                  <li>W każdym zadaniu poprawne są 1 lub 2 odpowiedzi (nigdy 0 ani 4).</li>
                  <li>+1 pkt za każdą poprawną · −1 pkt za błędną · 0 pkt za pustą kratkę.</li>
                  <li>Progi: 9–10 → 3 · 11–12 → 3+ · 13–14 → 4 · 15–16 → 4+ · 17–18 → 5.</li>
                  <li>Strategia: jeśli nie masz pewności co do drugiej odpowiedzi, zostaw kratkę pustą!</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Printable A4 Sheet Container */}
          <section className="print-sheet rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-7">
            <div className="flex items-baseline justify-between border-b border-[#e4dccb] dark:border-[#2B333E] pb-3 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                  Ściąga A4 — Matematyka dyskretna z logiką (Działy 1–4)
                </h2>
                <p className="text-xs text-[#6b6256] dark:text-[#94A3B8]">
                  I rok Informatyki · WFiIS UŁ · Konwencja kursu: ℕ = {'{1, 2, 3, …}'} (bez zera)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              {/* Block 1 */}
              <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4 space-y-2">
                <h3 className="font-bold text-sm text-[#1D4ED8] dark:text-[#60A5FA]">
                  1. Rachunek zdań (Zadania 1–7)
                </h3>
                <div>
                  <strong>Priorytety:</strong> <span className="font-mono">¬ &gt; ∧, ∨ &gt; →, ↔</span>
                </div>
                <div className="font-mono space-y-0.5 text-[#1c1917] dark:text-[#E2E8F0]">
                  <div>p → q ≡ ¬p ∨ q &nbsp;(fałsz TYLKO dla 1 → 0)</div>
                  <div>p ↔ q ≡ (p → q) ∧ (q → p) &nbsp;(prawda gdy p = q)</div>
                  <div>¬(p ∧ q) ≡ ¬p ∨ ¬q &nbsp;·&nbsp; ¬(p ∨ q) ≡ ¬p ∧ ¬q</div>
                  <div>¬(p → q) ≡ p ∧ ¬q &nbsp;·&nbsp; p → q ≡ ¬q → ¬p</div>
                </div>
                <div>
                  <strong>Notacja polska (pre-order):</strong> korzeń → lewe poddrzewo → prawe poddrzewo. Odczyt z prawej do lewej: łącz 2 ostatnie wyrażenia dla spójnika binarnego, 1 dla <span className="font-mono">¬</span>.
                </div>
                <div>
                  <strong>DPN / KPN:</strong> DPN = alternatywa koniunkcji (wiersze z wynikiem 1, gdzie 1→p, 0→¬p). KPN = koniunkcja alternatyw (wiersze z wynikiem 0, gdzie 0→p, 1→¬p).
                </div>
              </div>

              {/* Block 2 */}
              <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4 space-y-2">
                <h3 className="font-bold text-sm text-[#1D4ED8] dark:text-[#60A5FA]">
                  2. Rachunek predykatów (Zadanie 12)
                </h3>
                <div className="font-mono space-y-0.5 text-[#1c1917] dark:text-[#E2E8F0]">
                  <div>¬(∀x φ(x)) ≡ ∃x ¬φ(x)</div>
                  <div>¬(∃x φ(x)) ≡ ∀x ¬φ(x)</div>
                  <div>∃y ∀x φ(x,y) ⇒ ∀x ∃y φ(x,y) &nbsp;(odwrotnie NIE!)</div>
                </div>
                <div>
                  <strong>Uwaga na dziedziny (UŁ):</strong>
                  <div className="font-mono mt-0.5">
                    ℕ = {'{1, 2, 3, …}'} (bez 0!) · ℤ = {'{…, −1, 0, 1, …}'} · ℝ
                  </div>
                </div>
                <div>
                  <strong>Strategia gry:</strong> <span className="font-mono">∀x ∃y</span> oznacza, że <span className="font-mono">y</span> może zależeć od <span className="font-mono">x</span> (np. <span className="font-mono">y = x² + 1</span>). Natomiast <span className="font-mono">∃y ∀x</span> wymaga JEDNEJ stałej liczby <span className="font-mono">y</span> dobrej dla wszystkich <span className="font-mono">x</span> naraz!
                </div>
              </div>

              {/* Block 3 */}
              <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4 space-y-2">
                <h3 className="font-bold text-sm text-[#1D4ED8] dark:text-[#60A5FA]">
                  3. Zbiory i relacje (Zadania 9, 10, 11)
                </h3>
                <div className="font-mono space-y-0.5 text-[#1c1917] dark:text-[#E2E8F0]">
                  <div>A \ B = A ∩ B&apos; &nbsp;·&nbsp; A \ (B ∪ C) = (A \ B) ∩ (A \ C) = (A \ B) \ C</div>
                  <div>A \ (B ∩ C) = (A \ B) ∪ (A \ C)</div>
                  <div>A \ (B \ C) = (A \ B) ∪ (A ∩ C)</div>
                  <div>|P(A)| = 2^|A| &nbsp;·&nbsp; ∅ ⊆ A zawsze</div>
                </div>
                <div>
                  <strong>7 własności relacji R ⊆ X × X:</strong>
                  <ul className="mt-1 space-y-0.5 font-mono">
                    <li>Zwrotna: ∀x (xRx) · Przeciwzwrotna: ∀x ¬(xRx)</li>
                    <li>Symetryczna: xRy ⇒ yRx · Asymetryczna: xRy ⇒ ¬(yRx)</li>
                    <li>Antysymetryczna: (xRy ∧ yRx) ⇒ x = y</li>
                    <li>Przechodnia: (xRy ∧ yRz) ⇒ xRz</li>
                    <li>Spójna: x ≠ y ⇒ (xRy ∨ yRx)</li>
                  </ul>
                </div>
                <div>
                  <strong>Klasy:</strong> Równoważność = zwr + sym + przech. Porządek częściowy = zwr + antysym + przech. Liniowy = częściowy + spójna.
                </div>
              </div>

              {/* Block 4 */}
              <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3] dark:bg-[#12171F] p-4 space-y-2">
                <h3 className="font-bold text-sm text-[#1D4ED8] dark:text-[#60A5FA]">
                  4. Algebry Boole’a (Zadanie 8)
                </h3>
                <div className="font-mono space-y-0.5 text-[#1c1917] dark:text-[#E2E8F0]">
                  <div>Idempotentność: x + x = x &nbsp;·&nbsp; x · x = x² = x</div>
                  <div>Elementy 0 i 1: x + 0 = x · x · 1 = x · x + 1 = 1 · x · 0 = 0</div>
                  <div>Dopełnienie: x + x&apos; = 1 &nbsp;·&nbsp; x · x&apos; = 0 &nbsp;·&nbsp; (x&apos;)&apos; = x</div>
                  <div>Absorpcja: x + x · y = x &nbsp;·&nbsp; x · (x + y) = x</div>
                  <div>Pochłanianie z dopełn.: x + x&apos; · y = x + y</div>
                  <div>De Morgan: (x + y)&apos; = x&apos; · y&apos; &nbsp;·&nbsp; (x · y)&apos; = x&apos; + y&apos;</div>
                  <div>Rozdzielność (+ względem ·): x + y · z = (x + y)(x + z)</div>
                </div>
                <div>
                  <strong>Szybki test na kolokwium (tw. Stone’a):</strong> Tożsamość zachodzi w KAŻDEJ algebrze Boole’a wtedy i tylko wtedy, gdy zachodzi w dwuelementowej algebrze {'{0, 1}'}! Podstaw 4 pary (0,0), (0,1), (1,0), (1,1) i sprawdź L = P.
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
