import DefaultTheme from 'vitepress/theme'
import MyLayout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
}
