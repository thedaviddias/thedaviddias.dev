export type ArticlesType = {
  frontMatter: {
    type: 'article'
    draft: boolean
    author?: string
    categories: string[]
    date: string
    description: string
    lastmod?: string
    locale: string
    permalink: string
    tags?: string[]
    title: string
    preview: {
      url: string
    }
    published?: {
      publishedOn: string
      publishedUrl: string
    }
  }
  content: string
  permalink: string
  slug: string
}

export type NotesType = {
  frontMatter: {
    type: 'note'
    draft: boolean
    author?: string
    categories: string[]
    date: string
    description: string
    lastmod?: string
    locale: string
    permalink: string
    tags?: string[]
    title: string
    preview: string
    published?: {
      publishedOn: string
      publishedUrl: string
    }
  }
  content: string
  permalink: string
  slug: string
}

export type UsesType = {
  title: string
  url: string
  description_en: string
  description_fr: string
  category_en: string
  category_fr: string
  image: string
}

export type ListAllTags = {
  name: string
  occurrences: number
}

export type YouTubeVideo = {
  id: string
  title: string
  url: string
}
