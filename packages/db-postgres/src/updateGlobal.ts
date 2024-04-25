import type { UpdateGlobalArgs } from 'payload/database'
import type { PayloadRequestWithData, TypeWithID } from 'payload/types'

import type { PostgresAdapter } from './types.js'

import { getTableName } from './schema/getTableName.js'
import { upsertRow } from './upsertRow/index.js'

export async function updateGlobal<T extends TypeWithID>(
  this: PostgresAdapter,
  { slug, data, req = {} as PayloadRequestWithData }: UpdateGlobalArgs,
): Promise<T> {
  const db = this.sessions[req.transactionID]?.db || this.drizzle
  const globalConfig = this.payload.globals.config.find((config) => config.slug === slug)
  const tableName = getTableName({
    adapter: this,
    config: globalConfig,
  })

  const existingGlobal = await db.query[tableName].findFirst({})

  const result = await upsertRow<T>({
    ...(existingGlobal ? { id: existingGlobal.id, operation: 'update' } : { operation: 'create' }),
    adapter: this,
    data,
    db,
    fields: globalConfig.fields,
    req,
    tableName,
  })

  return result
}
