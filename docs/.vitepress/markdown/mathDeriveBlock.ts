import type MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer.mjs'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type Token from 'markdown-it/lib/token.mjs'

/**
 * 自动兼容 Typora 风格的 $$ 多行公式，并包裹美化容器。
 *
 * - 已使用 aligned/align/gather 等布局环境时，保持原内容
 * - 未使用布局环境但存在顶层物理分行时，自动转为 aligned
 * - 命中布局环境或矩阵环境时，包裹推导块样式
 */
const LAYOUT_ENV_RE =
  /\\begin\{(?:aligned\*?|align\*?|gather(?:ed)?\*?|cases|split|multline\*?)\}/

const DECORATED_ENV_RE =
  /\\begin\{(?:aligned\*?|align\*?|gather(?:ed)?\*?|cases|split|multline\*?|[pbvVB]?matrix\*?|smallmatrix)\}/

const TEX_ENV_RE = /\\(begin|end)\{[^}]+\}/g
const TOP_LEVEL_BREAK_RE = /(?:\\\\)+\s*$/

function splitTopLevelRows(content: string): string[] {
  const rows: string[] = []
  let depth = 0
  let current: string[] = []

  for (const rawLine of content.trim().split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) continue

    current.push(line)

    for (const match of line.matchAll(TEX_ENV_RE)) {
      depth += match[1] === 'begin' ? 1 : -1
      if (depth < 0) depth = 0
    }

    if (depth === 0) {
      rows.push(current.join('\n').replace(TOP_LEVEL_BREAK_RE, '').trim())
      current = []
    }
  }

  if (current.length) rows.push(current.join('\n').trim())
  return rows
}

function normalizeMathBlock(content: string): string {
  const trimmed = content.trim()
  if (LAYOUT_ENV_RE.test(trimmed)) return trimmed

  const rows = splitTopLevelRows(trimmed)
  if (rows.length < 2) return trimmed

  return `\\begin{aligned}\n${rows.map((row) => `& ${row}`).join(' \\\\\n')}\n\\end{aligned}`
}

function isDeriveBlock(content: string): boolean {
  return DECORATED_ENV_RE.test(content.trim()) || splitTopLevelRows(content).length > 1
}

export function mathDeriveBlockPlugin(md: MarkdownIt): void {
  const defaultRender = md.renderer.rules.math_block as RenderRule | undefined
  if (!defaultRender) return

  md.renderer.rules.math_block = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt['options'],
    env: unknown,
    self: Renderer,
  ) => {
    const token = tokens[idx]
    const content = token.content ?? ''
    const normalizedContent = normalizeMathBlock(content)

    token.content = normalizedContent
    const html = (() => {
      try {
        return defaultRender(tokens, idx, options, env, self)
      } finally {
        token.content = content
      }
    })()

    if (!isDeriveBlock(normalizedContent)) return html
    return `<div class="math-derive-block"><div class="math-derive-block__inner">${html}</div></div>\n`
  }
}
