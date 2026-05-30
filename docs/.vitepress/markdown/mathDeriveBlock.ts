import type MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer.mjs'
import type Token from 'markdown-it/lib/token.mjs'

/**
 * 自动识别多行数学推导块并包裹美化容器。
 *
 * 命中环境：aligned, align, gather, cases, split, multline（含 * 星号变体）
 * Markdown 写法无需改变，在 $$ 内正常使用上述环境即可。
 */
const DERIVE_ENV_RE =
  /\\begin\{(aligned\*?|align\*?|gather\*?|cases|split|multline\*?)\}/

function isDeriveBlock(content: string): boolean {
  return DERIVE_ENV_RE.test(content.trim())
}

export function mathDeriveBlockPlugin(md: MarkdownIt): void {
  const defaultRender = md.renderer.rules.math_block as Renderer.RenderRule | undefined
  if (!defaultRender) return

  md.renderer.rules.math_block = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: unknown,
    self: Renderer,
  ) => {
    const content = tokens[idx].content ?? ''
    const html = defaultRender(tokens, idx, options, env, self)
    if (!isDeriveBlock(content)) return html
    return `<div class="math-derive-block"><div class="math-derive-block__inner">${html}</div></div>\n`
  }
}
