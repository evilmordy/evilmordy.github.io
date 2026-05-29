/**
 * 友情链接申请配置
 *
 * 如何维护：
 * 1. email：申请收件邮箱（与 SocialLinks.vue 工作邮箱一致）
 * 2. requirements：申请须知，按需增删
 * 3. siteInfo：本站信息，供申请者互链参考
 * 4. fieldHints：表单字段说明，按需调整 placeholder
 */
import type { FriendLink } from './types'

export interface FriendLinkFieldHint {
  key: keyof FriendLink
  label: string
  placeholder: string
  hint: string
  multiline?: boolean
}

export const friendLinkApplyConfig = {
  email: '3999485702@qq.com',

  requirements: [
    '站点可正常访问，内容健康、原创或有价值',
    '建议先在本站添加友链后再申请',
    '填写下方信息后，复制生成的代码并通过邮箱发送',
  ],

  siteInfo: {
    name: '时针的个人网站',
    url: 'https://evilmordy.github.io/',
    img: 'https://evilmordy.github.io/头像.png',
    summary: 'evilmordy 的个人网站，分享学习与思考',
  } satisfies FriendLink,

  fieldHints: [
    {
      key: 'name',
      label: '网站名称',
      placeholder: '例如：我的博客',
      hint: 'name — 站点在友链列表中显示的名称',
    },
    {
      key: 'url',
      label: '网址',
      placeholder: 'https://example.com',
      hint: 'url — 完整链接，以 https:// 开头',
    },
    {
      key: 'img',
      label: '标志图片链接',
      placeholder: 'https://example.com/logo.png',
      hint: 'img — 站点 logo 或封面图的完整 URL',
    },
    {
      key: 'summary',
      label: '一句话介绍',
      placeholder: '例如：分享技术笔记与生活随笔',
      hint: 'summary — 简短描述你的站点',
      multiline: true,
    },
  ] satisfies FriendLinkFieldHint[],
}
