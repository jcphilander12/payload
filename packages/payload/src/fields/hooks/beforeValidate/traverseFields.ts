import type { SanitizedCollectionConfig } from '../../../collections/config/types.js'
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js'
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js'
import type { Field, TabAsField } from '../../config/types.js'

import { promise } from './promise.js'

type Args<T> = {
  collection: SanitizedCollectionConfig | null
  context: RequestContext
  data: T
  /**
   * The original data (not modified by any hooks)
   */
  doc: T
  fields: (Field | TabAsField)[]
  global: SanitizedGlobalConfig | null
  id?: number | string
  operation: 'create' | 'update'
  overrideAccess: boolean
  path: (number | string)[]
  req: PayloadRequestWithData
  schemaPath: string[]
  siblingData: Record<string, unknown>
  /**
   * The original siblingData (not modified by any hooks)
   */
  siblingDoc: Record<string, unknown>
}

export const traverseFields = async <T>({
  id,
  collection,
  context,
  data,
  doc,
  fields,
  global,
  operation,
  overrideAccess,
  path,
  req,
  schemaPath,
  siblingData,
  siblingDoc,
}: Args<T>): Promise<void> => {
  const promises = []
  fields.forEach((field) => {
    promises.push(
      promise({
        id,
        collection,
        context,
        data,
        doc,
        field,
        global,
        operation,
        overrideAccess,
        parentPath: path,
        parentSchemaPath: schemaPath,
        req,
        siblingData,
        siblingDoc,
      }),
    )
  })
  await Promise.all(promises)
}
