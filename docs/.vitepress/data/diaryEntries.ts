/**
 * @deprecated
 *
 * 此文件已废弃。
 *
 * 日记数据现在从真实 Markdown 文件加载：
 *   docs/column/diary/entries/*.md
 *
 * 请使用 `docs/.vitepress/data/diary.ts` 中的 `getDiaryEntries()`。
 *
 * 旧的数组写法仅用于向后兼容，未来版本可能会移除。
 */
import type { DiaryEntry } from './types'

/** @deprecated 不再使用，请改用 diary.ts 中的 getDiaryEntries() */
export const diaryEntries: DiaryEntry[] = []
