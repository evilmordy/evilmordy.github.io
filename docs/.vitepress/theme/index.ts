import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyLayout from './Layout.vue'
import MermaidDiagram from '../components/MermaidDiagram.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('MermaidDiagram', MermaidDiagram)
  },
} satisfies Theme
