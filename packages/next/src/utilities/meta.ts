import type { Metadata } from 'next'
import type { Icon } from 'next/dist/lib/metadata/types/metadata-types.js'
import type { MetaConfig } from 'payload/config'

import { payloadFaviconDark, payloadFaviconLight } from '@payloadcms/ui/assets'
import QueryString from 'qs'

const defaultOpenGraph = {
  description:
    'Payload is a headless CMS and application framework built with TypeScript, Node.js, and React.',
  siteName: 'Payload App',
  title: 'Payload App',
}

export const meta = async (args: MetaConfig & { serverURL: string }): Promise<any> => {
  const {
    description,
    icons: customIcons,
    keywords,
    openGraph: openGraphFromProps,
    serverURL,
    title,
    titleSuffix,
  } = args

  const payloadIcons: Icon[] = [
    {
      type: 'image/png',
      rel: 'icon',
      sizes: '32x32',
      url: payloadFaviconDark?.src,
    },
    {
      type: 'image/png',
      media: '(prefers-color-scheme: dark)',
      rel: 'icon',
      sizes: '32x32',
      url: payloadFaviconLight?.src,
    },
  ]

  let icons = customIcons ?? payloadIcons // TODO: fix this type assertion

  if (customIcons && typeof customIcons === 'object' && Array.isArray(customIcons)) {
    icons = payloadIcons.concat(customIcons) // TODO: fix this type assertion
  }

  const metaTitle = `${title} ${titleSuffix}`

  const ogTitle = `${typeof openGraphFromProps?.title === 'string' ? openGraphFromProps.title : title} ${titleSuffix}`

  const mergedOpenGraph: Metadata['openGraph'] = {
    ...(defaultOpenGraph || {}),
    images: [
      {
        alt: ogTitle,
        height: 630,
        url: `/api/og${QueryString.stringify(
          {
            description: openGraphFromProps?.description || defaultOpenGraph.description,
            title: ogTitle,
          },
          {
            addQueryPrefix: true,
          },
        )}`,
        width: 1200,
      },
    ],
    title: ogTitle,
    ...(openGraphFromProps || {}),
  }

  return Promise.resolve({
    description,
    icons,
    keywords,
    metadataBase: new URL(
      serverURL ||
        process.env.PAYLOAD_PUBLIC_SERVER_URL ||
        `http://localhost:${process.env.PORT || 3000}`,
    ),
    openGraph: mergedOpenGraph,
    title: metaTitle,
  })
}
