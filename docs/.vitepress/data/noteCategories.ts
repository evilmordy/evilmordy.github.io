/**
 * 知识库分类数据
 *
 * 内容来源：自动扫描 docs/notes 下的 Markdown 文件
 * 展示维护：在 categoryMeta 中集中配置分类标题、描述、封面和排序。
 */
import type { NoteArticle, NoteCategory } from './types'

const noteFiles = import.meta.glob('../../notes/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const fallbackImages = [
  '/gongzi.png',
  '/aris.jpg',
  '/you.jpg',
  '/qinxiang.png',
  '/mary.jpg',
  '/uzquneen.jpg',
]

const categoryMeta: Record<string, { title?: string; details: string; img?: string; order: number }> = {
  '机器学习': {
    details: '从基础库、线性回归到神经网络，把模型训练拆成可复习的路线。',
    img: '/gongzi.png',
    order: 10,
  },
  '深度学习': {
    details: '记录深度学习核心概念、模型理解和持续补全的学习笔记。',
    img: '/aris.jpg',
    order: 20,
  },
  '大创-计算机视觉': {
    details: '围绕 OpenCV、YOLO 和视觉项目实践展开的工程记录。',
    img: '/you.jpg',
    order: 30,
  },
  '大创-无人机与自主导航': {
    details: 'IMU、VO/VIO、雅可比矩阵等自主导航方向的专题整理。',
    img: '/qinxiang.png',
    order: 40,
  },
  '数学': {
    details: '把抽象代数等数学内容沉淀成可以反复翻看的推导。',
    img: '/mary.jpg',
    order: 50,
  },
  'AI生产力工具': {
    title: 'AI 生产力工具',
    details: 'Vibe coding、MCP 等 AI 工具链和实践体验记录。',
    img: '/miku.webp',
    order: 60,
  },
  '数据结构': {
    details: '链表、堆栈等基础数据结构的复习与总结。',
    img: '/white.webp',
    order: 70,
  },
  'ROS2': {
    details: '从安装、小海龟命令行到工作空间和功能包的 ROS2 入门路线。',
    img: '/mika.png',
    order: 80,
  },
  '踩坑大合集': {
    details: '开发、环境和工具链里踩过的坑，对照记录方便下次少走弯路。',
    img: '/aii.jpeg',
    order: 90,
  },
}

function stripFrontmatter(raw: string) {
  return raw.replace(/^---\s*[\s\S]*?\s*---\s*/, '')
}

function titleFromMarkdown(raw: string, fileName: string) {
  const body = stripFrontmatter(raw)
  const heading = body.match(/^#\s+(.+)$/m)
  return heading?.[1]?.trim() || fileName.replace(/\.md$/, '')
}

function linkFromRelativePath(relativePath: string) {
  if (relativePath.endsWith('/index.md')) {
    return `/notes/${relativePath.replace(/\/index\.md$/, '')}/`
  }
  return `/notes/${relativePath.replace(/\.md$/, '')}`
}

function isUsefulArticle(relativePath: string) {
  return !relativePath.endsWith('/README.md') && !relativePath.endsWith('/index.md')
}

export function getNoteCategories(): NoteCategory[] {
  const grouped = new Map<string, NoteArticle[]>()
  const subFolders = new Map<string, Set<string>>()

  for (const filePath in noteFiles) {
    const relativePath = filePath.replace(/^\.\.\/\.\.\/notes\//, '')
    const parts = relativePath.split('/')
    const category = parts[0]
    if (!category || !isUsefulArticle(relativePath)) continue

    const fileName = parts[parts.length - 1]
    const article: NoteArticle = {
      title: titleFromMarkdown(noteFiles[filePath], fileName),
      link: linkFromRelativePath(relativePath),
      category,
      path: relativePath,
    }

    const articles = grouped.get(category) || []
    articles.push(article)
    grouped.set(category, articles)

    if (parts.length > 2) {
      const set = subFolders.get(category) || new Set<string>()
      set.add(parts[1])
      subFolders.set(category, set)
    }
  }

  return Array.from(grouped.entries())
    .map(([name, articles], index) => {
      const meta = categoryMeta[name]
      const sortedArticles = articles.sort((a, b) => a.path.localeCompare(b.path, 'zh-Hans-CN'))

      return {
        name,
        title: meta?.title || name,
        details: meta?.details || '持续整理中的学习笔记与实践记录。',
        img: meta?.img || fallbackImages[index % fallbackImages.length],
        link: sortedArticles[0]?.link || `/notes/${name}/`,
        count: sortedArticles.length,
        subCount: subFolders.get(name)?.size || 0,
        articles: sortedArticles,
      }
    })
    .sort((a, b) => {
      const orderA = categoryMeta[a.name]?.order ?? 999
      const orderB = categoryMeta[b.name]?.order ?? 999
      return orderA - orderB || a.name.localeCompare(b.name, 'zh-Hans-CN')
    })
}
