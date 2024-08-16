import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js'
import type { Document, PayloadRequest, RequestContext, Where } from '../../../types/index.js'

import { APIError } from '../../../errors/index.js'
import { createLocalReq } from '../../../utilities/createLocalReq.js'
import { countOperation } from '../count.js'

export type Options<TSlug extends CollectionSlug> = {
  cache?: boolean
  collection: TSlug
  /**
   * context, which will then be passed to req.context, which can be read by hooks
   */
  context?: RequestContext
  depth?: number
  disableErrors?: boolean
  locale?: TypedLocale
  overrideAccess?: boolean
  req?: PayloadRequest
  user?: Document
  where?: Where
}

export default async function countLocal<TSlug extends CollectionSlug>(
  payload: Payload,
  options: Options<TSlug>,
): Promise<{ totalDocs: number }> {
  const {
    cache = false,
    collection: collectionSlug,
    disableErrors,
    overrideAccess = true,
    where,
  } = options

  const collection = payload.collections[collectionSlug]

  if (!collection) {
    throw new APIError(
      `The collection with slug ${String(collectionSlug)} can't be found. Count Operation.`,
    )
  }

  return countOperation<TSlug>({
    cache,
    collection,
    disableErrors,
    overrideAccess,
    req: await createLocalReq(options, payload),
    where,
  })
}
