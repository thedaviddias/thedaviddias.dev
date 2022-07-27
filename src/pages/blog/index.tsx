import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { BlogPost } from '@/components/BlogPost'
import { Container } from '@/components/Container'
import { H1, H5 } from '@/components/Headings'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter } from '@/utils/get-blog-posts'



type BlogProps = {
  posts: any[]
}

const Blog = ({ posts }: BlogProps) => {
  const { t } = useTranslation('common')
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = posts.filter((post) =>
    post.frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Container>
      <NextSeo
        title={routes(t).blog.seo.title}
        description={routes(t).blog.seo.description}
        openGraph={routes(t).blog.seo}
      />
      <main className="divide-slate-200 sm:space-y-16 lg:max-w-none">
        <section className="pt-10 border-none">
          <header>
            <H1>{routes(t).blog.seo.title}</H1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
              {routes(t).blog.seo.description}
            </p>
          </header>
        </section>
        <section className="border-none">
          <header>
            <h2 className="sr-only">Recent articles</h2>
          </header>
          <form className="relative w-full mb-4">
            <fieldset>
              <H5 as="legend">Search</H5>
              <input
                aria-label="Search articles"
                type="search"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Type a word to search through the articles"
                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </fieldset>
          </form>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {!filteredBlogPosts.length && (
              <p className="mb-4 text-gray-600 dark:text-gray-400">{t('posts.empty')}</p>
            )}
            {filteredBlogPosts.map((post) => (
              <BlogPost key={post.frontMatter.title} post={post} />
            ))}
          </div>
        </section>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async ({ locale }) => {
  const posts = getAllPostsWithFrontMatter({ dataType: 'blog', locale })

  const props = {
    posts: JSON.parse(JSON.stringify(posts)),
  }

  return {
    props,
  }
}

export default Blog
