/**
 * 社交账号数据
 *
 * 完整社交媒体页和首页紧凑入口共用这里的数据。
 */
import type { SocialLink } from './types'

export const socialLinks: SocialLink[] = [
  {
    icon: '/github.svg',
    name: 'GitHub',
    url: 'https://github.com/evilmordy',
    displayUrl: 'github.com/evilmordy',
    desc: '代码仓库与开源项目',
  },
  {
    icon: '/bilibili.svg',
    name: 'Bilibili',
    url: 'https://space.bilibili.com/3546701528828459',
    displayUrl: 'loveryou-',
    desc: '视频与分享',
  },
  {
    icon: '/推特.svg',
    name: 'Twitter/X',
    url: 'https://x.com/pysimpom',
    displayUrl: 'x.com/pysimpom',
    desc: '来关注我的推特',
  },
  {
    icon: '/threads.svg',
    name: 'Threads',
    url: 'https://www.threads.net/@pysimpom',
    displayUrl: 'threads.net/@pysimpom',
    desc: '文字 & 生活',
  },
  {
    icon: '/邮箱.svg',
    name: 'QQ邮箱',
    url: 'mailto:1119864217@qq.com',
    displayUrl: '1119864217@qq.com',
    desc: '欢迎随时联系我',
  },
  {
    icon: '/工作邮箱.svg',
    name: '工作邮箱',
    url: 'mailto:3999485702@qq.com',
    displayUrl: '3999485702@qq.com',
    desc: '聊正事的',
  },
]
