import { ExamSet } from '@/lib/types';

export const EXAM_SETS_2022_PART_C: ExamSet[] = [
  // =========================================================================
  // KOLOKWIUM 2022 — ARKUSZ 5 (12 zadań)
  // =========================================================================
  {
    id: 'k22-arkusz-5',
    year: '2022',
    tabLabel: 'Arkusz 5',
    shortLabel: 'Kolokwium 2022 · Arkusz 5 (12 zadań)',
    title: 'Logika — zaliczenie | Kolokwium 2022 — Arkusz 5',
    subtitle: 'Test wielokrotnego wyboru (1–2 poprawne)',
    metaLine: '12 zadań · I rok Informatyki · +1 pkt poprawna / −1 pkt błędna / 0 pkt brak',
    description:
      'Piąty pełny arkusz 12 zadań z kolokwium z 2022 roku. Zwróć uwagę na zadanie nr 1 (stała ⊥ jest poprawną formułą zdaniową!), zadanie nr 10 (relacja 2x + y nieparzyste ⇔ y nieparzyste!) oraz zadanie nr 11 (podzielność).',
    questions: [
      {
        id: 'k22-5-1',
        number: 1,
        title: 'Poprawność składniowa formuł (uwaga na stałą ⊥!)',
        category: 'Rachunek zdań · Składnia',
        prompt: 'Które podpunkty zawierają tylko napisy będące poprawnymi składniowo formułami rachunku zdań:',
        options: [
          { letter: 'A', text: 'p → (q ∨ r),  (r → p) ∨ r,', isMath: true },
          { letter: 'B', text: '(¬p ∧ r) ↔ r,  q¬(r → p),', isMath: true },
          { letter: 'C', text: 'r → ¬q ∧ (r → p),  ⊥ → (p ∧ ¬q),', isMath: true },
          { letter: 'D', text: 'p ∧ (r ∨ q) → ¬p,  ((r → ¬p) ∧ → p) ∨ r.', isMath: true },
        ],
        correctLetters: ['A', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Stała logiczna ⊥ (fałsz)',
            definition: 'W definicji języka rachunku zdań (Wykład 1, T-1.2) symbol ⊥ jest pełnoprawną formułą atomową! Zatem ⊥ → (p ∧ ¬q) jest jak najbardziej poprawną formułą.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A i C (obie poprawne!)',
            explanation:
              '• W A: p → (q ∨ r) oraz (r → p) ∨ r mają całkowicie poprawną składnię ✓.\n• W C: r → ¬q ∧ (r → p) jest poprawne, a w ⊥ → (p ∧ ¬q) symbol ⊥ to legalna stała zdaniowa (fałsz) ✓!',
            formula: 'A: poprawne ✓   |   C: poprawne (⊥ jest atomem!) ✓',
          },
          {
            title: 'Wskaż błędy składniowe w B i D',
            explanation:
              '• W B: q¬(r → p) nie ma spójnika dwuargumentowego pomiędzy q a ¬(r → p).\n• W D: ((r → ¬p) ∧ → p) ∨ r zawiera dwa spójniki dwuargumentowe „∧ →” bezpośrednio obok siebie.',
            formula: 'B: błąd „q¬(”   |   D: błąd „∧ →”   ⇒   Poprawne odpowiedzi: A, C',
          },
        ],
        finalSummary: 'Poprawne są A oraz C (pamiętaj, że ⊥ jest poprawną formułą atomową!).',
      },
      {
        id: 'k22-5-2',
        number: 2,
        title: 'Klasyfikacja formuły (tautologia / spełnialna / sprzeczna)',
        category: 'Rachunek zdań · Semantyka',
        prompt: 'Dla poniższej formuły zaznacz stwierdzenia prawdziwe. Formuła:',
        formula: '(r ∨ p ∨ q → ¬p) → ¬p ∧ (q ∨ r)',
        options: [
          { letter: 'A', text: 'jest tautologią i jest spełnialna;' },
          { letter: 'B', text: 'jest spełnialna i nie jest tautologią;' },
          { letter: 'C', text: 'jest sprzeczna;' },
          { letter: 'D', text: 'jest tautologią i nie jest spełnialna.' },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Uwaga na kolejność wariantów A–D!',
            definition: 'W Arkuszu 5 wariant „jest spełnialna i nie jest tautologią” jest pod literą B (a nie A jak w Arkuszach 1–4)!',
          },
        ],
        steps: [
          {
            title: 'Test na tautologię: sprawdź p = 0, q = 0, r = 0',
            explanation:
              'Lewa strona: (0 ∨ 0 ∨ 0 → ¬0) = (0 → 1) = 1.\nPrawa strona: ¬0 ∧ (0 ∨ 0) = 1 ∧ 0 = 0.\nCała implikacja: 1 → 0 = 0 ⇒ NIE jest tautologią.',
            formula: 'Dla (0, 0, 0):  1 → 0 = 0  ⇒  NIE jest tautologią',
          },
          {
            title: 'Test na spełnialność: sprawdź p = 0, q = 1, r = 0',
            explanation:
              'Prawa strona: ¬0 ∧ (1 ∨ 0) = 1 ∧ 1 = 1. Ponieważ następnik wynosi 1, cała implikacja daje 1 ⇒ JEST spełnialna.',
            formula: 'Dla (0, 1, 0):  (1 → 1) = 1  ⇒  JEST spełnialna  ⇒  Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Formuła daje 0 dla (0,0,0) i 1 dla (0,1,0) — jest spełnialna i nie jest tautologią (B).',
      },
      {
        id: 'k22-5-3',
        number: 3,
        title: 'Wybór formuł spełnialnych niebędących tautologiami',
        category: 'Rachunek zdań · Klasyfikacja',
        prompt: 'Które z poniższych formuł są spełnialne ale nie są tautologiami:',
        options: [
          { letter: 'A', text: '(p → q) ∧ (q → p) ↔ p ∧ q,', isMath: true },
          { letter: 'B', text: '¬p ∧ (q ∨ p) → (q → p),', isMath: true },
          { letter: 'C', text: '(p → q) ↔ ¬(q ∨ ¬p),', isMath: true },
          { letter: 'D', text: '¬(¬p ∨ q) ↔ p ∧ ¬q.', isMath: true },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Szybkie rozpoznanie C i D',
            definition: 'Ponieważ (p → q) ≡ (q ∨ ¬p), opcja C to X ↔ ¬X ≡ 0 (sprzeczna), a D to prawo de Morgana ¬(¬p ∨ q) ↔ (p ∧ ¬q) ≡ 1 (tautologia)!',
          },
        ],
        steps: [
          {
            title: 'Odrzuć C (sprzeczna) i D (tautologia)',
            explanation:
              '• C: (p → q) ≡ ¬p ∨ q ≡ q ∨ ¬p, więc C ma postać X ↔ ¬X ≡ 0 (SPRZECZNA).\n• D: ¬(¬p ∨ q) ≡ ¬¬p ∧ ¬q ≡ p ∧ ¬q (TAUTOLOGIA).',
            formula: 'C ≡ 0 (sprzeczna)   |   D ≡ 1 (tautologia)',
          },
          {
            title: 'Sprawdź A i B',
            explanation:
              '• A: (p ↔ q) ↔ (p ∧ q). Dla (1,1): 1 ↔ 1 = 1; dla (0,0): 1 ↔ 0 = 0 ✓.\n• B: dla (p=0, q=1): (1 ∧ 1) → (1 → 0) = 1 → 0 = 0; dla (p=1, q=1): (0 ∧ 1) → 1 = 1 ✓.',
            formula: 'A i B przyjmują zarówno 1, jak i 0   ⇒   Poprawne odpowiedzi: A, B',
          },
        ],
        finalSummary: 'C jest sprzeczna, D tautologią, a A i B są spełnialne i nie są tautologiami (A, B).',
      },
      {
        id: 'k22-5-4',
        number: 4,
        title: 'Wartościowanie zerujące formułę (wartość 0)',
        category: 'Rachunek zdań · Wartościowanie',
        prompt: 'Dla którego z poniższych wartościowań wartość formuły wynosi 0?',
        formula: '((p → q) → (q → r)) ∨ (p → r)',
        options: [
          { letter: 'A', text: 'v(p) = 1, v(q) = 1, v(r) = 0', isMath: true },
          { letter: 'B', text: 'v(p) = 1, v(q) = 1, v(r) = 1', isMath: true },
          { letter: 'C', text: 'v(p) = 1, v(q) = 0, v(r) = 0', isMath: true },
          { letter: 'D', text: 'v(p) = 0, v(q) = 1, v(r) = 1', isMath: true },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Zerowanie alternatywy X ∨ Y',
            definition: 'Alternatywa daje 0 wtedy i tylko wtedy, gdy OBA człony są równe 0 jednocześnie!',
          },
        ],
        steps: [
          {
            title: 'Wyzeruj oba człony alternatywy',
            explanation:
              '1) Drugi człon (p → r) = 0  ⇒  p = 1 oraz r = 0 (odpadają B i D).\n2) Pierwszy człon ((p → q) → (q → r)) = 0  ⇒  (q → r) = 0  ⇒  q = 1 (oraz r = 0).\nWtedy p → q = 1 → 1 = 1, a więc (1 → 0) = 0!',
            formula: 'v(p) = 1, v(q) = 1, v(r) = 0:  ((1→1) → (1→0)) ∨ (1→0) = 0 ∨ 0 = 0   ⇒   Poprawna: A',
          },
        ],
        finalSummary: 'Jedyne wartościowanie zerujące oba człony alternatywy to (1, 1, 0) — odpowiedź A.',
      },
      {
        id: 'k22-5-5',
        number: 5,
        title: 'Zapis formuły w notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Formuła w notacji polskiej ma postać:',
        formula: '¬(p → q) ∨ (q → ¬r)',
        options: [
          { letter: 'A', text: '∨¬ →→ q¬rpq,', isMath: true },
          { letter: 'B', text: 'p → ¬ ∨ q → ¬rq,', isMath: true },
          { letter: 'C', text: '∨¬ → pq → q¬r,', isMath: true },
          { letter: 'D', text: '∨ → ¬rq¬ → qp.', isMath: true },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Spójnik główny ∨',
            definition: 'Głównym spójnikiem jest ∨ łączące ¬(p → q) po lewej z (q → ¬r) po prawej.',
          },
        ],
        steps: [
          {
            title: 'Narysuj drzewo struktury formuły',
            explanation:
              'Korzeń ∨ ma dwoje dzieci: lewe ¬(p → q) oraz prawe (q → ¬r).',
            treeFormula: '¬(p → q) ∨ (q → ¬r)',
          },
          {
            title: 'Odczytaj w porządku pre-order',
            explanation:
              '• Lewe poddrzewo: ¬ → p q\n• Prawe poddrzewo: → q ¬r\n• Razem: ∨ ¬ → p q → q ¬r.',
            formula: '∨¬ → pq → q¬r   ⇒   Poprawna odpowiedź: C',
          },
        ],
        finalSummary: 'Korzeń ∨, lewo ¬ → pq, prawo → q¬r ⇒ ∨¬ → pq → q¬r (C).',
      },
      {
        id: 'k22-5-6',
        number: 6,
        title: 'Odczyt formuły z notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Poniżej podana formuła w notacji polskiej jest równoważna formule:',
        formula: '→ → ∧ p ¬q ¬p ∧ q r',
        options: [
          { letter: 'A', text: 'p ∧ ¬q → (¬p → q ∧ r)', isMath: true },
          { letter: 'B', text: 'p ∧ (¬q → ¬p) → q ∧ r', isMath: true },
          { letter: 'C', text: 'p ∧ q → ¬(¬p → q ∧ r)', isMath: true },
          { letter: 'D', text: '(p ∧ ¬q → ¬p) → q ∧ r', isMath: true },
        ],
        correctLetters: ['D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Dwie strzałki „→ →” na początku',
            definition: 'Oznaczają (BLOK_1 → BLOK_2) → BLOK_3, czyli zagnieżdżenie z lewej strony (odróżnia D od A!).',
          },
        ],
        steps: [
          {
            title: 'Rozbij zapis na 3 argumenty podwójnej implikacji',
            explanation:
              '→ [→ [∧ p ¬q] [¬p]] [∧ q r]\n• Pierwszy argument: p ∧ ¬q\n• Drugi argument: ¬p  ⇒  poprzednik głównej implikacji to (p ∧ ¬q → ¬p)\n• Trzeci argument (następnik głównej implikacji): q ∧ r.',
            formula: '→  [→ ∧ p ¬q ¬p]   [∧ q r]   =   (p ∧ ¬q → ¬p) → q ∧ r',
          },
          {
            title: 'Zweryfikuj drzewo struktury',
            explanation:
              'Drzewo jednoznacznie odpowiada opcji D.',
            treeFormula: '((p ∧ ¬q) → ¬p) → (q ∧ r)',
          },
        ],
        finalSummary: '→ → [∧p¬q] [¬p] [∧qr] = (p ∧ ¬q → ¬p) → q ∧ r — poprawna odpowiedź: D.',
      },
      {
        id: 'k22-5-7',
        number: 7,
        title: 'Dysjunkcyjna postać normalna (DPN)',
        category: 'Rachunek zdań · Postacie normalne',
        prompt: 'Dysjunkcyjna postać normalna formuły jest następująca:',
        formula: 'p → ¬p ∨ ¬r',
        options: [
          { letter: 'A', text: '(¬p ∧ p) ∨ (r ∧ r),', isMath: true },
          { letter: 'B', text: '(¬p ∧ ¬p) ∨ (¬r ∧ ¬r),', isMath: true },
          { letter: 'C', text: '(¬p ∧ p) ∨ (¬r ∧ r),', isMath: true },
          { letter: 'D', text: '(p ∧ p) ∨ (¬r ∧ ¬r).', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Eliminacja implikacji i idempotentność',
            definition: 'p → (¬p ∨ ¬r) ≡ ¬p ∨ ¬p ∨ ¬r ≡ ¬p ∨ ¬r ≡ (¬p ∧ ¬p) ∨ (¬r ∧ ¬r).',
          },
        ],
        steps: [
          {
            title: 'Przekształć formułę do DPN',
            explanation:
              '1) Usuwamy implikację: p → (¬p ∨ ¬r) ≡ ¬p ∨ ¬p ∨ ¬r.\n2) Uproszczenie (idempotentność): ¬p ∨ ¬r.\n3) Zapis każdego literału jako koniunkcji: (¬p ∧ ¬p) ∨ (¬r ∧ ¬r).',
            formula: 'p → ¬p ∨ ¬r  ≡  ¬p ∨ ¬r  ≡  (¬p ∧ ¬p) ∨ (¬r ∧ ¬r)   ⇒   Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'p → ¬p ∨ ¬r ≡ (¬p ∧ ¬p) ∨ (¬r ∧ ¬r) — poprawna odpowiedź: B.',
      },
      {
        id: 'k22-5-8',
        number: 8,
        title: 'Wnioskowanie z raportu policji (Henry, świadek, testament)',
        category: 'Rachunek zdań · Wnioskowanie',
        reportQuote:
          'Henry nie popełnił samobójstwa lub też, jeśli świadek był zastraszony, to testamentu nie odnaleziono. Jeśli Henry popełnił samobójstwo, to świadek nie był zastraszony. Jeśli testamentu nie odnaleziono, to świadek był zastraszony. Jeśli świadek nie był zastraszony to testamentu nie odnaleziono.',
        prompt: 'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        options: [
          { letter: 'A', text: 'Henry popełnił samobójstwo i testamentu nie odnaleziono.' },
          { letter: 'B', text: 'Świadek był zastraszony i Henry nie popełnił samobójstwa.' },
          { letter: 'C', text: 'Świadek był zastraszony i testamentu nie odnaleziono.' },
          { letter: 'D', text: 'Henry nie popełnił samobójstwa i świadek nie był zastraszony.' },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Oznaczenia zmiennych',
            definition: 'H — Henry popełnił samobójstwo, S — świadek był zastraszony, T — testament odnaleziono.',
          },
        ],
        steps: [
          {
            title: 'Przetłumacz 4 zdania na formuły',
            explanation:
              '(1) ¬H ∨ (S → ¬T)\n(2) H → ¬S\n(3) ¬T → S\n(4) ¬S → ¬T',
            formula: '(1) ¬H ∨ (S → ¬T)   (2) H → ¬S   (3) ¬T → S   (4) ¬S → ¬T',
          },
          {
            title: 'Ze zdań (4) i (3) wyznacz S',
            explanation:
              'Gdyby S = 0 (czyli ¬S = 1), to z (4) mamy ¬T = 1, a wtedy z (3) wynika S = 1 — sprzeczność! Zatem S = 1 (świadek był zastraszony).',
            formula: 'S = 0 ⇒ ¬T = 1 (z 4) ⇒ S = 1 (z 3)  ⚡  ⇒  S = 1',
          },
          {
            title: 'Ze zdania (2) wyznacz H i sprawdź T (uwaga na C!)',
            explanation:
              'Skoro S = 1 (¬S = 0), to ze zdania (2): H → 0 = 1 ⇒ H = 0 (Henry NIE popełnił samobójstwa).\nA co z T? Skoro ¬H = 1, zdanie (1) jest prawdziwe niezależnie od T! Zarówno (H=0, S=1, T=0), jak i (H=0, S=1, T=1) spełniają wszystkie 4 zdania, więc o testamencie nic nie wiadomo (C odpada!).',
            formula: 'Pewne są wyłącznie S = 1 i H = 0   ⇒   Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Z raportu wynika wyłącznie S = 1 oraz H = 0 (T jest nieokreślone) — poprawna odpowiedź: B.',
      },
      {
        id: 'k22-5-9',
        number: 9,
        title: 'Tożsamości w dowolnej algebrze Boole’a',
        category: 'Algebra Boole’a · Tożsamości',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "(x + y') · (x + y) = y,", isMath: true },
          { letter: 'B', text: "x + y + x' · (y' + x) = x,", isMath: true },
          { letter: 'C', text: "x + (x + y) · (x' + y') = x + x'y,", isMath: true },
          { letter: 'D', text: "x · y · (x' + y') = 0.", isMath: true },
        ],
        correctLetters: ['C', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Prawo uzupełnienia i de Morgana w D',
            definition: "(x' + y') = (x · y)', więc D ma postać (x · y) · (x · y)' = 0 — zawsze prawda!",
          },
        ],
        steps: [
          {
            title: 'Obal A i B',
            explanation:
              "• A: (x + y') · (x + y) = x + (y'·y) = x ≠ y (dla x=1, y=0: 1 ≠ 0).\n• B: lewa strona to (x + y) + x'·y' = (x + y) + (x + y)' = 1 ≠ x (dla x=0: 1 ≠ 0).",
            formula: 'A: x ≠ y (fałsz)   |   B: 1 ≠ x (fałsz)',
          },
          {
            title: "Sprawdź C: x + (x + y) · (x' + y') = x + x'y",
            explanation:
              "Wymnażamy: (x + y)·(x' + y') = x·y' + x'·y. Po dodaniu x mamy: x + x·y' + x'·y = (x + x·y') + x'·y = x + x'·y (prawo pochłaniania) ✓!",
            formula: "C: x + x·y' + x'·y = x + x'·y   ⇒   POPRAWNA (C)",
          },
          {
            title: "Sprawdź D: x · y · (x' + y') = 0",
            explanation:
              "Z prawa de Morgana x' + y' = (x · y)', więc x · y · (x · y)' = 0 (lub wprost z rozdzielności: x·y·x' + x·y·y' = 0 + 0 = 0) ✓!",
            formula: "D: (x · y) · (x · y)' = 0   ⇒   POPRAWNA (D)",
          },
        ],
        finalSummary: 'Prawdziwe w każdej algebrze Boole’a są tożsamości C oraz D.',
      },
      {
        id: 'k22-5-10',
        number: 10,
        title: 'Własności relacji „2x + y jest nieparzyste” w ℕ',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze liczb naturalnych ℕ określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ 2x + y jest nieparzyste',
        options: [
          { letter: 'A', text: 'Jest zwrotna i przechodnia.' },
          { letter: 'B', text: 'Jest przechodnia i nie jest symetryczna.' },
          { letter: 'C', text: 'Jest przechodnia i nie jest spójna.' },
          { letter: 'D', text: 'Jest przeciwzwrotna i nie jest asymetryczna.' },
        ],
        correctLetters: ['B', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Kluczowe uproszczenie!',
            definition: 'Liczba 2x jest ZAWSZE parzysta! Zatem 2x + y jest nieparzyste wtedy i tylko wtedy, gdy samo y jest nieparzyste (niezależnie od x!).',
          },
        ],
        steps: [
          {
            title: 'Uprość definicję relacji R',
            explanation:
              'Ponieważ 2x jest parzyste dla każdego x ∈ ℕ, suma 2x + y jest nieparzysta dokładnie wtedy, gdy y jest liczbą nieparzystą.',
            formula: 'R(x, y)  ⇔  y jest nieparzyste',
          },
          {
            title: 'Sprawdź przechodniość, symetryczność i spójność',
            explanation:
              '• Przechodnia? TAK! Jeśli R(x, y) (y nieparzyste) i R(y, z) (z nieparzyste), to z jest nieparzyste, więc R(x, z) zachodzi ✓!\n• Symetryczna? NIE: (2, 1) ∈ R (bo 1 nieparzyste), ale (1, 2) ∉ R (bo 2 parzyste) ⇒ B jest POPRAWNA!\n• Spójna? NIE: dla parzystych 2 ≠ 4 ani (2, 4), ani (4, 2) nie należy do R ⇒ C jest POPRAWNA!',
            formula: 'PRZECHODNIA ✓  |  NIE SYMETRYCZNA ✓  |  NIE SPÓJNA ✓',
          },
          {
            title: 'Obal A (zwrotna) i D (przeciwzwrotna)',
            explanation:
              '• Zwrotna? NIE, bo (2, 2) ∉ R (2 jest parzyste — A odpada).\n• Przeciwzwrotna? NIE, bo (1, 1) ∈ R (1 jest nieparzyste: 2·1 + 1 = 3 — D odpada!).',
            formula: 'ZWROTNA ✗  |  PRZECIWZWROTNA ✗   ⇒   Poprawne odpowiedzi: B, C',
          },
        ],
        finalSummary: 'R(x, y) ⇔ y nieparzyste jest przechodnia, nie jest symetryczna (B), nie jest spójna (C), ani zwrotna, ani przeciwzwrotna.',
      },
      {
        id: 'k22-5-11',
        number: 11,
        title: 'Własności relacji podzielności (x jest dzielnikiem y) w {1, …, 10}',
        category: 'Zbiory i relacje · Porządki',
        prompt: 'W zbiorze X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x jest dzielnikiem y  (x | y)',
        options: [
          { letter: 'A', text: 'Jest antysymetryczna.' },
          { letter: 'B', text: 'Jest relacją porządku częściowego.' },
          { letter: 'C', text: 'Jest relacją równoważności.' },
          { letter: 'D', text: 'Jest spójna.' },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Podzielność x | y na liczbach dodatnich',
            definition: 'Modelowy przykład relacji porządku częściowego (zwrotna, antysymetryczna, przechodnia), który NIE jest porządkiem liniowym (bo np. 2 i 3 są nieporównywalne).',
          },
        ],
        steps: [
          {
            title: 'Sprawdź zwrotność, antysymetryczność (A) i przechodniość ⇒ porządek częściowy (B)',
            explanation:
              '• Zwrotna: x | x dla każdego x ∈ X ✓.\n• Antysymetryczna: na liczbach dodatnich, jeśli x | y i y | x, to x ≤ y i y ≤ x, więc x = y ✓ (POPRAWNA: A).\n• Przechodnia: jeśli x | y i y | z, to x | z ✓.\nŁącznie te 3 własności dają relację porządku częściowego ✓ (POPRAWNA: B)!',
            formula: 'ZWROTNA ✓  |  ANTYSYMETRYCZNA ✓ (A)  |  PRZECHODNIA ✓  ⇒  PORZĄDEK CZĘŚCIOWY ✓ (B)',
          },
          {
            title: 'Obal równoważność (C) i spójność (D)',
            explanation:
              '• Równoważność? NIE, bo brak symetrii: 2 | 4, ale 4 ∤ 2.\n• Spójna? NIE: dla 2 ≠ 3 zachodzi 2 ∤ 3 oraz 3 ∤ 2!',
            formula: 'SYMETRYCZNA ✗ (C)  |  SPÓJNA ✗ (D)   ⇒   Poprawne odpowiedzi: A, B',
          },
        ],
        finalSummary: 'Podzielność na {1..10} jest antysymetryczna (A) i jest porządkiem częściowym (B); nie jest symetryczna ani spójna.',
      },
      {
        id: 'k22-5-12',
        number: 12,
        title: 'Tożsamości rachunku zbiorów dla dowolnych A, B, C',
        category: 'Zbiory i relacje · Rachunek zbiorów',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: '(A \\ B) ∪ C = (A ∪ B ∪ C) \\ B.', isMath: true },
          { letter: 'B', text: 'B \\ (A ∪ C) = (B \\ A) ∩ (B \\ C).', isMath: true },
          { letter: 'C', text: '(A ∪ B) ∩ C = A ∪ (B ∩ C).', isMath: true },
          { letter: 'D', text: '(A \\ B) \\ C = A \\ (B ∪ C).', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-5-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 5 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Dwa klasyczne prawa różnicy i sumy',
            definition: 'B \\ (A ∪ C) = (B \\ A) ∩ (B \\ C) (prawo de Morgana) oraz (A \\ B) \\ C = A \\ (B ∪ C).',
          },
        ],
        steps: [
          {
            title: 'Obal A i C kontrprzykładami',
            explanation:
              '• A: dla A = ∅, B = {1}, C = {1}: L = ∅ ∪ {1} = {1}, natomiast P = {1} \\ {1} = ∅ (fałsz).\n• C: dla A = {1}, B = ∅, C = ∅: L = {1} ∩ ∅ = ∅, natomiast P = {1} ∪ ∅ = {1} (fałsz).',
            formula: 'A: {1} ≠ ∅ (fałsz)   |   C: ∅ ≠ {1} (fałsz)',
          },
          {
            title: 'Sprawdź B i D metodą elementową',
            explanation:
              '• B: x ∈ B ∧ ¬(x ∈ A ∨ x ∈ C) ⇔ (x ∈ B ∧ x ∉ A) ∧ (x ∈ B ∧ x ∉ C) ✓.\n• D: (x ∈ A ∧ x ∉ B) ∧ x ∉ C ⇔ x ∈ A ∧ ¬(x ∈ B ∨ x ∈ C) ✓.',
            formula: 'B: prawda ✓   |   D: prawda ✓   ⇒   Poprawne odpowiedzi: B, D',
          },
        ],
        finalSummary: 'Prawdziwe dla dowolnych A, B, C są tożsamości B oraz D.',
      },
    ],
  },
];
