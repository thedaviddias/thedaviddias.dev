import { Feed } from 'feed'
import fs from 'fs'

import { getAllPostsWithFrontMatter } from '../utils/get-blog-posts'
import localeEN from '../../locales/en/common.json'
import localeFR from '../../locales/fr/common.json'

export default async function generateRssFeed() {
  const postsEn = getAllPostsWithFrontMatter({ dataType: 'blog' })
  const postsFr = getAllPostsWithFrontMatter({ dataType: 'blog', locale: 'fr' })

  const siteURL = 'https://thedaviddias.dev'
  const date = new Date()
  const author = {
    name: 'David Dias',
    email: 'hello@thedaviddias.dev',
    link: 'https://twitter.com/thedaviddias',
  }

  // Creating feed
  const feedEn = new Feed({
    title: localeEN.title,
    description: localeEN.description,
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, David Dias`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  })

  // Adding blogs to the rss feed
  postsEn.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`
    feedEn.addItem({
      title: post.frontMatter.title,
      id: url,
      link: url,
      description: post.frontMatter.description,
      author: [author],
      contributor: [author],
      date: new Date(post.frontMatter.date),
    })
  })

  // generating the xml and json for rss
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feedEn.rss2())
  fs.writeFileSync('./public/rss/feed.json', feedEn.json1())

  // Creating feed
  const feedFr = new Feed({
    title: localeFR.title,
    description: localeFR.description,
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `Tous droits réservés ${date.getFullYear()}, David Dias`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss/fr/feed.xml`,
      json: `${siteURL}/rss/fr/feed.json`,
    },
    author,
  })

  // Adding blogs to the rss feed
  postsFr.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`
    feedFr.addItem({
      title: post.frontMatter.title,
      id: url,
      link: url,
      description: post.frontMatter.description,
      author: [author],
      contributor: [author],
      date: new Date(post.frontMatter.date),
    })
  })

  fs.mkdirSync('./public/rss/fr', { recursive: true })
  fs.writeFileSync('./public/rss/fr/feed.xml', feedFr.rss2())
  fs.writeFileSync('./public/rss/fr/feed.json', feedFr.json1())
}
