import type { FindOneArgs } from 'payload/database'
import type { PayloadRequestWithData, SanitizedCollectionConfig, TypeWithID } from 'payload/types'

import type { PostgresAdapter } from './types.js'

import { findMany } from './find/findMany.js'
import { getTableName } from './schema/getTableName.js'

export async function findOne<T extends TypeWithID>(
  this: PostgresAdapter,
  { collection, locale, req = {} as PayloadRequestWithData, where }: FindOneArgs,
): Promise<T> {
  const collectionConfig: SanitizedCollectionConfig = this.payload.collections[collection].config
  const tableName = getTableName({
    adapter: this,
    config: collectionConfig,
  })

  const { docs } = await findMany({
    adapter: this,
    fields: collectionConfig.fields,
    limit: 1,
    locale,
    page: 1,
    pagination: false,
    req,
    sort: undefined,
    tableName,
    where,
  })

  return docs?.[0] || null
}
