/**
 * 日记和随笔数据
 *
 * 如何维护：
 * 1. 配图放到 docs/public/ 目录
 * 2. 新增日记：复制一条 { date, img, content, title? }
 * 3. 删除日记：删掉对应对象
 * 4. 页面会按 date 降序自动排列（最新的在前）
 *
 * 字段说明：
 * - date:    日期，格式 'YYYY-MM-DD'
 * - img:     封面图路径（相对于 public/）
 * - content: 正文内容，支持换行（\n）
 * - title:   可选标题
 */
import type { DiaryEntry } from './types'

export const diaryEntries: DiaryEntry[] = [
  {
    date: '2026-05-24',
    title: '网站改版记',
    img: '/aru.png',
    content: '今天给个人网站做了一次首页重构，把 Hero 区块、波浪动效和卡片布局都重新梳理了一遍。\n希望接下来能在这里记录更多学习与生活。',
  },
 
  {
    date: '2026-04-28',
    img: '/mary.jpg',
    content: '一个普通的周末，读了几篇关于计算机视觉的论文。\n有时候慢下来，反而能看得更清楚。',
  },
]
