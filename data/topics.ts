import { TopicUnit } from '@/lib/types';

export const TOPIC_UNITS: TopicUnit[] = [
  {
    id: 'dzial-1',
    number: 1,
    title: 'Dział 1. Rachunek zdań',
    shortTitle: '1. Rachunek zdań',
    subtitle: 'Składnia, notacja polska, semantyka, tautologie i DPN/KPN',
    sourceRef: 'Zad_MDL (T-1.1 – T-1.11, zad. 1.1–1.90) · Wykład 1–2',
    overview:
      'Rachunek zdań stanowi fundament kolokwium (aż 7 z 12 zadań na arkuszu: zadania 1–7!). Poznasz tu budowę formuł zdaniowych, drzewa struktury i notację polską, wartościowania, klasyfikację formuł (tautologia / spełnialna / sprzeczna), wnioskowanie z raportu policji oraz sprowadzanie do postaci normalnych DPN i KPN.',
    examFrequency: 'Zadania 1–7 na kolokwium (~58% arkusza)',
    keyTakeaways: [
      {
        term: 'Priorytety funktorów (od najsilniejszego)',
        definition:
          '1. negacja (¬)  →  2. koniunkcja i alternatywa (∧, ∨)  →  3. implikacja i równoważność (→, ↔). Zewnętrzne nawiasy pomijamy.',
      },
      {
        term: 'Notacja polska (beznawiasowa)',
        definition:
          'Spisujemy drzewo struktury w kolejności: KORZEŃ → LEWE poddrzewo → PRAWE poddrzewo (przejście pre-order).',
      },
      {
        term: 'Tautologia · Spełnialna · Sprzeczna',
        definition:
          'Tautologia = zawsze 1 (⊨ φ). Spełnialna = istnieje choć jedna 1 (uwaga: każda tautologia jest spełnialna!). Sprzeczna = zawsze 0.',
      },
      {
        term: 'Postacie normalne DPN i KPN',
        definition:
          'DPN (dysjunkcyjna) = alternatywa koniunkcji literałów, np. (¬p ∧ ¬p) ∨ (p ∧ q). KPN (koniunkcyjna) = koniunkcja alternatyw literałów.',
      },
    ],
    theoryBlocks: [
      {
        code: 'T-1.1 – T-1.4',
        title: 'Alfabet, formuły poprawne, priorytety i ciąg tworzący',
        summary:
          'Zdanie w logice to zdanie oznajmujące, któremu możemy przypisać wartość 1 (prawda) lub 0 (fałsz). Zdania atomowe oznaczamy p, q, r, … oraz stałą ⊥ (zawsze 0).',
        bullets: [
          'Poprawne formuły (T-1.2): atomy oraz złożenia (¬φ), (φ ∧ ψ), (φ ∨ ψ), (φ → ψ), (φ ↔ ψ). Zapis typu „¬¬⊥)” albo „((p → q)¬ ∨ p)” NIE jest formułą (błędne nawiasy lub negacja po formule).',
          'Reguły upraszczania nawiasów: usuwamy nawiasy zewnętrzne oraz nawiasy wynikające z priorytetów ¬ > (∧, ∨) > (→, ↔). Uwaga: w p → (q → r) i p → ¬(p ∧ q) nawiasów NIE wolno opuścić!',
          'Ciąg tworzący (T-1.4): lista formuł φ₀, φ₁, …, φₙ kończąca się φ, gdzie każdy wyraz to atom albo złożenie wcześniejszych wyrazów. Elementy najkrótszego ciągu tworzącego nazywamy podformułami.',
        ],
        formulas: [
          {
            label: 'Eliminacja implikacji',
            expr: '(p → q) ↔ (¬p ∨ q)',
            note: 'Kluczowy wzór przy DPN/KPN!',
          },
          {
            label: 'Zaprzeczenie implikacji',
            expr: '¬(p → q) ↔ (p ∧ ¬q)',
            note: 'Implikacja jest fałszywa TYLKO dla 1 → 0',
          },
          {
            label: 'Prawa de Morgana',
            expr: '¬(p ∨ q) ↔ ¬p ∧ ¬q   oraz   ¬(p ∧ q) ↔ ¬p ∨ ¬q',
          },
          {
            label: 'Kontrapozycja',
            expr: '(p → q) ↔ (¬q → ¬p)',
            note: 'Zawsze równoważne (w przeciwieństwie do q → p!)',
          },
        ],
      },
      {
        code: 'T-1.5 – T-1.6',
        title: 'Drzewo struktury T(φ) i Notacja Polska (beznawiasowa)',
        summary:
          'Każdej formule odpowiada jednoznaczne drzewo struktury. Spójnik główny (wykonywany jako OSTATNI) trafia do korzenia. Węzły spójników dwuargumentowych (∧, ∨, →, ↔) mają 2 dzieci (lewe i prawe), a negacja (¬) ma 1 dziecko.',
        bullets: [
          'Jak zapisać formułę w notacji polskiej (T-1.6)? Zbuduj drzewo struktury i odczytuj wierzchołki metodą Pre-Order: najpierw korzeń, potem całe lewe poddrzewo, potem całe prawe poddrzewo.',
          'Jak odczytać formułę z notacji polskiej (odwrotnie)? Czytaj od PRAWEJ do LEWEJ (lub dziel argumenty od lewej): gdy napotkasz ¬, sklej 1 element na prawo; gdy napotkasz ∧, ∨, →, ↔, sklej 2 najbliższe gotowe podformuły na prawo w (A # B)!',
        ],
        treeFormula: '(q <-> p) -> (q -> !(p & q))',
        photoSrc: '/assets/aistudio/IMG_20261005_123552046_ffd46e98.jpg',
        photoLabel: 'Slajd z wykładu: drzewo struktury (q ↔ p) → (q → ¬(p ∧ q))',
        tip: 'Na kolokwium (zadania 4 i 5) sprawdź szybko spójnik główny — to on ZAWSZE stoi jako pierwszy znak notacji polskiej!',
      },
      {
        code: 'T-1.7 – T-1.10',
        title: 'Wartościowania, tabelki prawdziwości i klasyfikacja formuł',
        summary:
          'Wartościowanie v : P → {0, 1} przypisuje każdemu atomowi 0 lub 1 (przy czym zawsze v(⊥) = 0). Aby sklasyfikować formułę, sprawdzamy czy może przyjąć wartość 0 i czy może przyjąć wartość 1.',
        table: {
          headers: ['p', 'q', '¬p', 'p ∨ q', 'p ∧ q', 'p → q', 'p ↔ q', 'p ⊕ q', 'p | q (Scheffer)'],
          rows: [
            ['1', '1', '0', '1', '1', '1', '1', '0', '0'],
            ['1', '0', '0', '1', '0', '0', '0', '1', '1'],
            ['0', '1', '1', '1', '0', '1', '0', '1', '1'],
            ['0', '0', '1', '0', '0', '1', '1', '0', '1'],
          ],
          caption: 'Kompletna tabela prawdziwości spójników z wykładu (T-1.10). Kreska Scheffera p | q to NAND: ¬(p ∧ q).',
        },
        bullets: [
          'Metoda nie wprost (szybsza niż tabela 8-wierszowa!): aby sprawdzić, czy implikacja A → B jest tautologią, załóż że A → B = 0. To wymusza A = 1 oraz B = 0. Jeśli dojdziesz do sprzeczności (np. r = 1 i r = 0), formuła JEST tautologią! Jeśli znajdziesz konkretne v(p), v(q), v(r), masz gotowy kontrprzykład (nie jest tautologią).',
          'Warunek wystarczający vs konieczny (Zad. 1.74–1.79): dla twierdzenia p → q mówimy, że p jest warunkiem WYSTARCZAJĄCYM dla q, a q jest warunkiem KONIECZNYM dla p.',
        ],
      },
      {
        code: 'T-1.11',
        title: 'Postacie normalne: DPN (DNF) oraz KPN (CNF)',
        summary:
          'Literał to atom (p) lub negacja atomu (¬p). Każdą formułę można zapisać w postaci normalnej, eliminując najpierw → i ↔, a potem wprowadzając negacje do środka prawami de Morgana i stosując rozdzielność.',
        bullets: [
          'DPN (Dysjunkcyjna Postać Normalna): alternatywa (∨) koniunkcji (∧) literałów — np. (¬p ∧ ¬p) ∨ (p ∧ q). Uwaga: pojedynczy literał ¬p można zapisać jako (¬p ∧ ¬p) z idempotencji!',
          'KPN (Koniunkcyjna Postać Normalna): koniunkcja (∧) alternatyw (∨) literałów (klauzul) — np. (¬p ∨ q) ∧ (p ∨ ¬q).',
          'Trik na kolokwium (Zadanie 6): gdy masz wybrać DPN z opcji A–D, sprawdź dwa warunki: (1) czy opcja jest poprawną DPN (na zewnątrz ∨, w nawiasach wyłącznie ∧ literałów), (2) czy ma tę samą tabelę prawdy (4 wiersze) co formuła wyjściowa!',
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-1-19',
        zadNumber: 'Zad. 1.19–1.20',
        title: 'Drzewo struktury i notacja polska ze zwykłej formuły',
        prompt:
          'Dla formuły p → q ∨ ¬p narysuj drzewo struktury i zapisz ją w notacji polskiej.',
        formula: 'p → q ∨ ¬p',
        steps: [
          {
            title: 'Ustal spójnik główny z priorytetów',
            explanation:
              'Mamy spójniki →, ∨, ¬. Najniższy priorytet ma implikacja →, więc to ona jest głównym spójnikiem (korzeniem drzewa). Nawiasowanie pełne to: (p → (q ∨ (¬p))).',
            formula: 'Korzeń: →   |   Lewe: p   |   Prawe: q ∨ ¬p',
          },
          {
            title: 'Zbuduj drzewo struktury T(φ)',
            explanation:
              'Pod korzeniem → po lewej stawiamy liść p, a po prawej poddrzewo alternatywy ∨, której lewym dzieckiem jest q, a prawym ¬ z dzieckiem p.',
            treeFormula: 'p -> (q | !p)',
          },
          {
            title: 'Spisz notację polską (Korzeń → Lewe → Prawe)',
            explanation:
              'Zaczynamy od korzenia →, następnie spisujemy lewe dziecko (p), a następnie prawe poddrzewo (∨, potem q, potem ¬, potem p).',
            formula: '→ p ∨ q ¬ p',
          },
        ],
        answer: 'Notacja polska: → p ∨ q ¬ p',
      },
      {
        id: 'ex-1-27-32',
        zadNumber: 'Zad. 1.27–1.32 (Tablica z ćwiczeń)',
        title: 'Konwersja wszystkich 6 formuł z tablicy: Notacja Polska → Zwykła',
        prompt:
          'Zapisz w zwykłej notacji nawiasowej wszystkie 6 formuł zapisanych na tablicy z ćwiczeń (odpowiadają dokładnie zadaniom 1.27–1.32 z Zad_MDL).',
        photoSrc: '/assets/aistudio/20261006_1040431_9bdfaef4.jpg',
        photoLabel: 'Zdjęcie tablicy z ćwiczeń: zadania 1.27–1.32 w notacji polskiej',
        steps: [
          {
            title: 'Zad. 1.27: → ↔ p q ¬ ∧ p q',
            explanation:
              'Czytamy od prawej do lewej, sklejając argumenty: ∧pq = (p∧q), potem ¬(p∧q). Następnie ↔pq = (p↔q). Na końcu główna implikacja → łączy (p↔q) oraz ¬(p∧q).',
            formula: '(p ↔ q) → ¬(p ∧ q)',
            treeFormula: '(p <-> q) -> !(p & q)',
          },
          {
            title: 'Zad. 1.28: ¬ → p ∧ q ¬ r',
            explanation:
              'Głównym spójnikiem jest ¬ (neguje całą implikację). Implikacja → ma lewy argument p oraz prawy argument ∧ q ¬ r, czyli q ∧ ¬r.',
            formula: '¬(p → (q ∧ ¬r))',
          },
          {
            title: 'Zad. 1.29: ∨ ¬ p → → p ¬ q p',
            explanation:
              'Korzeń to ∨. Lewy argument: ¬p. Prawy argument: → (→ p ¬q) p, czyli ((p → ¬q) → p).',
            formula: '¬p ∨ ((p → ¬q) → p)',
          },
          {
            title: 'Zad. 1.30: → ∧ ¬ p ¬ q ∨ p → r q',
            explanation:
              'Korzeń: →. Lewy blok: ∧ (¬p) (¬q) = (¬p ∧ ¬q). Prawy blok: ∨ p (→ r q) = (p ∨ (r → q)).',
            formula: '(¬p ∧ ¬q) → (p ∨ (r → q))',
          },
          {
            title: 'Zad. 1.31 i 1.32: Uwaga na kolejność strzałek!',
            explanation:
              'W 1.31 (→ p → ¬q → ¬q p) strzałki są zagnieżdżone w prawo: p → (¬q → (¬q → p)). W 1.32 (→ → → p ¬q ¬q p) trzy strzałki stoją z przodu, więc zagnieżdżają się w lewo: (((p → ¬q) → ¬q) → p)!',
            formula: '1.31: p → (¬q → (¬q → p))   |   1.32: (((p → ¬q) → ¬q) → p)',
          },
        ],
        answer:
          'Wszystkie 6 przykładów z tablicy rozwiązane — kluczowa różnica między 1.31 a 1.32 to pozycja symboli →!',
      },
      {
        id: 'ex-1-51',
        zadNumber: 'Zad. 1.51',
        title: 'Raport policji — jak rozwiązywać Zadanie 7 z kolokwium',
        prompt:
          'Świadek nie był zastraszony lub też, jeśli Henry popełnił samobójstwo, to testament odnaleziono. Jeśli świadek był zastraszony, to Henry nie popełnił samobójstwa. Jeśli testament odnaleziono, to Henry popełnił samobójstwo. Jeśli Henry nie popełnił samobójstwa, to testament odnaleziono.',
        steps: [
          {
            title: 'Oznacz zdania atomowe i zapisz 4 przesłanki',
            explanation:
              'Niech S = „świadek był zastraszony”, H = „Henry popełnił samobójstwo”, T = „testament odnaleziono”. Każde zdanie raportu musi być prawdziwe (= 1).',
            formula: '(1) ¬S ∨ (H → T)   (2) S → ¬H   (3) T → H   (4) ¬H → T',
          },
          {
            title: 'Złącz przesłanki (3) i (4) — natychmiast wyznaczysz H i T!',
            explanation:
              'Spójrz na (4) ¬H → T oraz (3) T → H. Gdyby H = 0 (¬H = 1), to z (4) musielibyśmy mieć T = 1, a wtedy z (3) wynikałoby H = 1 — sprzeczność! Zatem H MUSI być równe 1.',
            formula: 'Założenie H = 0 ⇒ T = 1 (z 4) ⇒ H = 1 (z 3) — sprzeczność! Zatem H = 1.',
          },
          {
            title: 'Podstaw H = 1 do pozostałych przesłanek',
            explanation:
              'Z (2) S → ¬H przy H = 1 mamy S → 0, więc S = 0 (świadek NIE był zastraszony). A co z T? Sprawdźmy oba przypadki dla (1) przy S = 0, H = 1: ¬0 ∨ (1 → T) = 1 ∨ … = 1. Sprawdzamy (3) T → 1 = 1 i (4) 0 → T = 1. Oba T = 0 i T = 1 spełniają wszystkie 4 zdania!',
            formula: 'H = 1 (pewne),   S = 0 (pewne),   T ∈ {0, 1} (nie można rozstrzygnąć!)',
          },
        ],
        answer:
          '(i) Świadek NIE był zastraszony (S=0), (ii) Henry popełnił samobójstwo (H=1), (iii) Nie można ustalić, czy testament odnaleziono.',
      },
      {
        id: 'ex-1-85',
        zadNumber: 'Zad. 1.85',
        title: 'Sprowadzanie formuły do KPN i DPN',
        prompt: 'Zapisz formułę p ∨ q → ¬p w koniunkcyjnej (KPN) oraz dysjunkcyjnej (DPN) postaci normalnej.',
        formula: '(p ∨ q) → ¬p',
        steps: [
          {
            title: 'Eliminacja implikacji',
            explanation: 'Stosujemy prawo (A → B) ↔ (¬A ∨ B):',
            formula: '(p ∨ q) → ¬p  ↔  ¬(p ∨ q) ∨ ¬p',
          },
          {
            title: 'Prawo de Morgana → gotowa postać DPN!',
            explanation:
              'Wprowadzamy negację do nawiasu: ¬(p ∨ q) ↔ (¬p ∧ ¬q). Otrzymujemy (¬p ∧ ¬q) ∨ ¬p, co już jest alternatywą koniunkcji literałów (DPN), a po pochłonięciu wręcz sam literał ¬p!',
            formula: 'DPN: (¬p ∧ ¬q) ∨ ¬p   (lub równoważnie ¬p ∧ ¬p, czyli samo ¬p)',
          },
          {
            title: 'Rozdzielność ∨ względem ∧ → postać KPN',
            explanation:
              'Stosujemy (A ∧ B) ∨ C ↔ (A ∨ C) ∧ (B ∨ C): otrzymujemy (¬p ∨ ¬p) ∧ (¬q ∨ ¬p), co upraszcza się do ¬p ∧ (¬p ∨ ¬q), czyli równoważnie ¬p.',
            formula: 'KPN: ¬p ∧ (¬p ∨ ¬q)   (lub pojedynczy literał ¬p)',
          },
        ],
        answer: 'DPN: (¬p ∧ ¬q) ∨ ¬p (uproszczone: ¬p); KPN: ¬p ∧ (¬p ∨ ¬q) (uproszczone: ¬p).',
      },
    ],
  },
  {
    id: 'dzial-2',
    number: 2,
    title: 'Dział 2. Rachunek predykatów',
    shortTitle: '2. Rachunek predykatów',
    subtitle: 'Termy, zmienne wolne, struktury i kwantyfikatory (∀, ∃)',
    sourceRef: 'Zad_MDL (T-2.1 – T-2.15, zad. 2.1–2.27) · Wykład 2–3',
    overview:
      'Logika pierwszego rzędu rozszerza rachunek zdań o zmienne, funkcje, relacje oraz kwantyfikatory ∀ („dla każdego”) i ∃ („istnieje”). Na kolokwium (Zadanie 12!) kluczowa jest umiejętność bezbłędnej oceny prawdziwości zdań z 2–3 kwantyfikatorami na zbiorach ℕ = {1, 2, …}, ℤ oraz ℝ.',
    examFrequency: 'Zadanie 12 na kolokwium + definicje własności relacji w zad. 9–10',
    keyTakeaways: [
      {
        term: 'UWAGA: ℕ = {1, 2, 3, …} (BEZ zera!)',
        definition:
          'W ramach tego kursu zero NIE należy do liczb naturalnych! To kluczowy haczyk w zadaniach z kwantyfikatorami (np. x·0 < y dla każdego y ∈ ℕ jest PRAWDĄ!).',
      },
      {
        term: 'Kolejność różnych kwantyfikatorów',
        definition:
          '∀x ∃y (dla każdego x mogę dobrać y zależne od x — ŁATWIEJSZE) vs ∃y ∀x (jedno uniwersalne y musi pasować do KAŻDEGO x — SILNIEJSZE!).',
      },
      {
        term: 'Zdanie vs formuła ze zmienną wolną',
        definition:
          'Formuła jest zdaniem wtedy i tylko wtedy, gdy free(φ) = ∅ (każda zmienna jest związana kwantyfikatorem). Tylko zdania mają wartość 0 lub 1 w strukturze.',
      },
      {
        term: 'Negacja kwantyfikatorów',
        definition:
          '¬(∀x φ) ↔ ∃x ¬φ   oraz   ¬(∃x φ) ↔ ∀x ¬φ. Przy negacji zamieniamy każdy kwantyfikator na przeciwny i negujemy formułę wewnętrzną.',
      },
    ],
    theoryBlocks: [
      {
        code: 'T-2.1 – T-2.7',
        title: 'Termy, formuły atomowe, zmienne wolne free(φ) i zdania',
        summary:
          'Język logiki I rzędu budujemy dwustopniowo: najpierw z symboli zmiennych, stałych i funkcji tworzymy termy (obiekty), a potem wstawiamy je do relacji lub równości „=”, uzyskując formuły atomowe.',
        bullets: [
          'Term (T-2.2): każda zmienna (x, y), każda stała (1, 2, a) oraz f(t₁, …, tₙ) dla termów tᵢ. Przykład: w „x + 3 < y + 3” termami są x, 3, x+3, y, y+3.',
          'Formuła atomowa (T-2.3): równość t₁ = t₂ lub relacja R(t₁, …, tₙ) (np. x < y). Nie zawiera spójników ani kwantyfikatorów!',
          'Zmienne wolne free(φ) (T-2.6): zmienne, które NIE leżą w zasięgu kwantyfikatora. Jeśli free(φ) = ∅, formułę nazywamy zdaniem (T-2.7).',
        ],
        formulas: [
          {
            label: 'Przykład formuły NIEBĘDĄCEJ zdaniem (Zad. 2.14)',
            expr: '∀x ∈ ℝ ∀y ∈ ℕ  x + y < z',
            note: 'free(φ) = {z} ≠ ∅ — zmienna z jest wolna!',
          },
          {
            label: 'Przykład ZDANIA (Zad. 2.15)',
            expr: '∀x ∈ ℝ ∃y ∈ ℝ  x < y',
            note: 'free(φ) = ∅ — zdanie prawdziwe (wystarczy y = x + 1).',
          },
        ],
      },
      {
        code: 'T-2.8 – T-2.14',
        title: 'Słownik, S-struktura i modelowanie (M ⊨ φ)',
        summary:
          'Prawdziwość zdania rachunku predykatów zależy od kontekstu, czyli S-struktury M = (U, interpretacja słownika S): z jakiej dziedziny U bierzemy zmienne i co oznaczają funkcje/relacje.',
        bullets: [
          'Ten sam napis może być prawdziwy w jednej strukturze i fałszywy w innej! Np. ∀x ∃y (x + y = 1) jest FAŁSZYWE w ℕ = {1, 2, …} (dla x = 2 brak naturalnego y), ale PRAWDZIWE w ℝ (y = 1 − x).',
          'M ⊨ φ oznacza: zdanie φ jest prawdziwe w strukturze M (M jest modelem φ).',
          'Zdanie jest tautologią (⊨ φ), gdy jest prawdziwe w KAŻDEJ S-strukturze (np. ∀x φ ↔ ¬∃x ¬φ).',
        ],
      },
      {
        code: 'T-2.15',
        title: 'Strategia oceny zdań z kwantyfikatorami na kolokwium (Zadanie 12)',
        summary:
          'W zadaniu 12 zawsze pojawiają się zdania o blokach 2 lub 3 kwantyfikatorów na zbiorach ℕ = {1,2,…}, ℤ i ℝ. Potraktuj ocenę jak grę dwóch graczy: gracz ∀ wybiera najtrudniejszą liczbę, a gracz ∃ próbuje dobrać liczbę spełniającą warunek.',
        table: {
          headers: ['Układ kwantyfikatorów', 'Jak udowodnić PRAWDĘ (1)', 'Jak udowodnić FAŁSZ (0)'],
          rows: [
            ['∀x ∈ A  P(x)', 'Pokaż, że działa dla każdego x (dowód ogólny)', 'Podaj JEDEN kontrprzykład x₀ ∈ A, dla którego ¬P(x₀)'],
            ['∃x ∈ A  P(x)', 'Podaj JEDEN konkretny przykład x₀ ∈ A (np. x = 0!)', 'Pokaż, że dla każdego x zachodzi ¬P(x)'],
            ['∀x ∃y  P(x, y)', 'Podaj wzór na y zależny od x, np. y = x² lub y = −(x+1)', 'Wskaż konkretne x₀, dla którego żaden y nie pasuje'],
            ['∃y ∀x  P(x, y)', 'Znajdź JEDNO stałe y₀ (np. 0), które działa dla wszystkich x', 'Dla dowolnego y wskaż psujące x zależne od y (np. x = |y|+1)'],
          ],
          caption: 'Złota tabela strategii dowodzenia i obalania zdań kwantyfikatorowych.',
        },
        tip: 'Sprawdź zawsze dwa „magiczne” kandydaty dla ∃ w ℤ lub ℝ: liczbę 0 (zeruje iloczyn x·0 = 0 oraz daje 0² − y² < 0 dla y ∈ ℕ) oraz liczbę ujemną y = −(x + 1) (mniejsza od x, ale ma większy kwadrat!).',
      },
    ],
    workedExamples: [
      {
        id: 'ex-2-1-12',
        zadNumber: 'Zad. 2.1, 2.11–2.12',
        title: 'Czy formuła jest zdaniem i w jakiej strukturze jest prawdziwa?',
        prompt:
          'Rozważ formułę ∀x ∃y (x + y = 1). Sprawdź: (i) czy jest zdaniem, (ii) jakie są jej termy i podformuły, (iii) czy modeluje ją struktura ℕ oraz struktura ℝ.',
        formula: '∀x ∃y (x + y = 1)',
        steps: [
          {
            title: 'Zmienne wolne → czy to zdanie?',
            explanation:
              'W formule występują zmienne x i y. Obie znajdują się w zasięgu kwantyfikatorów ∀x oraz ∃y, więc free(φ) = ∅. Formuła JEST zdaniem.',
          },
          {
            title: 'Termy i podformuły',
            explanation:
              'Termy: x, y, 1, x + y. Podformuła atomowa: x + y = 1. Wszystkie podformuły: (1) x + y = 1, (2) ∃y (x + y = 1), (3) ∀x ∃y (x + y = 1).',
          },
          {
            title: 'Ocena w ℕ = {1, 2, …} vs w ℝ',
            explanation:
              'W ℕ: weźmy x = 1. Równanie 1 + y = 1 daje y = 0 ∉ ℕ! Zatem ℕ ⊭ φ (fałszywe). W ℝ: dla każdego x ∈ ℝ dobieramy y = 1 − x ∈ ℝ i mamy x + (1 − x) = 1. Zatem ℝ ⊨ φ (prawdziwe)!',
            formula: 'ℕ ⊭ φ (fałsz, bo 0 ∉ ℕ)   |   ℝ ⊨ φ (prawda, y = 1 − x)',
          },
        ],
        answer: 'Zdanie spełnialne: fałszywe w ℕ, prawdziwe w ℝ.',
      },
      {
        id: 'ex-2-24-27',
        zadNumber: 'Zad. 2.24–2.27',
        title: 'Pułapka kolejności trzech kwantyfikatorów + negacje',
        prompt:
          'Oceń prawdziwość dwóch bardzo podobnych zdań i zapisz ich negacje:\n(2.24) ∀a ∈ ℕ ∃b ∈ ℤ ∀c ∈ ℕ  a + b = c\n(2.27) ∀a ∈ ℕ ∀c ∈ ℕ ∃b ∈ ℤ  a + b = c',
        steps: [
          {
            title: 'Analiza Zad. 2.24: ∀a ∈ ℕ ∃b ∈ ℤ ∀c ∈ ℕ  a + b = c',
            explanation:
              'Wybieramy dowolne a (np. a = 1). Musimy wskazać JEDNO b ∈ ℤ, takie że 1 + b = c dla WSZYSTKICH c ∈ ℕ naraz! To niemożliwe — liczba 1 + b nie może być równa jednocześnie 1 i 2. Zdanie jest FAŁSZYWE.',
            formula: 'Negacja 2.24:  ∃a ∈ ℕ ∀b ∈ ℤ ∃c ∈ ℕ  a + b ≠ c   (prawdziwa!)',
          },
          {
            title: 'Analiza Zad. 2.27: ∀a ∈ ℕ ∀c ∈ ℕ ∃b ∈ ℤ  a + b = c',
            explanation:
              'Tutaj najpierw ustalone są zarówno a, jak i c. Dopiero na końcu dobieramy b ∈ ℤ zależne od obu! Wystarczy wziąć b = c − a (różnica dwóch liczb naturalnych jest zawsze liczbą całkowitą w ℤ!). Zdanie jest PRAWDZIWE.',
            formula: 'Dowód: b := c − a ∈ ℤ ⇒ a + (c − a) = c.   Negacja: ∃a ∈ ℕ ∃c ∈ ℕ ∀b ∈ ℤ  a + b ≠ c.',
          },
        ],
        answer: '2.24 jest FAŁSZYWE; 2.27 jest PRAWDZIWE (przeniesienie ∃b na koniec pozwala uzależnić b od c).',
      },
    ],
  },
  {
    id: 'dzial-3',
    number: 3,
    title: 'Dział 3. Zbiory i relacje',
    shortTitle: '3. Zbiory i relacje',
    subtitle: 'Rachunek zbiorów, 7 własności relacji, klasy abstrakcji i porządki',
    sourceRef: 'Zad_MDL (T-3.1 – T-3.18, zad. 3.1–3.66) · Wykład 3–5',
    overview:
      'Dział 3 obejmuje aż trzy zadania na kolokwium (Zadania 9, 10 i 11)! Nauczysz się błyskawicznie weryfikować tożsamości zbiorów (metodą elementową / tabelą 0-1), sprawdzać wszystkie 7 własności relacji dwuczłonowych oraz rozpoznawać relacje równoważności i częściowego/liniowego porządku.',
    examFrequency: 'Zadania 9, 10 i 11 na kolokwium (25% arkusza)',
    keyTakeaways: [
      {
        term: 'Test tożsamości zbiorów (Zad. 11)',
        definition:
          'Zamień zbiory A, B, C na zdania logiczne a, b, c: ∪ → ∨, ∩ → ∧, \\ → ∧¬. Tożsamość zachodzi dla dowolnych zbiorów wtedy i tylko wtedy, gdy obie strony mają identyczną tabelkę 0–1 (8 wierszy)!',
      },
      {
        term: 'Relacja równoważności vs porządek',
        definition:
          'Równoważność = Zwrotna + Symetryczna + Przechodnia. Porządek częściowy = Zwrotna + Antysymetryczna + Przechodnia. Porządek liniowy = Porządek częściowy + Spójna.',
      },
      {
        term: 'Asymetryczna vs Antysymetryczna',
        definition:
          'Asymetryczna zabrania nawet pętli (x,x) (np. <). Antysymetryczna DOZWALA pętle (x,x), zabrania jedynie par (x,y) i (y,x) dla x ≠ y (np. ≤ lub podzielność |)!',
      },
      {
        term: 'Zbiór potęgowy i alfabet Σ*',
        definition:
          '|P(X)| = 2^|X| (zawsze zawiera ∅ i X). Słowo puste λ ma długość |λ| = 0.',
      },
    ],
    theoryBlocks: [
      {
        code: 'T-3.1 – T-3.4',
        title: 'Zbiory, zbiór potęgowy P(X), słowa Σ* i prawa działań na zbiorach',
        summary:
          'Zbiór potęgowy P(X) zawiera wszystkie podzbiory X. Dla dowolnych zbiorów A, B, C możemy dowodzić równości poprzez przejście na logikę (x ∈ A) lub obalać je małym kontrprzykładem (np. podzbiory {1}).',
        formulas: [
          {
            label: 'Prawa de Morgana dla różnicy (częste na kolokwium!)',
            expr: 'C \\ (A ∪ B) = (C \\ A) ∩ (C \\ B)   oraz   C \\ (A ∩ B) = (C \\ A) ∪ (C \\ B)',
            note: 'Różnica zamienia ∪ na ∩ oraz ∩ na ∪!',
          },
          {
            label: 'Rozdzielność ∩ względem ∪ i ∪ względem ∩',
            expr: 'A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)   oraz   A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)',
          },
          {
            label: 'Ważna tożsamość (Zad. 3.21 / Kolokwium A.11)',
            expr: 'A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C)',
            note: 'Odejmowanie różnicy „oddaje” wspólną część z C!',
          },
        ],
        bullets: [
          'Zbiór potęgowy: jeśli X = {b, c}, to P(X) = {∅, {b}, {c}, {b, c}} i |P(X)| = 2² = 4.',
          'Uwaga na różnicę: {∅} to zbiór jednoelementowy (|{∅}| = 1), różny od zbioru pustego ∅ (|∅| = 0)!',
          'Słownik / słowa (T-3.3): jeśli Σ = {a, b}, to Σ* = {λ, a, b, aa, ab, ba, bb, …}, gdzie λ jest słowem pustym długości 0.',
        ],
      },
      {
        code: 'T-3.5 – T-3.7',
        title: '7 własności relacji dwuczłonowej R ⊂ X × X',
        summary:
          'Relacja w zbiorze X to podzbiór iloczynu kartezjańskiego X × X. Zapis xRy oznacza (x, y) ∈ R. Wszystkie 7 definicji musisz znać na pamięć — pojawiają się w zadaniach 9 i 10 każdego kolokwium!',
        table: {
          headers: ['Własność', 'Definicja formalna', 'Szybki test (jak sprawdzić?)', 'Przykłady'],
          rows: [
            ['Zwrotna', '∀x ∈ X : xRx', 'Czy KAŻDY element ma parę (x, x)?', '=, ≤, |, ≡ mod 2'],
            ['Przeciwzwrotna', '∀x ∈ X : ¬(xRx)', 'Czy ŻADEN element nie ma pary (x, x)?', '<, >, x² < y w ℕ'],
            ['Symetryczna', '∀x,y : xRy ⇒ yRx', 'Czy każda strzałka x→y ma powrót y→x?', '=, x+y=6, x−y parzyste'],
            ['Asymetryczna', '∀x,y : xRy ⇒ ¬(yRx)', 'Brak pętli (x,x) ORAZ brak strzałek dwukierunkowych', '<, >, x² < y w ℕ'],
            ['Antysymetryczna', '∀x,y : (xRy ∧ yRx) ⇒ x=y', 'Pętle (x,x) OK, ale dla x≠y brak dwukierunkowych', '≤, | w ℕ, < (pusto!)'],
            ['Przechodnia', '∀x,y,z : (xRy ∧ yRz) ⇒ xRz', 'Czy z x→y i y→z zawsze wynika skrót x→z?', '≤, <, |, ≡ mod 2'],
            ['Spójna', '∀x,y : x≠y ⇒ (xRy ∨ yRx)', 'Czy dla KAŻDYCH x≠y istnieje strzałka w którąś stronę?', '≤, <, x² ≥ y w {1..10}'],
          ],
          caption: 'Kompletna ściąga 7 własności relacji (T-3.7). Uwaga: relacja < jest jednocześnie asymetryczna i antysymetryczna!',
        },
        tip: 'Uwaga na relację x + y = 6 w ℕ (Kolokwium B.9)! Jest symetryczna, ale NIE jest przechodnia: (1, 5) ∈ R i (5, 1) ∈ R, ale (1, 1) ∉ R (bo 1 + 1 = 2 ≠ 6)!',
      },
      {
        code: 'T-3.8 – T-3.18',
        title: 'Relacje równoważności, klasy abstrakcji, porządki i kresy',
        summary:
          'Dwie najważniejsze klasy relacji to relacje równoważności (dzielące zbiór na rozłączne „szufladki” — klasy abstrakcji) oraz relacje porządku (ustawiające elementy w hierarchię).',
        bullets: [
          'Klasa abstrakcji [x] = {y ∈ X : x ≈ y}. Dwie klasy są albo równe, albo rozłączne (Zasada abstrakcji T-3.10). Przykład dla a ≡ b (mod 2) w ℤ: dwie klasy — liczby parzyste [0] i nieparzyste [1].',
          'Porządek częściowy (X, ⪯): zwrotna + antysymetryczna + przechodnia (np. podzielność | w ℕ albo inkluzja ⊂ w P(X)).',
          'Porządek liniowy: porządek częściowy + spójna (np. ≤ w ℝ). Podzielność | NIE jest liniowa, bo 2 ∤ 3 i 3 ∤ 2.',
          'W zbiorze A ⊂ X z porządkiem ⪯ (T-3.17): element najmniejszy jest mniejszy od WSZYSTKICH elementów A (co najwyżej 1); element minimalny nie ma nikogo ostro mniejszego od siebie w A (może być ich wiele!). Kres dolny (inf) = największe ograniczenie dolne; kres górny (sup) = najmniejsze ograniczenie górne.',
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-3-21',
        zadNumber: 'Zad. 3.21',
        title: 'Dowód tożsamości zbiorów metodą elementową (jak na kolokwium)',
        prompt: 'Sprawdź, czy dla dowolnych zbiorów A, B, C zachodzi równość: A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C).',
        formula: 'A \\ (B \\ C) = (A \\ B) ∪ (A ∩ C)',
        steps: [
          {
            title: 'Przejdź z języka zbiorów na logikę (dowolny element x)',
            explanation:
              'Ustalmy dowolny element x. Zapisujemy definicję różnicy zbiorów (x ∈ X \\ Y ⇔ x ∈ X ∧ ¬(x ∈ Y)).',
            formula: 'x ∈ A \\ (B \\ C)  ⇔  x ∈ A ∧ ¬(x ∈ B ∧ x ∉ C)',
          },
          {
            title: 'Zastosuj prawo de Morgana i podwójną negację',
            explanation:
              'Negacja koniunkcji przechodzi w alternatywę negacji: ¬(x ∈ B ∧ ¬(x ∈ C)) ⇔ (x ∉ B ∨ x ∈ C).',
            formula: '⇔  x ∈ A ∧ (x ∉ B ∨ x ∈ C)',
          },
          {
            title: 'Zastosuj rozdzielność koniunkcji względem alternatywy',
            explanation: 'Rozbijamy nawias i wracamy do notacji zbiorowej:',
            formula: '⇔  (x ∈ A ∧ x ∉ B) ∨ (x ∈ A ∧ x ∈ C)  ⇔  x ∈ (A \\ B) ∪ (A ∩ C)',
          },
        ],
        answer: 'TAK — tożsamość zachodzi dla dowolnych zbiorów A, B, C.',
      },
      {
        id: 'ex-3-61',
        zadNumber: 'Zad. 3.61',
        title: 'Elementy wyróżnione i kresy dla relacji podzielności (|)',
        prompt:
          'W zbiorze ℕ z porządkiem częściowym „|” (dzielnik) rozważ podzbiór A = {3, 4, 5, 6, 7, 8, 9, 10}. Wyznacz elementy: minimalne, maksymalne, najmniejszy, największy oraz kres dolny i górny w ℕ.',
        formula: 'A = {3, 4, 5, 6, 7, 8, 9, 10}  w  (ℕ, |)',
        steps: [
          {
            title: 'Wypisz wszystkie pary podzielności wewnątrz A',
            explanation:
              'Sprawdzamy, która liczba z A dzieli inną liczbę z A (dla x ≠ y): 3 | 6, 3 | 9, 4 | 8, 5 | 10. Liczba 7 nie dzieli nikogo w A i nikt w A jej nie dzieli.',
          },
          {
            title: 'Elementy minimalne i maksymalne (w A)',
            explanation:
              'Minimalne (nie mają właściwego dzielnika w A): 3, 4, 5, 7. Maksymalne (nie mają właściwej wielokrotności w A): 6, 7, 8, 9, 10.',
            formula: 'Minimalne: {3, 4, 5, 7}   |   Maksymalne: {6, 7, 8, 9, 10}',
          },
          {
            title: 'Element najmniejszy i największy (w A)',
            explanation:
              'Ponieważ jest więcej niż jeden element minimalny (i więcej niż jeden maksymalny), z tw. T-3.18 nie istnieje ani element najmniejszy, ani największy.',
          },
          {
            title: 'Kres dolny (NWD) i kres górny (NWW) w całym ℕ',
            explanation:
              'W porządku podzielności (ℕ, |) ograniczeniem dolnym jest wspólny dzielnik, więc inf(A) = NWD(A) = 1. Ograniczeniem górnym jest wspólna wielokrotność, więc sup(A) = NWW(3,4,5,6,7,8,9,10) = 2³ · 3² · 5 · 7 = 2520!',
            formula: 'inf(A) = NWD(A) = 1   |   sup(A) = NWW(A) = 2520',
          },
        ],
        answer: 'Minimalne: 3,4,5,7; Maksymalne: 6,7,8,9,10; Najmniejszy/największy: brak; inf = 1; sup = 2520.',
      },
    ],
  },
  {
    id: 'dzial-4',
    number: 4,
    title: 'Dział 4. Algebry Boole’a',
    shortTitle: '4. Algebry Boole’a',
    subtitle: 'Aksjomaty, zasada dualności, upraszczanie, atomy i izomorfizm',
    sourceRef: 'Zad_MDL (T-4.1 – T-4.12, zad. 4.1–4.14) · Wykład 5–6',
    overview:
      'Algebra Boole’a uogólnia jednocześnie rachunek zdań, rachunek zbiorów i układy bramek cyfrowych! Na kolokwium (Zadanie 8) musisz sprawnie upraszczać wyrażenia za pomocą aksjomatów, praw de Morgana i pochłaniania — a jako szybki sprawdzian zawsze możesz podstawić zera i jedynki z algebry dwuelementowej B = {0, 1}!',
    examFrequency: 'Zadanie 8 na kolokwium (kluczowa metoda weryfikacji 0/1!)',
    keyTakeaways: [
      {
        term: 'Trik weryfikacyjny na Zadanie 8!',
        definition:
          'Każda tożsamość spełniona w DOWOLNEJ algebrze Boole’a jest prawdziwa wtedy i tylko wtedy, gdy zachodzi w dwuelementowej algebrze B = {0, 1}! Wystarczy sprawdzić 4 pary (x,y) ∈ {0,1}²!',
      },
      {
        term: 'Idempotencja i pochłanianie (T-4.3)',
        definition:
          'x + x = x,  x · x = x (stąd x² = x!),  x + 1 = 1,  x · 0 = 0,  x + x·y = x,  x · (x + y) = x.',
      },
      {
        term: 'Atomy i moc skończonej algebry Boole’a',
        definition:
          'Każda skończona algebra Boole’a ma dokładnie 2ⁿ elementów (gdzie n to liczba atomów) i jest izomorficzna z P({1,…,n}). Dlatego NIE istnieje 6-elementowa algebra Boole’a!',
      },
      {
        term: 'Porządek w algebrze Boole’a (T-4.4–T-4.5)',
        definition:
          'x ≤ y  ⇔  x + y = y  ⇔  x · y = x. W algebrze dzielników 30 (Zad. 4.12) porządek ≤ to podzielność, + to NWW, · to NWD, a atomami są liczby pierwsze {2, 3, 5}.',
      },
    ],
    theoryBlocks: [
      {
        code: 'T-4.1 – T-4.3',
        title: 'Aksjomaty algebry Boole’a, zasada dualności i własności',
        summary:
          'Algebra Boole’a (B, +, ·, ′, 0, 1) ma dwa elementy wyróżnione (0 ≠ 1), dwa działania dwuargumentowe (+, ·) i dopełnienie (′). Pamiętaj o rozdzielności DODAWANIA względem mnożenia — inaczej niż w zwykłej arytmetyce!',
        table: {
          headers: ['Prawo', 'Postać z +', 'Postać dualna z ·'],
          rows: [
            ['Przemienność', 'x + y = y + x', 'x · y = y · x'],
            ['Łączność', '(x + y) + z = x + (y + z)', '(x · y) · z = x · (y · z)'],
            ['Rozdzielność', '(x · y) + z = (x + z) · (y + z)', '(x + y) · z = (x · z) + (y · z)'],
            ['Element neutralny', 'x + 0 = x', 'x · 1 = x'],
            ['Dopełnienie', 'x + x′ = 1', 'x · x′ = 0'],
            ['Idempotencja', 'x + x = x', 'x · x = x  (czyli x² = x!)'],
            ['Dominacja (0 i 1)', 'x + 1 = 1', 'x · 0 = 0'],
            ['Pochłanianie', '(x · y) + x = x', '(x + y) · x = x'],
            ['Prawa de Morgana', '(x + y)′ = x′ · y′', '(x · y)′ = x′ + y′'],
            ['Podwójne dopełnienie', '(x′)′ = x', '0′ = 1,   1′ = 0'],
          ],
          caption: 'Kompletny zestaw praw algebry Boole’a (T-4.1 – T-4.3). Zasada dualności: zamień + ↔ · oraz 0 ↔ 1.',
        },
        tip: 'Uwaga na prawo jednoznaczności dopełnienia (T-4.3): jeśli w + u = 1 oraz w · u = 0, to u = w′. To nim dowodzi się (x′)′ = x oraz praw de Morgana!',
      },
      {
        code: 'T-4.4 – T-4.12',
        title: 'Porządek, atomy, rozkład na atomy i izomorfizm',
        summary:
          'Atomem nazywamy niezerowy element a ≠ 0, pod którym w porządku ≤ leży już tylko 0 (nie istnieje y takie, że 0 < y < a).',
        bullets: [
          'Każdy niezerowy element skończonej algebry Boole’a ma jednoznaczny rozkład na sumę różnych atomów: x = aᵢ₁ + … + aᵢₖ (T-4.10). Element 1 jest sumą WSZYSTKICH atomów.',
          'Działania na sumach atomów (Zad. 4.13): suma x + y to suma zbiorów atomów; iloczyn x · y to część wspólna atomów (bo aᵢ · aⱼ = 0 dla i ≠ j!); dopełnienie x′ to suma wszystkich POZOSTAŁYCH atomów!',
          'Twierdzenie o izomorfizmie (T-4.12): dwie skończone algebry o tej samej liczbie atomów n są izomorficzne (w szczególności każda z nich jest izomorficzna z P({1,…,n}) i ma 2ⁿ elementów).',
          'Związek z elektroniką cyfrową (Wykład 6): NOT = x′, AND = x·y, OR = x+y, NAND = (x·y)′ (bramka uniwersalna!), XOR = x′·y + x·y′. Liczba wszystkich n-argumentowych funkcji booleowskich wynosi |BOOL(n)| = 2^(2ⁿ).',
        ],
      },
    ],
    workedExamples: [
      {
        id: 'ex-4-1-3',
        zadNumber: 'Zad. 4.1 i 4.3',
        title: 'Upraszczanie wyrażeń algebry Boole’a krok po kroku',
        prompt: 'Uprość w dowolnej algebrze Boole’a:\n(4.1) x · (x + y)′\n(4.3) (x + y) · (x + y′) · (x′ + z)',
        steps: [
          {
            title: 'Zad. 4.1: Zastosuj prawo de Morgana do (x + y)′',
            explanation: 'Zamieniamy dopełnienie sumy na iloczyn dopełnień, a potem korzystamy z łączności i x · x′ = 0:',
            formula: 'x · (x + y)′ = x · (x′ · y′) = (x · x′) · y′ = 0 · y′ = 0',
          },
          {
            title: 'Zad. 4.3 (krok 1): Połącz pierwsze dwa nawiasy rozdzielnością',
            explanation:
              'W (x + y) · (x + y′) oba czynniki mają wspólne „x +”. Z rozdzielności dodawania względem mnożenia wyciągamy x przed nawias:',
            formula: '(x + y) · (x + y′) = x + (y · y′) = x + 0 = x',
          },
          {
            title: 'Zad. 4.3 (krok 2): Pomnóż przez trzeci nawias (x′ + z)',
            explanation: 'Wymnażamy x · (x′ + z) z rozdzielności:',
            formula: 'x · (x′ + z) = (x · x′) + (x · z) = 0 + x · z = x · z',
          },
        ],
        answer: '4.1: 0   |   4.3: x · z',
      },
      {
        id: 'ex-4-12-13',
        zadNumber: 'Zad. 4.12 i 4.13',
        title: 'Atomy algebry dzielników 30 oraz rachunek na atomach',
        prompt:
          'W zbiorze X = {1, 2, 3, 5, 6, 10, 15, 30} z 0_B = 1, 1_B = 30, a+b = NWW(a,b), a·b = NWD(a,b), a′ = 30/a wyznacz atomy i jawny izomorfizm z P({2, 3, 5}).',
        steps: [
          {
            title: 'Wyznacz atomy algebry X',
            explanation:
              'Zerem algebry jest 1, a porządkiem a ≤ b jest podzielność a | b (bo NWW(a,b) = b ⇔ a | b). Atomami są elementy różne od 1, między którymi a 1 nie ma innych dzielników — czyli liczby pierwsze dzielące 30!',
            formula: 'Zbiór atomów: A = {2, 3, 5}   (liczba elementów |X| = 2³ = 8)',
          },
          {
            title: 'Zbuduj jawny izomorfizm φ : X → P({2, 3, 5})',
            explanation:
              'Każdej liczbie x ∈ X przyporządkowujemy zbiór jej dzielników pierwszych (czyli atomów ≤ x):',
            formula:
              'φ(1)=∅, φ(2)={2}, φ(3)={3}, φ(5)={5}, φ(6)={2,3}, φ(10)={2,5}, φ(15)={3,5}, φ(30)={2,3,5}',
          },
          {
            title: 'Dodatkowo Zad. 4.13 (atomy {a₁, a₂, a₃, a₄, a₅})',
            explanation:
              'Dla x = a₁ + a₃ + a₅ oraz y = a₁ + a₂ + a₃ traktujemy składniki dokładnie jak elementy zbiorów:',
            formula: 'x + y = a₁ + a₂ + a₃ + a₅   |   x · y = a₁ + a₃   |   x′ = a₂ + a₄',
          },
        ],
        answer: 'Atomy: {2, 3, 5}; izomorfizm przypisuje dzielnikowi zbiór jego czynników pierwszych.',
      },
    ],
  },
];
