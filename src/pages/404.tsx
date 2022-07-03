import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { routes } from '@/config/routes'

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <>
      <NextSeo
        title={routes(t).error404.seo.title}
        description={routes(t).error404.seo.description}
        openGraph={routes(t).error404.seo.openGraph}
      />
      {`This page doesn't exist.`}
      <button onClick={() => router.push('/')}>Back Home</button>
    </>
  )
}

export default NotFoundPage
