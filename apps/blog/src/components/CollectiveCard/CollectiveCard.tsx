import useTranslation from 'next-translate/useTranslation'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { Loader } from '../Loader'
import { MetricsCard } from '../MetricsCard'

type Projects = {
  slug: string
  currency: string
  image: string
  balance: number
  yearlyIncome: number
  backersCount: number
  contributorsCount: number
}

type CollectiveRes = {
  projects: Projects[]
}

export const CollectiveCard = () => {
  const { t } = useTranslation('common')
  const { data, error } = useSWR<CollectiveRes>('/api/open-collective', fetcher)

  const frontendchecklist_balance = parseInt(`${data?.projects[0].balance}`.slice(0, -2))
  const htmlhint_balance = data?.projects[1].balance

  if (error) return <></>
  if (!data) return <Loader />

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricsCard
        header={t('dashboard.sections.coding.open_collective_fec')}
        link={t('dashboard.sections.coding.open_collective_fec_url')}
        metric={frontendchecklist_balance}
        isCurrency={true}
      />
      <MetricsCard
        header={t('dashboard.sections.coding.open_collective_htmlhint')}
        link={t('dashboard.sections.coding.open_collective_htmlhint_url')}
        metric={htmlhint_balance}
        isCurrency={true}
      />
    </div>
  )
}
