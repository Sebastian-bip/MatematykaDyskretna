export type BinaryOp = '∧' | '∨' | '→' | '↔';

export type FormulaNode =
  | { type: 'atom'; name: string }
  | { type: 'const'; value: 0 | 1 }
  | { type: 'not'; child: FormulaNode }
  | { type: 'binary'; op: BinaryOp; left: FormulaNode; right: FormulaNode };

type Token =
  | { kind: 'atom'; value: string }
  | { kind: 'const'; value: 0 | 1 }
  | { kind: 'not' }
  | { kind: 'op'; value: BinaryOp }
  | { kind: 'lparen' }
  | { kind: 'rparen' };

export function tokenizeFormula(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = input.trim();

  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (ch === '(' || ch === '[') {
      tokens.push({ kind: 'lparen' });
      i++;
      continue;
    }
    if (ch === ')' || ch === ']') {
      tokens.push({ kind: 'rparen' });
      i++;
      continue;
    }
    if (ch === '¬' || ch === '!' || ch === '~') {
      tokens.push({ kind: 'not' });
      i++;
      continue;
    }
    if (ch === '∧' || ch === '&') {
      if (s[i + 1] === '&') i++;
      tokens.push({ kind: 'op', value: '∧' });
      i++;
      continue;
    }
    if (ch === '∨' || ch === '|') {
      if (s[i + 1] === '|') i++;
      tokens.push({ kind: 'op', value: '∨' });
      i++;
      continue;
    }
    if (ch === '→' || ch === '⇒') {
      tokens.push({ kind: 'op', value: '→' });
      i++;
      continue;
    }
    if (ch === '↔' || ch === '⇔') {
      tokens.push({ kind: 'op', value: '↔' });
      i++;
      continue;
    }
    if (s.slice(i, i + 3) === '<->') {
      tokens.push({ kind: 'op', value: '↔' });
      i += 3;
      continue;
    }
    if (s.slice(i, i + 2) === '->') {
      tokens.push({ kind: 'op', value: '→' });
      i += 2;
      continue;
    }
    if (ch === '⊥' || ch === '0') {
      tokens.push({ kind: 'const', value: 0 });
      i++;
      continue;
    }
    if (ch === '⊤' || ch === '1') {
      tokens.push({ kind: 'const', value: 1 });
      i++;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      let name = ch;
      i++;
      while (i < s.length && /[0-9]/.test(s[i])) {
        name += s[i];
        i++;
      }
      tokens.push({ kind: 'atom', value: name });
      continue;
    }
    throw new Error(`Nierozpoznany znak w formule: "${ch}"`);
  }
  return tokens;
}

/**
 * Parses propositional logic formula using standard course precedence:
 * 1. ¬ (highest, right-associative)
 * 2. ∧, ∨ (left-associative; ∧ binds same/tighter, we parse ∧ then ∨ or left-to-right per course convention)
 * 3. →, ↔ (lowest; right-associative for →)
 * Note: In this course, ∧ and ∨ bind tighter than → and ↔.
 */
export function parseInfixFormula(input: string): FormulaNode {
  const tokens = tokenizeFormula(input);
  if (tokens.length === 0) {
    throw new Error('Wpisz formułę zdaniową.');
  }
  let pos = 0;

  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  function parseIff(): FormulaNode {
    let left = parseImp();
    while (peek()?.kind === 'op' && (peek() as { kind: 'op'; value: BinaryOp }).value === '↔') {
      consume();
      const right = parseImp();
      left = { type: 'binary', op: '↔', left, right };
    }
    return left;
  }

  function parseImp(): FormulaNode {
    const left = parseOr();
    if (peek()?.kind === 'op' && (peek() as { kind: 'op'; value: BinaryOp }).value === '→') {
      consume();
      const right = parseImp();
      return { type: 'binary', op: '→', left, right };
    }
    return left;
  }

  function parseOr(): FormulaNode {
    let left = parseAnd();
    while (peek()?.kind === 'op' && (peek() as { kind: 'op'; value: BinaryOp }).value === '∨') {
      consume();
      const right = parseAnd();
      left = { type: 'binary', op: '∨', left, right };
    }
    return left;
  }

  function parseAnd(): FormulaNode {
    let left = parseUnary();
    while (peek()?.kind === 'op' && (peek() as { kind: 'op'; value: BinaryOp }).value === '∧') {
      consume();
      const right = parseUnary();
      left = { type: 'binary', op: '∧', left, right };
    }
    return left;
  }

  function parseUnary(): FormulaNode {
    const tok = peek();
    if (!tok) throw new Error('Nieoczekiwany koniec formuły.');
    if (tok.kind === 'not') {
      consume();
      return { type: 'not', child: parseUnary() };
    }
    if (tok.kind === 'lparen') {
      consume();
      const inner = parseIff();
      if (peek()?.kind !== 'rparen') {
        throw new Error('Brakujący nawias zamykający ")".');
      }
      consume();
      return inner;
    }
    if (tok.kind === 'atom') {
      consume();
      return { type: 'atom', name: tok.value };
    }
    if (tok.kind === 'const') {
      consume();
      return { type: 'const', value: tok.value };
    }
    throw new Error('Niepoprawna składnia formuły.');
  }

  const ast = parseIff();
  if (pos < tokens.length) {
    throw new Error('Nadmiarowe symbole na końcu formuły.');
  }
  return ast;
}

export function parsePolishFormula(input: string): FormulaNode {
  const tokens = tokenizeFormula(input);
  if (tokens.length === 0) {
    throw new Error('Wpisz formułę w notacji polskiej.');
  }
  let pos = 0;

  function parseNode(): FormulaNode {
    const tok = tokens[pos++];
    if (!tok) {
      throw new Error('Za mało argumentów dla spójnika w notacji polskiej.');
    }
    if (tok.kind === 'atom') return { type: 'atom', name: tok.value };
    if (tok.kind === 'const') return { type: 'const', value: tok.value };
    if (tok.kind === 'not') return { type: 'not', child: parseNode() };
    if (tok.kind === 'op') {
      const left = parseNode();
      const right = parseNode();
      return { type: 'binary', op: tok.value, left, right };
    }
    throw new Error('Nawiasy nie są używane w notacji polskiej.');
  }

  const ast = parseNode();
  if (pos < tokens.length) {
    throw new Error('Nadmiarowe symbole w zapisie notacji polskiej.');
  }
  return ast;
}

export function toPolishNotation(node: FormulaNode): string {
  switch (node.type) {
    case 'atom':
      return node.name;
    case 'const':
      return node.value === 0 ? '⊥' : '1';
    case 'not':
      return `¬${toPolishNotation(node.child)}`;
    case 'binary':
      return `${node.op}${toPolishNotation(node.left)}${toPolishNotation(node.right)}`;
  }
}

export function toPolishNotationSpaced(node: FormulaNode): string {
  switch (node.type) {
    case 'atom':
      return node.name;
    case 'const':
      return node.value === 0 ? '⊥' : '1';
    case 'not':
      return `¬ ${toPolishNotationSpaced(node.child)}`;
    case 'binary':
      return `${node.op} ${toPolishNotationSpaced(node.left)} ${toPolishNotationSpaced(node.right)}`;
  }
}

export function toInfixNotation(node: FormulaNode, isRoot = true): string {
  switch (node.type) {
    case 'atom':
      return node.name;
    case 'const':
      return node.value === 0 ? '⊥' : '1';
    case 'not': {
      if (node.child.type === 'binary') {
        return `¬(${toInfixNotation(node.child, true)})`;
      }
      return `¬${toInfixNotation(node.child, false)}`;
    }
    case 'binary': {
      const inner = `${toInfixNotation(node.left, false)} ${node.op} ${toInfixNotation(node.right, false)}`;
      return isRoot ? inner : `(${inner})`;
    }
  }
}

export function getVariables(node: FormulaNode): string[] {
  const vars = new Set<string>();
  function visit(n: FormulaNode) {
    if (n.type === 'atom') vars.add(n.name);
    else if (n.type === 'not') visit(n.child);
    else if (n.type === 'binary') {
      visit(n.left);
      visit(n.right);
    }
  }
  visit(node);
  return Array.from(vars).sort();
}

export function evaluateFormula(
  node: FormulaNode,
  valuation: Record<string, 0 | 1>
): 0 | 1 {
  switch (node.type) {
    case 'atom':
      return valuation[node.name] ?? 0;
    case 'const':
      return node.value;
    case 'not':
      return evaluateFormula(node.child, valuation) === 1 ? 0 : 1;
    case 'binary': {
      const l = evaluateFormula(node.left, valuation);
      const r = evaluateFormula(node.right, valuation);
      switch (node.op) {
        case '∧':
          return l === 1 && r === 1 ? 1 : 0;
        case '∨':
          return l === 1 || r === 1 ? 1 : 0;
        case '→':
          return l === 1 && r === 0 ? 0 : 1;
        case '↔':
          return l === r ? 1 : 0;
      }
    }
  }
}

export interface TruthTableRow {
  valuation: Record<string, 0 | 1>;
  result: 0 | 1;
}

export type FormulaClassification =
  | 'tautologia'
  | 'spelnialna_nie_tautologia'
  | 'sprzeczna';

export interface FormulaAnalysis {
  ast: FormulaNode;
  variables: string[];
  rows: TruthTableRow[];
  classification: FormulaClassification;
  polish: string;
  polishSpaced: string;
  infix: string;
  dnf: string;
  cnf: string;
}

export function analyzeFormula(input: string, mode: 'infix' | 'polish' = 'infix'): FormulaAnalysis {
  const ast = mode === 'polish' ? parsePolishFormula(input) : parseInfixFormula(input);
  const variables = getVariables(ast);
  if (variables.length > 5) {
    throw new Error('Kalkulator obsługuje maksymalnie 5 różnych zmiennych (do 32 wierszy tabeli).');
  }

  const totalRows = 1 << variables.length;
  const rows: TruthTableRow[] = [];

  // Course standard order: 1,1 -> 1,0 -> 0,1 -> 0,0 (descending binary)
  for (let mask = totalRows - 1; mask >= 0; mask--) {
    const valuation: Record<string, 0 | 1> = {};
    for (let j = 0; j < variables.length; j++) {
      const bit = (mask >> (variables.length - 1 - j)) & 1;
      valuation[variables[j]] = bit as 0 | 1;
    }
    const result = evaluateFormula(ast, valuation);
    rows.push({ valuation, result });
  }

  const ones = rows.filter((r) => r.result === 1).length;
  let classification: FormulaClassification;
  if (ones === rows.length) classification = 'tautologia';
  else if (ones === 0) classification = 'sprzeczna';
  else classification = 'spelnialna_nie_tautologia';

  // Canonical DNF from rows where result === 1
  let dnf = '⊥ (formuła sprzeczna — brak jedynek w tabeli)';
  if (ones > 0 && variables.length > 0) {
    const minterms = rows
      .filter((r) => r.result === 1)
      .map((r) => {
        const lits = variables.map((v) => (r.valuation[v] === 1 ? v : `¬${v}`));
        return lits.length > 1 ? `(${lits.join(' ∧ ')})` : lits[0];
      });
    dnf = minterms.join(' ∨ ');
  } else if (ones > 0) {
    dnf = '1';
  }

  // Canonical CNF from rows where result === 0
  let cnf = '⊤ (tautologia — np. p ∨ ¬p)';
  const zeros = rows.length - ones;
  if (zeros > 0 && variables.length > 0) {
    const maxterms = rows
      .filter((r) => r.result === 0)
      .map((r) => {
        const lits = variables.map((v) => (r.valuation[v] === 0 ? v : `¬${v}`));
        return lits.length > 1 ? `(${lits.join(' ∨ ')})` : lits[0];
      });
    cnf = maxterms.join(' ∧ ');
  } else if (zeros > 0) {
    cnf = '⊥';
  }

  return {
    ast,
    variables,
    rows,
    classification,
    polish: toPolishNotation(ast),
    polishSpaced: toPolishNotationSpaced(ast),
    infix: toInfixNotation(ast, true),
    dnf,
    cnf,
  };
}

export function areFormulasEquivalent(f1: string, f2: string): boolean {
  const a1 = parseInfixFormula(f1);
  const a2 = parseInfixFormula(f2);
  const vars = Array.from(new Set([...getVariables(a1), ...getVariables(a2)])).sort();
  const total = 1 << vars.length;
  for (let mask = 0; mask < total; mask++) {
    const val: Record<string, 0 | 1> = {};
    for (let j = 0; j < vars.length; j++) {
      val[vars[j]] = ((mask >> j) & 1) as 0 | 1;
    }
    if (evaluateFormula(a1, val) !== evaluateFormula(a2, val)) return false;
  }
  return true;
}

// ==========================================
// RELATION ANALYZER (Dział 3: Relacje)
// ==========================================

export interface RelationPropertyCheck {
  key:
    | 'zwrotna'
    | 'przeciwzwrotna'
    | 'symetryczna'
    | 'asymetryczna'
    | 'antysymetryczna'
    | 'przechodnia'
    | 'spojna';
  label: string;
  definition: string;
  holds: boolean;
  reason: string;
}

export interface RelationAnalysis {
  elements: string[];
  pairs: [string, string][];
  properties: RelationPropertyCheck[];
  isEquivalence: boolean;
  isPartialOrder: boolean;
  isLinearOrder: boolean;
}

export function analyzeRelation(
  elements: string[],
  pairs: [string, string][]
): RelationAnalysis {
  const pairSet = new Set(pairs.map(([a, b]) => `${a}|||${b}`));
  const has = (a: string, b: string) => pairSet.has(`${a}|||${b}`);

  // 1. Zwrotna
  let refFail: string | null = null;
  for (const x of elements) {
    if (!has(x, x)) {
      refFail = x;
      break;
    }
  }

  // 2. Przeciwzwrotna
  let irrefFail: string | null = null;
  for (const x of elements) {
    if (has(x, x)) {
      irrefFail = x;
      break;
    }
  }

  // 3. Symetryczna
  let symFail: [string, string] | null = null;
  for (const [x, y] of pairs) {
    if (!has(y, x)) {
      symFail = [x, y];
      break;
    }
  }

  // 4. Asymetryczna
  let asymFail: [string, string] | null = null;
  for (const [x, y] of pairs) {
    if (has(y, x)) {
      asymFail = [x, y];
      break;
    }
  }

  // 5. Antysymetryczna
  let antisymFail: [string, string] | null = null;
  for (const [x, y] of pairs) {
    if (x !== y && has(y, x)) {
      antisymFail = [x, y];
      break;
    }
  }

  // 6. Przechodnia
  let transFail: [string, string, string] | null = null;
  outerTrans: for (const [x, y] of pairs) {
    for (const [y2, z] of pairs) {
      if (y === y2 && !has(x, z)) {
        transFail = [x, y, z];
        break outerTrans;
      }
    }
  }

  // 7. Spójna
  let connFail: [string, string] | null = null;
  outerConn: for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const x = elements[i];
      const y = elements[j];
      if (!has(x, y) && !has(y, x)) {
        connFail = [x, y];
        break outerConn;
      }
    }
  }

  const properties: RelationPropertyCheck[] = [
    {
      key: 'zwrotna',
      label: 'Zwrotna',
      definition: '∀x ∈ X : xRx',
      holds: refFail === null,
      reason:
        refFail === null
          ? 'Każdy element zbioru pozostaje w relacji sam ze sobą.'
          : `Kontrprzykład: brak pary (${refFail}, ${refFail}) w relacji R.`,
    },
    {
      key: 'przeciwzwrotna',
      label: 'Przeciwzwrotna',
      definition: '∀x ∈ X : ¬(xRx)',
      holds: irrefFail === null,
      reason:
        irrefFail === null
          ? 'Żaden element nie jest w relacji sam ze sobą.'
          : `Kontrprzykład: para (${irrefFail}, ${irrefFail}) należy do R.`,
    },
    {
      key: 'symetryczna',
      label: 'Symetryczna',
      definition: '∀x,y ∈ X : xRy ⇒ yRx',
      holds: symFail === null,
      reason:
        symFail === null
          ? 'Dla każdej pary (x, y) ∈ R istnieje para odwrotna (y, x) ∈ R.'
          : `Kontrprzykład: (${symFail[0]}, ${symFail[1]}) ∈ R, ale (${symFail[1]}, ${symFail[0]}) ∉ R.`,
    },
    {
      key: 'asymetryczna',
      label: 'Asymetryczna',
      definition: '∀x,y ∈ X : xRy ⇒ ¬(yRx)',
      holds: asymFail === null,
      reason:
        asymFail === null
          ? 'Nigdy nie zachodzą jednocześnie xRy i yRx (w tym brak pętli xRx).'
          : `Kontrprzykład: (${asymFail[0]}, ${asymFail[1]}) ∈ R oraz (${asymFail[1]}, ${asymFail[0]}) ∈ R.`,
    },
    {
      key: 'antysymetryczna',
      label: 'Antysymetryczna',
      definition: '∀x,y ∈ X : (xRy ∧ yRx) ⇒ x = y',
      holds: antisymFail === null,
      reason:
        antisymFail === null
          ? 'Nie ma dwóch różnych elementów w obustronnej relacji.'
          : `Kontrprzykład: (${antisymFail[0]}, ${antisymFail[1]}) ∈ R i (${antisymFail[1]}, ${antisymFail[0]}) ∈ R, ale ${antisymFail[0]} ≠ ${antisymFail[1]}.`,
    },
    {
      key: 'przechodnia',
      label: 'Przechodnia',
      definition: '∀x,y,z ∈ X : (xRy ∧ yRz) ⇒ xRz',
      holds: transFail === null,
      reason:
        transFail === null
          ? 'Dla każdych (x, y) ∈ R i (y, z) ∈ R zachodzi też (x, z) ∈ R.'
          : `Kontrprzykład: (${transFail[0]}, ${transFail[1]}) ∈ R i (${transFail[1]}, ${transFail[2]}) ∈ R, ale (${transFail[0]}, ${transFail[2]}) ∉ R.`,
    },
    {
      key: 'spojna',
      label: 'Spójna',
      definition: '∀x,y ∈ X : x ≠ y ⇒ (xRy ∨ yRx)',
      holds: connFail === null,
      reason:
        connFail === null
          ? 'Każde dwa różne elementy zbioru X są porównywalne.'
          : `Kontrprzykład: dla ${connFail[0]} ≠ ${connFail[1]} ani (${connFail[0]}, ${connFail[1]}), ani (${connFail[1]}, ${connFail[0]}) nie należy do R.`,
    },
  ];

  const isEquivalence = refFail === null && symFail === null && transFail === null;
  const isPartialOrder = refFail === null && antisymFail === null && transFail === null;
  const isLinearOrder = isPartialOrder && connFail === null;

  return {
    elements,
    pairs,
    properties,
    isEquivalence,
    isPartialOrder,
    isLinearOrder,
  };
}

// ==========================================
// UŁ KOLOKWIUM SCORING ENGINE (_Zasady_punktacji_kol1_26-27.pdf)
// ==========================================

export interface QuestionScoreResult {
  points: number;
  correctSelected: number;
  wrongSelected: number;
  missedCorrect: number;
}

/**
 * Zasady punktacji kolokwium (2026/27):
 * - Każde zadanie zawiera 1 lub 2 poprawne odpowiedzi.
 * - Za każdą poprawnie zaznaczoną odpowiedź: +1 pkt.
 * - Za każdą niepoprawną odpowiedź: -1 pkt.
 * - Za brak odpowiedzi (pusta kratka): 0 pkt.
 */
export function scoreExamQuestion(
  selected: ('A' | 'B' | 'C' | 'D')[],
  correct: ('A' | 'B' | 'C' | 'D')[]
): QuestionScoreResult {
  const correctSet = new Set(correct);
  let correctSelected = 0;
  let wrongSelected = 0;

  for (const letter of selected) {
    if (correctSet.has(letter)) {
      correctSelected++;
    } else {
      wrongSelected++;
    }
  }

  const missedCorrect = correct.length - correctSelected;
  const points = correctSelected - wrongSelected;

  return { points, correctSelected, wrongSelected, missedCorrect };
}

export function getGradeFromPoints(totalPoints: number): {
  grade: string;
  passed: boolean;
  label: string;
} {
  if (totalPoints >= 17) return { grade: '5', passed: true, label: 'Bardzo dobry (5)' };
  if (totalPoints >= 15) return { grade: '4+', passed: true, label: 'Dobry plus (4+)' };
  if (totalPoints >= 13) return { grade: '4', passed: true, label: 'Dobry (4)' };
  if (totalPoints >= 11) return { grade: '3+', passed: true, label: 'Dostateczny plus (3+)' };
  if (totalPoints >= 9) return { grade: '3', passed: true, label: 'Dostateczny (3)' };
  return { grade: '2', passed: false, label: 'Niezaliczone (2)' };
}
