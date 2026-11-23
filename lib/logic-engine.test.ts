import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeFormula,
  analyzeRelation,
  areFormulasEquivalent,
  evaluateFormula,
  getGradeFromPoints,
  parseInfixFormula,
  parsePolishFormula,
  scoreExamQuestion,
  toPolishNotation,
} from './logic-engine';
import { EXAM_SETS, EXAM_SETS_2022, ALL_EXAM_SETS } from '../data/exams';
import {
  buildCookieHeader,
  deserializeTaskIds,
  parseCookieString,
  serializeTaskIds,
} from './cookies';
import fs from 'node:fs';
import path from 'node:path';

test('Propositional logic engine verifies Zestaw A tasks 1–6 mathematically', () => {
  // A.1: (r ∨ p ∨ q → ¬p) → ¬p ∧ (q ∨ r)
  const a1 = analyzeFormula('(r | p | q -> !p) -> (!p & (q | r))');
  assert.equal(a1.classification, 'spelnialna_nie_tautologia');

  // A.2: C and D are satisfiable and not tautologies; A is contradiction, B is tautology
  assert.equal(analyzeFormula('(p -> !q) <-> (p & q)').classification, 'sprzeczna');
  assert.equal(analyzeFormula('(!p | q) <-> !(p & !q)').classification, 'tautologia');
  assert.equal(analyzeFormula('(p | q -> p) & (p -> q)').classification, 'spelnialna_nie_tautologia');
  assert.equal(analyzeFormula('(!p -> q) <-> (p & !q)').classification, 'spelnialna_nie_tautologia');

  // A.3: (p ∧ q → r) → (p → r) ∧ (q → r) evaluates to 0 ONLY for B (1,0,0) among A–D
  const a3Ast = parseInfixFormula('(p & q -> r) -> ((p -> r) & (q -> r))');
  assert.equal(evaluateFormula(a3Ast, { p: 0, q: 0, r: 1 }), 1);
  assert.equal(evaluateFormula(a3Ast, { p: 1, q: 0, r: 0 }), 0);
  assert.equal(evaluateFormula(a3Ast, { p: 1, q: 1, r: 0 }), 1);
  assert.equal(evaluateFormula(a3Ast, { p: 0, q: 1, r: 1 }), 1);

  // A.4: Polish notation of (p ∨ ¬q) ↔ ¬(¬p ∧ q)
  const a4 = analyzeFormula('(p | !q) <-> !(!p & q)');
  assert.equal(a4.polish, '↔∨p¬q¬∧¬pq');

  // A.5: Polish -> Infix equivalence
  const a5FromPn = parsePolishFormula('→ ∨ → ¬p q ↔ q r ∧ p q');
  assert.equal(toPolishNotation(a5FromPn), '→∨→¬pq↔qr∧pq');
  const a5C = parseInfixFormula('((!p -> q) | (q <-> r)) -> (p & q)');
  assert.equal(toPolishNotation(a5C), toPolishNotation(a5FromPn));

  // A.6: DNF equivalence of p → p ∧ q
  assert.equal(areFormulasEquivalent('p -> (p & q)', '(!p & !p) | (p & q)'), true);
  assert.equal(areFormulasEquivalent('p -> (p & q)', '(p & p) | (p & q)'), false);
  assert.equal(areFormulasEquivalent('p -> (p & q)', '(!p & !p) | (p & !q)'), false);
  assert.equal(areFormulasEquivalent('p -> (p & q)', '(p & q) | (!p & !q)'), false);
});

test('Propositional logic engine verifies Zestaw B tasks 1–6 mathematically', () => {
  // B.1: ((p → q) → r) ∨ (r → p) is a tautology
  const b1 = analyzeFormula('((p -> q) -> r) | (r -> p)');
  assert.equal(b1.classification, 'tautologia');

  // B.2: B and D are satisfiable & not tautology; A contradiction, C tautology
  assert.equal(analyzeFormula('(p <-> !p) & ((q & q) <-> !q)').classification, 'sprzeczna');
  assert.equal(analyzeFormula('(q -> p) & (!q | p)').classification, 'spelnialna_nie_tautologia');
  assert.equal(analyzeFormula('!(p & q) <-> (!q | !p)').classification, 'tautologia');
  assert.equal(analyzeFormula('(p -> q) -> !q').classification, 'spelnialna_nie_tautologia');

  // B.3: (q → p) ∧ (p → q) → (r → q) evaluates to 0 for B (0,0,1)
  const b3Ast = parseInfixFormula('((q -> p) & (p -> q)) -> (r -> q)');
  assert.equal(evaluateFormula(b3Ast, { p: 1, q: 0, r: 0 }), 1);
  assert.equal(evaluateFormula(b3Ast, { p: 0, q: 0, r: 1 }), 0);
  assert.equal(evaluateFormula(b3Ast, { p: 0, q: 1, r: 1 }), 1);
  assert.equal(evaluateFormula(b3Ast, { p: 1, q: 1, r: 0 }), 1);

  // B.4: ¬(p → ¬q) ↔ q ∧ (¬q → p)
  const b4 = analyzeFormula('!(p -> !q) <-> (q & (!q -> p))');
  assert.equal(b4.polish, '↔¬→p¬q∧q→¬qp');

  // B.5: → → ∧ p q r ∧ → p r → q r
  const b5FromPn = parsePolishFormula('→ → ∧ p q r ∧ → p r → q r');
  const b5C = parseInfixFormula('((p & q) -> r) -> ((p -> r) & (q -> r))');
  assert.equal(toPolishNotation(b5FromPn), toPolishNotation(b5C));

  // B.6: DNF of q → ¬(p ∨ q)
  assert.equal(areFormulasEquivalent('q -> !(p | q)', '(!q & !q) | (!p & !q)'), true);
  assert.equal(areFormulasEquivalent('q -> !(p | q)', '(q & q) | (!p & !q)'), false);
});

test('Set identities from A.11, B.11, and C.11 verified via propositional equivalence', () => {
  // A.11 A & D
  assert.equal(areFormulasEquivalent('a & !(b & !c)', '(a & !b) | (a & c)'), true);
  assert.equal(areFormulasEquivalent('c & !(a | b)', '(c & !a) & (c & !b)'), true);
  // B.11 A & D
  assert.equal(areFormulasEquivalent('(a & b) & !c', '(a & !c) & (b & !c)'), true);
  assert.equal(areFormulasEquivalent('a | (c & !b)', '(a | c) & !((b & c) & !a)'), true);
  // C.11 B & C
  assert.equal(areFormulasEquivalent('a & !(b | c)', '(a & !b) & !c'), true);
  assert.equal(areFormulasEquivalent('c & !(a & b)', '(c & !a) | (c & !b)'), true);
});

test('Relation analyzer verifies A.10 (x^2 < y), B.10 (x^2 >= y), and C.10 (x | y) on {1..10}', () => {
  const X = Array.from({ length: 10 }, (_, i) => String(i + 1));

  // A.10: x^2 < y
  const pairsA10: [string, string][] = [];
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      if (x * x < y) pairsA10.push([String(x), String(y)]);
    }
  }
  const resA10 = analyzeRelation(X, pairsA10);
  const mapA10 = Object.fromEntries(resA10.properties.map((p) => [p.key, p.holds]));
  assert.equal(mapA10.przeciwzwrotna, true);
  assert.equal(mapA10.asymetryczna, true);
  assert.equal(mapA10.przechodnia, true);
  assert.equal(mapA10.spojna, false);
  assert.equal(mapA10.symetryczna, false);

  // B.10: x^2 >= y
  const pairsB10: [string, string][] = [];
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      if (x * x >= y) pairsB10.push([String(x), String(y)]);
    }
  }
  const resB10 = analyzeRelation(X, pairsB10);
  const mapB10 = Object.fromEntries(resB10.properties.map((p) => [p.key, p.holds]));
  assert.equal(mapB10.zwrotna, true);
  assert.equal(mapB10.spojna, true);
  assert.equal(resB10.isEquivalence, false);
  assert.equal(resB10.isPartialOrder, false);

  // C.10: x divides y
  const pairsC10: [string, string][] = [];
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      if (y % x === 0) pairsC10.push([String(x), String(y)]);
    }
  }
  const resC10 = analyzeRelation(X, pairsC10);
  const mapC10 = Object.fromEntries(resC10.properties.map((p) => [p.key, p.holds]));
  assert.equal(mapC10.antysymetryczna, true);
  assert.equal(resC10.isPartialOrder, true);
  assert.equal(resC10.isEquivalence, false);
  assert.equal(mapC10.spojna, false);
});

test('UŁ Kolokwium scoring engine follows +1 / -1 / 0 and grade thresholds', () => {
  assert.deepEqual(scoreExamQuestion(['A', 'D'], ['A', 'D']), {
    points: 2,
    correctSelected: 2,
    wrongSelected: 0,
    missedCorrect: 0,
  });
  assert.deepEqual(scoreExamQuestion(['A', 'B'], ['A', 'D']), {
    points: 0,
    correctSelected: 1,
    wrongSelected: 1,
    missedCorrect: 1,
  });
  assert.deepEqual(scoreExamQuestion([], ['B']), {
    points: 0,
    correctSelected: 0,
    wrongSelected: 0,
    missedCorrect: 1,
  });
  assert.equal(getGradeFromPoints(8).grade, '2');
  assert.equal(getGradeFromPoints(9).grade, '3');
  assert.equal(getGradeFromPoints(11).grade, '3+');
  assert.equal(getGradeFromPoints(13).grade, '4');
  assert.equal(getGradeFromPoints(15).grade, '4+');
  assert.equal(getGradeFromPoints(17).grade, '5');
});

test('Every exam question in EXAM_SETS (2025/26) and EXAM_SETS_2022 has valid answers, photos and complete metadata', () => {
  const total2025 = EXAM_SETS.reduce((acc, s) => acc + s.questions.length, 0);
  const total2022 = EXAM_SETS_2022.reduce((acc, s) => acc + s.questions.length, 0);
  assert.equal(total2025, 30);
  assert.equal(total2022, 60);
  assert.equal(ALL_EXAM_SETS.length, 8);

  const seenIds = new Set<string>();
  for (const set of ALL_EXAM_SETS) {
    for (const q of set.questions) {
      assert.ok(!seenIds.has(q.id), `Duplicate question ID: ${q.id}`);
      seenIds.add(q.id);
      assert.ok(
        q.correctLetters.length >= 1 && q.correctLetters.length <= 3,
        `Question ${q.id} should have 1 to 3 correct answers`
      );
      assert.equal(q.options.length, 4, `Question ${q.id} should have 4 options`);
      assert.ok(q.steps.length >= 1, `Question ${q.id} should have step-by-step walkthrough`);
      const photoDiskPath = path.join(process.cwd(), 'public', q.photoSrc);
      assert.ok(
        fs.existsSync(photoDiskPath),
        `Photo file missing for ${q.id}: ${photoDiskPath}`
      );
    }
  }
});

test('Propositional logic engine verifies key Kolokwium 2022 tasks across Arkusze 1–5', () => {
  // Arkusz 1 Q2: satisfiable not tautology
  assert.equal(
    analyzeFormula('(p -> q) & (q -> r) -> (p -> !r)').classification,
    'spelnialna_nie_tautologia'
  );
  // Arkusz 1 Q5 & Q6
  assert.equal(analyzeFormula('!(!(!p & !q) -> !r)').polish, '¬→¬∧¬p¬q¬r');
  assert.equal(
    toPolishNotation(parsePolishFormula('¬ → → r ∧ q ¬p ∨ → q ¬r p')),
    toPolishNotation(parseInfixFormula('!((r -> (q & !p)) -> ((q -> !r) | p))'))
  );
  // Arkusz 1 Q7 DPN
  assert.equal(areFormulasEquivalent('!(p -> (p & q))', '(p & !p) | (p & !q)'), true);

  // Arkusz 2 Q2: contradiction!
  assert.equal(
    analyzeFormula('((q -> r) | (p -> !r)) -> ((r -> p) & r & !p)').classification,
    'sprzeczna'
  );
  // Arkusz 2 Q7 DPN
  assert.equal(areFormulasEquivalent('p -> (!p | q)', '(!p & !p) | (q & q)'), true);

  // Arkusz 3 Q2, Q5, Q7
  assert.equal(
    analyzeFormula('((!p | r) & (!q | r) & (p | q)) -> !r').classification,
    'spelnialna_nie_tautologia'
  );
  assert.equal(analyzeFormula('!(p & !q) -> !(!p -> r)').polish, '→¬∧p¬q¬→¬pr');
  assert.equal(areFormulasEquivalent('(p & !q) -> !p', '!p | q'), true);

  // Arkusz 4 Q2: contradiction, Q6 polish
  assert.equal(
    analyzeFormula('((p | q) -> r) & !(q -> r)').classification,
    'sprzeczna'
  );
  assert.equal(
    toPolishNotation(parsePolishFormula('¬ → → ¬ ∨ p q q → p q')),
    toPolishNotation(parseInfixFormula('!((!(p | q) -> q) -> (p -> q))'))
  );

  // Arkusz 5 Q5, Q6, Q7
  assert.equal(analyzeFormula('!(p -> q) | (q -> !r)').polish, '∨¬→pq→q¬r');
  assert.equal(
    toPolishNotation(parsePolishFormula('→ → ∧ p ¬q ¬p ∧ q r')),
    toPolishNotation(parseInfixFormula('((p & !q) -> !p) -> (q & r)'))
  );
  assert.equal(areFormulasEquivalent('p -> (!p | !r)', '(!p & !p) | (!r & !r)'), true);
});

test('Cookie utilities parse, serialize, deserialize, and format cookie headers safely', () => {
  const serialized = serializeTaskIds(['t1', 'a-1', 'k22-1-1', 'a-1', 'bad;id', '  k22-5-12 ']);
  assert.equal(serialized, 't1,a-1,k22-1-1,k22-5-12');
  assert.deepEqual(deserializeTaskIds(serialized), ['t1', 'a-1', 'k22-1-1', 'k22-5-12']);

  const parsed = parseCookieString('mdl_theme=dark; mdl_done_tasks=t1%2Ck22-1-1; mdl_cookie_notice=1');
  assert.equal(parsed.mdl_theme, 'dark');
  assert.equal(parsed.mdl_done_tasks, 't1,k22-1-1');
  assert.equal(parsed.mdl_cookie_notice, '1');

  const header = buildCookieHeader('mdl_theme', 'dark', {
    maxAgeSeconds: 3600,
    path: '/',
    sameSite: 'Lax',
    secure: true,
  });
  assert.equal(header, 'mdl_theme=dark; Max-Age=3600; Path=/; SameSite=Lax; Secure');
});
