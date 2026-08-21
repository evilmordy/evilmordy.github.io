import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

/**
 * 将 ```mermaid 转成可切换「图 / 源码」的组件。
 * 渲染用 encodeURIComponent 传入属性；高亮源码作为默认插槽，沿用 VitePress 的 fence。
 */
export function mermaidPlugin(md: MarkdownIt): void {
  const defaultFence = md.renderer.rules.fence as RenderRule | undefined
  if (!defaultFence) return

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const info = tokens[idx].info.trim().split(/\s+/)[0]
    if (info === 'mermaid') {
      const encoded = encodeURIComponent(tokens[idx].content.trim())
      const highlighted = defaultFence(tokens, idx, options, env, self)
      return `<MermaidDiagram code="${encoded}">${highlighted}</MermaidDiagram>\n`
    }
    return defaultFence(tokens, idx, options, env, self)
  }
}
