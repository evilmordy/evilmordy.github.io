/**
 * 日记和随笔数据
 *
 * 如何维护：
 * 1. 配图放到 docs/public/ 目录
 * 2. 新增日记：复制一条 { date, content, img?, title? }
 * 3. 删除日记：删掉对应对象
 * 4. 页面会按 date 降序自动排列（最新的在前）
 *
 * 字段说明：
 * - date:    日期，格式 'YYYY-MM-DD'
 * - img:     可选封面图路径（相对于 public/），不填则显示默认装饰头图
 * - content: 正文内容，支持换行（\n）
 * - title:   可选标题
 */
import type { DiaryEntry } from './types'

export const diaryEntries: DiaryEntry[] = [
  {
    date: '2026-05-24',
    title: '网站改版记',
    img: '/aru.png',
    content: '今天给个人网站做了一次首页重构，把 Hero 区块、动效，布局全部换了一版。\n希望接下来能在这里记录更多学习与生活。',
  },
 
  {
    date: '2026-04-28',
    img: '/mary.jpg',
    content: '一个普通的周末，读了几篇关于计算机视觉的论文。\n草泥马，怎么还有这么多东西要学。',
  },
  {
    date:'2026-05-30',
    content:'昨天去招商银行办理了万事达借记卡，结果发现还是订阅不了国外的AI服务\nopenrouter也限制了地区，也不知道在哪里改http/1.0,只能用继续用cursor调opus和gpt了。\n但我开了个X Premium'
  }
]
