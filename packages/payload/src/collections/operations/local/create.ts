import type { CollectionSlug, GeneratedTypes, Payload } from '../../../index.js'
import type { Document, PayloadRequestWithData, RequestContext } from '../../../types/index.js'
import type { File } from '../../../uploads/types.js'
import type { DataFromCollectionSlug, RequiredDataFromCollectionSlug } from '../../config/types.js'

import { APIError } from '../../../errors/index.js'
import { getFileByPath } from '../../../uploads/getFileByPath.js'
import { createLocalReq } from '../../../utilities/createLocalReq.js'
import { createOperation } from '../create.js'

export type Options<TSlug extends CollectionSlug> = {
  collection: TSlug
  /**
   * context, which will then be passed to req.context, which can be read by hooks
   */
  context?: RequestContext
  data: RequiredDataFromCollectionSlug<TSlug>
  depth?: number
  disableVerificationEmail?: boolean
  draft?: boolean
  fallbackLocale?: GeneratedTypes['locale']
  file?: File
  filePath?: string
  locale?: GeneratedTypes['locale']
  overrideAccess?: boolean
  overwriteExistingFiles?: boolean
  req?: PayloadRequestWithData
  showHiddenFields?: boolean
  user?: Document
}

// eslint-disable-next-line no-restricted-exports
export default async function createLocal<TSlug extends CollectionSlug>(
  payload: Payload,
  options: Options<TSlug>,
): Promise<DataFromCollectionSlug<TSlug>> {
  const {
    collection: collectionSlug,
    data,
    depth,
    disableVerificationEmail,
    draft,
    file,
    filePath,
    overrideAccess = true,
    overwriteExistingFiles = false,
    showHiddenFields,
  } = options
  const collection = payload.collections[collectionSlug]

  if (!collection) {
    throw new APIError(
      `The collection with slug ${String(collectionSlug)} can't be found. Create Operation.`,
    )
  }

  const req = await createLocalReq(options, payload)
  req.file = file ?? (await getFileByPath(filePath))

  return createOperation<TSlug>({
    collection,
    data,
    depth,
    disableVerificationEmail,
    draft,
    overrideAccess,
    overwriteExistingFiles,
    req,
    showHiddenFields,
  })
}
