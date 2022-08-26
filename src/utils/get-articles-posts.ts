import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import slugify from 'slugify'

import { PreviousNext } from '@/components/AdjacentPosts'

import { BASE_URL, CONTENT_TYPE } from '@/constants'

import { ArticlesType, ListAllTags } from '@/types'

export const createPermalink = (filename: string, dataType: string, locale?: string) => {
  const filenameNoExtension = filename.replace('.mdx', '')
  const permalink = `${locale !== 'en' ? `/${locale}` : ''}/${dataType}/${filenameNoExtension}`

  return permalink
}

/**
 * Sort by date descendant
 *
 * @param a - The first date to use to sort
 * @param b - The second date to use to sort
 * @returns
 */
export function dateSortDesc(a: number, b: number) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

/**
 * Gets the list of content files
 *
 * @param dataType - Type of data to be returned
 * @returns - Array of files with .mdx
 */
export const getAllPosts = (dataType: string): string[] => {
  return fs.readdirSync(path.join(process.cwd(), 'content', dataType), 'utf-8')
}

/**
 *
 * @param slug
 * @param dataType
 * @returns
 */
export const getPost = (slug: string, dataType: string) =>
  fs.readFileSync(path.join(process.cwd(), 'content', dataType, `${slug}.mdx`), 'utf8')

/**
 *
 * @param slug
 * @param dataType
 * @returns
 */
export const getPostBySlug = (slug: string, dataType: string, locale?: string) => {
  const source = getPost(slug, dataType)

  const permalink = `${BASE_URL}${createPermalink(slug, dataType, locale)}` || ''

  const { data, content } = matter(source)

  return {
    frontMatter: data,
    permalink,
    readingTime: readingTime(content),
    markdownBody: content,
  }
}

type GetAllPostsWithFrontMatter = {
  dataType: string
  filterByTag?: string | null
  filterByCategory?: string | null
  locale?: string
  limit?: number
}

export const getAllPostsWithFrontMatter = ({
  dataType,
  filterByTag = null,
  filterByCategory = null,
  locale = 'en',
  limit = 99,
}: GetAllPostsWithFrontMatter): ArticlesType[] => {
  const blogs = getAllPosts(dataType)

  const allBlogs = blogs
    .reduce((allPosts: any, filename: string) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'content', dataType, filename),
        'utf8'
      )

      const { data, content } = matter(source)

      const filenameNoExtension = filename.replace('.mdx', '')
      const permalink = createPermalink(filename, dataType, locale)

      if (filterByTag) {
        if (data.tags.includes(filterByTag)) {
          return [
            {
              frontMatter: data,
              permalink,
              slug: filenameNoExtension,
              content,
            },
            ...allPosts,
          ]
        } else {
          return allPosts
        }
      }

      if (filterByCategory) {
        if (data.categories.includes(filterByCategory)) {
          return [
            {
              frontMatter: data,
              permalink,
              slug: filenameNoExtension,
              content,
            },
            ...allPosts,
          ]
        } else {
          return allPosts
        }
      }

      return [
        {
          frontMatter: data,
          readingTime: readingTime(content),
          permalink,
          slug: filenameNoExtension,
          content,
        },
        ...allPosts,
      ]
    }, [])
    .filter((articles: ArticlesType) => !articles.frontMatter.draft)
    .filter((articles: ArticlesType) => articles.frontMatter.locale === locale)
    .sort((a: ArticlesType, b: ArticlesType) =>
      dateSortDesc(Number(new Date(a.frontMatter.date)), Number(new Date(b.frontMatter.date)))
    )

  return allBlogs.slice(0, limit)
}

export type TagOptions = {
  [key: string]: string[]
}

async function collateTags(dataType: string, type: string, locale = 'en') {
  const files = getAllPosts(dataType)
  const listAllTags = [] as ListAllTags[]
  const uniqueTags = new Set()

  files.map((postSlug) => {
    const source = fs.readFileSync(path.join(process.cwd(), 'content', dataType, postSlug), 'utf8')

    const { data } = matter(source)

    if (data.locale === locale) {
      if (type === 'tags' && data.tags.length) {
        data.tags.forEach((tag: string) => {
          const tagExists = listAllTags.find((tagItem: ListAllTags) => tagItem.name === tag)

          if (tagExists) {
            tagExists.occurrences = tagExists.occurrences ? tagExists.occurrences + 1 : 1
          } else {
            listAllTags.push({ name: tag, occurrences: 1 })
          }

          listAllTags.push({
            name: slugify(tag, { lower: true }),
            occurrences: tagExists?.occurrences || 0,
          })
        })
      } else if (type === 'categories' && data.categories.length) {
        data.categories.forEach((category: string) => {
          const categoryExists = listAllTags.find(
            (tagItem: ListAllTags) => tagItem.name === category
          )

          if (categoryExists) {
            categoryExists.occurrences = categoryExists.occurrences
              ? categoryExists.occurrences + 1
              : 1
          } else {
            listAllTags.push({ name: category, occurrences: 1 })
          }

          listAllTags.push({
            name: slugify(category, { lower: true }),
            occurrences: categoryExists?.occurrences || 0,
          })
        })
      }
    }
  })

  const filteredArr = listAllTags
    .filter((el) => {
      const duplicate = uniqueTags.has(el.name)
      uniqueTags.add(el.name)
      return !duplicate
    })
    .sort((a: ListAllTags, b: ListAllTags) => {
      if (a.occurrences > b.occurrences) return -1
      if (a.occurrences < b.occurrences) return 1
      return 0
    })

  return Array.from(filteredArr)
}

export type TagsInfo = {
  name: string
  description?: string
  logo?: string
  occurrences?: number
}

export async function getTags(dataType: string, locale?: string): Promise<TagsInfo[]> {
  const tagsInfo = fs.readFileSync(path.join(process.cwd(), 'data', 'tags.json'), 'utf8')

  const tags = {
    articles: await collateTags(CONTENT_TYPE.ARTICLE, 'tags', locale),
    notes: await collateTags(CONTENT_TYPE.NOTE, 'tags', locale),
  }

  const tagsWithDescription = tags[dataType].map((tag: ListAllTags) => {
    const tagData = JSON.parse(tagsInfo).find((tagData: TagsInfo) => tagData.name === tag.name)

    return {
      name: tag.name,
      occurrences: tag.occurrences,
      description: tagData?.description,
      logo: tagData?.logo,
    }
  })

  return tagsWithDescription
}

export async function getCategories(dataType: string, locale?: string): Promise<ListAllTags[]> {
  const categories = {
    articles: await collateTags(CONTENT_TYPE.ARTICLE, 'categories', locale),
  }

  return categories[dataType]
}

export function getAdjacentPosts(slug: string, locale: string, dataType: string): PreviousNext {
  const allPostHeaders = getAllPostsWithFrontMatter({ dataType, locale })

  const postIndex = allPostHeaders.findIndex((postHeader) => postHeader?.slug === slug)
  return {
    previous:
      postIndex <= 0
        ? null
        : {
            slug: allPostHeaders[postIndex - 1]?.permalink,
            title: allPostHeaders[postIndex - 1]?.frontMatter.title,
          },
    next:
      postIndex >= allPostHeaders.length - 1
        ? null
        : {
            slug: allPostHeaders[postIndex + 1]?.permalink,
            title: allPostHeaders[postIndex + 1]?.frontMatter.title,
          },
  }
}

export type GetRelatedPosts = ArticlesType & {
  relevance: number
}

export function getRelatedPosts(slug: string, locale: string, tags: string[]) {
  const allPostHeaders = getAllPostsWithFrontMatter({ dataType: CONTENT_TYPE.ARTICLE, locale })
  const allNotesHeaders = getAllPostsWithFrontMatter({ dataType: CONTENT_TYPE.NOTE, locale })
  const allPosts: GetRelatedPosts[] = []

  const posts = [...allPostHeaders, ...allNotesHeaders].filter((aPost) => aPost.slug !== slug)

  const maxPosts = 3

  const listTags = tags.map((tag) => {
    return tag
  })

  posts
    .map((post) => {
      const postTags =
        post.frontMatter.tags &&
        post.frontMatter.tags
          .map((tag) => {
            return tag
          })
          .filter((tag) => {
            return tag !== ''
          })

      const intersection = listTags.filter((tag) => {
        return postTags?.includes(tag)
      }).length

      if (intersection > 0) {
        return allPosts.push({
          ...post,
          relevance: intersection,
        })
      }
    })
    // .sort((a, b) => {
    //   return b.relevance - a.relevance
    // })
    .slice(0, maxPosts)

  return allPosts
}

export const getAllDraftPosts = ({ dataType }: GetAllPostsWithFrontMatter): ArticlesType[] => {
  const blogs = getAllPosts(dataType)

  const allBlogs = blogs
    .reduce((allPosts: any, filename: string) => {
      const filenameNoExtension = filename.replace('.mdx', '')

      return [
        {
          slug: filenameNoExtension,
        },
        ...allPosts,
      ]
    }, [])
    .filter((articles: ArticlesType) => articles.frontMatter.draft)

  return allBlogs
}
