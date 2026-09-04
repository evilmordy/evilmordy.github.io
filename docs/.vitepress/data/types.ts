export interface NoteArticle {
  title: string
  link: string
  category: string
  path: string
  date?: string
}

export interface NoteCategory {
  name: string
  title: string
  details: string
  img: string
  link: string
  count: number
  subCount: number
  dated: boolean
  latestDate?: string
  articles: NoteArticle[]
}

export interface SocialLink {
  icon: string
  name: string
  url: string
  displayUrl?: string
  desc: string
}

export interface FriendLink {
  name: string
  url: string
  img: string
  summary: string
}

export interface DiaryEntry {
  date: string
  img?: string
  content: string
  title?: string
  tags?: string[]
  mood?: string
}

export type PersonalBioTagItem = string | { name: string; color?: string }

export type PersonalBioSection =
  | { type: 'hero'; icon: string; name: string; bio: string }
  | { type: 'text'; title?: string; content: string }
  | { type: 'tags'; title?: string; items: PersonalBioTagItem[] }
  | { type: 'cards'; title?: string; items: { icon: string; name: string; desc?: string }[] }
  | { type: 'timeline'; title?: string; items: { year: string; title: string; desc?: string; intro?: string }[] }
  | { type: 'stats'; title?: string; items: { label: string; value: string }[] }
