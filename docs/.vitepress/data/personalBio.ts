/**
 * 个人简介页模块数据
 *
 * 如何维护：
 * 1. 增删模块：复制或删除下方 sections 数组中的对象
 * 2. 调整顺序：在数组中上下移动对象
 * 3. 修改内容：改对应字段的值即可
 *
 * 模块类型说明：
 * - hero:     { type: 'hero', icon: '/头像.png', name: '名字', bio: '一句话介绍' }
 * - text:     { type: 'text', title?: '标题', content: '支持 <strong>HTML</strong>' }
 * - tags:     { type: 'tags', title?: '标题', items: ['标签'] 或 [{ name, color }] }
 * - cards:    { type: 'cards', title?: '标题', items: [{ icon, name, desc? }] }
 * - timeline: { type: 'timeline', title?: '标题', items: [{ year, title, desc?, intro? }] }  // intro: 学校简介
 * - stats:    { type: 'stats', title?: '标题', items: [{ label, value }] }
 */
import type { PersonalBioSection } from './types'

export const sections: PersonalBioSection[] = [
  {
    type: 'hero',
    icon: '/头像.png',
    name: '时针',
    bio: '战斗的意义不是憎恨',
  },
  {
    type: 'text',
    title: '👋 关于我',
    content:
      '不会做题的做题蛆，<strong>机器学习、计算机视觉与深度学习</strong>方向，业余时间捣鼓课外的东西，偶尔在 B 站分享技术内容,艺术内容以及BA二创。我只能通过鞭策AI增加网站的动效和颜值来掩饰我的弱小,对不起大家',
  },
  {
    type: 'timeline',
    title: '🎓 教育背景',
    items: [
      { year: '2024-至今', title: '南京航空航天大学', desc: '航空航天大类 · 本科 ' ,intro:'我说南航是最牛逼的211没有人有意见吧?'},
      { year: '2020-2024', title: '樟树中学', desc: '高中' ,intro:'宜春的豪强'},
      {year:'2017-2020',title:'清江中学',desc:'初中',intro:'樟树的豪强'}
    ],
  },
  {
    type: 'tags',
    title: '🛠 技术栈',
    items: [
      { name: 'Python', color: 'blue' },
      { name: '计算机视觉', color: 'green' },
      { name: 'Git', color: 'orange' },
      { name: 'Linux', color: 'purple' },
      { name: 'React', color: 'blue' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Markdown', color: 'purple' },
      { name: 'LaTeX', color: 'red' },
    ],
  },
  {
    type: 'cards',
    title: '📚 推荐书单',
    items: [
      { icon: '📙', name: '《不能称受的生命之轻》', desc: '米兰昆德拉' },
      { icon: '📘', name: '《一百个中国孩子的梦》', desc: '董宏猷 - 儿童文学的巅峰' },
      { icon: '📗', name: '《腰门》', desc: '彭学军' },
      { icon: '📕', name: '《我还能看到多少次满月升起》', desc: '坂本龙一' },
    ],
  },
  {
    type: 'stats',
    title: '📊 数据一览',
    items: [
      { label: '仓库', value: '10' },
      { label: 'B 站粉丝', value: '200+' },
      {label:'X followers', value: '80+'},
    ],
  },
]
