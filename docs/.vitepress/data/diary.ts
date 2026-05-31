/**
 * 日记和随笔数据加载器（客户端安全版本）
 *
 * 使用 Vite 的 import.meta.glob 在构建时加载所有日记 Markdown 文件的原始内容。
 * 然后在运行时做极轻量的 frontmatter 解析。
 *
 * 优点：
 * - 完全避免 Node 内置模块被打包到浏览器
 * - 写日记依然是新建/编辑真实 .md 文件
 * - 与知识库体验一致
 */

import type { DiaryEntry } from './types'

// 使用相对路径 glob（从 .vitepress/data/ 目录出发）
// 使用 **/*.md 支持递归子文件夹（用户可按月份、标签、主题等自由组织目录结构）
const diaryFiles = import.meta.glob('../../column/diary/entries/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, content: raw.trim() }
  }

  const [, yamlBlock, body] = match
  const frontmatter: Record<string, any> = {}
  const lines = yamlBlock.split('\n')

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()
    if (!line || line.startsWith('#')) continue

    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    let value = line.slice(colonIndex + 1).trim()

    // Case 1: inline array [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      const arr = value.slice(1, -1)
        .split(',')
        .map(v => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
      frontmatter[key] = arr
      continue
    }

    // Case 2: start of multi-line list (tags: \n  - xxx)
    if (value === '' || value === '[]') {
      const listItems: string[] = []
      let j = i + 1
      while (j < lines.length) {
        const next = lines[j].trim()
        if (next.startsWith('- ')) {
          const item = next.slice(2).trim().replace(/^['"]|['"]$/g, '')
          if (item) listItems.push(item)
          j++
        } else if (next === '') {
          j++
        } else {
          break
        }
      }
      if (listItems.length > 0) {
        frontmatter[key] = listItems
        i = j - 1 // skip the list lines we consumed
        continue
      }
    }

    // Normal scalar value
    frontmatter[key] = value.replace(/^['"]|['"]$/g, '')
  }

  return {
    frontmatter,
    content: body.trim(),
  }
}

export function getDiaryEntries(): DiaryEntry[] {
  const entries: DiaryEntry[] = []

  for (const filePath in diaryFiles) {
    const raw = diaryFiles[filePath] as string
    const { frontmatter, content } = parseFrontmatter(raw)

    if (!frontmatter.date) continue

    entries.push({
      date: frontmatter.date,
      title: frontmatter.title,
      img: frontmatter.img,
      content,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : undefined,
      mood: frontmatter.mood,
    })
  }

  // 按日期倒序
  return entries.sort((a, b) => b.date.localeCompare(a.date))
}
