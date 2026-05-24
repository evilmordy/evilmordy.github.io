/**
 * 首页卡片数据
 *
 * 如何维护：
 * 1. 图片放到 docs/public/ 目录，img 填 '/文件名.jpg'
 * 2. 增删卡片：复制或删除下方对象即可
 * 3. 调整顺序：在数组中上下移动对象
 *
 * 字段说明：
 * - title:   卡片标题
 * - details: 卡片副标题/简介
 * - img:     封面图路径（相对于 public/）
 * - link:    点击跳转链接
 */
import type { HomeCard } from './types'

export const homeCards: HomeCard[] = [
  {
    title: '社交账号和邮箱',
    details: 'GitHub · Bilibili · 邮箱',
    img: '/aris.jpg',
    link: '/column/media/',
  },
  {
    title: '个人简介',
    details: '了解更多关于我的故事',
    img: '/you.jpg',
    link: '/column/personal',
  },
  {
    title: '知识库',
    details: '机器学习 · 深度学习 · 计算机视觉...',
    img: '/gongzi.png',
    link: '/notes/',
  },
  {
    title: '友情链接',
    details: '发现更多有趣的站点',
    img: '/youxiang.jpg',
    link: '/column/friends/',
  },
  {
    title: '日记和随笔',
    details: '记录生活与思考',
    img: '/qinxiang.png',
    link: '/column/diary/',
  },
]
