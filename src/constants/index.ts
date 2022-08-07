import social from 'data/social.json'
import { Translate } from 'next-translate'
import { routes } from 'src/config/routes'

import { SEOProps } from '@/config/seo'

export const TWITTER_PROFILE = 'https://twitter.com/thedaviddias'
export const GITHUB_PROFILE = 'https://github.com/thedaviddias'
export const POLYWORK_PROFILE = 'https://changelog.thedaviddias.dev'

export type LinksInternalResponse = {
  /** Indicates if it should show in the navigation menu */
  menu?: boolean
  label: string
  path: string
  h1?: string
  seo: SEOProps
}

export type LinksExternalResponse = {
  label: string
  link: string
}

export const MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).notes,
  routes(translate).articles,
  routes(translate).projects,
  routes(translate).bookmarks,
  routes(translate).about,
]

export const FOOTER_MENU_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).home,
  ...[...MENU_LINKS(translate)],
]

export const EXTRA_LINKS = (translate: Translate): LinksInternalResponse[] => [
  routes(translate).uses,
  routes(translate).gear,
  routes(translate).resume,
  routes(translate).analytics,
  routes(translate).rss,
]

export const SOCIAL_LINKS: LinksExternalResponse[] = social.slice(0, 6)

export const HERO_LINKS = [
  {
    label: 'Personal changelog',
    link: POLYWORK_PROFILE,
  },
  {
    label: 'Twitter',
    link: TWITTER_PROFILE,
  },
  {
    label: 'Github',
    link: GITHUB_PROFILE,
  },
]

export const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
export const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
export const GET_PODCAST_ERREUR_200 =
  'https://api.spotify.com/v1/shows/5vlkaq2mJ3niIkkmUcrXfS/episodes?market=FR&limit=1&offset=0'
export const GET_PODCAST_WWS =
  'https://api.spotify.com/v1/shows/2BYtLK0WwVz0cIfgcJwL57/episodes?market=FR&limit=1&offset=0'

export const REGEX_REMOVE_DATE = /[0-9]{4}\-[0-9]{2}\-[0-9]{2}\-/g

export const CONTENT_TYPE = {
  ARTICLE: 'articles',
  NOTE: 'notes',
}

export const CLOUDINARY_NAME = 'thedaviddias'
export const CLOUDINARY_IMG_WIDTH = 1920
export const CLOUDINARY_IMG_HEIGHT = 1080

export const BASE_URL = 'https://thedaviddias.dev' || process.env.VERCEL_URL
export const BASE_EMAIL = 'hello@thedaviddias.com'
