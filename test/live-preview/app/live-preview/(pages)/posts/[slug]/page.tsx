/* eslint-disable no-restricted-exports */
import { notFound } from 'next/navigation.js'
import React from 'react'

import type { Post } from '../../../../../payload-types.js'

import { postsSlug } from '../../../../../shared.js'
import { getDoc } from '../../../_api/getDoc.js'
import { getDocs } from '../../../_api/getDocs.js'
import { PostClient } from './page.client.js'

export default async function Post({ params: { slug = '' } }) {
  let post: Post | null = null

  try {
    post = await getDoc<Post>({
      slug,
      collection: postsSlug,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!post) {
    notFound()
  }

  return <PostClient post={post} />
}

export async function generateStaticParams() {
  process.env.PAYLOAD_DROP_DATABASE = 'false'
  try {
    const ssrPosts = await getDocs<Post>(postsSlug)
    return ssrPosts?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}
