import useTranslation from 'next-translate/useTranslation'

import { GetRelatedPosts } from '@/utils/get-article-posts/getRelatedPosts'

import { CustomLink } from '../CustomLink'
import { H4 } from '../Headings'
import { Paragraph } from '../Paragraph'

type RelatedPostsProps = {
  relatedPosts: GetRelatedPosts[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ relatedPosts }) => {
  const { t } = useTranslation('common')

  return (
    <>
      {relatedPosts.length ? (
        <section className="mt-10 border-t border-gray-200 pb-8 pt-8 dark:border-gray-600">
          <header>
            <H4 as="h3" className="small-title">
              {t('related.title')}
            </H4>
            <Paragraph className="text-sm">{t('related.description')}</Paragraph>
          </header>
          <ul className="list-disc pl-5">
            {relatedPosts.map((post) => (
              <li key={post.frontMatter.title} className="mb-3">
                <CustomLink
                  href={post.permalink}
                  className="p-1 text-xl text-gray-600 hover:text-gray-900 dark:text-gray-200"
                >
                  {post.frontMatter.title}
                </CustomLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  )
}
