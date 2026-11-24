'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Moon,
  Network,
  RotateCcw,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import { ALL_EXAM_SETS, EXAM_SETS, EXAM_SETS_2022 } from '@/data/exams';
import { TOPIC_UNITS } from '@/data/topics';
import {
  acceptCookieNotice,
  clearCompletedTasksCookie,
  clearThemeCookie,
  isCookieNoticeAccepted,
  loadCompletedTasksFromCookie,
  loadThemeFromCookie,
  saveCompletedTasksToCookie,
  saveThemeToCookie,
  STORAGE_EXAM_ANSWERS,
} from '@/lib/cookies';
import { getGradeFromPoints, scoreExamQuestion } from '@/lib/logic-engine';
import { ExamSetId, MainTabId } from '@/lib/types';
import CookieBanner from './CookieBanner';
import ExamQuestionView from './ExamQuestionView';
import HiddenAnswerKeyView from './HiddenAnswerKeyView';
import PrivacyCookieModal from './PrivacyCookieModal';
import ToolsAndCheatSheet, { ToolSubTab } from './ToolsAndCheatSheet';
import TopicView from './TopicView';

interface StoredExamState {
  selected: Record<string, ('A' | 'B' | 'C' | 'D')[]>;
  checked: Record<string, boolean>;
}

const TOTAL_2025 = EXAM_SETS.reduce((acc, s) => acc + s.questions.length, 0);
const TOTAL_2022 = EXAM_SETS_2022.reduce((acc, s) => acc + s.questions.length, 0);

const NAV_TABS: { id: MainTabId; label: string; mobileLabel: string }[] = [
  { id: 'tematy', label: 'Tematy 1–4', mobileLabel: 'Tematy' },
  { id: 'kolokwium-2025', label: `Kolokwium 2025/26 (${TOTAL_2025})`, mobileLabel: 'Kolos 25/26' },
  { id: 'kolokwium-2022', label: `Kolokwium 2022 (${TOTAL_2022})`, mobileLabel: 'Kolos 2022' },
  { id: 'narzedzia', label: 'Narzędzia i ściąga', mobileLabel: 'Narzędzia' },
];

export default function StudyApp() {
  const [activeTab, setActiveTab] = useState<MainTabId>('tematy');
  const [selectedSetByTab, setSelectedSetByTab] = useState<{
    'kolokwium-2025': ExamSetId;
    'kolokwium-2022': ExamSetId;
  }>({
    'kolokwium-2025': 'zestaw-a',
    'kolokwium-2022': 'k22-arkusz-1',
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hiddenKeyOpen, setHiddenKeyOpen] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<ToolSubTab>('kalkulator');
  const [examMode, setExamMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [examState, setExamState] = useState<StoredExamState>({
    selected: {},
    checked: {},
  });
  const [noticeAccepted, setNoticeAccepted] = useState<boolean>(true);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Load persisted progress, theme, cookie notice & exam answers from cookies at startup
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        // 1. Read completed tasks from cookie (with automatic legacy localStorage migration)
        const loadedTasks = loadCompletedTasksFromCookie();
        setCompletedIds(loadedTasks);

        // 2. Read theme preference from cookie
        const loadedTheme = loadThemeFromCookie();
        const isDark = loadedTheme === 'dark';
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);

        // 3. Read cookie notice acceptance from cookie
        setNoticeAccepted(isCookieNoticeAccepted());

        // 4. Read exam-mode draft answers from localStorage
        const savedExam = localStorage.getItem(STORAGE_EXAM_ANSWERS);
        if (savedExam) {
          const parsed = JSON.parse(savedExam) as StoredExamState;
          if (parsed && typeof parsed === 'object') {
            setExamState({
              selected: parsed.selected ?? {},
              checked: parsed.checked ?? {},
            });
          }
        }

        const params = new URLSearchParams(window.location.search);
        if (params.get('autostart') === '1') {
          setActiveTab('tematy');
          setSelectedItemId(TOPIC_UNITS[0]?.id ?? null);
        }
      } catch {
        // Ignore storage restrictions
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // Persist completed task/topic IDs to cookie whenever changed
  useEffect(() => {
    if (!hydrated) return;
    try {
      saveCompletedTasksToCookie(completedIds);
    } catch {
      // Ignore cookie write errors
    }
  }, [completedIds, hydrated]);

  // Persist exam-mode draft answers to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_EXAM_ANSWERS, JSON.stringify(examState));
    } catch {
      // Ignore storage errors
    }
  }, [examState, hydrated]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      try {
        saveThemeToCookie(next ? 'dark' : 'light');
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleResetTheme = () => {
    setDarkMode(false);
    document.documentElement.classList.remove('dark');
    try {
      clearThemeCookie();
    } catch {
      // ignore
    }
  };

  const handleClearProgress = () => {
    setCompletedIds([]);
    try {
      clearCompletedTasksCookie();
    } catch {
      // ignore
    }
  };

  const handleAcceptNotice = () => {
    setNoticeAccepted(true);
    try {
      acceptCookieNotice();
    } catch {
      // ignore
    }
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectTab = (tab: MainTabId) => {
    setActiveTab(tab);
    setSelectedItemId(null);
    setHiddenKeyOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectExamSet = (setId: ExamSetId, openFirstQuestion = false) => {
    const targetSet = ALL_EXAM_SETS.find((s) => s.id === setId);
    if (!targetSet) return;
    const tabKey = targetSet.year === '2022' ? 'kolokwium-2022' : 'kolokwium-2025';
    setActiveTab(tabKey);
    setSelectedSetByTab((prev) => ({ ...prev, [tabKey]: setId }));
    setSelectedItemId(openFirstQuestion ? targetSet.questions[0]?.id ?? null : null);
    setHiddenKeyOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectItem = (id: string | null) => {
    setSelectedItemId(id);
    setHiddenKeyOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleHiddenKey = () => {
    setActiveTab('kolokwium-2025');
    setSelectedItemId(null);
    setHiddenKeyOpen((prev) => !prev);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isHiddenKeyActive = activeTab === 'kolokwium-2025' && hiddenKeyOpen;

  const handleToggleExamMode = () => {
    setExamMode((prev) => {
      const next = !prev;
      if (next) {
        setHiddenKeyOpen(false);
      }
      if (next && (activeTab === 'tematy' || activeTab === 'narzedzia')) {
        setActiveTab('kolokwium-2022');
        const firstSet = EXAM_SETS_2022[0];
        setSelectedSetByTab((s) => ({ ...s, 'kolokwium-2022': firstSet.id }));
        setSelectedItemId(firstSet.questions[0]?.id ?? null);
      }
      return next;
    });
  };

  const currentTabExamSets = useMemo(() => {
    if (activeTab === 'kolokwium-2025') return EXAM_SETS;
    if (activeTab === 'kolokwium-2022') return EXAM_SETS_2022;
    return null;
  }, [activeTab]);

  const activeExamSet = useMemo(() => {
    if (activeTab === 'kolokwium-2025' || activeTab === 'kolokwium-2022') {
      const targetId = selectedSetByTab[activeTab];
      return ALL_EXAM_SETS.find((s) => s.id === targetId) ?? null;
    }
    return null;
  }, [activeTab, selectedSetByTab]);

  const activeTopic = useMemo(() => {
    if (activeTab !== 'tematy' || !selectedItemId) return null;
    return TOPIC_UNITS.find((t) => t.id === selectedItemId) ?? null;
  }, [activeTab, selectedItemId]);

  const activeQuestion = useMemo(() => {
    if (!activeExamSet || !selectedItemId) return null;
    return activeExamSet.questions.find((q) => q.id === selectedItemId) ?? null;
  }, [activeExamSet, selectedItemId]);

  // Sidebar progress metrics for active section
  const sectionProgress = useMemo(() => {
    if (activeTab === 'tematy') {
      const total = TOPIC_UNITS.length;
      const done = TOPIC_UNITS.filter((t) => completedIds.includes(t.id)).length;
      return { done, total, label: 'Opanowane działy' };
    }
    if (activeExamSet) {
      const total = activeExamSet.questions.length;
      const done = activeExamSet.questions.filter((q) =>
        completedIds.includes(q.id)
      ).length;
      return { done, total, label: 'Zrobione zadania (arkusz)' };
    }
    return null;
  }, [activeTab, activeExamSet, completedIds]);

  // Overall progress across all sets in current exam year tab
  const yearProgress = useMemo(() => {
    if (!currentTabExamSets) return null;
    const allIds = currentTabExamSets.flatMap((s) => s.questions.map((q) => q.id));
    const done = allIds.filter((id) => completedIds.includes(id)).length;
    return { done, total: allIds.length };
  }, [currentTabExamSets, completedIds]);

  // Exam mode score summary for current exam set
  const examSetSummary = useMemo(() => {
    if (!activeExamSet) return null;
    let totalPoints = 0;
    let checkedCount = 0;
    for (const q of activeExamSet.questions) {
      if (examState.checked[q.id]) {
        checkedCount++;
        const res = scoreExamQuestion(examState.selected[q.id] ?? [], q.correctLetters);
        totalPoints += res.points;
      }
    }
    const gradeInfo = getGradeFromPoints(totalPoints);
    return {
      totalPoints,
      checkedCount,
      totalQuestions: activeExamSet.questions.length,
      gradeInfo,
    };
  }, [activeExamSet, examState]);

  const toggleAnswerForQuestion = (
    questionId: string,
    letter: 'A' | 'B' | 'C' | 'D'
  ) => {
    setExamState((prev) => {
      const current = prev.selected[questionId] ?? [];
      const next = current.includes(letter)
        ? current.filter((l) => l !== letter)
        : [...current, letter].sort();
      return {
        ...prev,
        selected: {
          ...prev.selected,
          [questionId]: next as ('A' | 'B' | 'C' | 'D')[],
        },
      };
    });
  };

  const checkAnswerForQuestion = (questionId: string) => {
    setExamState((prev) => ({
      ...prev,
      checked: {
        ...prev.checked,
        [questionId]: true,
      },
    }));
  };

  const resetAnswerForQuestion = (questionId: string) => {
    setExamState((prev) => ({
      selected: {
        ...prev.selected,
        [questionId]: [],
      },
      checked: {
        ...prev.checked,
        [questionId]: false,
      },
    }));
  };

  const resetCurrentExamSet = () => {
    if (!activeExamSet) return;
    setExamState((prev) => {
      const nextSelected = { ...prev.selected };
      const nextChecked = { ...prev.checked };
      for (const q of activeExamSet.questions) {
        delete nextSelected[q.id];
        delete nextChecked[q.id];
      }
      return { selected: nextSelected, checked: nextChecked };
    });
  };

  const navigateTopic = (delta: number) => {
    if (!activeTopic) return;
    const idx = TOPIC_UNITS.findIndex((t) => t.id === activeTopic.id);
    const target = TOPIC_UNITS[idx + delta];
    if (target) handleSelectItem(target.id);
  };

  const navigateQuestion = (delta: number) => {
    if (!activeExamSet || !activeQuestion) return;
    const idx = activeExamSet.questions.findIndex((q) => q.id === activeQuestion.id);
    const target = activeExamSet.questions[idx + delta];
    if (target) handleSelectItem(target.id);
  };

  const totalAllExamQuestions = TOTAL_2025 + TOTAL_2022;

  return (
    <div className="min-h-screen print:min-h-0 print:block print:bg-white flex flex-col bg-[#f5efe2] text-[#1c1917] dark:bg-[#0F1419] dark:text-[#E6EDF3] transition-colors">
      {/* ====================================================================
          TOP NAVIGATION BAR (3-Zone Contract: Brand · Nav Tabs · Controls)
         ==================================================================== */}
      <header className="no-print sticky top-0 z-30 border-b border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7]/95 dark:bg-[#161B22]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Brand */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('tematy');
              handleSelectItem(null);
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-left min-w-0 shrink group"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="leading-tight min-w-0">
              <span className="block text-[13px] sm:text-sm font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors truncate">
                Matematyka Dyskretna
              </span>
              <span className="hidden sm:block text-[11px] text-[#6b6256] dark:text-[#94A3B8] whitespace-nowrap">
                I rok Informatyki · WFiIS UŁ
              </span>
            </span>
          </button>

          {/* Zone 2: Desktop Horizontal Tabs */}
          <nav
            aria-label="Główna nawigacja sekcji"
            className="hidden lg:flex items-center h-full gap-1"
          >
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative h-full px-3.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 flex items-center ${
                    isActive
                      ? 'text-[#1D4ED8] dark:text-[#60A5FA]'
                      : 'text-[#575046] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1D4ED8] dark:bg-[#60A5FA] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Exam Mode CTA + Compact Dark Mode Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleToggleExamMode}
              aria-pressed={examMode}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                examMode
                  ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                  : 'border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#1c1917] dark:text-[#E2E8F0] hover:border-[#1D4ED8] hover:bg-[#efe7d6] dark:hover:border-[#60A5FA]'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="sm:hidden">{examMode ? 'Test: WŁ' : 'Sprawdzian'}</span>
              <span className="hidden sm:inline">
                {examMode ? 'Tryb sprawdzianu: WŁ' : 'Tryb sprawdzianu'}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Przełącz na tryb dzienny kremowy' : 'Przełącz na tryb nocny'}
              title={darkMode ? 'Przełącz na motyw dzienny (kremowy)' : 'Przełącz na motyw nocny'}
              className="p-1.5 sm:p-2 rounded-lg border border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] transition-colors shrink-0"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Compact 4-Column Tab Bar */}
        <nav
          aria-label="Nawigacja mobilna"
          className="lg:hidden border-t border-[#ede6d7] dark:border-[#242C37]"
        >
          <div className="grid grid-cols-4 px-2 gap-0.5">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-1.5 py-2 text-[11px] sm:text-xs font-medium text-center truncate transition-colors ${
                    isActive
                      ? 'text-[#1D4ED8] dark:text-[#60A5FA]'
                      : 'text-[#575046] dark:text-[#94A3B8]'
                  }`}
                >
                  {tab.mobileLabel}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1D4ED8] dark:bg-[#60A5FA] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ====================================================================
          MAIN TWO-COLUMN WORKSPACE
         ==================================================================== */}
      <div className="print-workspace flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-6 grid grid-cols-1 lg:grid-cols-[316px_minmax(0,1fr)] gap-5 sm:gap-6 items-start">
        {/* LEFT STICKY SIDEBAR */}
        <aside
          className={`no-print lg:sticky lg:top-22 space-y-4 ${
            selectedItemId !== null || activeTab === 'narzedzia' || isHiddenKeyActive
              ? 'order-2 lg:order-1'
              : 'order-1'
          }`}
        >
          {/* Card 1: Section Task / Topic List */}
          <div className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-4 shadow-xs">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#ede6d7] dark:border-[#242C37]">
              <div>
                <h2 className="text-sm font-bold text-[#1c1917] dark:text-[#F8FAFC]">
                  {activeTab === 'tematy'
                    ? 'Tematy 1–4 (Zad_MDL)'
                    : activeTab === 'kolokwium-2022'
                    ? 'Kolokwium 2022 (5 arkuszy)'
                    : activeTab === 'kolokwium-2025'
                    ? 'Kolokwium 2025/26 (3 zestawy)'
                    : 'Narzędzia i ściąga'}
                </h2>
                <p className="text-xs text-[#6b6256] dark:text-[#94A3B8] mt-0.5">
                  {activeTab === 'tematy'
                    ? 'Wykłady 1–6 · Matematyka Dyskretna'
                    : isHiddenKeyActive
                    ? 'Klucz odpowiedzi · pliki TXT'
                    : activeExamSet
                    ? `${activeExamSet.tabLabel} · ${activeExamSet.questions.length} zadań`
                    : 'Kalkulator, relacje i wzór A4'}
                </p>
              </div>
              {activeTab !== 'narzedzia' && (
                <button
                  type="button"
                  onClick={() => handleSelectItem(null)}
                  className={`text-xs font-medium px-2 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selectedItemId === null && !isHiddenKeyActive
                      ? 'bg-[#eef4fb] dark:bg-[#1E3A8A]/40 text-[#1D4ED8] dark:text-[#60A5FA]'
                      : 'text-[#6b6256] dark:text-[#94A3B8] hover:text-[#1c1917] dark:hover:text-white'
                  }`}
                >
                  Przegląd
                </button>
              )}
            </div>

            {/* Sheet Switcher Pills (for Kolokwium 2025/26 & Kolokwium 2022) */}
            {currentTabExamSets && activeExamSet && (
              <div className="py-3 border-b border-[#ede6d7] dark:border-[#242C37]">
                <div className="flex flex-wrap items-center gap-1.5">
                  {currentTabExamSets.map((set) => {
                    const isCurrent = set.id === activeExamSet.id && !isHiddenKeyActive;
                    const doneInSet = set.questions.filter((q) =>
                      completedIds.includes(q.id)
                    ).length;
                    return (
                      <button
                        key={set.id}
                        type="button"
                        onClick={() => handleSelectExamSet(set.id, false)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          isCurrent
                            ? 'border-[#1D4ED8] bg-[#eef4fb] text-[#1D4ED8] dark:border-[#3B82F6] dark:bg-[#1E3A8A]/40 dark:text-[#93C5FD]'
                            : 'border-[#e4dccb] dark:border-[#2A3341] bg-[#f7f1e3]/70 dark:bg-[#12171F] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631]'
                        }`}
                      >
                        <span>{set.tabLabel}</span>
                        <span className="font-mono text-[10px] opacity-80 tabular-nums">
                          {doneInSet}/{set.questions.length}
                        </span>
                      </button>
                    );
                  })}
                  {activeTab === 'kolokwium-2025' && (
                    <button
                      type="button"
                      onClick={handleToggleHiddenKey}
                      aria-pressed={isHiddenKeyActive}
                      aria-label="Pobierz odpowiedzi TXT"
                      className={`inline-flex items-center justify-center transition-all ${
                        isHiddenKeyActive
                          ? 'px-2 py-1.5 rounded-lg text-xs font-mono font-medium border border-[#1D4ED8] bg-[#eef4fb] text-[#1D4ED8] dark:border-[#3B82F6] dark:bg-[#1E3A8A]/40 dark:text-[#93C5FD] opacity-100'
                          : 'w-4 h-4 rounded-full opacity-15 hover:opacity-85 focus-visible:opacity-100 text-[#6b6256] dark:text-[#94A3B8] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631]'
                      }`}
                    >
                      {isHiddenKeyActive ? (
                        '.txt'
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </button>
                  )}
                </div>
                {yearProgress && (
                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#6b6256] dark:text-[#94A3B8]">
                    <span>Łącznie w roczniku {activeExamSet.year}</span>
                    <span className="font-mono font-semibold tabular-nums">
                      {yearProgress.done} / {yearProgress.total}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {sectionProgress && (
              <div className="py-3 border-b border-[#ede6d7] dark:border-[#242C37]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#6b6256] dark:text-[#94A3B8]">
                    {sectionProgress.label}
                  </span>
                  <span className="font-mono font-semibold text-[#1c1917] dark:text-[#F1F5F9] tabular-nums">
                    {sectionProgress.done} / {sectionProgress.total}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#ede6d7] dark:bg-[#242C37] overflow-hidden">
                  <div
                    className="h-full bg-[#059669] dark:bg-[#10B981] transition-all duration-300"
                    style={{
                      width: `${
                        sectionProgress.total > 0
                          ? (sectionProgress.done / sectionProgress.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* List Items: Topics 1–4 */}
            {activeTab === 'tematy' && (
              <ul className="mt-3 space-y-1.5">
                {TOPIC_UNITS.map((topic) => {
                  const isSelected = selectedItemId === topic.id;
                  const isDone = completedIds.includes(topic.id);
                  return (
                    <li key={topic.id} className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedItemId(topic.id)}
                        className={`flex-1 min-w-0 text-left px-3 py-2.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'border-[#1D4ED8] bg-[#eef4fb] dark:border-[#3B82F6] dark:bg-[#1E3A8A]/30'
                            : 'border-transparent hover:bg-[#f7f1e3] dark:hover:bg-[#1E2631]'
                        }`}
                      >
                        <div
                          className={`text-xs sm:text-sm font-semibold truncate ${
                            isSelected
                              ? 'text-[#1D4ED8] dark:text-[#93C5FD]'
                              : 'text-[#1c1917] dark:text-[#F1F5F9]'
                          }`}
                        >
                          {topic.shortTitle}
                        </div>
                        <div className="text-[11px] text-[#6b6256] dark:text-[#94A3B8] truncate mt-0.5">
                          {topic.subtitle}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCompleted(topic.id)}
                        aria-pressed={isDone}
                        aria-label={`Oznacz ${topic.shortTitle} jako opanowany`}
                        title={
                          isDone
                            ? 'Dział opanowany (zapisane w ciasteczkach)'
                            : 'Oznacz dział jako opanowany'
                        }
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isDone
                            ? 'border-[#059669] bg-[#059669] text-white'
                            : 'border-[#d6ccb8] dark:border-[#334155] bg-[#fcf8ee] dark:bg-transparent text-transparent hover:border-[#059669]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* List Items: Exam Set Questions */}
            {activeExamSet && (
              <ul className="mt-3 space-y-1 max-h-[420px] lg:max-h-[460px] overflow-y-auto pr-0.5">
                {activeExamSet.questions.map((q) => {
                  const isSelected = selectedItemId === q.id;
                  const isDone = completedIds.includes(q.id);
                  const isChecked = !!examState.checked[q.id];
                  const qScore = isChecked
                    ? scoreExamQuestion(examState.selected[q.id] ?? [], q.correctLetters).points
                    : null;

                  return (
                    <li key={q.id} className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleSelectItem(q.id)}
                        className={`flex-1 min-w-0 text-left px-2.5 py-2 rounded-xl border transition-colors ${
                          isSelected
                            ? 'border-[#1D4ED8] bg-[#eef4fb] dark:border-[#3B82F6] dark:bg-[#1E3A8A]/30'
                            : 'border-transparent hover:bg-[#f7f1e3] dark:hover:bg-[#1E2631]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-semibold truncate ${
                              isSelected
                                ? 'text-[#1D4ED8] dark:text-[#93C5FD]'
                                : 'text-[#1c1917] dark:text-[#F1F5F9]'
                            }`}
                          >
                            Zad. {q.number}. {q.title}
                          </span>
                          {examMode && qScore !== null && (
                            <span
                              className={`font-mono text-[11px] font-bold shrink-0 tabular-nums ${
                                qScore > 0
                                  ? 'text-[#059669] dark:text-[#34D399]'
                                  : qScore < 0
                                  ? 'text-[#DC2626] dark:text-[#F87171]'
                                  : 'text-[#6b6256] dark:text-[#94A3B8]'
                              }`}
                            >
                              {qScore > 0 ? `+${qScore}` : qScore}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#6b6256] dark:text-[#94A3B8] truncate mt-0.5">
                          {q.category}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCompleted(q.id)}
                        aria-pressed={isDone}
                        aria-label={`Oznacz Zadanie ${q.number} jako zrobione`}
                        title={
                          isDone
                            ? 'Zadanie zrobione (zapisane w ciasteczkach)'
                            : 'Oznacz zadanie jako zrobione'
                        }
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isDone
                            ? 'border-[#059669] bg-[#059669] text-white'
                            : 'border-[#d6ccb8] dark:border-[#334155] bg-[#fcf8ee] dark:bg-transparent text-transparent hover:border-[#059669]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* List Items: Tools Sub-tabs */}
            {activeTab === 'narzedzia' && (
              <ul className="mt-3 space-y-1.5">
                {[
                  {
                    id: 'kalkulator' as ToolSubTab,
                    label: 'Kalkulator logiki i PN',
                    sub: 'Tabela prawdy, drzewo, DPN/KPN',
                    icon: Calculator,
                  },
                  {
                    id: 'relacje' as ToolSubTab,
                    label: 'Analizator relacji',
                    sub: '7 własności + kontrprzykłady',
                    icon: Network,
                  },
                  {
                    id: 'sciaga' as ToolSubTab,
                    label: 'Wzór ściągi A4',
                    sub: 'Wzory do przepisania ręcznie + zasady',
                    icon: FileText,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeTool === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setActiveTool(item.id)}
                        className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'border-[#1D4ED8] bg-[#eef4fb] dark:border-[#3B82F6] dark:bg-[#1E3A8A]/30'
                            : 'border-transparent hover:bg-[#f7f1e3] dark:hover:bg-[#1E2631]'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isSelected
                              ? 'text-[#1D4ED8] dark:text-[#60A5FA]'
                              : 'text-[#6b6256] dark:text-[#94A3B8]'
                          }`}
                        />
                        <span className="min-w-0">
                          <span
                            className={`block text-xs sm:text-sm font-semibold ${
                              isSelected
                                ? 'text-[#1D4ED8] dark:text-[#93C5FD]'
                                : 'text-[#1c1917] dark:text-[#F1F5F9]'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="block text-[11px] text-[#6b6256] dark:text-[#94A3B8]">
                            {item.sub}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Card 2: Live Exam Score (when Exam Mode active) + Collapsible UŁ Grading Scale */}
          <div className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-4 space-y-3 shadow-xs">
            {examMode && examSetSummary && (
              <div className="pb-3 border-b border-[#ede6d7] dark:border-[#242C37]">
                <div className="flex items-center justify-between text-xs text-[#6b6256] dark:text-[#94A3B8]">
                  <span>Wynik w trybie sprawdzianu</span>
                  <span className="font-mono tabular-nums">
                    {examSetSummary.checkedCount}/{examSetSummary.totalQuestions} spr.
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between gap-2">
                  <span className="text-xl font-bold font-mono tabular-nums text-[#1c1917] dark:text-[#F8FAFC]">
                    {examSetSummary.totalPoints} pkt
                  </span>
                  {examSetSummary.totalQuestions === 12 && (
                    <span
                      className={`text-xs font-semibold ${
                        examSetSummary.gradeInfo.passed
                          ? 'text-[#059669] dark:text-[#34D399]'
                          : 'text-[#6b6256] dark:text-[#94A3B8]'
                      }`}
                    >
                      Ocena: {examSetSummary.gradeInfo.grade}
                    </span>
                  )}
                </div>
                {examSetSummary.checkedCount > 0 && (
                  <button
                    type="button"
                    onClick={resetCurrentExamSet}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:underline"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Wyczyść odpowiedzi zestawu
                  </button>
                )}
              </div>
            )}

            <details className="group">
              <summary className="cursor-pointer list-none flex items-center justify-between text-xs font-semibold text-[#1c1917] dark:text-[#F1F5F9]">
                <span>Zasady punktacji i skala ocen UŁ</span>
                <span className="text-[#6b6256] dark:text-[#94A3B8] text-[11px] group-open:hidden">
                  Rozwiń
                </span>
                <span className="text-[#6b6256] dark:text-[#94A3B8] text-[11px] hidden group-open:inline">
                  Zwiń
                </span>
              </summary>
              <div className="mt-3 pt-3 border-t border-[#ede6d7] dark:border-[#242C37] space-y-2 text-xs text-[#44403c] dark:text-[#CBD5E1]">
                <p>
                  Każde zadanie ma <strong>1 lub 2</strong> poprawne odpowiedzi:
                  <span className="block font-mono mt-1 text-[#1c1917] dark:text-[#F1F5F9]">
                    +1 pkt dobra · −1 pkt błędna · 0 pkt brak
                  </span>
                </p>
                <div className="rounded-lg bg-[#f7f1e3] dark:bg-[#12171F] border border-[#e4dccb] dark:border-[#262F3B] p-2.5 font-mono text-[11px] space-y-1 tabular-nums">
                  <div className="flex justify-between">
                    <span>9–10 pkt</span>
                    <span className="font-semibold">3 (dostateczny)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>11–12 pkt</span>
                    <span className="font-semibold">3+ (dostateczny plus)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>13–14 pkt</span>
                    <span className="font-semibold">4 (dobry)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15–16 pkt</span>
                    <span className="font-semibold">4+ (dobry plus)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>17–18 pkt</span>
                    <span className="font-semibold">5 (bardzo dobry)</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6b6256] dark:text-[#94A3B8]">
                  Czas: 75 min · Dozwolona 1 strona A4 <strong>własnoręcznych</strong> notatek (bez wydruków i ksera!) · ℕ = {'{1, 2, …}'}.
                </p>
              </div>
            </details>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT STAGE */}
        <main
          className={`min-w-0 ${
            selectedItemId !== null || activeTab === 'narzedzia' || isHiddenKeyActive
              ? 'order-1 lg:order-2'
              : 'order-2'
          }`}
        >
          {/* ================================================================
              VIEW 1: TOPICS 1–4 OVERVIEW OR ACTIVE TOPIC
             ================================================================ */}
          {activeTab === 'tematy' && !activeTopic && (
            <div className="space-y-5">
              <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-6 sm:p-8 shadow-xs">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                  <span className="text-[#1D4ED8] dark:text-[#60A5FA] font-semibold">
                    Zad_MDL_26-27 · Wykłady 1–6
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>4 działy obowiązkowe</span>
                  <span aria-hidden="true">·</span>
                  <span>{totalAllExamQuestions} zadań z kolokwiów (2025/26 + 2022)</span>
                </div>

                <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC] text-balance">
                  Matematyka dyskretna z logiką — nauka do 1. kolokwium
                </h1>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#44403c] dark:text-[#CBD5E1] max-w-3xl">
                  Kompletne opracowanie tematów 1–4 z listy zadań{' '}
                  <span className="font-mono text-xs sm:text-sm">Zad_MDL</span> oraz wykładów z
                  przedmiotu, połączone z pełnymi, krok po kroku rozwiązanymi arkuszami z kolokwium
                  2025/26 (30 zadań) oraz 2022 (5 arkuszy, 60 zadań) wraz ze zdjęciami oryginalnych
                  kartek.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItemId(TOPIC_UNITS[0].id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    Rozpocznij od Działu 1
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectExamSet('k22-arkusz-1', false)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#1c1917] dark:text-[#E2E8F0] hover:border-[#1D4ED8] hover:bg-[#efe7d6] dark:hover:border-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                  >
                    Kolokwium 2022 (5 arkuszy · 60 zadań)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectExamSet('zestaw-a', false)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-[#d6ccb8] dark:border-[#2F3946] bg-[#fcf8ee] dark:bg-[#12171F] text-[#1c1917] dark:text-[#E2E8F0] hover:border-[#1D4ED8] hover:bg-[#efe7d6] dark:hover:border-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                  >
                    Kolokwium 2025/26 (30 zadań)
                  </button>
                </div>

                {/* 3 Structured Method Cards */}
                <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3]/75 dark:bg-[#12171F] p-4">
                    <div className="text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
                      1. Teoria i prawa z wykładu
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                      Każdy z 4 działów zawiera kluczowe twierdzenia, tabelki prawdy, drzewa
                      struktury SVG i przykłady z tablicy.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3]/75 dark:bg-[#12171F] p-4">
                    <div className="text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
                      2. Arkusze 2025/26 i 2022 krok po kroku
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                      Łącznie {totalAllExamQuestions} zadań rozpisanych od Kroku 1 ze słowniczkiem
                      pojęć, weryfikacją matematyczną i podglądem skanu arkusza.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3]/75 dark:bg-[#12171F] p-4">
                    <div className="text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
                      3. Postęp zapisywany w cookies
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                      Odznaczone zadania oraz wybrany motyw zapisują się w ciasteczkach i wczytują
                      automatycznie przy kolejnej wizycie.
                    </p>
                  </div>
                </div>
              </section>

              {/* Direct Index of Topics 1–4 */}
              <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6 shadow-xs">
                <h2 className="flex items-center gap-2 text-base font-bold text-[#1c1917] dark:text-[#F8FAFC] mb-4">
                  <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA]" />
                  Wybierz dział z listy Zad_MDL (1–4)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {TOPIC_UNITS.map((topic) => {
                    const isDone = completedIds.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedItemId(topic.id)}
                        className="text-left rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3]/70 dark:bg-[#12171F] hover:border-[#1D4ED8] hover:bg-[#efe7d6]/60 dark:hover:border-[#60A5FA] p-4 transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-[#6b6256] dark:text-[#94A3B8]">
                          <span className="font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
                            Dział {topic.number} · {topic.workedExamples.length} przykłady
                          </span>
                          {isDone && (
                            <span className="inline-flex items-center gap-1 text-[#059669] dark:text-[#34D399] font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Opanowany
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 text-base font-bold text-[#1c1917] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors">
                          {topic.title}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                          {topic.subtitle}
                        </p>
                        <div className="mt-2.5 text-[11px] font-medium text-[#6b6256] dark:text-[#94A3B8]">
                          {topic.examFrequency}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'tematy' && activeTopic && (
            <TopicView
              key={activeTopic.id}
              topic={activeTopic}
              isCompleted={completedIds.includes(activeTopic.id)}
              onToggleCompleted={() => toggleCompleted(activeTopic.id)}
              hasPrev={TOPIC_UNITS.findIndex((t) => t.id === activeTopic.id) > 0}
              hasNext={
                TOPIC_UNITS.findIndex((t) => t.id === activeTopic.id) <
                TOPIC_UNITS.length - 1
              }
              onPrev={() => navigateTopic(-1)}
              onNext={() => navigateTopic(1)}
            />
          )}

          {/* ================================================================
              VIEW 2: EXAM SET OVERVIEW, ACTIVE QUESTION, OR HIDDEN TXT KEY
             ================================================================ */}
          {isHiddenKeyActive && (
            <HiddenAnswerKeyView
              examSets={EXAM_SETS}
              activeFallbackSetId={selectedSetByTab['kolokwium-2025']}
              onSelectSet={(setId) => handleSelectExamSet(setId, false)}
            />
          )}

          {!isHiddenKeyActive && activeExamSet && !activeQuestion && (
            <div className="space-y-5">
              <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-6 sm:p-8 shadow-xs">
                <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8]">
                  <span className="text-[#1D4ED8] dark:text-[#60A5FA] font-semibold">
                    {activeExamSet.shortLabel}
                  </span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{activeExamSet.metaLine}</span>
                </div>

                <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] dark:text-[#F8FAFC] text-balance">
                  {activeExamSet.title}
                </h1>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#44403c] dark:text-[#CBD5E1]">
                  {activeExamSet.description}
                </p>

                {/* Quick Sheet Switcher inside Overview */}
                {currentTabExamSets && currentTabExamSets.length > 1 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] mr-1">
                      Wybierz arkusz:
                    </span>
                    {currentTabExamSets.map((set) => {
                      const isCurrent = set.id === activeExamSet.id;
                      const doneCount = set.questions.filter((q) =>
                        completedIds.includes(q.id)
                      ).length;
                      return (
                        <button
                          key={set.id}
                          type="button"
                          onClick={() => handleSelectExamSet(set.id, false)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            isCurrent
                              ? 'border-[#1D4ED8] bg-[#eef4fb] text-[#1D4ED8] dark:border-[#3B82F6] dark:bg-[#1E3A8A]/40 dark:text-[#93C5FD]'
                              : 'border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#44403c] dark:text-[#CBD5E1] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631]'
                          }`}
                        >
                          {set.tabLabel}
                          <span className="font-mono text-[11px] opacity-75 tabular-nums">
                            ({doneCount}/{set.questions.length})
                          </span>
                        </button>
                      );
                    })}
                    {activeTab === 'kolokwium-2025' && (
                      <button
                        type="button"
                        onClick={handleToggleHiddenKey}
                        aria-label="Pobierz odpowiedzi TXT"
                        className="w-4 h-4 inline-flex items-center justify-center rounded-full opacity-15 hover:opacity-85 focus-visible:opacity-100 text-[#6b6256] dark:text-[#94A3B8] hover:bg-[#efe7d6] dark:hover:bg-[#1E2631] transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      </button>
                    )}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItemId(activeExamSet.questions[0].id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    Rozpocznij od Zadania {activeExamSet.questions[0].number}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setExamMode(true);
                      setSelectedItemId(activeExamSet.questions[0].id);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-[#d6ccb8] dark:border-[#2F3946] bg-[#f7f1e3] dark:bg-[#12171F] text-[#1c1917] dark:text-[#E2E8F0] hover:border-[#1D4ED8] hover:bg-[#efe7d6] dark:hover:border-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    Rozwiąż jako sprawdzian (+1/−1/0)
                  </button>
                </div>
              </section>

              {/* Question Index Grid */}
              <section className="rounded-2xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#fffdf7] dark:bg-[#161B22] p-5 sm:p-6 shadow-xs">
                <h2 className="text-base font-bold text-[#1c1917] dark:text-[#F8FAFC] mb-4">
                  Spis zadań w arkuszu ({activeExamSet.questions.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeExamSet.questions.map((q) => {
                    const isDone = completedIds.includes(q.id);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setSelectedItemId(q.id)}
                        className="text-left rounded-xl border border-[#e4dccb] dark:border-[#262F3B] bg-[#f7f1e3]/70 dark:bg-[#12171F] hover:border-[#1D4ED8] hover:bg-[#efe7d6]/60 dark:hover:border-[#60A5FA] p-4 transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-[#6b6256] dark:text-[#94A3B8]">
                          <span>
                            <strong className="text-[#1D4ED8] dark:text-[#60A5FA]">
                              Zadanie {q.number}
                            </strong>{' '}
                            · {q.category}
                          </span>
                          {isDone && (
                            <CheckCircle2
                              className="w-4 h-4 text-[#059669] dark:text-[#34D399] shrink-0"
                              aria-label="Zrobione"
                            />
                          )}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-[#1c1917] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors">
                          {q.title}
                        </div>
                        {q.formula && (
                          <div className="mt-1.5 font-mono text-xs text-[#44403c] dark:text-[#94A3B8] truncate">
                            {q.formula}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {!isHiddenKeyActive && activeExamSet && activeQuestion && (
            <ExamQuestionView
              key={activeQuestion.id}
              setLabel={activeExamSet.shortLabel}
              question={activeQuestion}
              isCompleted={completedIds.includes(activeQuestion.id)}
              onToggleCompleted={() => toggleCompleted(activeQuestion.id)}
              hasPrev={
                activeExamSet.questions.findIndex((q) => q.id === activeQuestion.id) > 0
              }
              hasNext={
                activeExamSet.questions.findIndex((q) => q.id === activeQuestion.id) <
                activeExamSet.questions.length - 1
              }
              onPrev={() => navigateQuestion(-1)}
              onNext={() => navigateQuestion(1)}
              examMode={examMode}
              selectedAnswers={examState.selected[activeQuestion.id] ?? []}
              isCheckedInExamMode={!!examState.checked[activeQuestion.id]}
              onToggleAnswer={(letter) =>
                toggleAnswerForQuestion(activeQuestion.id, letter)
              }
              onCheckAnswer={() => checkAnswerForQuestion(activeQuestion.id)}
              onResetAnswer={() => resetAnswerForQuestion(activeQuestion.id)}
            />
          )}

          {/* ================================================================
              VIEW 3: TOOLS & PRINTABLE CHEAT SHEET
             ================================================================ */}
          {activeTab === 'narzedzia' && (
            <ToolsAndCheatSheet activeTool={activeTool} onSelectTool={setActiveTool} />
          )}
        </main>
      </div>

      {/* ====================================================================
          FOOTER WITH PRIVACY & COOKIES POLICY LINK
         ==================================================================== */}
      <footer className="no-print mt-8 border-t border-[#e4dccb] dark:border-[#242C37] bg-[#fffdf7] dark:bg-[#161B22] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#6b6256] dark:text-[#94A3B8]">
          <span>
            Matematyka Dyskretna z Logiką · Tematy 1–4, Kolokwium 2025/26 i Kolokwium 2022
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hidden sm:inline">
              Postępy i motyw zapisywane lokalnie w plikach cookies
            </span>
            <button
              type="button"
              onClick={() => setPrivacyModalOpen(true)}
              className="inline-flex items-center gap-1.5 font-semibold text-[#1D4ED8] underline decoration-blue-300 underline-offset-4 transition-colors hover:text-[#1E40AF] dark:text-[#60A5FA] dark:decoration-blue-700 dark:hover:text-[#93C5FD]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Polityka prywatności i cookies
            </button>
          </div>
        </div>
      </footer>

      {/* Bottom Cookie Notice Banner (until accepted) */}
      {hydrated && !noticeAccepted && (
        <CookieBanner
          onOpenPolicy={() => setPrivacyModalOpen(true)}
          onAccept={handleAcceptNotice}
        />
      )}

      {/* Privacy & Cookies Policy Modal */}
      {privacyModalOpen && (
        <PrivacyCookieModal
          completedIds={completedIds}
          darkMode={darkMode}
          noticeAccepted={noticeAccepted}
          onClose={() => setPrivacyModalOpen(false)}
          onAcceptNotice={handleAcceptNotice}
          onClearProgress={handleClearProgress}
          onResetTheme={handleResetTheme}
        />
      )}
    </div>
  );
}
