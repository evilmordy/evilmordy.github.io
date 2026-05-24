/**
 * 友情链接数据
 *
 * 如何维护：
 * 1. 站点 logo/封面放到 docs/public/ 目录
 * 2. 新增链接：复制一条 { name, url, img, summary }
 * 3. 删除链接：删掉对应对象
 * 4. 调整顺序：在数组中上下移动
 *
 * 字段说明：
 * - name:    站点名称
 * - url:     完整链接（https:// 开头）
 * - img:     封面图路径（相对于 public/）
 * - summary: 一句话概述
 */
import type { FriendLink } from './types'

export const friendLinks: FriendLink[] = [
  {
    name: 'VitePress',
    url: 'https://vitepress.dev',
    img: '/gongzi.png',
    summary: '由 Vite 驱动的静态站点生成器，本站基于此构建',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    img: '/github.svg',
    summary: '全球最大的代码托管平台，开源世界的中心',
  }
]
