'use client'

import { RefreshRouterOnSave as RefreshRouteOnSaveComponent } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

import { PAYLOAD_SERVER_URL } from '../../../_api/serverURL.js'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()

  return (
    <RefreshRouteOnSaveComponent refresh={() => router.refresh()} serverURL={PAYLOAD_SERVER_URL} />
  )
}
