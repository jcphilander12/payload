import { initPage } from '@payloadcms/next/utilities'
import Link from 'next/link'
import React from 'react'

import configPromise from '../../payload.config'
import { Gutter } from './_components/Gutter'

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[]
  }
}) {
  const initPageResult = await initPage({ config: configPromise, route: '/', searchParams })

  return (
    <Gutter>
      <h1>Payload Auth Example</h1>
      <p>
        {'This is a '}
        <Link href="https://payloadcms.com" rel="noopener noreferrer" target="_blank">
          Payload
        </Link>
        {' + '}
        <Link href="https://nextjs.org" rel="noopener noreferrer" target="_blank">
          Next.js
        </Link>
        {' app using the '}
        <Link href="https://nextjs.org/docs/app" rel="noopener noreferrer" target="_blank">
          App Router
        </Link>
        {' made explicitly for the '}
        <Link href="https://github.com/payloadcms/payload/tree/main/examples/auth">
          Payload Auth Example
        </Link>
        {". This example demonstrates how to implement Payload's "}
        <Link href="https://payloadcms.com/docs/authentication/overview">Authentication</Link>
        {
          ' strategies in both the REST and GraphQL APIs. To toggle between these APIs, see `_layout.tsx`.'
        }
      </p>
      <p>
        {'Visit the '}
        <Link href="/login">login page</Link>
        {' to start the authentication flow. Once logged in, you will be redirected to the '}
        <Link href="/account">account page</Link>
        {` which is restricted to users only. To manage all users, `}
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
          login to the admin dashboard
        </Link>
        .
      </p>
    </Gutter>
  )
}
