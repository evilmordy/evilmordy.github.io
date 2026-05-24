export interface HomeCard {
  title: string
  details: string
  img: string
  link: string
}

export interface FriendLink {
  name: string
  url: string
  img: string
  summary: string
}

export interface DiaryEntry {
  date: string
  img: string
  content: string
  title?: string
}
