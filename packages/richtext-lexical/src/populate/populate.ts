import type { SerializedEditorState } from 'lexical'
import type { PayloadRequestWithData } from 'payload/types'
import type { Collection, Field, RichTextField } from 'payload/types'

import { createDataloaderCacheKey } from 'payload/utilities'

import type { AdapterProps } from '../types.js'

type Arguments = {
  currentDepth?: number
  data: unknown
  depth: number
  draft: boolean
  field: RichTextField<SerializedEditorState, AdapterProps>
  key: number | string
  overrideAccess?: boolean
  req: PayloadRequestWithData
  showHiddenFields: boolean
}

export const populate = async ({
  id,
  collection,
  currentDepth,
  data,
  depth,
  draft,
  key,
  overrideAccess,
  req,
  showHiddenFields,
}: Omit<Arguments, 'field'> & {
  collection: Collection
  field: Field
  id: number | string
}): Promise<void> => {
  const dataRef = data as Record<string, unknown>

  const doc = await req.payloadDataLoader.load(
    createDataloaderCacheKey({
      collectionSlug: collection.config.slug,
      currentDepth: currentDepth + 1,
      depth,
      docID: id as string,
      draft,
      fallbackLocale: req.fallbackLocale,
      locale: req.locale,
      overrideAccess: typeof overrideAccess === 'undefined' ? false : overrideAccess,
      showHiddenFields,
      transactionID: req.transactionID,
    }),
  )

  if (doc) {
    dataRef[key] = doc
  } else {
    dataRef[key] = null
  }
}
