'use client';

import React, { useMemo } from 'react';
import { FormulaNode, parseInfixFormula } from '@/lib/logic-engine';

interface LayoutNode {
  id: string;
  label: string;
  isAtom: boolean;
  x: number;
  y: number;
  children: LayoutNode[];
}

function measureWidth(node: FormulaNode): number {
  if (node.type === 'atom' || node.type === 'const') return 1;
  if (node.type === 'not') return Math.max(1, measureWidth(node.child));
  return measureWidth(node.left) + measureWidth(node.right);
}

function layoutTree(
  node: FormulaNode,
  xStart: number,
  depth: number,
  unitX: number,
  unitY: number,
  counter: { n: number }
): LayoutNode {
  const id = `n-${counter.n++}`;
  const y = 34 + depth * unitY;

  if (node.type === 'atom') {
    return {
      id,
      label: node.name,
      isAtom: true,
      x: xStart + unitX * 0.5,
      y,
      children: [],
    };
  }
  if (node.type === 'const') {
    return {
      id,
      label: node.value === 0 ? '⊥' : '1',
      isAtom: true,
      x: xStart + unitX * 0.5,
      y,
      children: [],
    };
  }
  if (node.type === 'not') {
    const childLayout = layoutTree(node.child, xStart, depth + 1, unitX, unitY, counter);
    return {
      id,
      label: '¬',
      isAtom: false,
      x: childLayout.x,
      y,
      children: [childLayout],
    };
  }

  const leftSpan = measureWidth(node.left) * unitX;
  const leftLayout = layoutTree(node.left, xStart, depth + 1, unitX, unitY, counter);
  const rightLayout = layoutTree(node.right, xStart + leftSpan, depth + 1, unitX, unitY, counter);
  return {
    id,
    label: node.op,
    isAtom: false,
    x: (leftLayout.x + rightLayout.x) / 2,
    y,
    children: [leftLayout, rightLayout],
  };
}

function getTreeBounds(node: LayoutNode): { maxX: number; maxY: number } {
  let maxX = node.x;
  let maxY = node.y;
  for (const child of node.children) {
    const b = getTreeBounds(child);
    if (b.maxX > maxX) maxX = b.maxX;
    if (b.maxY > maxY) maxY = b.maxY;
  }
  return { maxX, maxY };
}

function collectEdges(node: LayoutNode): { x1: number; y1: number; x2: number; y2: number; key: string }[] {
  const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
  for (const child of node.children) {
    edges.push({
      x1: node.x,
      y1: node.y,
      x2: child.x,
      y2: child.y,
      key: `${node.id}-${child.id}`,
    });
    edges.push(...collectEdges(child));
  }
  return edges;
}

function collectNodes(node: LayoutNode): LayoutNode[] {
  return [node, ...node.children.flatMap(collectNodes)];
}

interface FormulaTreeSvgProps {
  formula?: string;
  ast?: FormulaNode;
  caption?: string;
}

export default function FormulaTreeSvg({ formula, ast, caption }: FormulaTreeSvgProps) {
  const tree = useMemo(() => {
    try {
      const rootAst = ast ?? (formula ? parseInfixFormula(formula) : null);
      if (!rootAst) return null;
      const unitX = 62;
      const unitY = 60;
      const laidOut = layoutTree(rootAst, 18, 0, unitX, unitY, { n: 0 });
      const { maxX, maxY } = getTreeBounds(laidOut);
      return {
        width: Math.max(260, maxX + 42),
        height: maxY + 40,
        edges: collectEdges(laidOut),
        nodes: collectNodes(laidOut),
      };
    } catch {
      return null;
    }
  }, [formula, ast]);

  if (!tree) return null;

  return (
    <div className="mt-3 rounded-xl border border-[#e4dccb] dark:border-[#2B333E] bg-[#f7f1e3] dark:bg-[#141A22] p-4 overflow-x-auto">
      <div className="text-xs font-medium text-[#6b6256] dark:text-[#94A3B8] mb-2">
        {caption ?? 'Drzewo struktury T(φ) — korzeń u góry, przejście pre-order daje notację polską'}
      </div>
      <div className="flex justify-center">
        <svg
          width={tree.width}
          height={tree.height}
          viewBox={`0 0 ${tree.width} ${tree.height}`}
          role="img"
          aria-label={caption ?? 'Drzewo struktury formuły logicznej'}
          className="max-w-full h-auto"
        >
          {tree.edges.map((e) => (
            <line
              key={e.key}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              className="stroke-[#B8B1A3] dark:stroke-[#475569]"
              strokeWidth={1.75}
            />
          ))}
          {tree.nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={17}
                className={
                  n.isAtom
                    ? 'fill-[#fffdf7] dark:fill-[#1E293B] stroke-[#1D4ED8] dark:stroke-[#60A5FA]'
                    : 'fill-[#eef4fb] dark:fill-[#1E3A8A]/50 stroke-[#2563EB] dark:stroke-[#3B82F6]'
                }
                strokeWidth={1.75}
              />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                className="font-mono text-[14px] font-semibold fill-[#1c1917] dark:fill-[#F1F5F9]"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
