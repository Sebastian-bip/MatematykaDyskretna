import { ExamSet } from '@/lib/types';

export const EXAM_SETS: ExamSet[] = [
  // =========================================================================
  // ZESTAW A (12 zadań: Grupa 3 str 1/2 + Wersja 1 str 2/2, rok 2025/26)
  // =========================================================================
  {
    id: 'zestaw-a',
    year: '2025/26',
    tabLabel: 'Zestaw A',
    shortLabel: 'Zestaw A (12 zadań)',
    title: 'Matematyka dyskretna z logiką | Kolokwium 2025/26 — Zestaw A',
    subtitle: 'Test wielokrotnego wyboru (1–2 poprawne)',
    metaLine: '12 zadań · 75 minut · +1 pkt poprawna / −1 pkt błędna / 0 pkt brak',
    description:
      'Pełny arkusz 12 zadań z kolokwium z roku akademickiego 2025/26 (strona 1/2 z Grupy 3 oraz strona 2/2 Wersja 1). Każde zadanie zawiera słowniczek pojęć, rozwiązanie pisemne krok po kroku oraz podgląd oryginalnego zdjęcia arkusza.',
    questions: [
      {
        id: 'a-1',
        number: 1,
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
        photoSrc: '/assets/aistudio/IMG_20261110_060651_734_5a161889.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 1/2, Grupa 3, zadania 1–6)',
        glossary: [
          {
            term: 'Tautologia',
            definition: 'Formuła, która dla KAŻDEGO wartościowania zmiennych przyjmuje wartość 1. Uwaga: każda tautologia jest spełnialna (więc opcja D jest zawsze sprzeczna sama ze sobą!).',
          },
          {
            term: 'Formuła spełnialna',
            definition: 'Istnieje przynajmniej jedno wartościowanie, dla którego wartość formuły wynosi 1.',
          },
          {
            term: 'Formuła sprzeczna',
            definition: 'Dla każdego wartościowania wartość formuły wynosi 0.',
          },
          {
            term: 'Priorytety spójników',
            definition: 'Głównym spójnikiem jest druga strzałka →. Prawa strona to (¬p) ∧ (q ∨ r).',
          },
        ],
        steps: [
          {
            title: 'Sprawdź, czy formuła może przyjąć wartość 0 (test na tautologię)',
            explanation:
              'Głównym spójnikiem jest implikacja A → B. Implikacja daje 0 wtedy i tylko wtedy, gdy poprzednik A = 1 i następnik B = 0. Spróbujmy wyzerować prawą stronę B = ¬p ∧ (q ∨ r) w najprostszy sposób: wybierzmy p = 0, q = 0, r = 0.',
            formula: 'Podstawiamy: p = 0, q = 0, r = 0',
          },
          {
            title: 'Oblicz obie strony dla p = 0, q = 0, r = 0',
            explanation:
              'Lewa strona: (0 ∨ 0 ∨ 0 → ¬0) = (0 → 1) = 1.\nPrawa strona: ¬0 ∧ (0 ∨ 0) = 1 ∧ 0 = 0.\nCała implikacja: 1 → 0 = 0! Zatem formuła NIE jest tautologią.',
            formula: '[[(0 ∨ 0 ∨ 0 → 1) → 1 ∧ (0 ∨ 0)]] = (1 → 0) = 0  ⇒  NIE jest tautologią',
          },
          {
            title: 'Sprawdź, czy formuła może przyjąć wartość 1 (test na spełnialność)',
            explanation:
              'Ustawmy p = 0, q = 1, r = 0. Wtedy prawa strona to ¬0 ∧ (1 ∨ 0) = 1 ∧ 1 = 1. Ponieważ następnik implikacji wynosi 1, cała implikacja (cokolwiek → 1) daje 1!',
            formula: 'Dla p = 0, q = 1, r = 0:  (1 → 1) = 1  ⇒  JEST spełnialna',
          },
          {
            title: 'Wybór poprawnej odpowiedzi',
            explanation:
              'Formuła przyjmuje wartość 1 (dla p=0, q=1, r=0) oraz wartość 0 (dla p=0, q=0, r=0), więc jest spełnialna i nie jest tautologią.',
            formula: 'Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Formuła przyjmuje 0 dla (0,0,0) oraz 1 dla (0,1,0) — jest spełnialna i nie jest tautologią (B).',
      },
      {
        id: 'a-2',
        number: 2,
        title: 'Wybór formuł spełnialnych niebędących tautologiami',
        category: 'Rachunek zdań · Klasyfikacja',
        prompt: 'Które z poniższych formuł są spełnialne ale nie są tautologiami:',
        options: [
          { letter: 'A', text: '(p → ¬q) ↔ p ∧ q', isMath: true },
          { letter: 'B', text: '¬p ∨ q ↔ ¬(p ∧ ¬q)', isMath: true },
          { letter: 'C', text: '(p ∨ q → p) ∧ (p → q)', isMath: true },
          { letter: 'D', text: '(¬p → q) ↔ p ∧ ¬q', isMath: true },
        ],
        correctLetters: ['C', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060651_734_5a161889.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 1/2, Grupa 3, zadania 1–6)',
        glossary: [
          {
            term: 'Spełnialna i nie tautologia',
            definition: 'W tabeli prawdy musi wystąpić co najmniej jedna jedynka (1) ORAZ co najmniej jedno zero (0).',
          },
          {
            term: 'Zaprzeczenie implikacji',
            definition: '¬(p → q) ↔ p ∧ ¬q, a dla ¬q w następniku: ¬(p → ¬q) ↔ p ∧ q.',
          },
          {
            term: 'Eliminacja implikacji',
            definition: 'p → q ↔ ¬p ∨ q oraz ¬p → q ↔ p ∨ q.',
          },
          {
            term: 'Równoważność φ ↔ ¬φ',
            definition: 'Zestawienie formuły z jej własną negacją daje zawsze 0 (formułę sprzeczną).',
          },
        ],
        steps: [
          {
            title: 'Sprawdź opcję A: (p → ¬q) ↔ p ∧ q',
            explanation:
              'Przekształćmy lewą stronę: p → ¬q ≡ ¬p ∨ ¬q ≡ ¬(p ∧ q). Zatem opcja A ma postać ¬X ↔ X (gdzie X = p ∧ q), co ZAWSZE daje 0. Formuła A jest SPRZECZNA (odpada).',
            formula: 'A: ¬(p ∧ q) ↔ (p ∧ q)  ≡  0  (sprzeczna)',
          },
          {
            title: 'Sprawdź opcję B: ¬p ∨ q ↔ ¬(p ∧ ¬q)',
            explanation:
              'Z prawa de Morgana prawa strona to ¬p ∨ ¬¬q ≡ ¬p ∨ q — jest IDENTYCZNA z lewą stroną! Zatem B jest TAUTOLOGIĄ (zawsze 1 — odpada).',
            formula: 'B: (¬p ∨ q) ↔ (¬p ∨ q)  ≡  1  (tautologia)',
          },
          {
            title: 'Sprawdź opcję C: (p ∨ q → p) ∧ (p → q)',
            explanation:
              'Dla p = 1, q = 1: (1 → 1) ∧ (1 → 1) = 1 ∧ 1 = 1.\nDla p = 1, q = 0: (1 → 1) ∧ (1 → 0) = 1 ∧ 0 = 0.\nPrzyjmuje zarówno 1, jak i 0 → SPEŁNIALNA i NIE jest tautologią!',
            formula: 'C: dla (1,1) daje 1, dla (1,0) daje 0  ⇒  POPRAWNA (C)',
          },
          {
            title: 'Sprawdź opcję D: (¬p → q) ↔ p ∧ ¬q',
            explanation:
              'Dla p = 1, q = 0: lewa strona (0 → 0) = 1, prawa strona 1 ∧ 1 = 1, więc 1 ↔ 1 = 1.\nDla p = 0, q = 1: lewa strona (1 → 1) = 1, prawa strona 0 ∧ 0 = 0, więc 1 ↔ 0 = 0.\nPrzyjmuje 1 oraz 0 → SPEŁNIALNA i NIE jest tautologią!',
            formula: 'D: dla (1,0) daje 1, dla (0,1) daje 0  ⇒  POPRAWNA (D)',
          },
        ],
        finalSummary: 'A jest sprzeczna, B to tautologia, natomiast C oraz D są spełnialne i nie są tautologiami (C, D).',
      },
      {
        id: 'a-3',
        number: 3,
        title: 'Wartościowanie zerujące formułę (wartość 0)',
        category: 'Rachunek zdań · Wartościowanie',
        prompt: 'Dla którego z poniższych wartościowań wartość formuły wynosi 0?',
        formula: '(p ∧ q → r) → (p → r) ∧ (q → r)',
        options: [
          { letter: 'A', text: 'v(p) = 0, v(q) = 0, v(r) = 1,', isMath: true },
          { letter: 'B', text: 'v(p) = 1, v(q) = 0, v(r) = 0,', isMath: true },
          { letter: 'C', text: 'v(p) = 1, v(q) = 1, v(r) = 0,', isMath: true },
          { letter: 'D', text: 'v(p) = 0, v(q) = 1, v(r) = 1.', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060651_734_5a161889.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 1/2, Grupa 3, zadania 1–6)',
        glossary: [
          {
            term: 'Kiedy A → B = 0?',
            definition: 'Implikacja ma wartość 0 WYŁĄCZNIE wtedy, gdy lewa strona A = 1 oraz prawa strona B = 0.',
          },
          {
            term: 'Kiedy p → r = 0?',
            definition: 'Tylko gdy p = 1 i r = 0. Jeśli r = 1, to każda implikacja (… → r) jest automatycznie równa 1!',
          },
        ],
        steps: [
          {
            title: 'Odrzuć od razu opcje z v(r) = 1 (A oraz D)',
            explanation:
              'Jeśli r = 1, to zarówno (p → 1) = 1, jak i (q → 1) = 1, więc cały następnik (p → r) ∧ (q → r) wynosi 1. Implikacja o następniku 1 zawsze ma wartość 1. Opcje A i D odpadają w sekundę!',
            formula: 'r = 1  ⇒  (p → 1) ∧ (q → 1) = 1  ⇒  całość = 1  (A, D odpadają)',
          },
          {
            title: 'Sprawdź opcję B: v(p) = 1, v(q) = 0, v(r) = 0',
            explanation:
              'Lewa strona: (1 ∧ 0 → 0) = (0 → 0) = 1.\nPrawa strona: (1 → 0) ∧ (0 → 0) = 0 ∧ 1 = 0.\nCała formuła: 1 → 0 = 0! Zgadza się!',
            formula: 'B: (0 → 0) → (0 ∧ 1) = 1 → 0 = 0  ⇒  POPRAWNA (B)',
          },
          {
            title: 'Dla pewności sprawdź opcję C: v(p) = 1, v(q) = 1, v(r) = 0',
            explanation:
              'Lewa strona: (1 ∧ 1 → 0) = (1 → 0) = 0. Skoro poprzednik wynosi 0, cała implikacja (0 → …) ma wartość 1.',
            formula: 'C: (1 → 0) → (0 ∧ 0) = 0 → 0 = 1  (odpada)',
          },
        ],
        finalSummary: 'Tylko wartościowanie B: v(p)=1, v(q)=0, v(r)=0 daje wartość 0.',
      },
      {
        id: 'a-4',
        number: 4,
        title: 'Zapis formuły w notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Formuła w notacji polskiej ma postać:',
        formula: '(p ∨ ¬q) ↔ ¬(¬p ∧ q)',
        options: [
          { letter: 'A', text: '↔ ∨ p ¬ q ¬ ∧ ¬ p q,', isMath: true },
          { letter: 'B', text: '↔ ¬ ∧ ¬ p q ∨ p ¬ q,', isMath: true },
          { letter: 'C', text: '↔ ∨ ¬ p q ¬ ∧ p ¬ q,', isMath: true },
          { letter: 'D', text: '↔ ∨ p ¬ q ∧ ¬ p ¬ q.', isMath: true },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/aistudio/IMG_20261110_060651_734_5a161889.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 1/2, Grupa 3, zadania 1–6)',
        glossary: [
          {
            term: 'Kolejność spisywania (T-1.6)',
            definition: 'Korzeń → Lewe poddrzewo → Prawe poddrzewo. Nie wolno zamieniać stron (dlatego B jest błędne jako notacja polska TEJ konkretnej formuły!).',
          },
          {
            term: 'Negacja ¬',
            definition: 'Spójnik jednoargumentowy — stoi bezpośrednio przed podformułą, którą neguje.',
          },
        ],
        steps: [
          {
            title: 'Narysuj drzewo struktury formuły',
            explanation:
              'Głównym spójnikiem (korzeniem) jest ↔. Lewym poddrzewem jest (p ∨ ¬q), a prawym poddrzewem jest ¬(¬p ∧ q).',
            treeFormula: '(p | !q) <-> !(!p & q)',
          },
          {
            title: 'Przetłumacz lewe poddrzewo: (p ∨ ¬q)',
            explanation: 'Korzeń lewego poddrzewa to ∨, lewy liść p, prawy ¬q:',
            formula: 'Lewe poddrzewo:  ∨ p ¬q',
          },
          {
            title: 'Przetłumacz prawe poddrzewo: ¬(¬p ∧ q)',
            explanation:
              'Na zewnątrz stoi ¬, pod nim koniunkcja ∧, której lewe dziecko to ¬p, a prawe to q:',
            formula: 'Prawe poddrzewo:  ¬ ∧ ¬p q',
          },
          {
            title: 'Złóż całość: Korzeń + Lewe + Prawe',
            explanation: 'Łączymy ↔ z lewym i prawym poddrzewem — otrzymujemy dokładnie odpowiedź A.',
            formula: '↔  ∨ p ¬q  ¬ ∧ ¬p q   ⇒   Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Przejście drzewa (korzeń → lewe → prawe) daje ↔ ∨ p ¬q ¬ ∧ ¬p q (odpowiedź A).',
      },
      {
        id: 'a-5',
        number: 5,
        title: 'Odczyt formuły z notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Poniżej podana formuła w notacji polskiej jest równoważna formule:',
        formula: '→ ∨ → ¬p q ↔ q r ∧ p q',
        options: [
          { letter: 'A', text: '(p → q) ∨ (q → r) ↔ (¬(p ∧ q))', isMath: true },
          { letter: 'B', text: '(p ↔ q) ∨ (q → r) → (¬p ∧ q)', isMath: true },
          { letter: 'C', text: '((¬p → q) ∨ (q ↔ r)) → (p ∧ q)', isMath: true },
          { letter: 'D', text: '(¬p ∧ q) → (q → r) ∨ (p ↔ q)', isMath: true },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/aistudio/IMG_20261110_060651_734_5a161889.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 1/2, Grupa 3, zadania 1–6)',
        glossary: [
          {
            term: 'Metoda odczytu (od prawej lub blokami)',
            definition: 'Każdy spójnik dwuargumentowy (∧, ∨, →, ↔) pobiera 2 kolejne podformuły, a negacja ¬ pobiera 1.',
          },
        ],
        steps: [
          {
            title: 'Podziel ciąg na podformuły (spójnik główny na początku)',
            explanation:
              'Pierwszym symbolem jest →, więc całość ma postać (BLOK_1) → (BLOK_2).',
            formula: '→  [∨ → ¬p q ↔ q r]   [∧ p q]',
          },
          {
            title: 'Rozkoduj BLOK_1: ∨ → ¬p q ↔ q r',
            explanation:
              'Zaczyna się od ∨, więc ma dwa argumenty:\n• pierwszy: → ¬p q = (¬p → q)\n• drugi: ↔ q r = (q ↔ r)\nRazem BLOK_1 = ((¬p → q) ∨ (q ↔ r)).',
            formula: 'BLOK_1 = ((¬p → q) ∨ (q ↔ r))',
          },
          {
            title: 'Rozkoduj BLOK_2 i złóż drzewo',
            explanation:
              'BLOK_2 to ∧ p q = (p ∧ q). Łącząc oba bloki główną implikacją →, otrzymujemy dokładnie formułę C!',
            formula: '((¬p → q) ∨ (q ↔ r)) → (p ∧ q)   ⇒   Poprawna odpowiedź: C',
            treeFormula: '((!p -> q) | (q <-> r)) -> (p & q)',
          },
        ],
        finalSummary: 'Rozkodowanie notacji polskiej daje dokładnie ((¬p → q) ∨ (q ↔ r)) → (p ∧ q) (odpowiedź C).',
      },
      {
        id: 'a-6',
        number: 6,
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
        photoSrc: '/assets/aistudio/IMG_20261110_060651_734_5a161889.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 1/2, Grupa 3, zadania 1–6)',
        glossary: [
          {
            term: 'DPN (Dysjunkcyjna Postać Normalna)',
            definition: 'Alternatywa (∨) koniunkcji (∧) literałów (atomów lub ich negacji).',
          },
          {
            term: 'Idempotencja',
            definition: '¬p ↔ (¬p ∧ ¬p) — wykładowca często zapisuje pojedynczy literał w DPN jako koniunkcję dwóch takich samych literałów.',
          },
        ],
        steps: [
          {
            title: 'Wyłącz implikację wzorem (A → B) ↔ (¬A ∨ B)',
            explanation: 'Pamiętaj, że koniunkcja ∧ wiąże mocniej niż →, więc mamy p → (p ∧ q):',
            formula: 'p → (p ∧ q)  ↔  ¬p ∨ (p ∧ q)',
          },
          {
            title: 'Zapisz ¬p jako koniunkcję literałów (idempotencja)',
            explanation:
              'Ponieważ ¬p ↔ (¬p ∧ ¬p), otrzymujemy od razu postać identyczną z odpowiedzią A:',
            formula: '¬p ∨ (p ∧ q)  ↔  (¬p ∧ ¬p) ∨ (p ∧ q)',
          },
          {
            title: 'Kontrola tabelką prawdy (100% pewności)',
            explanation:
              'Sprawdźmy wszystkie 4 wiersze dla p → (p ∧ q) oraz opcji A, B, C, D:',
            table: {
              headers: ['p', 'q', 'p → p ∧ q', 'A: (¬p∧¬p)∨(p∧q)', 'B', 'C', 'D'],
              rows: [
                ['1', '1', '1', '1', '1', '0', '1'],
                ['1', '0', '0', '0', '1', '1', '0'],
                ['0', '1', '1', '1', '0', '1', '0'],
                ['0', '0', '1', '1', '0', '1', '1'],
              ],
              caption: 'Tylko kolumna A pokrywa się z kolumną p → p ∧ q we wszystkich 4 wierszach!',
            },
          },
        ],
        finalSummary: 'p → (p ∧ q) ↔ ¬p ∨ (p ∧ q) ↔ (¬p ∧ ¬p) ∨ (p ∧ q) — jedyna poprawna odpowiedź to A.',
      },
      {
        id: 'a-7',
        number: 7,
        title: 'Wnioskowanie z raportu policji (Henry, świadek, testament)',
        category: 'Rachunek zdań · Wnioskowanie',
        prompt:
          'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        reportQuote:
          'Testamentu nie odnaleziono lub też, jeśli Henry nie popełnił samobójstwa, to świadek był zastraszony. Jeśli testament odnaleziono, to Henry popełnił samobójstwo. Jeśli świadek był zastraszony, to Henry nie popełnił samobójstwa. Jeśli Henry popełnił samobójstwo, to świadek był zastraszony.',
        options: [
          { letter: 'A', text: 'Świadek nie był zastraszony i testament odnaleziono.' },
          { letter: 'B', text: 'Świadek był zastraszony i testamentu nie odnaleziono.' },
          { letter: 'C', text: 'Henry nie popełnił samobójstwa i testamentu nie odnaleziono.' },
          { letter: 'D', text: 'Henry nie popełnił samobójstwa i świadek nie był zastraszony.' },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/aistudio/IMG_20261110_060658_766_b6d3fab9.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 2/2, Wersja 1, zadania 7–12)',
        glossary: [
          {
            term: 'H, S, T (oznaczenia zmiennych)',
            definition: 'H = Henry popełnił samobójstwo, S = świadek był zastraszony, T = testament odnaleziono.',
          },
          {
            term: 'Konsekwencja logiczna (Γ ⊨ φ)',
            definition: 'Wniosek można wywnioskować TYLKO wtedy, gdy zachodzi w KAŻDYM wartościowaniu spełniającym wszystkie 4 zdania raportu!',
          },
        ],
        steps: [
          {
            title: 'Przetłumacz 4 zdania raportu na formuły',
            explanation: 'Wszystkie poniższe 4 zdania muszą być jednocześnie prawdziwe (= 1):',
            formula: '(1) ¬T ∨ (¬H → S)    (2) T → H    (3) S → ¬H    (4) H → S',
          },
          {
            title: 'Wykorzystaj sprzeczność w zdaniach (4) i (3) → wyznacz H',
            explanation:
              'Załóżmy na chwilę, że Henry popełnił samobójstwo (H = 1). Wtedy ze zdania (4) H → S wynika S = 1 (świadek był zastraszony). Ale wtedy ze zdania (3) S → ¬H wynika H = 0 — sprzeczność! Zatem H MUSI być równe 0.',
            formula: 'H = 1 ⇒ S = 1 (z 4) ⇒ H = 0 (z 3)  ⚡  ⇒  H = 0 (Henry NIE popełnił samobójstwa)',
          },
          {
            title: 'Wykorzystaj zdanie (2) → wyznacz T',
            explanation:
              'Skoro H = 0, to w implikacji (2) T → H mamy T → 0. Aby była prawdziwa, poprzednik musi wynosić 0, czyli T = 0 (testamentu NIE odnaleziono).',
            formula: 'T → 0 = 1  ⇒  T = 0 (testamentu NIE odnaleziono)',
          },
          {
            title: 'Sprawdź, czy można ustalić wartość S (uwaga na pułapkę w B i D!)',
            explanation:
              'Podstawmy H = 0 i T = 0 do wszystkich 4 zdań:\n• (1) ¬0 ∨ (1 → S) = 1 ∨ … = 1 (prawda zarówno dla S=0, jak i S=1!)\n• (2) 0 → 0 = 1\n• (3) S → 1 = 1 (prawda dla obu S!)\n• (4) 0 → S = 1 (prawda dla obu S!)\nZatem zarówno (H=0, T=0, S=0), jak i (H=0, T=0, S=1) są modelami raportu! O świadku NICZEGO nie możemy wywnioskować na pewno.',
            formula: 'Pewne są tylko: H = 0 oraz T = 0   ⇒   Poprawna odpowiedź: C',
          },
        ],
        finalSummary: 'Jedynymi pewnymi faktami są H = 0 i T = 0 (wartość S może być 0 lub 1) — odpowiedź C.',
      },
      {
        id: 'a-8',
        number: 8,
        title: 'Tożsamości w dowolnej algebrze Boole’a',
        category: 'Algebry Boole’a · Prawa',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "x' + x · y + y' = 1,", isMath: true },
          { letter: 'B', text: "(x · y)' + x' + y' = x · y,", isMath: true },
          { letter: 'C', text: "(x² + x') · y² = y,", isMath: true },
          { letter: 'D', text: "x · x' + y' = y.", isMath: true },
        ],
        correctLetters: ['A', 'C'],
        photoSrc: '/assets/aistudio/IMG_20261110_060658_766_b6d3fab9.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 2/2, Wersja 1, zadania 7–12)',
        glossary: [
          {
            term: 'Potęga x² w algebrze Boole’a',
            definition: 'Z idempotencji iloczynu (T-4.3): x² = x · x = x oraz y² = y · y = y!',
          },
          {
            term: 'Prawo de Morgana',
            definition: "(x · y)' = x' + y'  oraz  (x + y)' = x' · y'.",
          },
          {
            term: 'Test zer i jedynek {0, 1}',
            definition: 'Aby błyskawicznie obalić fałszywy wzór, wystarczy podstawić np. x = 0, y = 0 (pamiętając: 0′ = 1, 1′ = 0).',
          },
        ],
        steps: [
          {
            title: "Sprawdź A: x' + x · y + y' = 1",
            explanation:
              "Grupujemy x' + y' i stosujemy prawo de Morgana: x' + y' = (x · y)'. Wówczas cała lewa strona ma postać w' + w = 1 dla w = x · y! Prawdziwe ZAWSZE.",
            formula: "x' + y' + x · y = (x · y)' + (x · y) = 1  ⇒  POPRAWNA (A)",
          },
          {
            title: "Sprawdź B: (x · y)' + x' + y' = x · y",
            explanation:
              "Podstawmy x = 0, y = 0: lewa strona = 0' + 1 + 1 = 1, prawa strona = 0 · 0 = 0. 1 ≠ 0! Fałsz (lewa strona to po prostu (x·y)').",
            formula: 'Dla x = 0, y = 0:  L = 1 ≠ 0 = P  (odpada)',
          },
          {
            title: "Sprawdź C: (x² + x') · y² = y",
            explanation:
              "Kluczowy haczyk profesora! W algebrze Boole’a z prawa idempotencji x · x = x mamy x² = x oraz y² = y! Podstawiamy:",
            formula: "(x² + x') · y² = (x + x') · y = 1 · y = y  ⇒  POPRAWNA (C)",
          },
          {
            title: "Sprawdź D: x · x' + y' = y",
            explanation:
              "Wiemy, że x · x' = 0, więc lewa strona to 0 + y' = y'. Równość y' = y nigdy nie zachodzi w algebrze Boole’a (Zad. 4.11)! Dla y = 0: 1 ≠ 0.",
            formula: "0 + y' = y' ≠ y  (odpada)",
          },
        ],
        finalSummary: 'Prawdziwe w każdej algebrze Boole’a są tożsamości A (de Morgan + dopełnienie) oraz C (idempotencja x² = x).',
      },
      {
        id: 'a-9',
        number: 9,
        title: 'Własności relacji podzielności różnicy przez 2 w ℕ',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze liczb naturalnych ℕ określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x − y jest podzielne przez 2',
        options: [
          { letter: 'A', text: 'Jest symetryczna i nie jest przechodnia.' },
          { letter: 'B', text: 'Jest zwrotna i przechodnia.' },
          { letter: 'C', text: 'Jest zwrotna i nie jest symetryczna.' },
          { letter: 'D', text: 'Jest symetryczna i przechodnia.' },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060658_766_b6d3fab9.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 2/2, Wersja 1, zadania 7–12)',
        glossary: [
          {
            term: 'Podzielność przez 2 (parzystość)',
            definition: '2 | (x − y) oznacza, że x − y = 2k dla pewnej liczby całkowitej k ∈ ℤ (czyli x i y mają tę samą parzystość).',
          },
          {
            term: 'Relacja równoważności',
            definition: 'Relacja, która jest jednocześnie zwrotna, symetryczna i przechodnia.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź zwrotność: ∀x ∈ ℕ  R(x, x)',
            explanation: 'Dla każdego x ∈ ℕ: x − x = 0 = 2 · 0, co jest podzielne przez 2. Relacja JEST zwrotna.',
            formula: 'x − x = 0 (parzyste)  ⇒  ZWROTNA ✓',
          },
          {
            title: 'Sprawdź symetryczność: R(x, y) ⇒ R(y, x)',
            explanation:
              'Jeśli x − y = 2k (k ∈ ℤ), to y − x = −(x − y) = 2 · (−k), więc także jest podzielne przez 2. Relacja JEST symetryczna.',
            formula: 'x − y = 2k  ⇒  y − x = 2(−k)  ⇒  SYMETRYCZNA ✓',
          },
          {
            title: 'Sprawdź przechodniość: R(x, y) ∧ R(y, z) ⇒ R(x, z)',
            explanation:
              'Jeśli x − y = 2k oraz y − z = 2m, to po dodaniu stronami otrzymujemy x − z = (x − y) + (y − z) = 2(k + m), czyli podzielne przez 2! Relacja JEST przechodnia.',
            formula: 'x − z = 2(k + m)  ⇒  PRZECHODNIA ✓',
          },
          {
            title: 'Dopasuj prawdziwe opcje A–D',
            explanation:
              'Relacja jest zwrotna, symetryczna i przechodnia (to relacja równoważności!). Zatem prawdziwe są DWIE odpowiedzi: B („Jest zwrotna i przechodnia”) oraz D („Jest symetryczna i przechodnia”).',
            formula: 'Poprawne odpowiedzi: B, D',
          },
        ],
        finalSummary: 'Relacja „2 | (x − y)” jest relacją równoważności (zwrotna, symetryczna, przechodnia) — poprawne są B i D.',
      },
      {
        id: 'a-10',
        number: 10,
        title: 'Własności relacji x² < y w zbiorze {1, …, 10}',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x² < y',
        options: [
          { letter: 'A', text: 'Jest spójna.' },
          { letter: 'B', text: 'Jest przeciwzwrotna i symetryczna.' },
          { letter: 'C', text: 'Jest asymetryczna i przechodnia.' },
          { letter: 'D', text: 'Jest przechodnia i przeciwzwrotna.' },
        ],
        correctLetters: ['C', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060658_766_b6d3fab9.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 2/2, Wersja 1, zadania 7–12)',
        glossary: [
          {
            term: 'Przeciwzwrotna',
            definition: 'Dla każdego x ∈ X nie zachodzi xRx (brak pętli).',
          },
          {
            term: 'Asymetryczna',
            definition: 'Jeśli xRy, to NIE zachodzi yRx (zauważ: każda relacja przeciwzwrotna i przechodnia jest automatycznie asymetryczna — Zad. 3.50!).',
          },
        ],
        steps: [
          {
            title: 'Przeciwzwrotność: czy może zachodzić x² < x?',
            explanation:
              'Wszystkie elementy X są liczbami naturalnymi ≥ 1, więc dla każdego x ∈ X mamy x² ≥ x. Nierówność x² < x nigdy nie zachodzi! Relacja JEST przeciwzwrotna.',
            formula: '∀x ∈ {1..10}: x² ≥ x  ⇒  ¬(x² < x)  ⇒  PRZECIWZWROTNA ✓',
          },
          {
            title: 'Przechodniość: x² < y ∧ y² < z ⇒ x² < z',
            explanation:
              'Ponieważ y ≥ 1, mamy y ≤ y². Łącząc nierówności otrzymujemy łańcuch: x² < y ≤ y² < z, skąd natychmiast x² < z! (W całym zbiorze {1..10} jedynymi parami są: (1,2)..(1,10), (2,5)..(2,10), (3,10) — sprawdź np. (1,2) i (2,5) ⇒ (1,5) ∈ R). Relacja JEST przechodnia.',
            formula: 'x² < y ≤ y² < z  ⇒  x² < z  ⇒  PRZECHODNIA ✓',
          },
          {
            title: 'Asymetryczność (vs symetryczność i spójność)',
            explanation:
              '• Asymetryczna: jeśli x² < y, to y > x² ≥ x, więc y² ≥ y > x, czyli y² < x jest niemożliwe! ASYMETRYCZNA ✓.\n• Symetryczna? NIE — np. (1, 2) ∈ R (1 < 2), ale (2, 1) ∉ R (4 ≮ 1).\n• Spójna? NIE — np. dla 2 i 3: ani 2² < 3, ani 3² < 2!',
            formula: 'ASYMETRYCZNA ✓  |  SYMETRYCZNA ✗  |  SPÓJNA ✗',
          },
          {
            title: 'Wybór poprawnych odpowiedzi',
            explanation: 'Prawdziwe są zarówno C (asymetryczna i przechodnia), jak i D (przechodnia i przeciwzwrotna).',
            formula: 'Poprawne odpowiedzi: C, D',
          },
        ],
        finalSummary: 'Relacja x² < y na {1..10} jest przeciwzwrotna, asymetryczna i przechodnia — poprawne są C i D.',
      },
      {
        id: 'a-11',
        number: 11,
        title: 'Tożsamości rachunku zbiorów dla dowolnych A, B, C',
        category: 'Zbiory i relacje · Działania na zbiorach',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: 'A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C).', isMath: true },
          { letter: 'B', text: '(A ∪ B) ∩ (C ∪ B) = B.', isMath: true },
          { letter: 'C', text: '(A \\ C) ∪ B = A ∪ B.', isMath: true },
          { letter: 'D', text: 'C \\ (A ∪ B) = (C \\ A) ∩ (C \\ B).', isMath: true },
        ],
        correctLetters: ['A', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060658_766_b6d3fab9.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 2/2, Wersja 1, zadania 7–12)',
        glossary: [
          {
            term: 'Prawo de Morgana dla różnicy (T-3.4)',
            definition: 'C \\ (A ∪ B) = (C \\ A) ∩ (C \\ B) oraz C \\ (A ∩ B) = (C \\ A) ∪ (C \\ B).',
          },
          {
            term: 'Szybkie obalanie kontrprzykładem',
            definition: 'Wystarczy przetestować proste zbiory złożone z jednego elementu {1} lub zbioru pustego ∅!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A: A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C)',
            explanation:
              'Dowód elementowy (identyczne z Zad. 3.21 z Zad_MDL!):\nx ∈ A \\ (B \\ C) ⇔ x ∈ A ∧ ¬(x ∈ B ∧ x ∉ C) ⇔ x ∈ A ∧ (x ∉ B ∨ x ∈ C) ⇔ (x ∈ A ∧ x ∉ B) ∨ (x ∈ A ∧ x ∈ C) ⇔ x ∈ (A \\ B) ∪ (A ∩ C).',
            formula: 'A: zawsze prawdziwe!  ⇒  POPRAWNA (A)',
          },
          {
            title: 'Obal B kontrprzykładem: (A ∪ B) ∩ (C ∪ B) = B',
            explanation:
              'Z rozdzielności lewa strona to (A ∩ C) ∪ B (nie samo B!). Kontrprzykład: A = {1}, C = {1}, B = ∅.\nLewa strona: {1} ∩ {1} = {1} ≠ ∅ = prawa strona.',
            formula: 'B: dla A = C = {1}, B = ∅:  {1} ≠ ∅  (odpada)',
          },
          {
            title: 'Obal C kontrprzykładem: (A \\ C) ∪ B = A ∪ B',
            explanation:
              'Kontrprzykład: A = {1}, C = {1}, B = ∅.\nLewa strona: ({1} \\ {1}) ∪ ∅ = ∅, prawa strona: {1} ∪ ∅ = {1}. ∅ ≠ {1}!',
            formula: 'C: dla A = C = {1}, B = ∅:  ∅ ≠ {1}  (odpada)',
          },
          {
            title: 'Sprawdź D: C \\ (A ∪ B) = (C \\ A) ∩ (C \\ B)',
            explanation:
              'To wprost jedno z praw de Morgana z twierdzenia T-3.4 z listy zadań i wykładu!',
            formula: 'D: Prawo de Morgana dla zbiorów (T-3.4)  ⇒  POPRAWNA (D)',
          },
        ],
        finalSummary: 'Prawdziwe dla wszystkich zbiorów A, B, C są wzory A oraz D.',
      },
      {
        id: 'a-12',
        number: 12,
        title: 'Prawdziwość zdań z kwantyfikatorami na ℕ, ℤ, ℝ',
        category: 'Rachunek predykatów · Kwantyfikatory',
        prompt: 'Które z poniższych zdań są prawdziwe (ℕ = {1, 2, …}, ℤ, ℝ to zbiory liczb całkowitych i rzeczywistych)?',
        options: [
          { letter: 'A', text: '∀x ∈ ℕ  ∃y ∈ ℤ  ∀z ∈ ℕ   x² − z² < y.', isMath: true },
          { letter: 'B', text: '∀x ∈ ℕ  ∀z ∈ ℕ  ∃y ∈ ℤ   x² − z² < y.', isMath: true },
          { letter: 'C', text: '∀x ∈ ℝ  ∃y ∈ ℝ   x² + y² ≤ 0.', isMath: true },
          { letter: 'D', text: '∃y ∈ ℝ  ∀x ∈ ℝ   x² + y² ≤ 0.', isMath: true },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060658_766_b6d3fab9.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw A (str. 2/2, Wersja 1, zadania 7–12)',
        glossary: [
          {
            term: 'ℕ = {1, 2, 3, …}',
            definition: 'Najmniejsza liczba w ℕ to 1, więc dla każdego z ∈ ℕ mamy z² ≥ 1 (czyli −z² ≤ −1).',
          },
          {
            term: 'Im dalej ∃, tym łatwiej!',
            definition: 'Jeśli A (z ∃y przed ∀z) jest prawdziwe, to B (z ∃y po ∀z) musi być tym bardziej prawdziwe!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A: ∀x ∈ ℕ  ∃y ∈ ℤ  ∀z ∈ ℕ   x² − z² < y',
            explanation:
              'Ustalmy dowolne x ∈ ℕ. Ponieważ z ∈ ℕ = {1, 2, …}, mamy z² ≥ 1, więc wyrażenie x² − z² jest ZAWSZE mniejsze od x² (bo odejmujemy co najmniej 1!). Wystarczy więc wybrać y = x² ∈ ℤ (zależne tylko od x, NIE od z!). Wtedy dla każdego z ∈ ℕ: x² − z² ≤ x² − 1 < x² = y!',
            formula: 'Wybór y := x² ∈ ℤ  ⇒  ∀z ∈ ℕ: x² − z² < x² = y  ⇒  PRAWDA (A)',
          },
          {
            title: 'Sprawdź B: ∀x ∈ ℕ  ∀z ∈ ℕ  ∃y ∈ ℤ   x² − z² < y',
            explanation:
              'Tutaj dobieramy y dopiero po ustaleniu obu x i z — wystarczy wziąć to samo y = x² (lub y = x² − z² + 1) ∈ ℤ. Skoro działało już A, to B jest tym bardziej prawdziwe!',
            formula: 'Wybór y := x² ∈ ℤ (lub x² − z² + 1)  ⇒  PRAWDA (B)',
          },
          {
            title: 'Obal C i D: x² + y² ≤ 0 dla liczb rzeczywistych',
            explanation:
              'Dla dowolnych x, y ∈ ℝ mamy x² ≥ 0 oraz y² ≥ 0. W C wybierzmy kontrprzykład x = 1 ∈ ℝ: wtedy 1² + y² = 1 + y² ≥ 1 > 0 dla KAŻDEGO y ∈ ℝ, więc C jest FAŁSZYWE. Zdanie D jest jeszcze silniejsze niż C, więc także FAŁSZYWE (dla dowolnego y wybierz x = 1).',
            formula: 'C, D: dla x = 1 mamy 1 + y² ≥ 1 > 0  ⇒  FAŁSZ (odpadają)',
          },
        ],
        finalSummary: 'Zarówno A (wystarczy y = x²), jak i B są prawdziwe; C i D obala x = 1. Poprawne: A, B.',
      },
    ],
  },

  // =========================================================================
  // ZESTAW B (12 zadań: Druga grupa str 1/2 + Wersja 2 str 2/2, rok 2025/26)
  // =========================================================================
  {
    id: 'zestaw-b',
    year: '2025/26',
    tabLabel: 'Zestaw B',
    shortLabel: 'Zestaw B (12 zadań)',
    title: 'Matematyka dyskretna z logiką | Kolokwium 2025/26 — Zestaw B',
    subtitle: 'Test wielokrotnego wyboru (1–2 poprawne)',
    metaLine: '12 zadań · 75 minut · +1 pkt poprawna / −1 pkt błędna / 0 pkt brak',
    description:
      'Drugi pełny wariant kolokwium z roku 2025/26 (druga grupa ze strony 1/2 oraz Wersja 2 ze strony 2/2). Świetny do przetestowania siebie w Trybie sprawdzianu po przerobieniu Zestawu A!',
    questions: [
      {
        id: 'b-1',
        number: 1,
        title: 'Klasyfikacja formuły ((p → q) → r) ∨ (r → p)',
        category: 'Rachunek zdań · Semantyka',
        prompt: 'Dla poniższej formuły zaznacz stwierdzenia prawdziwe. Formuła:',
        formula: '((p → q) → r) ∨ (r → p)',
        options: [
          { letter: 'A', text: 'jest spełnialna i nie jest tautologią;' },
          { letter: 'B', text: 'jest tautologią i nie jest spełnialna;' },
          { letter: 'C', text: 'jest tautologią i jest spełnialna;' },
          { letter: 'D', text: 'jest sprzeczna.' },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/aistudio/IMG_20261110_060659_106_72d68f14.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Metoda nie wprost dla alternatywy',
            definition: 'Alternatywa A ∨ B daje 0 TYLKO wtedy, gdy jednocześnie A = 0 ORAZ B = 0.',
          },
          {
            term: 'Tautologia ⇒ Spełnialna',
            definition: 'Skoro tautologia daje 1 dla KAŻDEGO wartościowania, to w szczególności istnieje wartościowanie dające 1 — każda tautologia jest spełnialna!',
          },
        ],
        steps: [
          {
            title: 'Spróbuj wyzerować całą formułę (metoda nie wprost)',
            explanation:
              'Głównym spójnikiem jest alternatywa ∨. Aby formuła przyjęła wartość 0, oba człony muszą jednocześnie równać się 0:',
            formula: '(1) (p → q) → r = 0    ORAZ    (2) r → p = 0',
          },
          {
            title: 'Rozwiąż warunek (2): r → p = 0',
            explanation: 'Implikacja r → p wynosi 0 tylko dla r = 1 oraz p = 0.',
            formula: 'r = 1,   p = 0',
          },
          {
            title: 'Podstaw r = 1 do warunku (1): (p → q) → r = 0',
            explanation:
              'Gdy r = 1, to warunek (1) ma postać (p → q) → 1 = 1 ≠ 0! Otrzymujemy sprzeczność (warunek 1 wymaga r = 0, a warunek 2 wymaga r = 1).',
            formula: 'Sprzeczność: r = 1 oraz r = 0  ⚡  ⇒  Formuła NIGDY nie przyjmuje 0!',
          },
          {
            title: 'Wniosek',
            explanation:
              'Formuła ma zawsze wartość 1, więc JEST tautologią, a zatem również JEST spełnialna (odpowiedź C).',
            formula: 'Poprawna odpowiedź: C',
          },
        ],
        finalSummary: 'Próba wyzerowania prowadzi do sprzeczności (r = 1 i r = 0) — to tautologia (i jest spełnialna): C.',
      },
      {
        id: 'b-2',
        number: 2,
        title: 'Wybór formuł spełnialnych niebędących tautologiami',
        category: 'Rachunek zdań · Klasyfikacja',
        prompt: 'Które z poniższych formuł są spełnialne ale nie są tautologiami:',
        options: [
          { letter: 'A', text: '(p ↔ ¬p) ∧ (q ∧ q ↔ ¬q),', isMath: true },
          { letter: 'B', text: '(q → p) ∧ (¬q ∨ p),', isMath: true },
          { letter: 'C', text: '¬(p ∧ q) ↔ ¬q ∨ ¬p,', isMath: true },
          { letter: 'D', text: '(p → q) → ¬q.', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060659_106_72d68f14.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Kryterium',
            definition: 'Szukamy formuł, dla których istnieje co najmniej jedno wartościowanie dające 1 i co najmniej jedno dające 0.',
          },
          {
            term: 'Prawa de Morgana',
            definition: '¬(p ∧ q) ↔ ¬p ∨ ¬q ↔ ¬q ∨ ¬p — zawsze tautologia!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A: (p ↔ ¬p) ∧ (q ∧ q ↔ ¬q)',
            explanation:
              'Już pierwszy nawias (p ↔ ¬p) ma zawsze wartość 0 (niezależnie od p). Zatem cała koniunkcja to zawsze 0 — formuła SPRZECZNA (odpada).',
            formula: 'A ≡ 0  (sprzeczna)',
          },
          {
            title: 'Sprawdź B: (q → p) ∧ (¬q ∨ p)',
            explanation:
              'Ponieważ q → p ≡ ¬q ∨ p, cała formuła upraszcza się do ¬q ∨ p.\n• Dla p = 1, q = 1: 0 ∨ 1 = 1.\n• Dla p = 0, q = 1: 0 ∨ 0 = 0.\nPrzyjmuje 1 i 0 → SPEŁNIALNA, NIE tautologia!',
            formula: 'B ≡ (¬q ∨ p)  ⇒  POPRAWNA (B)',
          },
          {
            title: 'Sprawdź C: ¬(p ∧ q) ↔ ¬q ∨ ¬p',
            explanation: 'To prawo de Morgana (z przemiennością ∨) — zawsze 1, TAUTOLOGIA (odpada).',
            formula: 'C ≡ 1  (tautologia)',
          },
          {
            title: 'Sprawdź D: (p → q) → ¬q',
            explanation:
              '• Dla p = 0, q = 0: (0 → 0) → 1 = 1 → 1 = 1.\n• Dla p = 1, q = 1: (1 → 1) → 0 = 1 → 0 = 0.\nPrzyjmuje 1 i 0 → SPEŁNIALNA, NIE tautologia!',
            formula: 'D: dla (0,0) daje 1, dla (1,1) daje 0  ⇒  POPRAWNA (D)',
          },
        ],
        finalSummary: 'A jest sprzeczna, C to tautologia, natomiast B oraz D są spełnialne i nie są tautologiami (B, D).',
      },
      {
        id: 'b-3',
        number: 3,
        title: 'Wartościowanie zerujące formułę (wartość 0)',
        category: 'Rachunek zdań · Wartościowanie',
        prompt: 'Dla którego z poniższych wartościowań wartość formuły wynosi 0?',
        formula: '(q → p) ∧ (p → q) → (r → q)',
        options: [
          { letter: 'A', text: 'v(p) = 1, v(q) = 0, v(r) = 0,', isMath: true },
          { letter: 'B', text: 'v(p) = 0, v(q) = 0, v(r) = 1,', isMath: true },
          { letter: 'C', text: 'v(p) = 0, v(q) = 1, v(r) = 1,', isMath: true },
          { letter: 'D', text: 'v(p) = 1, v(q) = 1, v(r) = 0.', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060659_106_72d68f14.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: '(q → p) ∧ (p → q)',
            definition: 'To dokładnie równoważność p ↔ q — przyjmuje wartość 1 wyłącznie wtedy, gdy v(p) = v(q)!',
          },
        ],
        steps: [
          {
            title: 'Wyznacz jedyny przypadek dający wartość 0',
            explanation:
              'Aby główna implikacja dała 0, potrzebujemy jednocześnie:\n1) Następnik (r → q) = 0  ⇒  r = 1 oraz q = 0.\n2) Poprzednik (q → p) ∧ (p → q) = 1  ⇒  p = q = 0.',
            formula: 'Jedyne wartościowanie zerujące:  v(p) = 0, v(q) = 0, v(r) = 1',
          },
          {
            title: 'Zweryfikuj opcję B przez bezpośrednie podstawienie',
            explanation:
              'Dla v(p) = 0, v(q) = 0, v(r) = 1:\nLewa strona: (0 → 0) ∧ (0 → 0) = 1 ∧ 1 = 1.\nPrawa strona: (1 → 0) = 0.\nCałość: 1 → 0 = 0! Pozostałe opcje dają 1.',
            formula: 'B: (1 ∧ 1) → 0 = 0  ⇒  Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Formuła zeruje się wyłącznie dla v(p)=0, v(q)=0, v(r)=1 — odpowiedź B.',
      },
      {
        id: 'b-4',
        number: 4,
        title: 'Zapis formuły w notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Formuła w notacji polskiej ma postać:',
        formula: '¬(p → ¬q) ↔ q ∧ (¬q → p)',
        options: [
          { letter: 'A', text: '¬ ↔ → p ¬ q ∧ q → ¬ q p,', isMath: true },
          { letter: 'B', text: '↔ ¬ → p ¬ q ∧ q → ¬ q p,', isMath: true },
          { letter: 'C', text: '↔ → ¬ p ¬ q ∧ q → p ¬ q,', isMath: true },
          { letter: 'D', text: '¬ → ↔ p ¬ q ∧ q → p ¬ q.', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060659_106_72d68f14.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Spójnik główny',
            definition: 'W formule ¬(p → ¬q) ↔ q ∧ (¬q → p) najniższy priorytet ma ↔ — zatem notacja polska MUSI zaczynać się od ↔ (od razu odpadają A i D!).',
          },
        ],
        steps: [
          {
            title: 'Zbuduj drzewo struktury T(φ)',
            explanation:
              'Korzeń: ↔. Lewe poddrzewo: ¬(p → ¬q). Prawe poddrzewo: q ∧ (¬q → p).',
            treeFormula: '!(p -> !q) <-> (q & (!q -> p))',
          },
          {
            title: 'Spisz lewe poddrzewo: ¬(p → ¬q)',
            explanation: 'Najpierw ¬, potem →, potem p, potem ¬q:',
            formula: 'Lewe:  ¬ → p ¬q',
          },
          {
            title: 'Spisz prawe poddrzewo: q ∧ (¬q → p) i złóż całość',
            explanation:
              'Korzeń prawego poddrzewa to ∧, lewe dziecko q, prawe → ¬q p. Razem po korzeniu ↔:',
            formula: '↔  ¬ → p ¬q  ∧ q → ¬q p   ⇒   Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Korzeń ↔, lewe ¬ → p ¬q, prawe ∧ q → ¬q p — dokładnie opcja B.',
      },
      {
        id: 'b-5',
        number: 5,
        title: 'Odczyt formuły z notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Poniżej podana formuła w notacji polskiej jest równoważna formule:',
        formula: '→ → ∧ p q r ∧ → p r → q r',
        options: [
          { letter: 'A', text: '(p ∧ q) → (r ∧ (p → r) → (q → r))', isMath: true },
          { letter: 'B', text: 'p ∧ (q → r) → p ∧ (r → q)', isMath: true },
          { letter: 'C', text: '(p ∧ q → r) → (p → r) ∧ (q → r)', isMath: true },
          { letter: 'D', text: '((p ∧ q → r) → ((p → r) → q)) → r', isMath: true },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/aistudio/IMG_20261110_060659_106_72d68f14.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Podwójne strzałki → → na początku',
            definition: 'Pierwsze → jest spójnikiem głównym, a drugie → otwiera LEWY argument (czyli lewa strona jest implikacją!).',
          },
        ],
        steps: [
          {
            title: 'Podziel napis na dwa argumenty głównej strzałki →',
            explanation: 'Główny symbol → pobiera dwa bloki:',
            formula: '→   [→ ∧ p q r]   [∧ → p r → q r]',
          },
          {
            title: 'Rozkoduj lewy blok: → ∧ p q r',
            explanation: 'Spójnik → łączy (∧ p q) z r, co daje ((p ∧ q) → r), w skrócie (p ∧ q → r).',
            formula: 'Lewy blok:  (p ∧ q → r)',
          },
          {
            title: 'Rozkoduj prawy blok: ∧ → p r → q r i połącz',
            explanation:
              'Koniunkcja ∧ łączy (→ p r) oraz (→ q r), co daje (p → r) ∧ (q → r). Całość to dokładnie C!',
            formula: '(p ∧ q → r) → (p → r) ∧ (q → r)   ⇒   Poprawna odpowiedź: C',
            treeFormula: '((p & q) -> r) -> ((p -> r) & (q -> r))',
          },
        ],
        finalSummary: 'Rozkodowanie notacji polskiej daje dokładnie (p ∧ q → r) → (p → r) ∧ (q → r) — odpowiedź C.',
      },
      {
        id: 'b-6',
        number: 6,
        title: 'Dysjunkcyjna postać normalna formuły q → ¬(p ∨ q)',
        category: 'Rachunek zdań · Postacie normalne',
        prompt: 'Dysjunkcyjna postać normalna formuły jest następująca:',
        formula: 'q → ¬(p ∨ q)',
        options: [
          { letter: 'A', text: '(q ∧ q) ∨ (¬p ∧ ¬q),', isMath: true },
          { letter: 'B', text: '(¬q ∧ ¬q) ∨ (¬p ∧ ¬q),', isMath: true },
          { letter: 'C', text: '(¬q ∧ ¬q) ∨ (p ∧ q),', isMath: true },
          { letter: 'D', text: '(q ∧ q) ∨ (p ∧ q).', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060659_106_72d68f14.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Eliminacja implikacji + de Morgan',
            definition: 'Najpierw zamień → na ¬… ∨ …, potem wprowadź negację do nawiasu.',
          },
        ],
        steps: [
          {
            title: 'Usuń implikację',
            explanation: 'Stosujemy (A → B) ↔ (¬A ∨ B):',
            formula: 'q → ¬(p ∨ q)  ↔  ¬q ∨ ¬(p ∨ q)',
          },
          {
            title: 'Zastosuj prawo de Morgana do ¬(p ∨ q)',
            explanation: 'Negacja alternatywy staje się koniunkcją negacji:',
            formula: '¬q ∨ (¬p ∧ ¬q)',
          },
          {
            title: 'Zapisz ¬q z idempotencji jako (¬q ∧ ¬q)',
            explanation:
              'Ponieważ ¬q ↔ (¬q ∧ ¬q), otrzymujemy dokładnie odpowiedź B! (Sprawdź tabelką: dla p=1, q=1 mamy 0, a dla q=0 mamy 1 — zgadza się tylko B!).',
            formula: '(¬q ∧ ¬q) ∨ (¬p ∧ ¬q)   ⇒   Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'q → ¬(p ∨ q) ↔ ¬q ∨ (¬p ∧ ¬q) ↔ (¬q ∧ ¬q) ∨ (¬p ∧ ¬q) — odpowiedź B.',
      },
      {
        id: 'b-7',
        number: 7,
        title: 'Wnioskowanie z raportu policji (Wersja 2)',
        category: 'Rachunek zdań · Wnioskowanie',
        prompt:
          'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        reportQuote:
          'Henry popełnił samobójstwo lub też, jeśli świadek był zastraszony, to testamentu nie odnaleziono. Jeśli Henry popełnił samobójstwo, to świadek nie był zastraszony. Jeśli testamentu nie odnaleziono, to świadek był zastraszony. Jeśli świadek nie był zastraszony to testamentu nie odnaleziono.',
        options: [
          { letter: 'A', text: 'Henry popełnił samobójstwo i testamentu nie odnaleziono.' },
          { letter: 'B', text: 'Świadek był zastraszony i Henry nie popełnił samobójstwa.' },
          { letter: 'C', text: 'Świadek nie był zastraszony i testamentu nie odnaleziono.' },
          { letter: 'D', text: 'Henry nie popełnił samobójstwa i świadek nie był zastraszony.' },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060644_059_301e992f.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 2/2, Wersja 2, zadania 7–12)',
        glossary: [
          {
            term: 'H, S, T',
            definition: 'H = Henry popełnił samobójstwo, S = świadek był zastraszony, T = testament odnaleziono.',
          },
        ],
        steps: [
          {
            title: 'Zapisz 4 przesłanki symbolicznie',
            explanation: 'Każde z 4 zdań raportu ma wartość 1:',
            formula: '(1) H ∨ (S → ¬T)    (2) H → ¬S    (3) ¬T → S    (4) ¬S → ¬T',
          },
          {
            title: 'Złącz przesłanki (4) i (3) → natychmiast wyznaczysz S',
            explanation:
              'Załóżmy, że świadek NIE był zastraszony (S = 0, czyli ¬S = 1). Wtedy z (4) ¬S → ¬T wynika ¬T = 1 (T = 0), a stąd z (3) ¬T → S wynika S = 1 — sprzeczność! Zatem S = 1 (świadek BYŁ zastraszony).',
            formula: 'S = 0 ⇒ ¬T = 1 (z 4) ⇒ S = 1 (z 3)  ⚡  ⇒  S = 1',
          },
          {
            title: 'Wyznacz H ze zdania (2) i T ze zdania (1)',
            explanation:
              'Ze zdania (2) H → ¬S przy S = 1 mamy H → 0, więc H = 0 (Henry NIE popełnił samobójstwa). Podstawiając H = 0, S = 1 do (1): 0 ∨ (1 → ¬T) = ¬T = 1, więc T = 0 (testamentu nie odnaleziono).',
            formula: 'Jedyny model raportu:  S = 1, H = 0, T = 0',
          },
          {
            title: 'Dopasuj odpowiedź z arkusza',
            explanation:
              'Tylko opcja B („Świadek był zastraszony i Henry nie popełnił samobójstwa”, czyli S = 1 ∧ H = 0) zgadza się z jedynym modelem!',
            formula: 'Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Jedyny model raportu to S = 1, H = 0, T = 0 — z podanych opcji prawdziwa jest wyłącznie B.',
      },
      {
        id: 'b-8',
        number: 8,
        title: 'Tożsamości w dowolnej algebrze Boole’a (Wersja 2)',
        category: 'Algebry Boole’a · Prawa',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "(x + y') · (x' + y') = y,", isMath: true },
          { letter: 'B', text: "(x + y) · (x' + y') = x'y + xy',", isMath: true },
          { letter: 'C', text: "(x + y') · y' = y,", isMath: true },
          { letter: 'D', text: "(x + y + x')' = 0.", isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060644_059_301e992f.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 2/2, Wersja 2, zadania 7–12)',
        glossary: [
          {
            term: 'Rozdzielność + i ·',
            definition: "(x + y) · (x' + y') wymnażamy każdy z każdym, a wyrazy x·x' oraz y·y' zerują się!",
          },
          {
            term: 'Pochłanianie',
            definition: "(x + y') · y' = y' (a nie y!).",
          },
        ],
        steps: [
          {
            title: "Sprawdź A: (x + y') · (x' + y') = y",
            explanation:
              "Z rozdzielności dodawania względem mnożenia: (x + y') · (x' + y') = (x · x') + y' = 0 + y' = y' ≠ y. Fałsz!",
            formula: "A: L = y' ≠ y  (odpada)",
          },
          {
            title: "Sprawdź B: (x + y) · (x' + y') = x'y + xy'",
            explanation:
              "Wymnażamy nawiasy z rozdzielności:\n(x + y)(x' + y') = x·x' + x·y' + y·x' + y·y' = 0 + xy' + x'y + 0 = x'y + xy'!\n(To dokładnie funkcja XOR!) Zawsze prawdziwe!",
            formula: "B: x·x' + xy' + x'y + y·y' = x'y + xy'  ⇒  POPRAWNA (B)",
          },
          {
            title: "Sprawdź C: (x + y') · y' = y",
            explanation: "Z prawa pochłaniania lewa strona równa się y', a nie y (dla y = 0: 1 ≠ 0).",
            formula: "C: L = y' ≠ y  (odpada)",
          },
          {
            title: "Sprawdź D: (x + y + x')' = 0",
            explanation:
              "Korzystamy z przemienności i dopełnienia: x + x' = 1, a potem z dominacji: 1 + y = 1. Dopełnienie jedynki to 1' = 0!",
            formula: "D: ((x + x') + y)' = (1 + y)' = 1' = 0  ⇒  POPRAWNA (D)",
          },
        ],
        finalSummary: 'Prawdziwe w każdej algebrze Boole’a są tożsamości B oraz D.',
      },
      {
        id: 'b-9',
        number: 9,
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
        photoSrc: '/assets/aistudio/IMG_20261110_060644_059_301e992f.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 2/2, Wersja 2, zadania 7–12)',
        glossary: [
          {
            term: 'Pary należące do R w ℕ = {1, 2, …}',
            definition: 'R = {(1, 5), (2, 4), (3, 3), (4, 2), (5, 1)} — tylko 5 par!',
          },
          {
            term: 'Pułapka przechodniości!',
            definition: 'W przechodniości x, y, z NIE muszą być różne! Para (1,5) i (5,1) wymagałaby (1,1) ∈ R, a 1 + 1 = 2 ≠ 6!',
          },
        ],
        steps: [
          {
            title: 'Wypisz wszystkie pary relacji R w ℕ = {1, 2, …}',
            explanation: 'R = {(1, 5), (2, 4), (3, 3), (4, 2), (5, 1)}.',
          },
          {
            title: 'Sprawdź symetryczność i zwrotność',
            explanation:
              '• Symetryczna? TAK: x + y = 6 ⇒ y + x = 6 (dodawanie jest przemienne).\n• Zwrotna? NIE: np. (1, 1) ∉ R, bo 1 + 1 = 2 ≠ 6 (D odpada).',
            formula: 'SYMETRYCZNA ✓  |  ZWROTNA ✗',
          },
          {
            title: 'Sprawdź spójność i przechodniość',
            explanation:
              '• Spójna? NIE: dla 1 ≠ 2 ani 1 + 2 = 6, ani 2 + 1 = 6 (B odpada).\n• Przechodnia? NIE! Kontrprzykład: (1, 5) ∈ R i (5, 1) ∈ R, ale (1, 1) ∉ R (C mówi „nie jest zwrotna i [jest] przechodnia” — pułapka, więc C odpada!).',
            formula: 'SPÓJNA ✗  |  PRZECHODNIA ✗  ⇒  Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Relacja x + y = 6 jest symetryczna, ale nie jest zwrotna, spójna ani przechodnia — odpowiedź A.',
      },
      {
        id: 'b-10',
        number: 10,
        title: 'Własności relacji x² ≥ y w zbiorze {1, …, 10}',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x² ≥ y',
        options: [
          { letter: 'A', text: 'Jest relacją równoważności.' },
          { letter: 'B', text: 'Jest zwrotna.' },
          { letter: 'C', text: 'Jest relacją porządku częściowego.' },
          { letter: 'D', text: 'Jest spójna.' },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060644_059_301e992f.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 2/2, Wersja 2, zadania 7–12)',
        glossary: [
          {
            term: 'Spójność na liczbach ≥ 1',
            definition: 'Jeśli x > y ≥ 1, to tym bardziej x² ≥ x > y, więc większa z dwóch liczb zawsze „pokrywa” mniejszą!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź zwrotność (opcja B)',
            explanation: 'Dla każdego x ∈ {1, …, 10} zachodzi x² ≥ x (1≥1, 4≥2, 9≥3, …). Relacja JEST zwrotna!',
            formula: '∀x ∈ X: x² ≥ x  ⇒  ZWROTNA ✓  (POPRAWNA: B)',
          },
          {
            title: 'Sprawdź spójność (opcja D)',
            explanation:
              'Weźmy dowolne dwa różne elementy x, y ∈ X (x ≠ y). Jeden z nich jest większy — bez straty ogólności niech x > y. Wtedy x² ≥ x > y, więc x² ≥ y, czyli (x, y) ∈ R! Zatem dla każdych x ≠ y zachodzi xRy ∨ yRx — relacja JEST spójna!',
            formula: 'x > y ⇒ x² ≥ x > y ⇒ xRy  ⇒  SPÓJNA ✓  (POPRAWNA: D)',
          },
          {
            title: 'Obal równoważność (A) i porządek częściowy (C)',
            explanation:
              '• Nie jest symetryczna (np. 2² ≥ 1, ale 1² ≱ 2) — więc nie jest równoważnością (A odpada).\n• Nie jest antysymetryczna: (2, 3) ∈ R (4 ≥ 3) oraz (3, 2) ∈ R (9 ≥ 2), ale 2 ≠ 3 — więc nie jest porządkiem częściowym (C odpada).\n• (Ponadto nie jest przechodnia: (2,4) ∈ R i (4,10) ∈ R, ale (2,10) ∉ R, bo 4 < 10!)',
            formula: 'Poprawne odpowiedzi: B, D',
          },
        ],
        finalSummary: 'Relacja x² ≥ y w {1..10} jest zwrotna (B) oraz spójna (D); nie jest przechodnia, symetryczna ani antysymetryczna.',
      },
      {
        id: 'b-11',
        number: 11,
        title: 'Tożsamości rachunku zbiorów (Wersja 2)',
        category: 'Zbiory i relacje · Działania na zbiorach',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: '(A ∩ B) \\ C = (A \\ C) ∩ (B \\ C).', isMath: true },
          { letter: 'B', text: 'A ∩ B ∩ C = (A \\ B) \\ C.', isMath: true },
          { letter: 'C', text: 'C \\ (A ∩ B) = (C \\ A) ∩ (C \\ B).', isMath: true },
          { letter: 'D', text: 'A ∪ (C \\ B) = (A ∪ C) \\ ((B ∩ C) \\ A).', isMath: true },
        ],
        correctLetters: ['A', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060644_059_301e992f.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 2/2, Wersja 2, zadania 7–12)',
        glossary: [
          {
            term: 'Zamiana zbiorów na logikę',
            definition: 'a = (x∈A), b = (x∈B), c = (x∈C). Różnica X \\ Y to x ∧ ¬y.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A: (A ∩ B) \\ C = (A \\ C) ∩ (B \\ C)',
            explanation:
              'Przechodzimy na logikę: (a ∧ b) ∧ ¬c ↔ (a ∧ ¬c) ∧ (b ∧ ¬c) (łączność, przemienność i idempotencja ¬c ∧ ¬c ↔ ¬c). Zawsze prawdziwe!',
            formula: 'A: (a ∧ b) ∧ ¬c  ≡  (a ∧ ¬c) ∧ (b ∧ ¬c)  ⇒  POPRAWNA (A)',
          },
          {
            title: 'Obal B i C kontrprzykładami',
            explanation:
              '• B: dla A = B = C = {1} lewa strona to {1}, a prawa ({1}\\{1})\\{1} = ∅. Fałsz!\n• C: błędne prawo de Morgana (po prawej powinno być ∪ zamiast ∩!). Kontrprzykład: C = {1}, A = {1}, B = ∅ → lewa: {1}\\∅ = {1}, prawa: ∅ ∩ {1} = ∅.',
            formula: 'B, C: obalone kontrprzykładami  (odpadają)',
          },
          {
            title: 'Sprawdź D: A ∪ (C \\ B) = (A ∪ C) \\ ((B ∩ C) \\ A)',
            explanation:
              'Rozpiszmy prawą stronę w języku logiki (a, b, c):\nP = (a ∨ c) ∧ ¬(b ∧ c ∧ ¬a) = (a ∨ c) ∧ (¬b ∨ ¬c ∨ a).\nZ rozdzielności alternatywy „a ∨” względem koniunkcji:\nP = a ∨ [c ∧ (¬b ∨ ¬c)] = a ∨ [(c ∧ ¬b) ∨ (c ∧ ¬c)] = a ∨ (c ∧ ¬b) ∨ 0 = a ∨ (c ∧ ¬b) = L!\nZawsze prawdziwe!',
            formula: 'D: P = a ∨ (c ∧ ¬b) = L  ⇒  POPRAWNA (D)',
          },
        ],
        finalSummary: 'Prawdziwe dla wszystkich zbiorów A, B, C są tożsamości A oraz D.',
      },
      {
        id: 'b-12',
        number: 12,
        title: 'Prawdziwość zdań z kwantyfikatorami (Wersja 2)',
        category: 'Rachunek predykatów · Kwantyfikatory',
        prompt: 'Które z poniższych zdań są prawdziwe (ℕ = {1, 2, …}, ℤ, ℝ to zbiory liczb całkowitych i rzeczywistych)?',
        options: [
          { letter: 'A', text: '∀x ∈ ℝ  ∃k ∈ ℕ  ∀y ∈ ℤ   x² + y² ≤ k.', isMath: true },
          { letter: 'B', text: '∀x ∈ ℝ  ∀y ∈ ℤ  ∃k ∈ ℕ   x² + y² ≤ k.', isMath: true },
          { letter: 'C', text: '∀x ∈ ℕ  ∀y ∈ ℤ   x² − y² < 0.', isMath: true },
          { letter: 'D', text: '∃x ∈ ℤ  ∀y ∈ ℕ   x² − y² < 0.', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060644_059_301e992f.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw B (str. 2/2, Wersja 2, zadania 7–12)',
        glossary: [
          {
            term: '0 ∈ ℤ, ale 0 ∉ ℕ!',
            definition: 'W opcji D możesz wybrać x = 0 ∈ ℤ, podczas gdy y ∈ ℕ = {1, 2, …} jest zawsze ≥ 1!',
          },
        ],
        steps: [
          {
            title: 'Obal A: ∀x ∈ ℝ  ∃k ∈ ℕ  ∀y ∈ ℤ   x² + y² ≤ k',
            explanation:
              'Weźmy x = 0. Niezależnie od tego, jak duże k ∈ ℕ ktoś wybierze, zawsze mogę dobrać y = k + 1 ∈ ℤ i wtedy 0² + (k + 1)² > k! Zdanie A jest FAŁSZYWE.',
            formula: 'A: dla dowolnego k wybierz y = k + 1 ⇒ y² > k  (fałsz)',
          },
          {
            title: 'Udowodnij B: ∀x ∈ ℝ  ∀y ∈ ℤ  ∃k ∈ ℕ   x² + y² ≤ k',
            explanation:
              'Tutaj najpierw znamy konkretne x ∈ ℝ i y ∈ ℤ, więc x² + y² jest konkretną liczbą rzeczywistą. Zawsze istnieje liczba naturalna k większa od niej (np. k = ⌈x² + y²⌉ + 1 ∈ ℕ). Zdanie B jest PRAWDZIWE!',
            formula: 'B: wybór k := ⌈x² + y²⌉ + 1 ∈ ℕ  ⇒  PRAWDA (B)',
          },
          {
            title: 'Obal C i udowodnij D',
            explanation:
              '• C: kontrprzykład x = 2 ∈ ℕ, y = 0 ∈ ℤ → 2² − 0² = 4 ≮ 0 (FAŁSZ).\n• D: wybierzmy x = 0 ∈ ℤ! Ponieważ ℕ = {1, 2, …}, dla KAŻDEGO y ∈ ℕ mamy y² ≥ 1, skąd 0² − y² = −y² ≤ −1 < 0! Zdanie D jest PRAWDZIWE!',
            formula: 'D: wybór x := 0 ∈ ℤ  ⇒  ∀y ∈ ℕ: −y² < 0  ⇒  PRAWDA (D)',
          },
        ],
        finalSummary: 'Prawdziwe są zdania B (k zależy od x, y) oraz D (wystarczy x = 0 ∈ ℤ, bo 0 ∉ ℕ).',
      },
    ],
  },

  // =========================================================================
  // ZESTAW C (6 zadań: Wersja 3 str 2/2, rok 2025/26 — Zadania 7–12)
  // =========================================================================
  {
    id: 'zestaw-c',
    year: '2025/26',
    tabLabel: 'Zestaw C',
    shortLabel: 'Zestaw C (6 zadań)',
    title: 'Matematyka dyskretna z logiką | Kolokwium 2025/26 — Zestaw C (str. 2/2)',
    subtitle: 'Trzeci wariant drugiej strony arkusza (zad. 7–12)',
    metaLine: '6 zadań (nr 7–12) · 1–2 poprawne odpowiedzi · +1 / −1 / 0 pkt',
    description:
      'Trzeci unikalny wariant drugiej strony kolokwium 2025/26 (zadania 7–12 z działów: wnioskowanie z raportu, algebry Boole’a, relacje ≤ oraz podzielność, prawa rachunku zbiorów i sprytne kwantyfikatory z x·k < y).',
    questions: [
      {
        id: 'c-7',
        number: 7,
        title: 'Wnioskowanie z raportu policji (Wersja 3)',
        category: 'Rachunek zdań · Wnioskowanie',
        prompt:
          'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        reportQuote:
          'Henry nie popełnił samobójstwa lub też, jeśli świadek był zastraszony, to testamentu nie odnaleziono. Jeśli Henry popełnił samobójstwo, to świadek nie był zastraszony. Jeśli testamentu nie odnaleziono, to świadek był zastraszony. Jeśli świadek nie był zastraszony to testamentu nie odnaleziono.',
        options: [
          { letter: 'A', text: 'Henry popełnił samobójstwo i testamentu nie odnaleziono.' },
          { letter: 'B', text: 'Świadek był zastraszony i Henry nie popełnił samobójstwa.' },
          { letter: 'C', text: 'Świadek był zastraszony i testamentu nie odnaleziono.' },
          { letter: 'D', text: 'Henry nie popełnił samobójstwa i świadek nie był zastraszony.' },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060655_625_59a98d95.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw C (str. 2/2, Wersja 3, zadania 7–12)',
        glossary: [
          {
            term: 'Subtelna różnica względem Zestawu B!',
            definition: 'Tutaj zdanie (1) zaczyna się od „Henry NIE popełnił samobójstwa lub też…” (¬H zamiast H!). To sprawia, że wartości T nie da się ustalić!',
          },
        ],
        steps: [
          {
            title: 'Zapisz 4 zdania raportu symbolicznie',
            explanation: 'H = samobójstwo, S = świadek zastraszony, T = testament odnaleziono:',
            formula: '(1) ¬H ∨ (S → ¬T)    (2) H → ¬S    (3) ¬T → S    (4) ¬S → ¬T',
          },
          {
            title: 'Wyznacz S z (4) i (3), a potem H z (2)',
            explanation:
              'Gdyby S = 0, to z (4) mamy ¬T = 1, a z (3) S = 1 (sprzeczność) ⇒ S = 1.\nZ (2) H → ¬S przy S = 1 mamy H → 0 ⇒ H = 0.',
            formula: 'S = 1 (pewne)   oraz   H = 0 (pewne)',
          },
          {
            title: 'Sprawdź oba przypadki dla T (pułapka w opcji C!)',
            explanation:
              'Podstawmy S = 1, H = 0 do (1): ¬0 ∨ (1 → ¬T) = 1 ∨ … = 1, niezależnie od T! Pozostałe zdania też są prawdziwe dla T = 0 ORAZ T = 1. Zatem nie możemy wywnioskować, że testamentu nie odnaleziono (C odpada!).',
            formula: 'Oba (H=0, S=1, T=0) i (H=0, S=1, T=1) spełniają raport  ⇒  Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Pewne są tylko S = 1 i H = 0 (wartość T jest niezdeterminowana) — odpowiedź B.',
      },
      {
        id: 'c-8',
        number: 8,
        title: 'Tożsamości w dowolnej algebrze Boole’a (Wersja 3)',
        category: 'Algebry Boole’a · Prawa',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "x · y' + y · x = x',", isMath: true },
          { letter: 'B', text: '(x + y) · (x + y) = x + y + x · y,', isMath: true },
          { letter: 'C', text: "x + y' = (x · y)',", isMath: true },
          { letter: 'D', text: '(x + y) · (x + y) = x + y.', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/aistudio/IMG_20261110_060655_625_59a98d95.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw C (str. 2/2, Wersja 3, zadania 7–12)',
        glossary: [
          {
            term: 'Idempotencja + pochłanianie',
            definition: 'w · w = w (dla w = x + y) oraz x + x · y = x.',
          },
        ],
        steps: [
          {
            title: "Obal A: x · y' + y · x = x'",
            explanation:
              "Wyłączając x przed nawias dostajemy x · (y' + y) = x · 1 = x (a nie x'!). Fałsz.",
            formula: "A: L = x ≠ x'  (odpada)",
          },
          {
            title: 'Sprawdź D: (x + y) · (x + y) = x + y',
            explanation: 'To wprost prawo idempotencji w · w = w dla w = x + y! Zawsze prawdziwe.',
            formula: 'D: idempotencja iloczynu  ⇒  POPRAWNA (D)',
          },
          {
            title: 'Sprawdź B: (x + y) · (x + y) = x + y + x · y',
            explanation:
              'Lewa strona z idempotencji to x + y. Prawa strona z prawa pochłaniania: (x + x · y) + y = x + y! Obie strony są równe x + y!',
            formula: 'B: L = x + y = (x + x·y) + y = P  ⇒  POPRAWNA (B)',
          },
          {
            title: "Obal C: x + y' = (x · y)'",
            explanation: "Z prawa de Morgana prawa strona to x' + y' (dla x = 0, y = 1: L = 0 ≠ 1 = P).",
            formula: "C: dla x = 0, y = 1:  0 ≠ 1  (odpada)",
          },
        ],
        finalSummary: 'Obie tożsamości B i D są prawdziwe (idempotencja + pochłanianie).',
      },
      {
        id: 'c-9',
        number: 9,
        title: 'Własności relacji x ≤ y w zbiorze ℕ',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze liczb naturalnych ℕ określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x ≤ y',
        options: [
          { letter: 'A', text: 'Jest przechodnia i zwrotna.' },
          { letter: 'B', text: 'Jest zwrotna i nie jest symetryczna.' },
          { letter: 'C', text: 'Jest symetryczna i przechodnia.' },
          { letter: 'D', text: 'Jest symetryczna i nie jest przechodnia.' },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060655_625_59a98d95.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw C (str. 2/2, Wersja 3, zadania 7–12)',
        glossary: [
          {
            term: 'Relacja ≤ w ℕ',
            definition: 'Klasyczny przykład porządku liniowego: zwrotna, antysymetryczna, przechodnia i spójna (ale NIE symetryczna!).',
          },
        ],
        steps: [
          {
            title: 'Sprawdź zwrotność, przechodniość i symetryczność',
            explanation:
              '• Zwrotna: x ≤ x dla każdego x ∈ ℕ ✓\n• Przechodnia: jeśli x ≤ y i y ≤ z, to x ≤ z ✓\n• Symetryczna: NIE! Kontrprzykład: 1 ≤ 2, ale nieprawda, że 2 ≤ 1 ✗.',
            formula: 'ZWROTNA ✓  |  PRZECHODNIA ✓  |  SYMETRYCZNA ✗',
          },
          {
            title: 'Wybierz prawdziwe stwierdzenia',
            explanation: 'Prawdziwe są A („Jest przechodnia i zwrotna”) oraz B („Jest zwrotna i nie jest symetryczna”).',
            formula: 'Poprawne odpowiedzi: A, B',
          },
        ],
        finalSummary: 'Relacja ≤ w ℕ jest zwrotna i przechodnia, a nie jest symetryczna — poprawne są A i B.',
      },
      {
        id: 'c-10',
        number: 10,
        title: 'Własności relacji podzielności (x | y) w {1, …, 10}',
        category: 'Zbiory i relacje · Porządek częściowy',
        prompt: 'W zbiorze X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x jest dzielnikiem y',
        options: [
          { letter: 'A', text: 'Jest antysymetryczna.' },
          { letter: 'B', text: 'Jest relacją porządku częściowego.' },
          { letter: 'C', text: 'Jest relacją równoważności.' },
          { letter: 'D', text: 'Jest spójna.' },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/aistudio/IMG_20261110_060655_625_59a98d95.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw C (str. 2/2, Wersja 3, zadania 7–12)',
        glossary: [
          {
            term: 'Porządek częściowy (T-3.11)',
            definition: 'Relacja zwrotna, antysymetryczna i przechodnia. Podzielność na liczbach dodatnich to podręcznikowy przykład z wykładu!',
          },
        ],
        steps: [
          {
            title: 'Sprawdź 3 warunki porządku częściowego',
            explanation:
              '1) Zwrotna: każda liczba dzieli samą siebie (x | x) ✓\n2) Antysymetryczna: dla liczb dodatnich jeśli x | y (więc x ≤ y) oraz y | x (więc y ≤ x), to x = y ✓ (opcja A!)\n3) Przechodnia: jeśli x | y i y | z, to x | z ✓\nZatem JEST relacją porządku częściowego (opcja B)!',
            formula: 'Zwrotna + Antysymetryczna + Przechodnia  ⇒  POPRAWNE: A, B',
          },
          {
            title: 'Obal opcje C (równoważność) i D (spójność)',
            explanation:
              '• Nie jest symetryczna: 2 | 4, ale 4 ∤ 2 (więc NIE jest równoważnością — C odpada).\n• Nie jest spójna: dla 2 ≠ 3 ani 2 ∤ 3, ani 3 ∤ 2 (elementy nieporównywalne — D odpada).',
            formula: 'Poprawne odpowiedzi: A, B',
          },
        ],
        finalSummary: 'Podzielność w {1..10} jest antysymetryczna (A) i jest relacją porządku częściowego (B).',
      },
      {
        id: 'c-11',
        number: 11,
        title: 'Tożsamości rachunku zbiorów (Wersja 3)',
        category: 'Zbiory i relacje · Działania na zbiorach',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: 'A ∩ C = (A \\ C) ∪ B.', isMath: true },
          { letter: 'B', text: 'A \\ (B ∪ C) = (A \\ B) \\ C.', isMath: true },
          { letter: 'C', text: 'C \\ (A ∩ B) = (C \\ A) ∪ (C \\ B).', isMath: true },
          { letter: 'D', text: '(A ∩ B) ∪ (C ∩ B) = B.', isMath: true },
        ],
        correctLetters: ['B', 'C'],
        photoSrc: '/assets/aistudio/IMG_20261110_060655_625_59a98d95.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw C (str. 2/2, Wersja 3, zadania 7–12)',
        glossary: [
          {
            term: 'Odejmowanie sumy krok po kroku',
            definition: 'Wyrzucenie ze zbioru A elementów z B lub C to dokładnie to samo, co wyrzucenie najpierw B, a potem C!',
          },
        ],
        steps: [
          {
            title: 'Obal A i D kontrprzykładami',
            explanation:
              '• A: dla A = C = ∅, B = {1}: L = ∅, P = {1}. Fałsz!\n• D: dla A = C = ∅, B = {1}: L = ∅ ∪ ∅ = ∅, P = {1}. Fałsz!',
          },
          {
            title: 'Udowodnij B: A \\ (B ∪ C) = (A \\ B) \\ C',
            explanation:
              'Dowód elementowy:\nx ∈ A \\ (B ∪ C) ⇔ x ∈ A ∧ ¬(x ∈ B ∨ x ∈ C) ⇔ x ∈ A ∧ x ∉ B ∧ x ∉ C ⇔ (x ∈ A ∧ x ∉ B) ∧ x ∉ C ⇔ x ∈ (A \\ B) \\ C.',
            formula: 'B: zawsze prawdziwe!  ⇒  POPRAWNA (B)',
          },
          {
            title: 'Udowodnij C: C \\ (A ∩ B) = (C \\ A) ∪ (C \\ B)',
            explanation: 'To wprost drugie prawo de Morgana dla różnicy zbiorów z twierdzenia T-3.4!',
            formula: 'C: Prawo de Morgana dla zbiorów (T-3.4)  ⇒  POPRAWNA (C)',
          },
        ],
        finalSummary: 'Prawdziwe dla dowolnych zbiorów A, B, C są wzory B oraz C.',
      },
      {
        id: 'c-12',
        number: 12,
        title: 'Prawdziwość zdań z kwantyfikatorami (Wersja 3)',
        category: 'Rachunek predykatów · Kwantyfikatory',
        prompt: 'Które z poniższych zdań są prawdziwe (ℕ = {1, 2, …}, ℤ, ℝ to zbiory liczb całkowitych i rzeczywistych)?',
        options: [
          { letter: 'A', text: '∀x ∈ ℝ  ∃k ∈ ℤ  ∀y ∈ ℕ   x · k < y.', isMath: true },
          { letter: 'B', text: '∀x ∈ ℝ  ∀y ∈ ℕ  ∃k ∈ ℤ   x · k = y.', isMath: true },
          { letter: 'C', text: '∀x ∈ ℕ  ∃y ∈ ℤ   x > y ∧ x² < y².', isMath: true },
          { letter: 'D', text: '∃y ∈ ℤ  ∀x ∈ ℕ   x > y ∧ x² < y².', isMath: true },
        ],
        correctLetters: ['A', 'C'],
        photoSrc: '/assets/aistudio/IMG_20261110_060655_625_59a98d95.jpg',
        photoLabel: 'Kolokwium 2025/26 — Zestaw C (str. 2/2, Wersja 3, zadania 7–12)',
        glossary: [
          {
            term: 'Sztuczka z k = 0 ∈ ℤ',
            definition: 'W opcji A wybierz k = 0 ∈ ℤ — zeruje dowolne x ∈ ℝ, a 0 jest ostro mniejsze od KAŻDEGO y ∈ ℕ = {1, 2, …}!',
          },
          {
            term: 'Sztuczka z ujemnym y = −(x + 1)',
            definition: 'Liczba ujemna y = −(x + 1) jest mniejsza od dodatniego x, ale po podniesieniu do kwadratu daje (x + 1)² > x²!',
          },
        ],
        steps: [
          {
            title: 'Udowodnij A: ∀x ∈ ℝ  ∃k ∈ ℤ  ∀y ∈ ℕ   x · k < y',
            explanation:
              'Dla dowolnego x ∈ ℝ wybieramy k = 0 ∈ ℤ! Wtedy x · 0 = 0. Ponieważ ℕ = {1, 2, …} (bez zera!), dla KAŻDEGO y ∈ ℕ mamy 0 < y! Genialny haczyk — zdanie A jest PRAWDZIWE!',
            formula: 'Wybór k := 0 ∈ ℤ  ⇒  x · 0 = 0 < y  dla ∀y ∈ ℕ  ⇒  PRAWDA (A)',
          },
          {
            title: 'Obal B: ∀x ∈ ℝ  ∀y ∈ ℕ  ∃k ∈ ℤ   x · k = y',
            explanation: 'Kontrprzykład: x = 0 ∈ ℝ, y = 1 ∈ ℕ. Wtedy 0 · k = 0 ≠ 1 dla każdego k ∈ ℤ. FAŁSZ.',
            formula: 'B: dla x = 0, y = 1 brak takiego k  (fałsz)',
          },
          {
            title: 'Udowodnij C i obal D: x > y ∧ x² < y²',
            explanation:
              '• C: Dla każdego x ∈ ℕ (x ≥ 1) dobieramy ujemną liczbę całkowitą y = −(x + 1) ∈ ℤ. Wtedy x > 0 > y (pierwsza nierówność OK) oraz y² = (x + 1)² > x² (druga nierówność OK)! PRAWDA!\n• D: Jeśli y ∈ ℤ jest ustalone Z GÓRY, to wystarczy dobrać x = |y| + 1 ∈ ℕ — wtedy x² = (|y| + 1)² > y², więc nierówność x² < y² jest fałszywa! FAŁSZ.',
            formula: 'C: wybór y := −(x + 1) ∈ ℤ  ⇒  PRAWDA (C)   |   D: x = |y| + 1 obala (fałsz)',
          },
        ],
        finalSummary: 'Prawdziwe są A (wybór k = 0 ∈ ℤ) oraz C (wybór ujemnego y = −(x + 1) ∈ ℤ).',
      },
    ],
  },
];

export { EXAM_SETS_2022 } from './exams2022';
import { EXAM_SETS_2022 as _EXAM_SETS_2022 } from './exams2022';

export const ALL_EXAM_SETS: ExamSet[] = [...EXAM_SETS, ..._EXAM_SETS_2022];

