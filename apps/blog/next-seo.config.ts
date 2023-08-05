import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s | The David Dias',
  defaultTitle: 'The David Dias',
  openGraph: {
    type: 'website',
    url: 'https://thedaviddias.dev',
    profile: {
      firstName: 'David',
      lastName: 'Dias',
      gender: 'male',
    },
    images: [
      {
        url: `https://thedaviddias.dev/images/og/default.png`,
        alt: 'The David Dias',
      },
    ],
  },
  twitter: {
    handle: '@thedaviddias',
    site: '@thedaviddias',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'application-name',
      content: 'The David Dias',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-config',
      content: `/favicons/browserconfig.xml`,
    },
  ],
  additionalLinkTags: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: '/rss/feed.xml',
    },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: '/rss/fr/feed.xml',
    },
    {
      rel: 'icon',
      href: `/favicon.ico`,
    },
    {
      rel: 'apple-touch-icon',
      href: `/favicons/apple-touch-icon.png`,
      sizes: '76x76',
    },
    {
      rel: 'manifest',
      href: `/favicons/site.webmanifest`,
    },
    {
      rel: 'mask-icon',
      href: `/favicons/safari-pinned-tab.svg`,
      color: '#000000',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: `/favicons/favicon-32x32.png`,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: `/favicons/favicon-16x16.png`,
    },
    {
      rel: `webmention`,
      href: `https://webmention.io/thedaviddias.dev/webmention`,
    },
    {
      rel: `pingback`,
      href: `https://webmention.io/thedaviddias.dev/xmlrpc`,
    },
  ],
}

export default config
