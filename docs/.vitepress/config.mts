import { defineConfig } from 'vitepress';
import {nav,sidebar} from './relaConf';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    math: true
  },
  title: "宋宇超的个人网站",
  description: "evilmordy's web",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    logo:'/uzquneen.jpg',

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/evilmordy' },
      {icon:'bilibili',link:'https://space.bilibili.com/3546701528828459?spm_id_from=333.1007.0.0'}
    ]
  }
})
