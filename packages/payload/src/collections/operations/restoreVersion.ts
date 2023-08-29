/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status'

import type { FindOneArgs } from '../../database/types.js'
import type { PayloadRequest } from '../../express/types.js'
import type { Collection, TypeWithID } from '../config/types.js'

import executeAccess from '../../auth/executeAccess.js'
import { hasWhereAccessResult } from '../../auth/types.js'
import { combineQueries } from '../../database/combineQueries.js'
import { APIError, Forbidden, NotFound } from '../../errors/index.js'
import { afterChange } from '../../fields/hooks/afterChange/index.js'
import { afterRead } from '../../fields/hooks/afterRead/index.js'
import { initTransaction } from '../../utilities/initTransaction.js'
import { killTransaction } from '../../utilities/killTransaction.js'
import { getLatestCollectionVersion } from '../../versions/getLatestCollectionVersion.js'

export type Arguments = {
  collection: Collection
  currentDepth?: number
  depth?: number
  disableErrors?: boolean
  id: number | string
  overrideAccess?: boolean
  req: PayloadRequest
  showHiddenFields?: boolean
}

async function restoreVersion<T extends TypeWithID = any>(args: Arguments): Promise<T> {
  const {
    collection: { config: collectionConfig },
    depth,
    id,
    overrideAccess = false,
    req,
    req: { locale, payload, t },
    showHiddenFields,
  } = args

  try {
    const shouldCommit = await initTransaction(req)

    if (!id) {
      throw new APIError('Missing ID of version to restore.', httpStatus.BAD_REQUEST)
    }

    // /////////////////////////////////////
    // Retrieve original raw version
    // /////////////////////////////////////

    const { docs: versionDocs } = await req.payload.db.findVersions({
      collection: collectionConfig.slug,
      limit: 1,
      locale,
      req,
      where: { id: { equals: id } },
    })

    const [rawVersion] = versionDocs

    if (!rawVersion) {
      throw new NotFound(t)
    }

    const parentDocID = rawVersion.parent

    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////

    const accessResults = !overrideAccess
      ? await executeAccess({ id: parentDocID, req }, collectionConfig.access.update)
      : true
    const hasWherePolicy = hasWhereAccessResult(accessResults)

    // /////////////////////////////////////
    // Retrieve document
    // /////////////////////////////////////

    const findOneArgs: FindOneArgs = {
      collection: collectionConfig.slug,
      locale,
      req,
      where: combineQueries({ id: { equals: parentDocID } }, accessResults),
    }

    const doc = await req.payload.db.findOne(findOneArgs)

    if (!doc && !hasWherePolicy) throw new NotFound(t)
    if (!doc && hasWherePolicy) throw new Forbidden(t)

    // /////////////////////////////////////
    // fetch previousDoc
    // /////////////////////////////////////

    const prevDocWithLocales = await getLatestCollectionVersion({
      config: collectionConfig,
      id: parentDocID,
      payload,
      query: findOneArgs,
      req,
    })

    // /////////////////////////////////////
    // Update
    // /////////////////////////////////////

    let result = await req.payload.db.updateOne({
      collection: collectionConfig.slug,
      data: rawVersion.version,
      id: parentDocID,
      req,
    })

    // /////////////////////////////////////
    // Save `previousDoc` as a version after restoring
    // /////////////////////////////////////

    const prevVersion = { ...prevDocWithLocales }

    delete prevVersion.id

    await payload.db.createVersion({
      autosave: false,
      collectionSlug: collectionConfig.slug,
      createdAt: prevVersion.createdAt,
      parent: parentDocID,
      req,
      updatedAt: new Date().toISOString(),
      versionData: rawVersion.version,
    })

    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////

    result = await afterRead({
      context: req.context,
      depth,
      doc: result,
      entityConfig: collectionConfig,
      overrideAccess,
      req,
      showHiddenFields,
    })

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
      await priorHook

      result =
        (await hook({
          context: req.context,
          doc: result,
          req,
        })) || result
    }, Promise.resolve())

    // /////////////////////////////////////
    // afterChange - Fields
    // /////////////////////////////////////

    result = await afterChange({
      context: req.context,
      data: result,
      doc: result,
      entityConfig: collectionConfig,
      operation: 'update',
      previousDoc: prevDocWithLocales,
      req,
    })

    // /////////////////////////////////////
    // afterChange - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterChange.reduce(async (priorHook, hook) => {
      await priorHook

      result =
        (await hook({
          context: req.context,
          doc: result,
          operation: 'update',
          previousDoc: prevDocWithLocales,
          req,
        })) || result
    }, Promise.resolve())

    if (shouldCommit) await payload.db.commitTransaction(req.transactionID)

    return result
  } catch (error: unknown) {
    await killTransaction(req)
    throw error
  }
}

export default restoreVersion
