import minutesToString from 'minutes-to-string'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { MetricsCard } from '../MetricsCard'

type SteamRes = {
  count: number
  recently: {
    appid: number
    name: string
    playtime_2weeks: number
    playtime_forever: number
    img_icon_url: string
    playtime_windows_forever: number
    playtime_mac_forever: number
    playtime_linux_forever: number
  }
}

export const SteamCard = () => {
  const { data, error } = useSWR<SteamRes>('/api/steam', fetcher)

  const count = data?.count
  const recently = data?.recently
  const link = 'https://steamcommunity.com/id/servitus/'

  if (error) return <></>
  if (!data) return <div>Loading...</div>

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <MetricsCard header="Total number of Steam games" link={link} metric={count} />
      <MetricsCard
        header={`Duration of the most played game (last 2 weeks): ${recently?.name}`}
        link={link}
        stat={minutesToString(recently?.playtime_2weeks)}
      />
    </div>
  )
}
