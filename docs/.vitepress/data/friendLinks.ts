/**
 * 友情链接数据
 *
 * 如何维护：
 * 1. 站点 logo/封面放到 docs/public/ 目录
 * 2. 新增链接：复制一条 { name, url, img, summary }
 * 3. 删除链接：删掉对应对象
 * 4. 调整顺序：在数组中上下移动
 * 5. 收到友链申请邮件后，将申请者生成的对象粘贴进下方数组即可
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
    img: 'https://vitepress.dev/vitepress-logo-mini.svg',
    summary: '由 Vite 驱动的静态站点生成器，本站基于此构建',
  },

  {
    name:'余弦の博客',
    url:'https://blog.cosine.ren/',
    img:'https://blog.cosine.ren/img/avatar.webp',
    summary:'伟大的余弦大人',
  }
]
