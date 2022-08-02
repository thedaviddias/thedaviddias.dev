import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <BaseLayout
      title={routes(t).error404.seo.title || ''}
      description={routes(t).error404.seo.description || ''}
      openGraph={routes(t).error404.seo}
      className="pt-10 border-none"
    >
      <PageHeader
        title={routes(t).error404.seo.title}
        description={routes(t).error404.seo.description}
      />
      <div className="mt-10 text-center">
        <button onClick={() => router.push('/')}>{t('404.back_home')}</button>
      </div>
    </BaseLayout>
  )
}

export default NotFoundPage
