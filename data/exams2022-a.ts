import { ExamSet } from '@/lib/types';

export const EXAM_SETS_2022_PART_A: ExamSet[] = [
  // =========================================================================
  // KOLOKWIUM 2022 — ARKUSZ 1 (12 zadań)
  // =========================================================================
  {
    id: 'k22-arkusz-1',
    year: '2022',
    tabLabel: 'Arkusz 1',
    shortLabel: 'Kolokwium 2022 · Arkusz 1 (12 zadań)',
    title: 'Logika — zaliczenie | Kolokwium 2022 — Arkusz 1',
    subtitle: 'Test wielokrotnego wyboru (1–2 poprawne)',
    metaLine: '12 zadań · I rok Informatyki · +1 pkt poprawna / −1 pkt błędna / 0 pkt brak',
    description:
      'Pierwszy pełny arkusz 12 zadań z kolokwium z 2022 roku (poprawność składniowa, klasyfikacja formuł, notacja polska, DPN, raport policji, algebra Boole’a, relacje i zbiory). Każde zadanie zawiera słowniczek, rozwiązanie krok po kroku oraz oryginalny skan arkusza.',
    questions: [
      {
        id: 'k22-1-1',
        number: 1,
        title: 'Poprawność składniowa formuł rachunku zdań',
        category: 'Rachunek zdań · Składnia',
        prompt: 'Które podpunkty zawierają tylko napisy będące poprawnymi składniowo formułami rachunku zdań:',
        options: [
          { letter: 'A', text: '(p ∨ q) → (q ∧ r),  (p ↔ q)¬ → (p ∨ q),', isMath: true },
          { letter: 'B', text: 'p → (p → p),  q ∨ ¬(p → q),', isMath: true },
          { letter: 'C', text: '¬p → (¬q → ¬p),  ¬(¬p ∧ ¬q) → ¬q,', isMath: true },
          { letter: 'D', text: '¬p → (p ↔ ¬q),  (p ∨ (q¬p)).', isMath: true },
        ],
        correctLetters: ['B', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Spójnik jednoargumentowy ¬',
            definition: 'Negacja ZAWSZE stoi PRZED formułą (prefiksowo: ¬φ), nigdy po formule ani między dwoma atomami bez spójnika dwuargumentowego.',
          },
          {
            term: 'Spójniki dwuargumentowe (∧, ∨, →, ↔)',
            definition: 'Każdy spójnik dwuargumentowy musi stać dokładnie pomiędzy dwoma poprawnymi formułami. Dwa atomy obok siebie (np. q¬p) to błąd składniowy.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź opcję A: (p ∨ q) → (q ∧ r) oraz (p ↔ q)¬ → (p ∨ q)',
            explanation:
              'Pierwszy napis jest poprawny, ale w drugim negacja ¬ została postawiona PO nawiasie (p ↔ q)¬ zamiast przed nim. Negacja może stać wyłącznie przed formułą!',
            formula: 'A: (p ↔ q)¬ → (p ∨ q)  — BŁĄD (negacja postfiksowa)  ⇒  A odpada',
          },
          {
            title: 'Sprawdź opcję B: p → (p → p) oraz q ∨ ¬(p → q)',
            explanation:
              'Oba napisy są zbudowane zgodnie z regułami składni: każdy spójnik dwuargumentowy łączy dwie poprawne formuły, negacja stoi przed (p → q), a nawiasy się domykają.',
            formula: 'B: oba napisy poprawne  ⇒  POPRAWNA (B)',
          },
          {
            title: 'Sprawdź opcję C: ¬p → (¬q → ¬p) oraz ¬(¬p ∧ ¬q) → ¬q',
            explanation:
              'W pierwszym napisie ¬ stoi przed atomami, a → łączy poprawne podformuły. W drugim ¬ stoi przed nawiasem (¬p ∧ ¬q) i przed q — wszystko zgodnie ze składnią.',
            formula: 'C: oba napisy poprawne  ⇒  POPRAWNA (C)',
          },
          {
            title: 'Sprawdź opcję D: ¬p → (p ↔ ¬q) oraz (p ∨ (q¬p))',
            explanation:
              'W drugim napisie fragment (q¬p) zestawia ze sobą dwa atomy q i ¬p bez żadnego spójnika dwuargumentowego (brak ∧, ∨, → lub ↔ pomiędzy nimi).',
            formula: 'D: (q¬p)  — BŁĄD (brak spójnika dwuargumentowego)  ⇒  D odpada',
          },
        ],
        finalSummary: 'Tylko opcje B i C zawierają wyłącznie poprawne składniowo formuły (A ma postfiksowe ¬, D ma brak spójnika w q¬p).',
      },
      {
        id: 'k22-1-2',
        number: 2,
        title: 'Klasyfikacja formuły (tautologia / spełnialna / sprzeczna)',
        category: 'Rachunek zdań · Semantyka',
        prompt: 'Dla poniższej formuły zaznacz stwierdzenia prawdziwe. Formuła:',
        formula: '(p → q) ∧ (q → r) → (p → ¬r)',
        options: [
          { letter: 'A', text: 'jest spełnialna i nie jest tautologią;' },
          { letter: 'B', text: 'jest tautologią i nie jest spełnialna;' },
          { letter: 'C', text: 'jest tautologią i jest spełnialna;' },
          { letter: 'D', text: 'jest sprzeczna.' },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Prawo sylogizmu a negacja ¬r',
            definition: 'Klasyczny sylogizm ma w następniku (p → r) i jest tautologią. Tu w następniku mamy (p → ¬r), co psuje tautologię dla p = q = r = 1!',
          },
          {
            term: 'Spełnialna i nie tautologia',
            definition: 'Wystarczy wskazać jedno wartościowanie dające 0 (obala tautologię) oraz jedno dające 1 (dowodzi spełnialności).',
          },
        ],
        steps: [
          {
            title: 'Test na tautologię — szukamy wartościowania dającego 0',
            explanation:
              'Główna implikacja daje 0, gdy poprzednik (p → q) ∧ (q → r) = 1 oraz następnik (p → ¬r) = 0. Następnik daje 0 wyłącznie dla p = 1 i r = 1. Dobrawszy q = 1 otrzymujemy:',
            formula: 'v(p) = 1, v(q) = 1, v(r) = 1:  (1 → 1) ∧ (1 → 1) → (1 → 0)  =  1 → 0 = 0  ⇒  NIE tautologia',
          },
          {
            title: 'Test na spełnialność — szukamy wartościowania dającego 1',
            explanation:
              'Wystarczy ustawić p = 0 (dowolne q, r). Wtedy następnik (0 → ¬r) = 1, więc cała implikacja ma wartość 1.',
            formula: 'v(p) = 0, v(q) = 0, v(r) = 0:  (1 ∧ 1) → (0 → 1) = 1 → 1 = 1  ⇒  SPEŁNIALNA',
          },
          {
            title: 'Wniosek końcowy',
            explanation:
              'Formuła przyjmuje wartość 1 oraz wartość 0, zatem jest spełnialna i nie jest tautologią.',
            formula: 'Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Dla (1,1,1) formuła daje 0, a dla (0,0,0) daje 1 — jest spełnialna i nie jest tautologią (A).',
      },
      {
        id: 'k22-1-3',
        number: 3,
        title: 'Wybór formuł spełnialnych niebędących tautologiami',
        category: 'Rachunek zdań · Klasyfikacja',
        prompt: 'Które z poniższych formuł są spełnialne ale nie są tautologiami:',
        options: [
          { letter: 'A', text: '(p ↔ q) ∧ p → q,', isMath: true },
          { letter: 'B', text: '((p ∧ q) ∨ (q → p) → p) → q,', isMath: true },
          { letter: 'C', text: '¬(p ∧ ¬q) ↔ ¬p ∨ q,', isMath: true },
          { letter: 'D', text: '(q ↔ p) → q ∨ p.', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Prawo de Morgana w C',
            definition: '¬(p ∧ ¬q) ≡ ¬p ∨ ¬¬q ≡ ¬p ∨ q — obie strony równoważności są identyczne, więc C jest tautologią.',
          },
          {
            term: 'Test dla 2 zmiennych',
            definition: 'Dla 2 zmiennych p, q są tylko 4 wiersze tabeli prawdy — bardzo szybko znajdziesz jednocześnie 0 i 1.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź opcję A: (p ↔ q) ∧ p → q',
            explanation:
              'Jeśli poprzednik jest prawdziwy, to p = 1 oraz p ↔ q = 1, skąd natychmiast wynika q = 1. Poprzednik nigdy nie może być 1 przy q = 0 — to TAUTOLOGIA (odpada).',
            formula: 'A: zawsze 1 (tautologia)  ⇒  odpada',
          },
          {
            title: 'Sprawdź opcję B: ((p ∧ q) ∨ (q → p) → p) → q',
            explanation:
              'Dla p = 1, q = 0: poprzednik ((0 ∨ 1) → 1) = (1 → 1) = 1, a następnik q = 0, więc całość = 1 → 0 = 0. Dla q = 1 cała implikacja (… → 1) = 1!',
            formula: 'B: dla (1,0) daje 0, dla (1,1) daje 1  ⇒  POPRAWNA (B)',
          },
          {
            title: 'Sprawdź opcję C: ¬(p ∧ ¬q) ↔ ¬p ∨ q',
            explanation:
              'Z prawa de Morgana ¬(p ∧ ¬q) ≡ ¬p ∨ ¬¬q ≡ ¬p ∨ q. Obie strony są równoważne dla każdego wartościowania — to TAUTOLOGIA (odpada).',
            formula: 'C: zawsze 1 (tautologia)  ⇒  odpada',
          },
          {
            title: 'Sprawdź opcję D: (q ↔ p) → q ∨ p',
            explanation:
              'Dla p = 0, q = 0: (0 ↔ 0) → (0 ∨ 0) = 1 → 0 = 0. Dla p = 1, q = 1: (1 ↔ 1) → (1 ∨ 1) = 1 → 1 = 1.',
            formula: 'D: dla (0,0) daje 0, dla (1,1) daje 1  ⇒  POPRAWNA (D)',
          },
        ],
        finalSummary: 'Opcje A i C są tautologiami; B i D przyjmują zarówno 0, jak i 1 — poprawne odpowiedzi: B, D.',
      },
      {
        id: 'k22-1-4',
        number: 4,
        title: 'Wartościowanie zerujące formułę (wartość 0)',
        category: 'Rachunek zdań · Wartościowanie',
        prompt: 'Dla którego z poniższych wartościowań wartość formuły wynosi 0?',
        formula: '(p → q ∧ r) → (r → p) ∧ (r → q)',
        options: [
          { letter: 'A', text: 'v(p) = 1, v(q) = 1, v(r) = 0', isMath: true },
          { letter: 'B', text: 'v(p) = 0, v(q) = 1, v(r) = 0', isMath: true },
          { letter: 'C', text: 'v(p) = 0, v(q) = 0, v(r) = 1', isMath: true },
          { letter: 'D', text: 'v(p) = 1, v(q) = 0, v(r) = 1', isMath: true },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Kiedy główna implikacja daje 0?',
            definition: 'Wyłącznie wtedy, gdy lewa strona (p → q ∧ r) = 1 oraz prawa strona (r → p) ∧ (r → q) = 0.',
          },
        ],
        steps: [
          {
            title: 'Odrzuć od razu opcje z v(r) = 0 (A i B)',
            explanation:
              'Gdy r = 0, obie implikacje po prawej stronie (0 → p) oraz (0 → q) mają wartość 1. Wtedy prawa strona wynosi 1 ∧ 1 = 1, więc cała formuła ma wartość 1.',
            formula: 'r = 0  ⇒  (0 → p) ∧ (0 → q) = 1  ⇒  całość = 1  (A, B odpadają)',
          },
          {
            title: 'Sprawdź opcję C: v(p) = 0, v(q) = 0, v(r) = 1',
            explanation:
              'Lewa strona: (0 → (0 ∧ 1)) = (0 → 0) = 1.\nPrawa strona: (1 → 0) ∧ (1 → 0) = 0 ∧ 0 = 0.\nCała implikacja: 1 → 0 = 0!',
            formula: 'C: 1 → 0 = 0  ⇒  POPRAWNA (C)',
          },
          {
            title: 'Dla kontroli sprawdź opcję D: v(p) = 1, v(q) = 0, v(r) = 1',
            explanation:
              'Lewa strona: (1 → (0 ∧ 1)) = (1 → 0) = 0. Ponieważ poprzednik wynosi 0, cała implikacja (0 → …) = 1.',
            formula: 'D: 0 → 0 = 1  (odpada)',
          },
        ],
        finalSummary: 'Tylko wartościowanie C (p=0, q=0, r=1) daje 1 → 0 = 0.',
      },
      {
        id: 'k22-1-5',
        number: 5,
        title: 'Zapis formuły w notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Formuła w notacji polskiej ma postać:',
        formula: '¬(¬(¬p ∧ ¬q) → ¬r)',
        options: [
          { letter: 'A', text: '→ ¬¬ ∧ ¬p¬q¬r,', isMath: true },
          { letter: 'B', text: '¬ → ¬ ∧ ¬p¬q¬r,', isMath: true },
          { letter: 'C', text: '→ ¬¬r¬ ∧ ¬p¬q,', isMath: true },
          { letter: 'D', text: '¬ → ¬r¬ ∧ ¬p¬q.', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Notacja polska (pre-order)',
            definition: 'Spójnik główny stawiamy na samym początku, potem kolejno lewy i prawy argument w tej samej konwencji.',
          },
        ],
        steps: [
          {
            title: 'Zbuduj drzewo struktury formuły',
            explanation:
              'Najbardziej zewnętrzny spójnik to negacja ¬ obejmująca całą implikację (…). Zatem zapis w notacji polskiej MUSI zaczynać się od „¬ →”. Od razu odpadają A i C!',
            treeFormula: '¬(¬(¬p ∧ ¬q) → ¬r)',
          },
          {
            title: 'Przetłumacz lewy i prawy argument implikacji',
            explanation:
              'Lewy argument to ¬(¬p ∧ ¬q) ⇒ w PN: ¬ ∧ ¬p ¬q.\nPrawy argument to ¬r ⇒ w PN: ¬r.\nZauważ, że D ma zamienioną kolejność argumentów (najpierw ¬r)!',
            formula: '¬  →  [¬ ∧ ¬p ¬q]  [¬r]   =   ¬ → ¬ ∧ ¬p¬q¬r   ⇒   Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'Korzeń ¬, następnie →, lewe poddrzewo ¬ ∧ ¬p¬q, prawe ¬r ⇒ ¬ → ¬ ∧ ¬p¬q¬r (B).',
      },
      {
        id: 'k22-1-6',
        number: 6,
        title: 'Odczyt formuły z notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Poniżej podana formuła w notacji polskiej jest równoważna formule:',
        formula: '¬ → → r ∧ q¬p ∨ → q¬r p',
        options: [
          { letter: 'A', text: '¬(r → q ∧ ¬p) → (q → ¬r) ∨ p,', isMath: true },
          { letter: 'B', text: '¬((r → q ∧ ¬p) → (q → ¬r) ∨ p),', isMath: true },
          { letter: 'C', text: '(r → q ∧ ¬p) → ¬((q → ¬r) ∨ p),', isMath: true },
          { letter: 'D', text: '¬((r → q ∧ ¬p) → (q → ¬r)) ∨ p.', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Zakres pierwszej negacji ¬',
            definition: 'Gdy napis w notacji polskiej zaczyna się od ¬ → …, negacja obejmuje CAŁĄ implikację aż do samego końca napisu!',
          },
        ],
        steps: [
          {
            title: 'Rozpoznaj spójnik główny i rozbij napis na dwa bloki',
            explanation:
              'Pierwszy symbol to ¬, drugi to →. Więc formuła ma postać ¬(BLOK_1 → BLOK_2). To od razu wyklucza A, C i D!',
            formula: '¬  (  →  [→ r ∧ q ¬p]   [∨ → q ¬r p]  )',
          },
          {
            title: 'Rozkoduj BLOK_1 i BLOK_2 oraz zweryfikuj drzewo',
            explanation:
              'BLOK_1 = → r (∧ q ¬p) = (r → q ∧ ¬p).\nBLOK_2 = ∨ (→ q ¬r) p = ((q → ¬r) ∨ p).\nPo złożeniu: ¬((r → q ∧ ¬p) → (q → ¬r) ∨ p).',
            treeFormula: '¬((r → q ∧ ¬p) → ((q → ¬r) ∨ p))',
          },
        ],
        finalSummary: 'Negacja stoi na samym początku przed głównym →, więc obejmuje całą implikację: ¬((r → q ∧ ¬p) → (q → ¬r) ∨ p) (B).',
      },
      {
        id: 'k22-1-7',
        number: 7,
        title: 'Dysjunkcyjna postać normalna (DPN)',
        category: 'Rachunek zdań · Postacie normalne',
        prompt: 'Dysjunkcyjna postać normalna formuły jest następująca:',
        formula: '¬(p → p ∧ q)',
        options: [
          { letter: 'A', text: '(p ∧ p) ∨ (p ∧ ¬q),', isMath: true },
          { letter: 'B', text: '(p ∧ ¬p) ∨ (p ∧ ¬q),', isMath: true },
          { letter: 'C', text: '(¬p ∧ p) ∨ (¬p ∧ ¬q),', isMath: true },
          { letter: 'D', text: '(p ∧ ¬q) ∨ (p ∧ q).', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Zaprzeczenie implikacji',
            definition: '¬(A → B) ≡ A ∧ ¬B. To najszybszy krok w zadaniach z DPN!',
          },
          {
            term: 'DPN (Dysjunkcyjna Postać Normalna)',
            definition: 'Alternatywa (∨) koniunkcji (∧) literałów. Uwaga: człon sprzeczny (p ∧ ¬p) ≡ 0 dodany alternatywą nie zmienia wartości logicznej formuły!',
          },
        ],
        steps: [
          {
            title: 'Zastosuj prawo zaprzeczenia implikacji i de Morgana',
            explanation:
              '¬(p → (p ∧ q)) ≡ p ∧ ¬(p ∧ q) ≡ p ∧ (¬p ∨ ¬q).',
            formula: '¬(p → p ∧ q)  ≡  p ∧ (¬p ∨ ¬q)',
          },
          {
            title: 'Zastosuj rozdzielność koniunkcji względem alternatywy',
            explanation:
              'Wymnażamy p przez nawias (¬p ∨ ¬q) i od razu dostajemy gotową DPN z odpowiedzi B:',
            formula: 'p ∧ (¬p ∨ ¬q)  ≡  (p ∧ ¬p) ∨ (p ∧ ¬q)   ⇒   Poprawna odpowiedź: B',
            note: 'Częsty błąd to wybranie C ((¬p ∧ p) ∨ (¬p ∧ ¬q) ≡ ¬p ∧ ¬q). Dla p=1, q=0 wyjściowa formuła daje ¬(1→0) = 1, podczas gdy C daje 0, a B daje 1!',
          },
        ],
        finalSummary: '¬(p → p ∧ q) ≡ p ∧ (¬p ∨ ¬q) ≡ (p ∧ ¬p) ∨ (p ∧ ¬q) — poprawna odpowiedź: B.',
      },
      {
        id: 'k22-1-8',
        number: 8,
        title: 'Wnioskowanie z raportu policji (Henry, świadek, testament)',
        category: 'Rachunek zdań · Wnioskowanie',
        reportQuote:
          'Henry popełnił samobójstwo lub też, jeśli świadek nie był zastraszony, to testamentu nie odnaleziono. Jeśli Henry nie popełnił samobójstwa, to świadek był zastraszony. Jeśli testamentu nie odnaleziono, to świadek nie był zastraszony. Jeśli świadek był zastraszony, to testamentu nie odnaleziono.',
        prompt: 'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        options: [
          { letter: 'A', text: 'Henry nie popełnił samobójstwa i testamentu nie odnaleziono.' },
          { letter: 'B', text: 'Henry popełnił samobójstwo i świadek był zastraszony.' },
          { letter: 'C', text: 'Świadek nie był zastraszony i Henry popełnił samobójstwo.' },
          { letter: 'D', text: 'Świadek nie był zastraszony i testamentu nie odnaleziono.' },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Oznaczenia zmiennych',
            definition: 'H — Henry popełnił samobójstwo, S — świadek był zastraszony, T — testament odnaleziono.',
          },
          {
            term: 'Pułapka nieokreślonej zmiennej',
            definition: 'Jeśli jakaś zmienna może być równa zarówno 0, jak i 1 przy zachowaniu wszystkich 4 zdań raportu, to NIE możemy o niej nic wywnioskować!',
          },
        ],
        steps: [
          {
            title: 'Zapisz wszystkie 4 zdania raportu jako formuły',
            explanation:
              '(1) H ∨ (¬S → ¬T)\n(2) ¬H → S\n(3) ¬T → ¬S\n(4) S → ¬T',
            formula: '(1) H ∨ (¬S → ¬T)   (2) ¬H → S   (3) ¬T → ¬S   (4) S → ¬T',
          },
          {
            title: 'Połącz zdania (4) i (3) — wyznacz S',
            explanation:
              'Gdyby S = 1, to z (4) mamy ¬T = 1 (czyli T = 0), a wtedy z (3) wynika ¬S = 1 (S = 0) — sprzeczność! Zatem MUSI być S = 0 (świadek NIE był zastraszony).',
            formula: 'S = 1 ⇒ ¬T = 1 (z 4) ⇒ S = 0 (z 3)  ⚡  ⇒  S = 0',
          },
          {
            title: 'Wykorzystaj zdanie (2) — wyznacz H',
            explanation:
              'Skoro S = 0, to w zdaniu (2) mamy ¬H → 0. Aby implikacja była prawdziwa, poprzednik ¬H musi być 0, czyli H = 1 (Henry popełnił samobójstwo).',
            formula: '¬H → 0 = 1  ⇒  ¬H = 0  ⇒  H = 1',
          },
          {
            title: 'Sprawdź, czy można ustalić T (uwaga na pułapkę w D!)',
            explanation:
              'Dla H = 1 i S = 0 sprawdzamy oba przypadki T = 0 oraz T = 1: w obu przypadkach wszystkie 4 zdania są prawdziwe (zdanie (1) jest prawdziwe dzięki H = 1, zdania (2), (3), (4) także). Zatem o testamencie NIE wiemy nic — opcja D jest fałszywa!',
            formula: 'Pewne są tylko: S = 0 i H = 1   ⇒   Poprawna odpowiedź: C',
          },
        ],
        finalSummary: 'Z raportu wynika jednoznacznie S = 0 i H = 1 (T może być 0 lub 1) — poprawna odpowiedź: C.',
      },
      {
        id: 'k22-1-9',
        number: 9,
        title: 'Tożsamości w dowolnej algebrze Boole’a',
        category: 'Algebra Boole’a · Tożsamości',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "x · y' + y · x = x',", isMath: true },
          { letter: 'B', text: '(x + y) · (x + y) = x + y + x · y,', isMath: true },
          { letter: 'C', text: "x + y' = (x · y)',", isMath: true },
          { letter: 'D', text: '(x + y) · (x + y) = x + y.', isMath: true },
        ],
        correctLetters: ['B', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Idempotentność (T-2.1)',
            definition: 'a · a = a oraz a + a = a dla dowolnego elementu a w algebrze Boole’a.',
          },
          {
            term: 'Prawo pochłaniania',
            definition: 'x + x · y = x. Dzięki temu (x + y) + x · y = (x + x · y) + y = x + y.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A i C (szybkie obalenie w {0, 1})',
            explanation:
              'W A: lewa strona to x · (y\' + y) = x · 1 = x, co NIE jest równe x\' (dla x = 1: 1 ≠ 0).\nW C: z prawa de Morgana (x · y)\' = x\' + y\', co różni się od x + y\' (dla x = 1, y = 1: 1 ≠ 0).',
            formula: "A: x ≠ x' (fałsz)   |   C: x + y' ≠ x' + y' (fałsz)",
          },
          {
            title: 'Sprawdź D: (x + y) · (x + y) = x + y',
            explanation:
              'To bezpośrednie zastosowanie prawa idempotentności a · a = a dla a = x + y.',
            formula: 'D: (x + y) · (x + y) = x + y   ⇒   POPRAWNA (D)',
          },
          {
            title: 'Sprawdź B: (x + y) · (x + y) = x + y + x · y',
            explanation:
              'Lewa strona to x + y (idempotentność). Prawa strona: x + y + x · y = (x + x · y) + y = x + y (prawo pochłaniania). Obie strony są ZAWSZE równe!',
            formula: 'B: L = x + y = (x + x · y) + y = P   ⇒   POPRAWNA (B)',
          },
        ],
        finalSummary: 'Obie tożsamości B i D redukują się do x + y = x + y — poprawne odpowiedzi: B, D.',
      },
      {
        id: 'k22-1-10',
        number: 10,
        title: 'Własności relacji y = 3x w zbiorze ℕ',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze liczb naturalnych ℕ określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ y = 3x',
        options: [
          { letter: 'A', text: 'Nie jest zwrotna i jest spójna.' },
          { letter: 'B', text: 'Jest przechodnia i nie jest spójna.' },
          { letter: 'C', text: 'Jest przeciwzwrotna i asymetryczna.' },
          { letter: 'D', text: 'Nie jest zwrotna i nie jest symetryczna.' },
        ],
        correctLetters: ['C', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Konwencja ℕ = {1, 2, 3, …}',
            definition: 'W konwencji tego przedmiotu 0 NIE należy do ℕ! Dzięki temu równanie x = 3x nie ma żadnego rozwiązania w ℕ.',
          },
          {
            term: 'Asymetryczność',
            definition: 'Jeśli xRy, to nigdy yRx. Skoro y = 3x oraz x = 3y daje x = 9x (niemożliwe w ℕ), relacja jest asymetryczna.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź zwrotność i przeciwzwrotność',
            explanation:
              'R(x, x) oznacza x = 3x, czyli 2x = 0, skąd x = 0 ∉ ℕ. Żaden element nie jest w relacji z samym sobą: relacja NIE jest zwrotna i JEST przeciwzwrotna.',
            formula: '∀x ∈ ℕ = {1, 2, …}: x ≠ 3x  ⇒  PRZECIWZWROTNA ✓, NIE ZWROTNA ✓',
          },
          {
            title: 'Sprawdź symetryczność i asymetryczność',
            explanation:
              'Para (1, 3) ∈ R, ale (3, 1) ∉ R ⇒ NIE jest symetryczna.\nCzy mogą zachodzić y = 3x i x = 3y jednocześnie? Wtedy x = 9x, niemożliwe dla x ≥ 1 ⇒ JEST asymetryczna.',
            formula: 'ASYMETRYCZNA ✓  |  NIE SYMETRYCZNA ✓',
          },
          {
            title: 'Sprawdź przechodniość i spójność (obal A i B)',
            explanation:
              '• Przechodnia? NIE: (1, 3) ∈ R i (3, 9) ∈ R, ale (1, 9) ∉ R (bo 9 ≠ 3 · 1).\n• Spójna? NIE: dla 1 ≠ 2 ani 2 = 3·1, ani 1 = 3·2.',
            formula: 'PRZECHODNIA ✗  |  SPÓJNA ✗   ⇒   Poprawne odpowiedzi: C, D',
          },
        ],
        finalSummary: 'Relacja y = 3x na ℕ = {1, 2, …} jest przeciwzwrotna, asymetryczna, niezwrotna i niesymetryczna (nie przechodnia i nie spójna) — C, D.',
      },
      {
        id: 'k22-1-11',
        number: 11,
        title: 'Własności relacji „nie są względnie pierwsze” w {1, …, 10}',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze X = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ x i y nie są względnie pierwsze  (czyli NWD(x, y) > 1)',
        options: [
          { letter: 'A', text: 'Jest symetryczna.' },
          { letter: 'B', text: 'Nie jest spójna.' },
          { letter: 'C', text: 'Jest relacją porządku częściowego.' },
          { letter: 'D', text: 'Jest przechodnia.' },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Liczby względnie pierwsze',
            definition: 'Dwie liczby są względnie pierwsze, gdy NWD(x, y) = 1. Zatem „nie są względnie pierwsze” znaczy NWD(x, y) > 1 (mają wspólny dzielnik > 1).',
          },
          {
            term: 'Uwaga na element 1!',
            definition: 'NWD(1, 1) = 1, więc (1, 1) ∉ R — relacja NIE jest zwrotna (i od razu nie może być porządkiem częściowym).',
          },
        ],
        steps: [
          {
            title: 'Sprawdź symetryczność (A)',
            explanation:
              'Ponieważ NWD(x, y) = NWD(y, x), jeśli x i y mają wspólny dzielnik większy od 1, to y i x również go mają.',
            formula: 'NWD(x, y) > 1 ⇔ NWD(y, x) > 1   ⇒   SYMETRYCZNA ✓  (POPRAWNA: A)',
          },
          {
            title: 'Sprawdź spójność (B)',
            explanation:
              'Weźmy dwa różne elementy x = 2 oraz y = 3. NWD(2, 3) = 1, więc ani (2, 3), ani (3, 2) nie należy do R.',
            formula: 'Dla 2 ≠ 3: (2, 3) ∉ R i (3, 2) ∉ R   ⇒   NIE JEST SPÓJNA ✓  (POPRAWNA: B)',
          },
          {
            title: 'Obal przechodniość (D) i porządek częściowy (C)',
            explanation:
              '• Przechodnia? NIE: (2, 6) ∈ R (NWD = 2 > 1) oraz (6, 3) ∈ R (NWD = 3 > 1), ale (2, 3) ∉ R (NWD = 1)!\n• Porządek częściowy? NIE: nie jest zwrotna (NWD(1, 1) = 1), nie jest antysymetryczna ((2, 4), (4, 2) ∈ R) i nie jest przechodnia.',
            formula: 'PRZECHODNIA ✗  |  PORZĄDEK CZĘŚCIOWY ✗   ⇒   Poprawne odpowiedzi: A, B',
          },
        ],
        finalSummary: 'Relacja NWD(x, y) > 1 jest symetryczna (A) i nie jest spójna (B), ale nie jest przechodnia ani porządkiem częściowym.',
      },
      {
        id: 'k22-1-12',
        number: 12,
        title: 'Tożsamości rachunku zbiorów dla dowolnych A, B, C',
        category: 'Zbiory i relacje · Rachunek zbiorów',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: 'A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C).', isMath: true },
          { letter: 'B', text: '(A ∪ B) ∩ (C ∪ B) = B.', isMath: true },
          { letter: 'C', text: '(A \\ C) ∪ B = A ∪ B.', isMath: true },
          { letter: 'D', text: 'C \\ (A ∪ B) = (C \\ A) ∩ (C \\ B).', isMath: true },
        ],
        correctLetters: ['A', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-1-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 1 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Prawo de Morgana dla różnicy',
            definition: 'C \\ (A ∪ B) = (C \\ A) ∩ (C \\ B) — odejmowanie sumy to przekrój różnic.',
          },
          {
            term: 'Metoda elementowa',
            definition: 'Zamieniamy x ∈ X \\ Y na x ∈ X ∧ ¬(x ∈ Y) i stosujemy znane prawa rachunku zdań.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A: A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C)',
            explanation:
              'x ∈ A \\ (B \\ C) ⇔ x ∈ A ∧ ¬(x ∈ B ∧ x ∉ C) ⇔ x ∈ A ∧ (x ∉ B ∨ x ∈ C) ⇔ (x ∈ A ∧ x ∉ B) ∨ (x ∈ A ∧ x ∈ C) ⇔ x ∈ (A \\ B) ∪ (A ∩ C).',
            formula: 'A: zawsze prawdziwe  ⇒  POPRAWNA (A)',
          },
          {
            title: 'Obal B i C kontrprzykładem A = C = {1}, B = ∅',
            explanation:
              '• Dla B: ({1} ∪ ∅) ∩ ({1} ∪ ∅) = {1} ≠ ∅ = B (prawdziwy wzór to (A ∩ C) ∪ B).\n• Dla C: ({1} \\ {1}) ∪ ∅ = ∅ ≠ {1} = A ∪ B.',
            formula: 'B: {1} ≠ ∅ (fałsz)   |   C: ∅ ≠ {1} (fałsz)',
          },
          {
            title: 'Sprawdź D: C \\ (A ∪ B) = (C \\ A) ∩ (C \\ B)',
            explanation:
              'x ∈ C ∧ ¬(x ∈ A ∨ x ∈ B) ⇔ x ∈ C ∧ x ∉ A ∧ x ∉ B ⇔ (x ∈ C ∧ x ∉ A) ∧ (x ∈ C ∧ x ∉ B) — prawo de Morgana dla zbiorów.',
            formula: 'D: zawsze prawdziwe  ⇒  POPRAWNA (D)',
          },
        ],
        finalSummary: 'Prawdziwe dla dowolnych A, B, C są tożsamości A i D.',
      },
    ],
  },

  // =========================================================================
  // KOLOKWIUM 2022 — ARKUSZ 2 (12 zadań)
  // =========================================================================
  {
    id: 'k22-arkusz-2',
    year: '2022',
    tabLabel: 'Arkusz 2',
    shortLabel: 'Kolokwium 2022 · Arkusz 2 (12 zadań)',
    title: 'Logika — zaliczenie | Kolokwium 2022 — Arkusz 2',
    subtitle: 'Test wielokrotnego wyboru (1–2 poprawne)',
    metaLine: '12 zadań · I rok Informatyki · +1 pkt poprawna / −1 pkt błędna / 0 pkt brak',
    description:
      'Drugi pełny arkusz 12 zadań z kolokwium z 2022 roku. Zwróć szczególną uwagę na podchwytliwe zadania nr 2 (formuła sprzeczna!) oraz nr 7 (DPN) i nr 10 (parzystość 3x − y).',
    questions: [
      {
        id: 'k22-2-1',
        number: 1,
        title: 'Poprawność składniowa formuł rachunku zdań',
        category: 'Rachunek zdań · Składnia',
        prompt: 'Które podpunkty zawierają tylko napisy będące poprawnymi składniowo formułami rachunku zdań:',
        options: [
          { letter: 'A', text: '¬(p → ¬q) ∨ ¬(¬p → q),  ¬(¬(¬p → q) ∨ ¬q),', isMath: true },
          { letter: 'B', text: '¬(¬p∨ → q),  ¬(p → ¬q) ∧ ¬p,', isMath: true },
          { letter: 'C', text: '¬p → ¬q ∧ p,  ¬(p ∧ ¬q)¬p,', isMath: true },
          { letter: 'D', text: 'p → ¬(¬q ∨ ¬p),  (p ∨ q) ↔ ¬(¬p ∧ q).', isMath: true },
        ],
        correctLetters: ['A', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Dwa spójniki dwuargumentowe obok siebie',
            definition: 'Zapis „∨ →” bez formuły pomiędzy nimi jest zawsze błędem składniowym.',
          },
          {
            term: 'Brak spójnika między podformułami',
            definition: 'Zapis „¬(p ∧ ¬q)¬p” skleja dwie podformuły bez spójnika dwuargumentowego (∧, ∨, →, ↔).',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A i D (poprawne)',
            explanation:
              'W A oba napisy mają zbalansowane nawiasy i poprawne ustawienie wszystkich spójników.\nW D oba napisy również spełniają indukcyjną definicję formuły zdaniowej.',
            formula: 'A: poprawne ✓   |   D: poprawne ✓',
          },
          {
            title: 'Wskaż błędy w B i C',
            explanation:
              '• W B: ¬(¬p∨ → q) zawiera dwa spójniki dwuargumentowe „∨ →” bezpośrednio obok siebie!\n• W C: ¬(p ∧ ¬q)¬p nie ma spójnika dwuargumentowego między nawiasem a ¬p.',
            formula: 'B: błąd „∨ →”  |  C: błąd „)¬p”   ⇒   Poprawne odpowiedzi: A, D',
          },
        ],
        finalSummary: 'Wyłącznie poprawne formuły znajdują się w podpunktach A oraz D.',
      },
      {
        id: 'k22-2-2',
        number: 2,
        title: 'Klasyfikacja formuły — pułapka sprzeczności!',
        category: 'Rachunek zdań · Semantyka',
        prompt: 'Dla poniższej formuły zaznacz stwierdzenia prawdziwe. Formuła:',
        formula: '(q → r) ∨ (p → ¬r) → (r → p) ∧ r ∧ ¬p',
        options: [
          { letter: 'A', text: 'jest spełnialna i nie jest tautologią;' },
          { letter: 'B', text: 'jest tautologią i nie jest spełnialna;' },
          { letter: 'C', text: 'jest tautologią i jest spełnialna;' },
          { letter: 'D', text: 'jest sprzeczna.' },
        ],
        correctLetters: ['D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Kiedy implikacja jest sprzeczna?',
            definition: 'A → B jest sprzeczna (zawsze 0) wtedy i tylko wtedy, gdy poprzednik A jest ZAWSZE 1 (tautologią), a następnik B jest ZAWSZE 0 (sprzecznością)!',
          },
        ],
        steps: [
          {
            title: 'Przeanalizuj lewą stronę (poprzednik): (q → r) ∨ (p → ¬r)',
            explanation:
              'Rozważmy obie możliwe wartości zmiennej r:\n• Jeśli r = 1, to (q → 1) = 1, więc cała alternatywa = 1.\n• Jeśli r = 0, to ¬r = 1, więc (p → 1) = 1, czyli cała alternatywa = 1.\nZatem lewa strona jest ZAWSZE równa 1 (tautologia)!',
            formula: 'Lewa strona:  (q → r) ∨ (p → ¬r)  ≡  1  (dla każdego wartościowania!)',
          },
          {
            title: 'Przeanalizuj prawą stronę (następnik): (r → p) ∧ r ∧ ¬p',
            explanation:
              'Aby koniunkcja trzech czynników dała 1, musi być r = 1 oraz ¬p = 1 (czyli p = 0). Ale wtedy pierwszy czynnik (r → p) = (1 → 0) = 0! Zatem prawa strona jest ZAWSZE równa 0!',
            formula: 'Prawa strona:  (r → p) ∧ r ∧ ¬p  ≡  0  (sprzeczność!)',
          },
          {
            title: 'Złóż główną implikację',
            explanation:
              'Dla KAŻDEGO wartościowania p, q, r otrzymujemy 1 → 0 = 0. Formuła jest sprzeczna!',
            formula: '1 → 0  ≡  0   ⇒   Poprawna odpowiedź: D (jest sprzeczna)',
          },
        ],
        finalSummary: 'Poprzednik jest zawsze 1, a następnik zawsze 0 ⇒ cała implikacja jest zawsze 0 (sprzeczna, D).',
      },
      {
        id: 'k22-2-3',
        number: 3,
        title: 'Wybór formuł spełnialnych niebędących tautologiami',
        category: 'Rachunek zdań · Klasyfikacja',
        prompt: 'Które z poniższych formuł są spełnialne ale nie są tautologiami:',
        options: [
          { letter: 'A', text: 'p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r),', isMath: true },
          { letter: 'B', text: '(q → ¬p) ∧ (p → ¬q),', isMath: true },
          { letter: 'C', text: '(¬p ∧ ¬q) ↔ ¬p ∧ q,', isMath: true },
          { letter: 'D', text: '¬(p → q) ↔ (¬q → ¬p).', isMath: true },
        ],
        correctLetters: ['B', 'C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Prawo kontrapozycji w D',
            definition: '(¬q → ¬p) ≡ (p → q). Zatem D ma postać ¬X ↔ X, czyli jest ZAWSZE 0 (sprzeczna!).',
          },
        ],
        steps: [
          {
            title: 'Odrzuć A (tautologia) i D (sprzeczność)',
            explanation:
              '• A to dokładnie prawo rozdzielności koniunkcji względem alternatywy — TAUTOLOGIA.\n• W D mamy (¬q → ¬p) ≡ (p → q), więc D ≡ ¬(p → q) ↔ (p → q) ≡ 0 — SPRZECZNA.',
            formula: 'A ≡ 1 (tautologia)   |   D ≡ 0 (sprzeczna)',
          },
          {
            title: 'Sprawdź B: (q → ¬p) ∧ (p → ¬q)',
            explanation:
              'Dla p = 0, q = 0: (0 → 1) ∧ (0 → 1) = 1.\nDla p = 1, q = 1: (1 → 0) ∧ (1 → 0) = 0.',
            formula: 'B: przyjmuje 1 i 0  ⇒  POPRAWNA (B)',
          },
          {
            title: 'Sprawdź C: (¬p ∧ ¬q) ↔ ¬p ∧ q',
            explanation:
              'Dla p = 1, q = 0: (0 ∧ 1) ↔ (0 ∧ 0) = (0 ↔ 0) = 1!\nDla p = 0, q = 1: (1 ∧ 0) ↔ (1 ∧ 1) = (0 ↔ 1) = 0.',
            formula: 'C: dla (1,0) daje 1, dla (0,1) daje 0  ⇒  POPRAWNA (C)',
          },
        ],
        finalSummary: 'A jest tautologią, D sprzecznością, natomiast B i C są spełnialne i nie są tautologiami (B, C).',
      },
      {
        id: 'k22-2-4',
        number: 4,
        title: 'Wartościowanie zerujące formułę (wartość 0)',
        category: 'Rachunek zdań · Wartościowanie',
        prompt: 'Dla którego z poniższych wartościowań wartość formuły wynosi 0?',
        formula: '(p → q) → ((q → r) → (r → p))',
        options: [
          { letter: 'A', text: 'v(p) = 1, v(q) = 1, v(r) = 0', isMath: true },
          { letter: 'B', text: 'v(p) = 1, v(q) = 0, v(r) = 0', isMath: true },
          { letter: 'C', text: 'v(p) = 0, v(q) = 1, v(r) = 0', isMath: true },
          { letter: 'D', text: 'v(p) = 0, v(q) = 1, v(r) = 1', isMath: true },
        ],
        correctLetters: ['D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Łańcuch implikacji A → (B → C)',
            definition: 'Daje 0 wtedy i tylko wtedy, gdy A = 1, B = 1 oraz C = 0.',
          },
        ],
        steps: [
          {
            title: 'Wyznacz warunki zerowania od prawej strony',
            explanation:
              'Aby (p → q) → ((q → r) → (r → p)) = 0, musi zachodzić:\n1) r → p = 0  ⇒  r = 1 oraz p = 0.\n2) q → r = 1  ⇒  (q → 1) = 1 (zawsze spełnione dla r = 1).\n3) p → q = 1  ⇒  (0 → q) = 1 (zawsze spełnione dla p = 0).',
            formula: 'Warunek zerowania:  r = 1  i  p = 0  (q dowolne)',
          },
          {
            title: 'Dopasuj odpowiedź spośród A–D',
            explanation:
              'Wśród opcji A–D tylko opcja D ma v(p) = 0 i v(r) = 1. Sprawdzamy: (0 → 1) → ((1 → 1) → (1 → 0)) = 1 → (1 → 0) = 1 → 0 = 0.',
            formula: 'D: v(p) = 0, v(q) = 1, v(r) = 1   ⇒   Poprawna odpowiedź: D',
          },
        ],
        finalSummary: 'Formuła zeruje się wyłącznie dla r = 1 i p = 0 — wśród wariantów jest to D.',
      },
      {
        id: 'k22-2-5',
        number: 5,
        title: 'Zapis formuły w notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Formuła w notacji polskiej ma postać:',
        formula: '(p ∨ ¬q) ↔ ¬(¬p ∧ q)',
        options: [
          { letter: 'A', text: '↔ ∨p¬q¬ ∧ ¬pq,', isMath: true },
          { letter: 'B', text: '↔ ¬ ∧ ¬pq ∨ p¬q,', isMath: true },
          { letter: 'C', text: '↔ ∨¬pq¬ ∧ p¬q,', isMath: true },
          { letter: 'D', text: '↔ ∨p¬q ∧ ¬p¬q.', isMath: true },
        ],
        correctLetters: ['A'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Kolejność w notacji polskiej',
            definition: 'W A ↔ B najpierw wypisujemy korzeń ↔, potem całe lewe poddrzewo A, a na końcu prawe poddrzewo B (nie wolno zamieniać kolejności stron jak w B!).',
          },
        ],
        steps: [
          {
            title: 'Narysuj drzewo struktury formuły',
            explanation:
              'Głównym spójnikiem jest ↔. Lewe poddrzewo to (p ∨ ¬q), a prawe to ¬(¬p ∧ q).',
            treeFormula: '(p ∨ ¬q) ↔ ¬(¬p ∧ q)',
          },
          {
            title: 'Złóż wynik w porządku pre-order',
            explanation:
              '• Lewe poddrzewo (p ∨ ¬q) ⇒ ∨ p ¬q\n• Prawe poddrzewo ¬(¬p ∧ q) ⇒ ¬ ∧ ¬p q\n• Całość: ↔ ∨ p ¬q ¬ ∧ ¬p q.',
            formula: '↔ ∨p¬q¬ ∧ ¬pq   ⇒   Poprawna odpowiedź: A',
          },
        ],
        finalSummary: 'Przejście pre-order daje ↔ ∨p¬q¬ ∧ ¬pq — poprawna odpowiedź: A.',
      },
      {
        id: 'k22-2-6',
        number: 6,
        title: 'Odczyt formuły z notacji polskiej',
        category: 'Rachunek zdań · Notacja polska',
        prompt: 'Poniżej podana formuła w notacji polskiej jest równoważna formule:',
        formula: '∨ ¬ → ∧ p q r ↔ p q',
        options: [
          { letter: 'A', text: '(p ∧ q → r) ∨ ¬(p ↔ q)', isMath: true },
          { letter: 'B', text: '¬(p ∧ q → r) ∨ (p ↔ q)', isMath: true },
          { letter: 'C', text: '(p ∧ q → r) ∨ (¬p ↔ q)', isMath: true },
          { letter: 'D', text: '¬(p ∨ q → r) ∧ (p ↔ q)', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str1.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 1/2, zadania 1–6)',
        glossary: [
          {
            term: 'Spójnik główny',
            definition: 'Pierwszy znak napisu to ∨, więc cała formuła jest alternatywą dwóch bloków (D odpada, bo ma ∧).',
          },
        ],
        steps: [
          {
            title: 'Podziel ciąg na dwa argumenty spójnika ∨',
            explanation:
              'Lewy blok zaczyna się od ¬ → ∧ p q r (negacja implikacji ((p ∧ q) → r)).\nPrawy blok to ↔ p q (równoważność (p ↔ q)).',
            formula: '∨  [¬ → [∧ p q] r]   [↔ p q]',
          },
          {
            title: 'Złóż postać infiksową i sprawdź na drzewie',
            explanation:
              'Otrzymujemy ¬(p ∧ q → r) ∨ (p ↔ q), co dokładnie odpowiada opcji B.',
            treeFormula: '¬((p ∧ q) → r) ∨ (p ↔ q)',
          },
        ],
        finalSummary: '∨ [¬ → ∧pqr] [↔pq] = ¬(p ∧ q → r) ∨ (p ↔ q) — poprawna odpowiedź: B.',
      },
      {
        id: 'k22-2-7',
        number: 7,
        title: 'Dysjunkcyjna postać normalna (DPN)',
        category: 'Rachunek zdań · Postacie normalne',
        prompt: 'Dysjunkcyjna postać normalna formuły jest następująca:',
        formula: 'p → ¬p ∨ q',
        options: [
          { letter: 'A', text: '(¬p ∧ p) ∨ (q ∧ q),', isMath: true },
          { letter: 'B', text: '(¬p ∧ ¬p) ∨ (q ∧ q),', isMath: true },
          { letter: 'C', text: '(¬p ∧ p) ∨ (¬q ∧ q),', isMath: true },
          { letter: 'D', text: '(p ∧ p) ∨ (¬q ∧ ¬q).', isMath: true },
        ],
        correctLetters: ['B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Eliminacja implikacji',
            definition: 'A → B ≡ ¬A ∨ B. Tutaj p → (¬p ∨ q) ≡ ¬p ∨ (¬p ∨ q) ≡ ¬p ∨ q.',
          },
          {
            term: 'Pułapka w opcji A!',
            definition: 'W A mamy (¬p ∧ p) ≡ 0, więc cała opcja A redukuje się do samego q, co NIE jest równoważne ¬p ∨ q (dla p = 0, q = 0 wyjściowa formuła daje 1, a A daje 0)!',
          },
        ],
        steps: [
          {
            title: 'Eliminuj implikację i uprość',
            explanation:
              'Zamieniamy strzałkę → na alternatywę i stosujemy idempotentność (¬p ∨ ¬p ≡ ¬p):',
            formula: 'p → (¬p ∨ q)  ≡  ¬p ∨ ¬p ∨ q  ≡  ¬p ∨ q',
          },
          {
            title: 'Zapisz każdy literał jako koniunkcję (idempotentność)',
            explanation:
              '¬p ≡ (¬p ∧ ¬p) oraz q ≡ (q ∧ q). Zatem DPN to (¬p ∧ ¬p) ∨ (q ∧ q).',
            formula: '¬p ∨ q  ≡  (¬p ∧ ¬p) ∨ (q ∧ q)   ⇒   Poprawna odpowiedź: B',
          },
        ],
        finalSummary: 'p → ¬p ∨ q ≡ ¬p ∨ q ≡ (¬p ∧ ¬p) ∨ (q ∧ q) — poprawna odpowiedź: B.',
      },
      {
        id: 'k22-2-8',
        number: 8,
        title: 'Wnioskowanie z raportu policji (Henry, świadek, testament)',
        category: 'Rachunek zdań · Wnioskowanie',
        reportQuote:
          'Testamentu nie odnaleziono lub też, jeśli Henry nie popełnił samobójstwa, to świadek był zastraszony. Jeśli testament odnaleziono, to Henry popełnił samobójstwo. Jeśli świadek był zastraszony, to Henry nie popełnił samobójstwa. Jeśli Henry popełnił samobójstwo, to świadek był zastraszony.',
        prompt: 'Co komendant policji może wywnioskować z powyższego raportu (poza oczywistym faktem, że należy zwolnić aspiranta)?',
        options: [
          { letter: 'A', text: 'Świadek nie był zastraszony i testament odnaleziono.' },
          { letter: 'B', text: 'Świadek był zastraszony i testamentu nie odnaleziono.' },
          { letter: 'C', text: 'Henry nie popełnił samobójstwa i testamentu nie odnaleziono.' },
          { letter: 'D', text: 'Henry nie popełnił samobójstwa i świadek nie był zastraszony.' },
        ],
        correctLetters: ['C'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Oznaczenia zmiennych',
            definition: 'H — Henry popełnił samobójstwo, S — świadek był zastraszony, T — testament odnaleziono.',
          },
        ],
        steps: [
          {
            title: 'Zapisz 4 zdania raportu w postaci formuł',
            explanation:
              '(1) ¬T ∨ (¬H → S)\n(2) T → H\n(3) S → ¬H\n(4) H → S',
            formula: '(1) ¬T ∨ (¬H → S)   (2) T → H   (3) S → ¬H   (4) H → S',
          },
          {
            title: 'Ze zdań (4) i (3) wyznacz H',
            explanation:
              'Gdyby H = 1, to z (4) mielibyśmy S = 1, a wtedy z (3) otrzymalibyśmy H = 0 — sprzeczność! Zatem H = 0 (Henry NIE popełnił samobójstwa).',
            formula: 'H = 1 ⇒ S = 1 (z 4) ⇒ H = 0 (z 3)  ⚡  ⇒  H = 0',
          },
          {
            title: 'Ze zdania (2) wyznacz T i sprawdź nieokreśloność S',
            explanation:
              'Ze zdania (2): T → 0 = 1 ⇒ T = 0 (testamentu NIE odnaleziono). Wtedy ¬T = 1, więc zdanie (1) jest spełnione niezależnie od S! Zarówno (H=0, S=0, T=0), jak i (H=0, S=1, T=0) spełniają cały raport.',
            formula: 'Pewne są wyłącznie H = 0 i T = 0   ⇒   Poprawna odpowiedź: C',
          },
        ],
        finalSummary: 'Jednoznacznie wynika H = 0 oraz T = 0 (S jest nieokreślone) — poprawna odpowiedź: C.',
      },
      {
        id: 'k22-2-9',
        number: 9,
        title: 'Tożsamości w dowolnej algebrze Boole’a',
        category: 'Algebra Boole’a · Tożsamości',
        prompt: 'Niech B oznacza dowolną algebrę Boole’a. Które z poniższych relacji są spełnione dla dowolnych x, y ∈ B:',
        options: [
          { letter: 'A', text: "(x + y + x') · (y' + x) = x + y',", isMath: true },
          { letter: 'B', text: "x · y' + x + y' · x' = x + y',", isMath: true },
          { letter: 'C', text: "(x + y)' · x = 1,", isMath: true },
          { letter: 'D', text: "x' · y + x + y' = x.", isMath: true },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Prawo uzupełnienia',
            definition: "x + x' = 1 oraz 1 + y = 1. Również x + x' · y' = x + y' (pochłanianie z negacją!).",
          },
        ],
        steps: [
          {
            title: "Sprawdź A: (x + y + x') · (y' + x) = x + y'",
            explanation:
              "W pierwszym nawiasie mamy x + x' = 1, więc cały pierwszy nawias to 1 + y = 1. Po przemnożeniu: 1 · (y' + x) = x + y'.",
            formula: "A: (1 + y) · (y' + x) = 1 · (x + y') = x + y'   ⇒   POPRAWNA (A)",
          },
          {
            title: "Sprawdź B: x · y' + x + y' · x' = x + y'",
            explanation:
              "Najpierw pochłanianie: x · y' + x = x. Zostaje x + x' · y'. Z rozdzielności: (x + x') · (x + y') = 1 · (x + y') = x + y'!",
            formula: "B: x + x' · y' = (x + x')(x + y') = x + y'   ⇒   POPRAWNA (B)",
          },
          {
            title: 'Obal C i D kontrprzykładem',
            explanation:
              "• C: (x + y)' · x = x' · y' · x = 0 ≠ 1 (zawsze 0!).\n• D: dla x = 0, y = 0: 1 · 0 + 0 + 1 = 1 ≠ 0 = x.",
            formula: 'C: 0 ≠ 1 (fałsz)   |   D: dla (0,0): 1 ≠ 0 (fałsz)',
          },
        ],
        finalSummary: 'Prawdziwe w każdej algebrze Boole’a są tożsamości A oraz B.',
      },
      {
        id: 'k22-2-10',
        number: 10,
        title: 'Własności relacji „3x − y jest parzyste” w ℕ',
        category: 'Zbiory i relacje · Własności relacji',
        prompt: 'W zbiorze liczb naturalnych ℕ określona jest relacja R. Relacja R spełnia warunki:',
        formula: 'R(x, y) ⇔ 3x − y jest parzyste',
        options: [
          { letter: 'A', text: 'Jest zwrotna i przechodnia.' },
          { letter: 'B', text: 'Jest symetryczna i spójna.' },
          { letter: 'C', text: 'Jest przechodnia i asymetryczna.' },
          { letter: 'D', text: 'Jest symetryczna i przechodnia.' },
        ],
        correctLetters: ['A', 'D'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Szybkie uproszczenie modulo 2',
            definition: '3x − y = 2x + (x − y). Ponieważ 2x jest zawsze parzyste, 3x − y jest parzyste ⇔ x i y mają tę samą parzystość!',
          },
        ],
        steps: [
          {
            title: 'Uprość warunek parzystości',
            explanation:
              '3x − y = 2x + (x − y). Liczba 2x jest zawsze parzysta, więc 3x − y jest parzyste wtedy i tylko wtedy, gdy x oraz y są tej samej parzystości (x ≡ y (mod 2)).',
            formula: 'R(x, y)  ⇔  x ≡ y (mod 2)',
          },
          {
            title: 'Sprawdź własności relacji równoważności',
            explanation:
              '• Zwrotna? TAK: 3x − x = 2x (parzyste).\n• Symetryczna? TAK: x ≡ y (mod 2) ⇒ y ≡ x (mod 2).\n• Przechodnia? TAK: x ≡ y i y ≡ z ⇒ x ≡ z (mod 2).',
            formula: 'ZWROTNA ✓  |  SYMETRYCZNA ✓  |  PRZECHODNIA ✓',
          },
          {
            title: 'Obal spójność (B) i asymetryczność (C)',
            explanation:
              '• Spójna? NIE: dla 1 ≠ 2 ani 3·1−2 = 1, ani 3·2−1 = 5 nie jest parzyste.\n• Asymetryczna? NIE: (1, 1) ∈ R (relacja zwrotna nigdy nie jest asymetryczna!).',
            formula: 'SPÓJNA ✗  |  ASYMETRYCZNA ✗   ⇒   Poprawne odpowiedzi: A, D',
          },
        ],
        finalSummary: 'Relacja R(x, y) ⇔ x ≡ y (mod 2) jest zwrotna, symetryczna i przechodnia (nie spójna i nie asymetryczna) — A, D.',
      },
      {
        id: 'k22-2-11',
        number: 11,
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
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Nierówność na liczbach ≥ 1',
            definition: 'Dla każdego x ∈ {1, …, 10} zachodzi x² ≥ x, więc nigdy nie jest x² < x.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź przeciwzwrotność i asymetryczność',
            explanation:
              '• Przeciwzwrotna: dla każdego x ≥ 1 mamy x² ≥ x, więc ¬(x² < x) ✓.\n• Asymetryczna: jeśli x² < y, to x ≤ x² < y ≤ y², czyli y² > x, więc ¬(y² < x) ✓.',
            formula: 'PRZECIWZWROTNA ✓  |  ASYMETRYCZNA ✓',
          },
          {
            title: 'Sprawdź przechodniość',
            explanation:
              'Jeśli x² < y oraz y² < z, to ponieważ y ≤ y², mamy x² < y ≤ y² < z, czyli x² < z ✓.',
            formula: 'x² < y ≤ y² < z  ⇒  x² < z   ⇒   PRZECHODNIA ✓',
          },
          {
            title: 'Obal spójność (A) i symetryczność (B)',
            explanation:
              '• Spójna? NIE: dla x = 4, y = 5 mamy 16 < 5 (fałsz) i 25 < 4 (fałsz).\n• Symetryczna? NIE: (2, 5) ∈ R (4 < 5), ale (5, 2) ∉ R (25 < 2 fałsz).',
            formula: 'Poprawne odpowiedzi: C, D',
          },
        ],
        finalSummary: 'Relacja x² < y na {1, …, 10} jest przeciwzwrotna, asymetryczna i przechodnia — C, D.',
      },
      {
        id: 'k22-2-12',
        number: 12,
        title: 'Tożsamości rachunku zbiorów dla dowolnych A, B, C',
        category: 'Zbiory i relacje · Rachunek zbiorów',
        prompt: 'Które z poniższych relacji są prawdziwe dla dowolnych zbiorów A, B, C?',
        options: [
          { letter: 'A', text: '(A ∪ B) \\ C = (A \\ C) ∪ (B \\ C).', isMath: true },
          { letter: 'B', text: 'A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C).', isMath: true },
          { letter: 'C', text: '(A ∪ B ∪ C) \\ (A ∪ B) = C.', isMath: true },
          { letter: 'D', text: '(A ∩ B) \\ C = (B ∩ C) ∪ (A ∩ C).', isMath: true },
        ],
        correctLetters: ['A', 'B'],
        photoSrc: '/assets/kolokwium-2022/arkusz-2-str2.png',
        photoLabel: 'Kolokwium 2022 — Arkusz 2 (str. 2/2, zadania 7–12)',
        glossary: [
          {
            term: 'Rozdzielność różnicy i prawo de Morgana',
            definition: '(A ∪ B) \\ C = (A \\ C) ∪ (B \\ C) oraz A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C) to dwa podstawowe prawa zbiorów.',
          },
        ],
        steps: [
          {
            title: 'Sprawdź A i B metodą elementową',
            explanation:
              '• A: (x ∈ A ∨ x ∈ B) ∧ x ∉ C ⇔ (x ∈ A ∧ x ∉ C) ∨ (x ∈ B ∧ x ∉ C) ✓.\n• B: x ∈ A ∧ ¬(x ∈ B ∨ x ∈ C) ⇔ x ∈ A ∧ x ∉ B ∧ x ∉ C ⇔ (x ∈ A ∧ x ∉ B) ∧ (x ∈ A ∧ x ∉ C) ✓.',
            formula: 'A: prawda ✓   |   B: prawda ✓',
          },
          {
            title: 'Obal C i D kontrprzykładami',
            explanation:
              '• C: weźmy A = C = {1}, B = ∅. Wtedy ({1}) \\ ({1}) = ∅ ≠ {1} = C (prawdziwe jest tylko C \\ (A ∪ B)).\n• D: weźmy A = B = {1}, C = ∅. Lewa strona = {1}, prawa = ∅!',
            formula: 'C: ∅ ≠ {1} (fałsz)   |   D: {1} ≠ ∅ (fałsz)   ⇒   Poprawne odpowiedzi: A, B',
          },
        ],
        finalSummary: 'Prawdziwe dla dowolnych A, B, C są tożsamości A i B.',
      },
    ],
  },
];
