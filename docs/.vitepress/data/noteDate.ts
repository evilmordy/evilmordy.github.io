/**
 * 笔记日期：frontmatter 的 date（YYYY-MM-DD），否则尝试从文件名开头读取。
 */
export function parseNoteDate(raw: string, fileName?: string): string | undefined {
  if (raw.startsWith('---')) {
    const end = raw.indexOf('\n---', 3)
    if (end !== -1) {
      const block = raw.slice(3, end)
      const match = block.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?\s*$/m)
      if (match) return match[1]
    }
  }

  if (fileName) {
    const match = fileName.match(/^(\d{4}-\d{2}-\d{2})/)
    if (match) return match[1]
  }

  return undefined
}

export function normalizeFrontmatterDate(value: unknown): string {
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/)
    return match?.[1] ?? ''
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  return ''
}

export function formatNoteDate(date: string): string {
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return date
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}

export function compareByDateDesc(
  a: { date?: string; path?: string; text?: string },
  b: { date?: string; path?: string; text?: string },
): number {
  if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date)
  if (a.date && !b.date) return -1
  if (!a.date && b.date) return 1
  return (a.path || a.text || '').localeCompare(b.path || b.text || '', 'zh-Hans-CN')
}
