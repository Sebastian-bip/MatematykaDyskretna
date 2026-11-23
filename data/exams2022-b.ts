import { ExamSet } from '@/lib/types';

export const EXAM_SETS_2022_PART_B: ExamSet[] = [
  // =========================================================================
  // KOLOKWIUM 2022 — ARKUSZ 3 (12 zadań)
  // =========================================================================
  {
    id: 'k22-arkusz-3',
    year: '2022',
    tabLabel: 'Arkusz 3',
    shortLabel: 'Kolokwium 2022 · Arkusz 3 (12 zadań)',
    title: 'Logika — zaliczenie | Kolokwium 2022 — Arkusz 3',
    subtitle: 'Test wielokrotnego wyboru (1–2 poprawne)',
    metaLine: '12 zadań · I rok Informatyki · +1 pkt poprawna / −1 pkt błędna / 0 pkt brak',
    description:
      'Trzeci pełny arkusz 12 zadań z kolokwium z 2022 roku. Zwróć uwagę na zadanie nr 11 (relacja x² + y² ≥ 5 w {1, …, 10} jest spójna!) oraz zadanie nr 9 (tożsamość równoważności w algebrze Boole’a).',
    questions: [
      {
        id: 'k22-3-1',
        number: 1,
        title: 'Poprawność składniowa formuł rachunku zdań',
        category: 'Rachunek zdań · Składnia',
        prompt: 'Które podpunkty zawierają tylko napisy będące poprawnymi składniowo formułami rachunku zdań:',
        options: [
          { letter: 'A', text: '¬p ∨ ¬q ↔ ¬q ∧ p,  (¬p¬ ∨ p) ∧ ¬r,', isMath: true },
          { letter: 'B', text: '(q ∧ ¬p) ↔ ¬(p ∨ ¬q),  ¬(¬(¬p ∧ ¬q) → ¬r),', isMath: true },
          { letter: 'C', text: '(¬q ↔ p) → ¬(p¬q),  p ∧ (¬q ∧ ¬p) → r,', isMath: true },
          { letter: 'D', text: '(p ∧ q) ∧ ¬r → ¬p,  p ∧ (q ∧ (¬r → ¬p)).', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Negacja przed spójnikiem',
            definition: 'Zapis „¬p¬ ∨ p” stawia ¬ po p i bezpośrednio przed spójnikiem ∨ — to podwójny błąd składniowy.',
          },
          {
            term: 'Brak spójnika w nawiasie',
            definition: 'W „¬(p¬q)” brakuje spójnika dwuargumentowego między p i ¬q.',
          },
        ],
        steps: [
          {
            title: 'Odrzuć A i C',
            explanation:
              '• W A: (¬p¬ ∨ p) ma błędną negację ¬ bezpośrednio po p (i przed ∨).\n• W C: ¬(p¬q) nie ma spójnika dwuargumentowego pomiędzy p oraz ¬q.',
            formula: 'A: błąd „¬p¬ ∨”   |   C: błąd „(p¬q)”',
          },
          {
            title: 'Zweryfikuj B i D',
            explanation:
              'Wszystkie formuły w B i D mają poprawne ustawienie negacji, spójników dwuargumentowych oraz domknięte nawiasy.',
            formula: 'B: oba poprawne ✓   |   D: oba poprawne ✓   ⇒   Poprawne odpowiedzi: B, D',
          },
        ],
        finalSummary: 'Wyłącznie poprawne formuły znajdują się w B oraz D.',
      },
      {
        id: 'k22-3-2',
        number: 2,
        title: 'Klasyfikacja formuły (tautologia / spełnialna / sprzeczna)',
        category: 'Rachunek zdań · Semantyka',
        prompt: 'Dla poniższej formuły zaznacz stwierdzenia prawdziwe. Formuła:',
        formula: '(¬p ∨ r) ∧ (¬q ∨ r) ∧ (p ∨ q) → ¬r',
        options: [
          { letter: 'A', text: 'jest spełnialna i nie jest tautologią;' },
          { letter: 'B', text: 'jest tautologią i nie jest spełnialna;' },
          { letter: 'C', text: 'jest tautologią i jest spełnialna;' },
          { letter: 'D', text: 'jest sprzeczna.' },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Analiza implikacji A → ¬r',
            definition: 'Gdy r = 0, to ¬r = 1, więc cała implikacja (… → 1) daje 1! Gdy r = 1, to ¬r = 0, więc wystarczy sprawić, aby poprzednik był 1.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź spełnialność (wartość 1)',
            explanation:
              'Wstaw r = 0 (np. p = 0, q = 0, r = 0). Wtedy następnik ¬r = 1, więc cała implikacja daje 1.',
            formula: 'Dla (0, 0, 0):  … → 1 = 1  ⇒  SPEŁNIALNA',
          },
          {
            title: 'Sprawdź tautologię (szukamy 0)',
            explanation:
              'Wstaw r = 1, p = 1, q = 1. Wtedy:\n• ¬p ∨ r = 0 ∨ 1 = 1\n• ¬q ∨ r = 0 ∨ 1 = 1\n• p ∨ q = 1 ∨ 1 = 1\n• następnik ¬r = 0.\nCałość: (1 ∧ 1 ∧ 1) → 0 = 0!',
            formula: 'Dla (1, 1, 1):  1 → 0 = 0  ⇒  NIE jest tautologią  ⇒  Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Formuła przyjmuje 1 dla r = 0 oraz 0 dla (1,1,1) — jest spełnialna i nie jest tautologią (A).',
      },
      {
        id: 'k22-3-3',
        number: 3,
        title: 'Wybór formuł spełnialnych niebędących tautologiami',
        category: 'Rachunek zdań · Klasyfikacja',
        prompt: 'Które z poniższych formuł są spełnialne ale nie są tautologiami:',
        options: [
          { letter: 'A', text: '(p ↔ ¬¬p) ∧ (q ∧ q ↔ ¬q),', isMath: true },
          { letter: 'B', text: '(q → p) ∧ (¬q ∨ p),', isMath: true },
          { letter: 'C', text: '¬(p ∧ q) ↔ ¬q ∨ ¬p,', isMath: true },
          { letter: 'D', text: '(p → q) → ¬q.', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Uproszczenie (q ∧ q ↔ ¬q)',
            definition: 'Ponieważ q ∧ q ≡ q, drugi czynnik w A to (q ↔ ¬q) ≡ 0. Koniunkcja z 0 daje zawsze 0 (sprzeczna).',
          },
        ],
        steps: [
          {
            title: 'Odrzuć A (sprzeczna) i C (tautologia)',
            explanation:
              '• W A: drugi nawias to q ↔ ¬q ≡ 0, więc cała koniunkcja ≡ 0 (SPRZECZNA).\n• W C: to dokładnie prawo de Morgana ¬(p ∧ q) ↔ (¬p ∨ ¬q) (TAUTOLOGIA).',
            formula: 'A ≡ 0 (sprzeczna)   |   C ≡ 1 (tautologia)',
          },
          {
            title: 'Sprawdź B i D',
            explanation:
              '• B: (q → p) ∧ (¬q ∨ p) ≡ (¬q ∨ p) ∧ (¬q ∨ p) ≡ ¬q ∨ p. Dla (p=0, q=1) daje 0, dla (p=1, q=1) daje 1 ✓.\n• D: (p → q) → ¬q. Dla (p=1, q=1) daje (1 → 1) → 0 = 0; dla (p=0, q=0) daje (0 → 0) → 1 = 1 ✓.',
            formula: 'B i D przyjmują zarówno 0, jak i 1   ⇒   Poprawne odpowiedzi: B, D',
          },
        ],
        finalSummary: 'A jest sprzeczna, C jest tautologią, a B i D są spełnialne i nie są tautologiami (B, D).',
      },
      {
        id: 'k22-3-4',
        number: 4,
        title: 'Wartościowanie zerujące formułę (wartość 0)',
        category: 'Rachunek zdań · Wartościowanie',
        prompt: 'Dla którego z poniższych wartościowań wartość formuły wynosi 0?',
        formula: '(p → q) ∨ (q → r) → (p → r)',
        options: [
          { letter: 'A', text: 'v(p) = 0, v(q) = 0, v(r) = 1', isMath: true },
          { letter: 'B', text: 'v(p) = 0, v(q) = 0, v(r) = 0', isMath: true },
          { letter: 'C', text: 'v(p) = 1, v(q) = 1, v(r) = 0', isMath: true },
          { letter: 'D', text: 'v(p) = 0, v(q) = 1, v(r) = 1', isMath: true },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Zerowanie następnika (p → r)',
            definition: 'Aby główna implikacja dała 0, następnik (p → r) MUSI być równy 0, a więc p = 1 oraz r = 0!',
          },
        ],
        steps: [
          {
            title: 'Wyzeruj następnik (p → r)',
            explanation:
              '(p → r) = 0 zachodzi wyłącznie wtedy, gdy p = 1 oraz r = 0. Spośród A–D warunek ten spełnia TYLKO opcja C!',
            formula: 'p → r = 0  ⇔  p = 1, r = 0   ⇒   kandydat: C',
          },
          {
            title: 'Zweryfikuj opcję C: v(p) = 1, v(q) = 1, v(r) = 0',
            explanation:
              'Lewa strona: (1 → 1) ∨ (1 → 0) = 1 ∨ 0 = 1.\nPrawa strona: (1 → 0) = 0.\nCała implikacja: 1 → 0 = 0!',
            formula: 'C: (1 ∨ 0) → 0 = 1 → 0 = 0   ⇒   Poprawna odpowiedź: C',
          },
        ],
        finalSummary: 'Tylko C (p=1, q=1, r=0) zeruje następnik (p → r) przy poprzedniku równym 1 — odpowiedź C.',
      },
      {
        id: 'k22-3-5',
        number: 5,
        title: 'Zapis formuły w notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Formuła w notacji polskiej ma postać:',
        formula: '¬(p ∧ ¬q) → ¬(¬p → r)',
        options: [
          { letter: 'A', text: '→ ∧¬pq → ¬¬pr,', isMath: true },
          { letter: 'B', text: '→ ¬ ∧ pq¬ → ¬pr,', isMath: true },
          { letter: 'C', text: '¬ → ∧p¬q¬ → ¬pr,', isMath: true },
          { letter: 'D', text: '→ ¬ ∧ p¬q¬ → ¬pr.', isMath: true },
        ],
        correctLetters: ['D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Główny spójnik',
            definition: 'Głównym spójnikiem jest środkowa strzałka → (nie negacja ¬!). Dlatego C odpada od razu.',
          },
        ],
        steps: [
          {
            title: 'Narysuj drzewo struktury formuły',
            explanation:
              'Korzeniem drzewa jest →. Lewe dziecko to ¬(p ∧ ¬q), a prawe dziecko to ¬(¬p → r).',
            treeFormula: '¬(p ∧ ¬q) → ¬(¬p → r)',
          },
          {
            title: 'Wypisz poddrzewa w kolejności pre-order',
            explanation:
              '• Lewe poddrzewo ¬(p ∧ ¬q) ⇒ ¬ ∧ p ¬q (uwaga: B zgubiło ¬ przed q!)\n• Prawe poddrzewo ¬(¬p → r) ⇒ ¬ → ¬p r\n• Razem: → ¬ ∧ p ¬q ¬ → ¬p r.',
            formula: '→ ¬ ∧ p¬q¬ → ¬pr   ⇒   Poprawna odpowiedź: D',
          },
        ],
        finalSummary: 'Korzeń →, lewo ¬ ∧ p¬q, prawo ¬ → ¬pr ⇒ → ¬ ∧ p¬q¬ → ¬pr (D).',
      },
      {
        id: 'k22-3-6',
        number: 6,
        title: 'Odczyt formuły z notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Poniżej podana formuła w notacji polskiej jest równoważna formule:',
        formula: '∨ ↔ ∧ p r q ∧ ¬r p',
        options: [
          { letter: 'A', text: '(p ∧ r ↔ q) ∨ (¬r ∧ p)', isMath: true },
          { letter: 'B', text: '(p ∨ r ↔ q) ∧ (¬r ∧ p)', isMath: true },
          { letter: 'C', text: '(p ∧ r ↔ q) ∨ ¬(r ∧ p)', isMath: true },
          { letter: 'D', text: '(p ∨ r ↔ q) ∧ ¬(r ∧ p)', isMath: true },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Pozycja ¬ w prawym bloku',
            definition: 'W napisie „∧ ¬r p” negacja stoi PO spójniku ∧ (więc neguje samo r: ¬r ∧ p). Aby otrzymać ¬(r ∧ p), zapis musiałby brzmieć „¬ ∧ r p”!',
          },
        ],
        steps: [
          {
            title: 'Podziel ciąg na dwa poddrzewa spójnika głównego ∨',
            explanation:
              'Główny spójnik to ∨ (odpadają B i D z głównym ∧).\n• Lewy blok: ↔ [∧ p r] q  =  (p ∧ r ↔ q).\n• Prawy blok: ∧ [¬r] p  =  (¬r ∧ p).',
            formula: '∨  [↔ ∧ p r q]   [∧ ¬r p]   =   (p ∧ r ↔ q) ∨ (¬r ∧ p)',
          },
          {
            title: 'Zweryfikuj drzewo struktury',
            explanation:
              'Zauważ różnicę między A i C: w naszym napisie mamy ∧ ¬r p (czyli ¬r ∧ p), a nie ¬ ∧ r p.',
            treeFormula: '((p ∧ r) ↔ q) ∨ (¬r ∧ p)',
          },
        ],
        finalSummary: '∨ [↔ ∧pr q] [∧ ¬r p] = (p ∧ r ↔ q) ∨ (¬r ∧ p) — poprawna odpowiedź: A.',
      },
      {
        id: 'k22-3-7',
        number: 7,
        title: 'Dysjunkcyjna postać normalna (DPN)',
        category: 'Rachunek zdań · Postacie normalne',
        prompt: 'Dysjunkcyjna postać normalna formuły jest następująca:',
        formula: 'p ∧ ¬q → ¬p',
        options: [
          { letter: 'A', text: '(p ∧ ¬q) ∨ (¬p ∧ q),', isMath: true },
          { letter: 'B', text: 'p ∨ q,', isMath: true },
          { letter: 'C', text: '¬p ∨ ¬q,', isMath: true },
          { letter: 'D', text: '¬p ∨ q.', isMath: true },
        ],
        correctLetters: ['D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Pojedynczy literał to też koniunkcja',
            definition: 'W definicji DPN pojedynczy literał (np. ¬p lub q) jest trywialną 1-elementową koniunkcją, więc ¬p ∨ q jest poprawną DPN!',
          },
        ],
        steps: [
          {
            title: 'Eliminuj implikację i użyj prawa de Morgana',
            explanation:
              'Zamieniamy A → B na ¬A ∨ B, gdzie A = (p ∧ ¬q) i B = ¬p:',
            formula: '(p ∧ ¬q) → ¬p  ≡  ¬(p ∧ ¬q) ∨ ¬p  ≡  (¬p ∨ ¬¬q) ∨ ¬p',
          },
          {
            title: 'Uprość podwójną negację i idempotentność',
            explanation:
              '¬¬q ≡ q oraz ¬p ∨ ¬p ≡ ¬p. Otrzymujemy ¬p ∨ q!',
            formula: '¬p ∨ q ∨ ¬p  ≡  ¬p ∨ q   ⇒   Poprawna odpowiedź: D',
          },
        ],
        finalSummary: 'p ∧ ¬q → ¬p ≡ ¬p ∨ q ∨ ¬p ≡ ¬p ∨ q — poprawna odpowiedź: D.',
      },
      {
        id: 'k22-3-8',
        number: 8,
        title: 'Wnioskowanie z raportu policji (Henry, świadek, testament)',
        category: 'Rachunek zdań · Wnioskowanie',
        reportQuote:
          'Świadek był zastraszony lub też, jeśli testament odnaleziono, to Henry popełnił samobójstwo. Jeśli świadek nie był zastraszony, to testamentu nie odnaleziono. Jeśli Henry popełnił samobójstwo to testament odnaleziono. Jeśli testamentu nie odnaleziono, to Henry popełnił samobójstwo.',
        prompt: 'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        options: [
          { letter: 'A', text: 'Świadek był zastraszony i testament odnaleziono.' },
          { letter: 'B', text: 'Świadek był zastraszony i testamentu nie odnaleziono.' },
          { letter: 'C', text: 'Testament odnaleziono i Henry popełnił samobójstwo.' },
          { letter: 'D', text: 'Henry nie popełnił samobójstwa i świadek był zastraszony.' },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 2/2, zadania 7–12)',
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
              '(1) S ∨ (T → H)\n(2) ¬S → ¬T\n(3) H → T\n(4) ¬T → H',
            formula: '(1) S ∨ (T → H)   (2) ¬S → ¬T   (3) H → T   (4) ¬T → H',
          },
          {
            title: 'Ze zdań (4) i (3) wyznacz T',
            explanation:
              'Gdyby T = 0, to z (4) wynika H = 1, a wtedy z (3) wynika T = 1 — sprzeczność! Zatem T = 1 (testament odnaleziono).',
            formula: 'T = 0 ⇒ H = 1 (z 4) ⇒ T = 1 (z 3)  ⚡  ⇒  T = 1',
          },
          {
            title: 'Ze zdania (2) wyznacz S i sprawdź H',
            explanation:
              'Skoro T = 1 (czyli ¬T = 0), to ze zdania (2): ¬S → 0 = 1 ⇒ ¬S = 0 ⇒ S = 1 (świadek był zastraszony).\nA co z H? Dla S = 1, T = 1 wszystkie 4 zdania są prawdziwe zarówno dla H = 0, jak i dla H = 1 (zdanie (1) jest prawdziwe dzięki S = 1!). Więc C odpada!',
            formula: 'Pewne są tylko S = 1 i T = 1   ⇒   Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Z raportu wynika wyłącznie S = 1 i T = 1 (H pozostaje nieokreślone) — poprawna odpowiedź: A.',
      },
      {
        id: 'k22-3-9',
        number: 9,
        title: 'Tożsamości w dowolnej algebrze Boole’a',
        category: 'Algebra Boole’a · Tożsamości',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "x · y' + y · x = x',", isMath: true },
          { letter: 'B', text: '(x + y) · x = x,', isMath: true },
          { letter: 'C', text: "(x + y') · (x' + y) = x · y + x'y',", isMath: true },
          { letter: 'D', text: "(x · y)' + x + y = x' + y'.", isMath: true },
        ],
        correctLetters: ['B', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Prawo pochłaniania',
            definition: '(x + y) · x = x oraz x + x · y = x to dwa dualne prawa pochłaniania.',
          },
          {
            term: 'Wymnażanie w algebrze Boole’a',
            definition: "(x + y') · (x' + y) = x·x' + x·y + y'·x' + y'·y = 0 + x·y + x'·y' + 0 = x·y + x'·y'!",
          },
        ],
        steps: [
          {
            title: 'Sprawdź B i C (prawdziwe tożsamości)',
            explanation:
              "• B: (x + y) · x = x to wprost prawo pochłaniania ✓.\n• C: wymnażamy nawiasy z rozdzielności: (x + y')·(x' + y) = x·x' + x·y + y'·x' + y'·y = 0 + x·y + x'·y' + 0 = x·y + x'·y' ✓.",
            formula: "B: pochłanianie ✓   |   C: (x + y')(x' + y) = xy + x'y' ✓",
          },
          {
            title: 'Obal A i D kontrprzykładem',
            explanation:
              "• A: x·y' + x·y = x·(y' + y) = x ≠ x' (dla x = 1: 1 ≠ 0).\n• D: (x·y)' + x + y = (x' + y') + x + y = (x' + x) + (y' + y) = 1 + 1 = 1, a prawa strona dla x = 1, y = 1 daje 0!",
            formula: 'A: x ≠ x\' (fałsz)   |   D: 1 ≠ 0 dla (1,1) (fałsz)   ⇒   Poprawne odpowiedzi: B, C',
          },
        ],
        finalSummary: 'Prawdziwe w każdej algebrze Boole’a są tożsamości B (pochłanianie) oraz C (wymnożenie nawiasów).',
      },
      {
        id: 'k22-3-10',
        number: 10,
        title: 'Własności relacji „x + y jest parzyste” w ℕ',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze liczb naturalnych ℕ określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x + y jest parzyste',
        options: [
          { letter: 'A', text: 'Jest symetryczna i przechodnia.' },
          { letter: 'B', text: 'Jest zwrotna i spójna.' },
          { letter: 'C', text: 'Jest zwrotna i nie jest antysymetryczna.' },
          { letter: 'D', text: 'Jest asymetryczna i przechodnia.' },
        ],
        correctLetters: ['A', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Parzystość sumy',
            definition: 'Suma x + y jest parzysta ⇔ x i y są tej samej parzystości (obie parzyste lub obie nieparzyste). Jest to klasyczna relacja równoważności!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź zwrotność, symetryczność i przechodniość',
            explanation:
              '• Zwrotna: x + x = 2x (parzyste) ✓.\n• Symetryczna: x + y = y + x ✓.\n• Przechodnia: jeśli x ≡ y (mod 2) i y ≡ z (mod 2), to x ≡ z (mod 2), czyli x + z parzyste ✓.',
            formula: 'ZWROTNA ✓  |  SYMETRYCZNA ✓  |  PRZECHODNIA ✓  ⇒  POPRAWNA: A',
          },
          {
            title: 'Sprawdź antysymetryczność, asymetryczność i spójność',
            explanation:
              '• Antysymetryczna? NIE: (1, 3) ∈ R (1+3=4) oraz (3, 1) ∈ R (3+1=4), ale 1 ≠ 3! Zatem relacja NIE jest antysymetryczna ⇒ POPRAWNA: C!\n• Spójna? NIE: (1, 2) ∉ R i (2, 1) ∉ R (B odpada).\n• Asymetryczna? NIE: (1, 1) ∈ R (D odpada).',
            formula: 'NIE ANTYSYMETRYCZNA ✓  |  SPÓJNA ✗  |  ASYMETRYCZNA ✗  ⇒  Poprawne odpowiedzi: A, C',
          },
        ],
        finalSummary: 'Relacja x + y parzyste jest zwrotna, symetryczna, przechodnia i nie jest antysymetryczna — A, C.',
      },
      {
        id: 'k22-3-11',
        number: 11,
        title: 'Własności relacji x² + y² ≥ 5 w zbiorze {1, …, 10}',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x² + y² ≥ 5',
        options: [
          { letter: 'A', text: 'Jest symetryczna i nie jest zwrotna.' },
          { letter: 'B', text: 'Jest spójna.' },
          { letter: 'C', text: 'Jest relacją równoważności.' },
          { letter: 'D', text: 'Jest przechodnia.' },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Która JEDNA para wypada z relacji?',
            definition: 'W całym zbiorze X = {1, …, 10} jedyną parą, dla której x² + y² < 5, jest (1, 1), bo 1² + 1² = 2 < 5! Wszystkie pozostałe 99 par NALEŻĄ do R!',
          },
          {
            term: 'Definicja spójności (T-3.7)',
            definition: '∀x, y ∈ X: x ≠ y ⇒ (xRy ∨ yRx). Spójność bada wyłącznie pary RÓŻNYCH elementów x ≠ y!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź symetryczność i zwrotność (A)',
            explanation:
              '• Symetryczna? TAK: x² + y² = y² + x².\n• Zwrotna? NIE: dla x = 1 mamy 1² + 1² = 2 < 5, więc (1, 1) ∉ R!\nZatem A jest prawdziwe (a C od razu odpada, bo brak zwrotności).',
            formula: 'SYMETRYCZNA ✓  |  NIE ZWROTNA ✓  (bo (1, 1) ∉ R)  ⇒  POPRAWNA: A',
          },
          {
            title: 'Sprawdź spójność (B) — uwaga na x ≠ y!',
            explanation:
              'Dla dowolnych dwóch RÓŻNYCH liczb x ≠ y ze zbioru {1, …, 10} najmniejsza możliwa suma kwadratów to 1² + 2² = 5 ≥ 5! Zatem dla każdych x ≠ y zachodzi xRy (i yRx).',
            formula: '∀x ≠ y ∈ {1..10}: x² + y² ≥ 1² + 2² = 5  ⇒  SPÓJNA ✓  (POPRAWNA: B)',
          },
          {
            title: 'Obal przechodniość (D) kontrprzykładem z jedynką!',
            explanation:
              'Mamy (1, 2) ∈ R (bo 1² + 2² = 5 ≥ 5) oraz (2, 1) ∈ R (bo 2² + 1² = 5 ≥ 5), ale (1, 1) ∉ R (bo 1² + 1² = 2 < 5)!',
            formula: '(1, 2) ∈ R ∧ (2, 1) ∈ R, ale (1, 1) ∉ R  ⇒  PRZECHODNIA ✗  ⇒  Poprawne: A, B',
          },
        ],
        finalSummary: 'W {1..10} brakuje tylko pary (1, 1): relacja jest symetryczna, niezwrotna (A) i spójna (B), ale nie jest przechodnia!',
      },
      {
        id: 'k22-3-12',
        number: 12,
        title: 'Tożsamości rachunku zbiorów dla dowolnych A, B, C',
        category: 'Zbiory i relacje · Rachunek zbiorów',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: 'A ∩ C = (A \\ C) ∪ B.', isMath: true },
          { letter: 'B', text: 'A \\ (B ∪ C) = (A \\ B) \\ C.', isMath: true },
          { letter: 'C', text: 'C \\ (A ∩ B) = (C \\ A) ∪ (C \\ B).', isMath: true },
          { letter: 'D', text: '(A ∩ B) ∪ (C ∩ B) = B.', isMath: true },
        ],
        correctLetters: ['B', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-3-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 3 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Podwójne odejmowanie zbiorów',
            definition: '(A \\ B) \\ C = A \\ (B ∪ C): element należy do A i nie należy ani do B, ani do C.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź B i C metodą elementową',
            explanation:
              '• B: x ∈ A ∧ ¬(x ∈ B ∨ x ∈ C) ⇔ (x ∈ A ∧ x ∉ B) ∧ x ∉ C ⇔ x ∈ (A \\ B) \\ C ✓.\n• C: x ∈ C ∧ ¬(x ∈ A ∧ x ∈ B) ⇔ x ∈ C ∧ (x ∉ A ∨ x ∉ B) ⇔ (x ∈ C ∧ x ∉ A) ∨ (x ∈ C ∧ x ∉ B) ✓ (prawo de Morgana).',
            formula: 'B: prawda ✓   |   C: prawda ✓',
          },
          {
            title: 'Obal A i D kontrprzykładami',
            explanation:
              '• A: dla A = {1}, B = ∅, C = {1}: L = {1}, P = ∅.\n• D: dla A = C = ∅, B = {1}: L = ∅ ≠ {1} = B.',
            formula: 'A: {1} ≠ ∅ (fałsz)   |   D: ∅ ≠ {1} (fałsz)   ⇒   Poprawne odpowiedzi: B, C',
          },
        ],
        finalSummary: 'Prawdziwe dla dowolnych A, B, C są tożsamości B oraz C.',
      },
    ],
  },

  // =========================================================================
  // KOLOKWIUM 2022 — ARKUSZ 4 (12 zadań)
  // =========================================================================
  {
    id: 'k22-arkusz-4',
    year: '2022',
    tabLabel: 'Arkusz 4',
    shortLabel: 'Kolokwium 2022 · Arkusz 4 (12 zadań)',
    title: 'Logika — zaliczenie | Kolokwium 2022 — Arkusz 4',
    subtitle: 'Test wielokrotnego wyboru',
    metaLine: '12 zadań · I rok Informatyki · +1 pkt poprawna / −1 pkt błędna / 0 pkt brak',
    description:
      'Czwarty pełny arkusz 12 zadań z kolokwium z 2022 roku. Zwróć uwagę na ciekawe zadanie nr 11 (relacja x² = y² na dodatnim zbiorze {1, …, 10} jest relacją równości — spełnia aż 3 warunki A, B, C!) oraz zadanie nr 8 (spójnik „i też”!).',
    questions: [
      {
        id: 'k22-4-1',
        number: 1,
        title: 'Poprawność składniowa formuł rachunku zdań',
        category: 'Rachunek zdań · Składnia',
        prompt: 'Które podpunkty zawierają tylko napisy będące poprawnymi składniowo formułami rachunku zdań:',
        options: [
          { letter: 'A', text: '(p ∨ ¬q) → (¬q ∧ p),  (¬p → ¬p) ∧ ¬r,', isMath: true },
          { letter: 'B', text: '(q ∧ ¬p) ↔ ¬(p¬q),  ¬((¬p ∧ ¬q) → ¬r),', isMath: true },
          { letter: 'C', text: '(q → p) → (r ∨ (p¬q)),  p ∧ (¬q(q ∧ ¬p),', isMath: true },
          { letter: 'D', text: '((¬p ∨ q) ∧ ¬p) → r,  p ∧ (q → (¬r → ¬p)).', isMath: true },
        ],
        correctLetters: ['A', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Brak spójnika dwuargumentowego',
            definition: 'W wyrażeniach typu „(p¬q)” oraz „¬q(q ∧ ¬p)” dwa wyrażenia zdaniowe stoją obok siebie bez spójnika dwuargumentowego.',
          },
        ],
        steps: [
          {
            title: 'Odrzuć B i C',
            explanation:
              '• W B: w pierwszym napisie mamy ¬(p¬q) — brak spójnika między p a ¬q.\n• W C: oba napisy są błędne — pierwszy ma (p¬q), a drugi ma brak spójnika i niedomknięty nawias w p ∧ (¬q(q ∧ ¬p)!',
            formula: 'B: błąd „(p¬q)”   |   C: błędy „(p¬q)” oraz niedomknięty nawias',
          },
          {
            title: 'Zweryfikuj A i D',
            explanation:
              'Wszystkie cztery formuły w A i D mają poprawną składnię i zbalansowane nawiasy.',
            formula: 'A: poprawne ✓   |   D: poprawne ✓   ⇒   Poprawne odpowiedzi: A, D',
          },
        ],
        finalSummary: 'Wyłącznie poprawne formuły znajdują się w podpunktach A oraz D.',
      },
      {
        id: 'k22-4-2',
        number: 2,
        title: 'Klasyfikacja formuły (sprzeczna!)',
        category: 'Rachunek zdań · Semantyka',
        prompt: 'Dla poniższej formuły zaznacz stwierdzenia prawdziwe. Formuła:',
        formula: '(p ∨ q → r) ∧ ¬(q → r)',
        options: [
          { letter: 'A', text: 'jest spełnialna i nie jest tautologią;' },
          { letter: 'B', text: 'jest tautologią i nie jest spełnialna;' },
          { letter: 'C', text: 'jest tautologią i jest spełnialna;' },
          { letter: 'D', text: 'jest sprzeczna.' },
        ],
        correctLetters: ['D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Kiedy koniunkcja jest sprzeczna?',
            definition: 'Gdy założenie, że oba czynniki równają się 1, prowadzi bezpośrednio do sprzeczności.',
          },
        ],
        steps: [
          {
            title: 'Załóż, że formuła przyjmuje wartość 1',
            explanation:
              'Aby koniunkcja (p ∨ q → r) ∧ ¬(q → r) dała 1, muszą zachodzić jednocześnie:\n1) ¬(q → r) = 1  ⇒  (q → r) = 0  ⇒  q = 1 oraz r = 0.\n2) (p ∨ q → r) = 1.',
            formula: '¬(q → r) = 1  ⇒  q = 1  i  r = 0',
          },
          {
            title: 'Podstaw q = 1 i r = 0 do pierwszego nawiasu',
            explanation:
              'Skoro q = 1, to p ∨ q = p ∨ 1 = 1 (niezależnie od p!). Wtedy (p ∨ q → r) = (1 → 0) = 0! Sprzeczność — formuła NIGDY nie może dać 1!',
            formula: '(p ∨ 1 → 0) = (1 → 0) = 0  ⚡  ⇒  Formuła jest SPRZECZNA (D)',
          },
        ],
        finalSummary: 'Wymuszenie ¬(q → r) = 1 wymusza q = 1, r = 0, co natychmiast zeruje (p ∨ q → r) ⇒ formuła jest sprzeczna (D).',
      },
      {
        id: 'k22-4-3',
        number: 3,
        title: 'Wybór formuł spełnialnych niebędących tautologiami',
        category: 'Rachunek zdań · Klasyfikacja',
        prompt: 'Które z poniższych formuł są spełnialne ale nie są tautologiami:',
        options: [
          { letter: 'A', text: '(¬p ∨ q) ↔ (p ∧ q),', isMath: true },
          { letter: 'B', text: '(p → q) ↔ (¬p ∨ q),', isMath: true },
          { letter: 'C', text: '(¬p ∧ q) ↔ (p ∨ ¬q),', isMath: true },
          { letter: 'D', text: '(p → q) ↔ (q → p).', isMath: true },
        ],
        correctLetters: ['A', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Prawo de Morgana w C',
            definition: 'p ∨ ¬q ≡ ¬(¬p ∧ q), więc C ma postać X ↔ ¬X ≡ 0 (sprzeczna!).',
          },
        ],
        steps: [
          {
            title: 'Odrzuć B (tautologia) i C (sprzeczna)',
            explanation:
              '• B to prawo eliminacji implikacji — TAUTOLOGIA.\n• C ma postać X ↔ ¬X dla X = (¬p ∧ q), bo ¬(¬p ∧ q) ≡ p ∨ ¬q — SPRZECZNA.',
            formula: 'B ≡ 1 (tautologia)   |   C ≡ 0 (sprzeczna)',
          },
          {
            title: 'Sprawdź A i D',
            explanation:
              '• A: dla (p=1, q=1): 1 ↔ 1 = 1; dla (p=0, q=0): 1 ↔ 0 = 0 ✓.\n• D: dla (p=1, q=1): 1 ↔ 1 = 1; dla (p=1, q=0): 0 ↔ 1 = 0 ✓.',
            formula: 'A i D przyjmują zarówno 1, jak i 0   ⇒   Poprawne odpowiedzi: A, D',
          },
        ],
        finalSummary: 'B jest tautologią, C jest sprzeczna, a A i D są spełnialne i nie są tautologiami (A, D).',
      },
      {
        id: 'k22-4-4',
        number: 4,
        title: 'Wartościowanie zerujące formułę (wartość 0)',
        category: 'Rachunek zdań · Wartościowanie',
        prompt: 'Dla którego z poniższych wartościowań wartość formuły wynosi 0?',
        formula: '(p → q) ∧ (q → p) → (r → q)',
        options: [
          { letter: 'A', text: 'v(p) = 0, v(q) = 0, v(r) = 1', isMath: true },
          { letter: 'B', text: 'v(p) = 1, v(q) = 0, v(r) = 0', isMath: true },
          { letter: 'C', text: 'v(p) = 1, v(q) = 1, v(r) = 0', isMath: true },
          { letter: 'D', text: 'v(p) = 0, v(q) = 1, v(r) = 1', isMath: true },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Zerowanie następnika (r → q)',
            definition: '(r → q) = 0 wtedy i tylko wtedy, gdy r = 1 i q = 0. Dodatkowo poprzednik (p ↔ q) = 1 wymusza p = q = 0!',
          },
        ],
        steps: [
          {
            title: 'Wyznacz jedyne wartościowanie zerujące formułę',
            explanation:
              '1) Następnik (r → q) = 0 ⇒ r = 1 i q = 0.\n2) Poprzednik (p → q) ∧ (q → p) = (p ↔ q) = 1 ⇒ p = q = 0.\nZatem jedynym wartościowaniem dającym 0 jest v(p) = 0, v(q) = 0, v(r) = 1!',
            formula: 'p = 0, q = 0, r = 1:  (1 ∧ 1) → (1 → 0) = 1 → 0 = 0   ⇒   Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Jedyne wartościowanie zerujące formułę to (0, 0, 1) — odpowiedź A.',
      },
      {
        id: 'k22-4-5',
        number: 5,
        title: 'Zapis formuły w notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Formuła w notacji polskiej ma postać:',
        formula: '¬(p → ¬q) ↔ q ∧ (¬q → p)',
        options: [
          { letter: 'A', text: '¬ ↔→ p¬q ∧ q → ¬qp,', isMath: true },
          { letter: 'B', text: '↔ ¬ → p¬q ∧ q → ¬qp,', isMath: true },
          { letter: 'C', text: '↔→ ¬p¬q ∧ q → p¬q,', isMath: true },
          { letter: 'D', text: '¬ →↔ p¬q ∧ q → p¬q.', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Spójnik główny ↔',
            definition: 'W formule głównym spójnikiem jest ↔ (spójnik o najniższym priorytecie), więc zapis w PN musi zaczynać się od ↔ (odpadają A i D).',
          },
        ],
        steps: [
          {
            title: 'Zbuduj drzewo struktury formuły',
            explanation:
              'Korzeń to ↔. Lewe poddrzewo: ¬(p → ¬q). Prawe poddrzewo: q ∧ (¬q → p).',
            treeFormula: '¬(p → ¬q) ↔ (q ∧ (¬q → p))',
          },
          {
            title: 'Złóż wynik pre-order',
            explanation:
              '• Lewe poddrzewo: ¬ → p ¬q (C ma błędnie → ¬p ¬q!).\n• Prawe poddrzewo: ∧ q → ¬q p.\n• Razem: ↔ ¬ → p¬q ∧ q → ¬qp.',
            formula: '↔ ¬ → p¬q ∧ q → ¬qp   ⇒   Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Korzeń ↔, lewo ¬ → p¬q, prawo ∧ q → ¬qp ⇒ opcja B.',
      },
      {
        id: 'k22-4-6',
        number: 6,
        title: 'Odczyt formuły z notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Poniżej podana formuła w notacji polskiej jest równoważna formule:',
        formula: '¬ → → ¬ ∨ p q q → p q',
        options: [
          { letter: 'A', text: '¬(¬(p ∨ q) → q) → (p → q)', isMath: true },
          { letter: 'B', text: '¬(¬(p ∨ q) → (q → (p → q)))', isMath: true },
          { letter: 'C', text: '¬((¬(p ∨ q) → q) → (p → q))', isMath: true },
          { letter: 'D', text: '¬((¬(p ∨ q) → q) → p) → q', isMath: true },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Podwójna strzałka → → na początku',
            definition: 'Zapis „→ → A B C” oznacza (A → B) → C (lewostronne zagnieżdżenie), w przeciwieństwie do „→ A → B C”, które oznacza A → (B → C)!',
          },
        ],
        steps: [
          {
            title: 'Zastosuj regułę ¬ → → A B C',
            explanation:
              'Pierwsze ¬ obejmuje całą zewnętrzną implikację (odpadają A i D!).\nPonieważ po ¬ mamy dwie strzałki obok siebie „→ →”, pierwsza implikacja znajduje się w POPRZEDNIKU drugiej: ¬((A → B) → C) (odpada B!).',
            formula: '¬  (  →  [→ [¬ ∨ p q] q]   [→ p q]  )   =   ¬((¬(p ∨ q) → q) → (p → q))',
          },
          {
            title: 'Zweryfikuj drzewo struktury',
            explanation:
              'A = ¬(p ∨ q), B = q, C = (p → q). Drzewo dokładnie odpowiada opcji C.',
            treeFormula: '¬((¬(p ∨ q) → q) → (p → q))',
          },
        ],
        finalSummary: '¬ → → [¬∨pq] q [→pq] = ¬((¬(p ∨ q) → q) → (p → q)) — poprawna odpowiedź: C.',
      },
      {
        id: 'k22-4-7',
        number: 7,
        title: 'Dysjunkcyjna postać normalna (DPN)',
        category: 'Rachunek zdań · Postacie normalne',
        prompt: 'Dysjunkcyjna postać normalna formuły jest następująca:',
        formula: 'p → p ∧ q',
        options: [
          { letter: 'A', text: '(¬p ∧ ¬p) ∨ (p ∧ q),', isMath: true },
          { letter: 'B', text: '(p ∧ p) ∨ (p ∧ q),', isMath: true },
          { letter: 'C', text: '(¬p ∧ ¬p) ∨ (p ∧ ¬q),', isMath: true },
          { letter: 'D', text: '(p ∧ q) ∨ (¬p ∧ ¬q).', isMath: true },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Idempotentność literału',
            definition: '¬p ≡ (¬p ∧ ¬p) pozwala zapisać samotny literał ¬p jako koniunkcję dwuelementową.',
          },
        ],
        steps: [
          {
            title: 'Eliminuj implikację i zapisz jako DPN',
            explanation:
              'p → (p ∧ q) ≡ ¬p ∨ (p ∧ q) ≡ (¬p ∧ ¬p) ∨ (p ∧ q).',
            formula: 'p → p ∧ q  ≡  ¬p ∨ (p ∧ q)  ≡  (¬p ∧ ¬p) ∨ (p ∧ q)   ⇒   Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'p → p ∧ q ≡ (¬p ∧ ¬p) ∨ (p ∧ q) — poprawna odpowiedź: A.',
      },
      {
        id: 'k22-4-8',
        number: 8,
        title: 'Wnioskowanie z raportu policji (uwaga na spójnik „i też”!)',
        category: 'Rachunek zdań · Wnioskowanie',
        reportQuote:
          'Henry nie popełnił samobójstwa i też, jeśli testament odnaleziono to świadek był zastraszony. Jeśli Henry popełnił samobójstwo, to świadek był zastraszony. Jeśli świadek był zastraszony to testamentu nie odnaleziono. Jeśli testament odnaleziono to świadek był zastraszony.',
        prompt: 'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        options: [
          { letter: 'A', text: 'Henry popełnił samobójstwo i testament odnaleziono.' },
          { letter: 'B', text: 'Świadek był zastraszony i Henry popełnił samobójstwo.' },
          { letter: 'C', text: 'Świadek był zastraszony i testamentu nie odnaleziono.' },
          { letter: 'D', text: 'Henry nie popełnił samobójstwa i testamentu nie odnaleziono.' },
        ],
        correctLetters: ['D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Czytaj uważnie pierwsze zdanie!',
            definition: 'W tym arkuszu pierwsze zdanie ma koniunkcję „i też” (¬H ∧ (T → S)), a NIE alternatywę „lub też”! Dzięki temu od razu wiemy, że ¬H = 1!',
          },
        ],
        steps: [
          {
            title: 'Zapisz 4 zdania raportu jako formuły',
            explanation:
              '(1) ¬H ∧ (T → S)\n(2) H → S\n(3) S → ¬T\n(4) T → S',
            formula: '(1) ¬H ∧ (T → S)   (2) H → S   (3) S → ¬T   (4) T → S',
          },
          {
            title: 'Ze zdania (1) wyznacz natychmiast H',
            explanation:
              'Ponieważ w zdaniu (1) stoi koniunkcja („i też”), oba jej człony muszą być prawdziwe! Zatem ¬H = 1, czyli H = 0 (Henry NIE popełnił samobójstwa).',
            formula: 'Z (1):  ¬H = 1  ⇒  H = 0',
          },
          {
            title: 'Ze zdań (4) i (3) wyznacz T oraz sprawdź S',
            explanation:
              'Gdyby T = 1, to z (4) wynika S = 1, a wtedy z (3) wynika ¬T = 1 (T = 0) — sprzeczność! Zatem T = 0 (testamentu NIE odnaleziono).\nA zmienna S może być zarówno 0, jak i 1 (oba modele (0,0,0) i (0,1,0) spełniają wszystkie 4 zdania).',
            formula: 'T = 1 ⇒ S = 1 (z 4) ⇒ T = 0 (z 3)  ⚡  ⇒  T = 0   ⇒   Poprawna odpowiedź: D',
          },
        ],
        finalSummary: 'Z raportu wynika wyłącznie H = 0 oraz T = 0 (S jest nieokreślone) — poprawna odpowiedź: D.',
      },
      {
        id: 'k22-4-9',
        number: 9,
        title: 'Tożsamości w dowolnej algebrze Boole’a',
        category: 'Algebra Boole’a · Tożsamości',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "x + (x + y) · (x' + y') = x' + y,", isMath: true },
          { letter: 'B', text: "(x + y') · (x + y) = x,", isMath: true },
          { letter: 'C', text: "x · y · (x · y)' = 1,", isMath: true },
          { letter: 'D', text: "x + y + x' · (y' + x) = 1.", isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Rozdzielność sumy względem iloczynu',
            definition: "(x + y') · (x + y) = x + (y' · y) = x + 0 = x.",
          },
        ],
        steps: [
          {
            title: "Sprawdź B: (x + y') · (x + y) = x",
            explanation:
              "Wyłączamy x + … przed nawias: (x + y') · (x + y) = x + (y' · y) = x + 0 = x ✓.",
            formula: "B: x + (y' · y) = x + 0 = x   ⇒   POPRAWNA (B)",
          },
          {
            title: "Sprawdź D: x + y + x' · (y' + x) = 1",
            explanation:
              "Wymnażamy x'·(y' + x) = x'·y' + x'·x = x'·y' + 0 = x'·y' = (x + y)' (prawo de Morgana!).\nZatem lewa strona to (x + y) + (x + y)' = 1 ✓!",
            formula: "D: (x + y) + x'·y' = (x + y) + (x + y)' = 1   ⇒   POPRAWNA (D)",
          },
          {
            title: 'Obal A i C',
            explanation:
              "• A: dla x = 1, y = 0: L = 1 + … = 1, natomiast P = 0 + 0 = 0 (fałsz).\n• C: a · a' = 0 ≠ 1 dla a = x · y (fałsz).",
            formula: 'A: 1 ≠ 0 (fałsz)   |   C: 0 ≠ 1 (fałsz)   ⇒   Poprawne odpowiedzi: B, D',
          },
        ],
        finalSummary: 'Prawdziwe w każdej algebrze Boole’a są tożsamości B oraz D.',
      },
      {
        id: 'k22-4-10',
        number: 10,
        title: 'Własności relacji x + y = 6 w zbiorze ℕ',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze liczb naturalnych ℕ określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x + y = 6',
        options: [
          { letter: 'A', text: 'Jest symetryczna i nie jest spójna.' },
          { letter: 'B', text: 'Jest symetryczna i spójna.' },
          { letter: 'C', text: 'Nie jest zwrotna i przechodnia.' },
          { letter: 'D', text: 'Jest symetryczna i zwrotna.' },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Wszystkie pary relacji w ℕ = {1, 2, …}',
            definition: 'R = {(1, 5), (2, 4), (3, 3), (4, 2), (5, 1)} — zaledwie 5 par.',
          },
          {
            term: 'Pułapka przechodniości w C',
            definition: 'Opcja C znaczy „nie jest zwrotna i [jest] przechodnia”. Tymczasem (1, 5) ∈ R i (5, 1) ∈ R, ale (1, 1) ∉ R (bo 1 + 1 = 2 ≠ 6), więc NIE jest przechodnia!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź symetryczność i zwrotność',
            explanation:
              '• Symetryczna: x + y = 6 ⇒ y + x = 6 ✓.\n• Zwrotna: NIE, bo (1, 1) ∉ R (1 + 1 = 2 ≠ 6) — D odpada.',
            formula: 'SYMETRYCZNA ✓  |  ZWROTNA ✗',
          },
          {
            title: 'Sprawdź spójność i przechodniość',
            explanation:
              '• Spójna: NIE, bo dla 1 ≠ 2 ani 1 + 2 = 6, ani 2 + 1 = 6 (B odpada, A pasuje!).\n• Przechodnia: NIE, bo (1, 5) ∈ R i (5, 1) ∈ R, lecz (1, 1) ∉ R (C odpada).',
            formula: 'NIE SPÓJNA ✓  |  PRZECHODNIA ✗   ⇒   Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Relacja x + y = 6 jest symetryczna, ale nie jest zwrotna, spójna ani przechodnia — odpowiedź A.',
      },
      {
        id: 'k22-4-11',
        number: 11,
        title: 'Własności relacji x² = y² w zbiorze {1, …, 10} (relacja równości!)',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x² = y²',
        options: [
          { letter: 'A', text: 'Jest antysymetryczna.' },
          { letter: 'B', text: 'Jest relacją porządku częściowego.' },
          { letter: 'C', text: 'Jest relacją równoważności.' },
          { letter: 'D', text: 'Jest spójna.' },
        ],
        correctLetters: ['A', 'B', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Wszystkie elementy X są dodatnie!',
            definition: 'W zbiorze X = {1, 2, …, 10} nie ma liczb ujemnych! Dlatego x² = y² ⇔ x = y. Relacja R to po prostu relacja równości Id_X = {(1,1), (2,2), …, (10,10)}!',
          },
          {
            term: 'Wyjątkowość relacji równości',
            definition: 'Relacja równości (x = y) jest JEDYNĄ relacją, która jest jednocześnie relacją równoważności ORAZ relacją porządku częściowego!',
          },
        ],
        steps: [
          {
            title: 'Uprość warunek na dodatnim zbiorze X = {1, …, 10}',
            explanation:
              'Ponieważ x > 0 oraz y > 0, równanie x² = y² jest równoważne równości x = y. Relacja składa się wyłącznie z par przekątnych (x, x).',
            formula: 'Na X = {1, …, 10}:  x² = y²  ⇔  x = y',
          },
          {
            title: 'Sprawdź antysymetryczność (A), porządek częściowy (B) i równoważność (C)',
            explanation:
              '• Zwrotna: ∀x: x = x ✓.\n• Symetryczna: x = y ⇒ y = x ✓.\n• Antysymetryczna: (x = y ∧ y = x) ⇒ x = y ✓  (POPRAWNA: A).\n• Przechodnia: (x = y ∧ y = z) ⇒ x = z ✓.\nPonieważ R jest zwrotna, antysymetryczna i przechodnia ⇒ JEST porządkiem częściowym (POPRAWNA: B)!\nPonieważ R jest zwrotna, symetryczna i przechodnia ⇒ JEST relacją równoważności (POPRAWNA: C)!',
            formula: 'ANTYSYMETRYCZNA ✓  |  PORZĄDEK CZĘŚCIOWY ✓  |  RÓWNOWAŻNOŚĆ ✓',
          },
          {
            title: 'Obal spójność (D)',
            explanation:
              'Dla 1 ≠ 2 mamy 1² ≠ 2², więc ani (1, 2), ani (2, 1) nie należy do R.',
            formula: 'SPÓJNA ✗   ⇒   Matematycznie prawdziwe są aż 3 odpowiedzi: A, B, C',
            note: 'Ciekawostka egzaminacyjna: relacja równości x = y jako jedyna spełnia jednocześnie definicję relacji równoważności i porządku częściowego!',
          },
        ],
        finalSummary: 'Na {1..10} warunek x² = y² oznacza x = y — spełnia A (antysymetryczna), B (porządek częściowy) i C (równoważność), nie jest spójna (D).',
      },
      {
        id: 'k22-4-12',
        number: 12,
        title: 'Tożsamości rachunku zbiorów dla dowolnych A, B, C',
        category: 'Zbiory i relacje · Rachunek zbiorów',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: '(B ∩ C) \\ A = C \\ (A ∩ B ∩ C).', isMath: true },
          { letter: 'B', text: '(A \\ B) \\ C = A \\ (B \\ C).', isMath: true },
          { letter: 'C', text: '(A \\ C) ∩ B = (A ∩ B) \\ C.', isMath: true },
          { letter: 'D', text: 'B \\ (A ∩ C) = (B \\ A) ∪ (B \\ C).', isMath: true },
        ],
        correctLetters: ['C', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-4-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 4 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Różnica NIE jest łączna!',
            definition: '(A \\ B) \\ C = A \\ (B ∪ C), natomiast A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C) — to dwa różne zbiory (obala B)!',
          },
        ],
        steps: [
          {
            title: 'Obal A i B kontrprzykładami',
            explanation:
              '• A: dla A = ∅, B = ∅, C = {1}: L = ∅, P = {1} \\ ∅ = {1} (fałsz).\n• B: dla A = C = {1}, B = ∅: L = ({1} \\ ∅) \\ {1} = ∅, P = {1} \\ (∅ \\ {1}) = {1} (fałsz).',
            formula: 'A: ∅ ≠ {1} (fałsz)   |   B: ∅ ≠ {1} (fałsz)',
          },
          {
            title: 'Sprawdź C i D metodą elementową',
            explanation:
              '• C: (x ∈ A ∧ x ∉ C) ∧ x ∈ B ⇔ (x ∈ A ∧ x ∈ B) ∧ x ∉ C ⇔ x ∈ (A ∩ B) \\ C ✓.\n• D: x ∈ B ∧ ¬(x ∈ A ∧ x ∈ C) ⇔ x ∈ B ∧ (x ∉ A ∨ x ∉ C) ⇔ (x ∈ B ∧ x ∉ A) ∨ (x ∈ B ∧ x ∉ C) ✓ (prawo de Morgana).',
            formula: 'C: prawda ✓   |   D: prawda ✓   ⇒   Poprawne odpowiedzi: C, D',
          },
        ],
        finalSummary: 'Prawdziwe dla dowolnych A, B, C są tożsamości C oraz D.',
      },
    ],
  },
];
