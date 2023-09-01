import type { Config as GeneratedTypes } from 'payload/generated-types';

import type { PayloadRequest } from '../../express/types';
import type { Document } from '../../types';
import type { BeforeOperationHook, Collection } from '../config/types';

import executeAccess from '../../auth/executeAccess';
import { hasWhereAccessResult } from '../../auth/types';
import { combineQueries } from '../../database/combineQueries';
import { Forbidden, NotFound } from '../../errors';
import { afterRead } from '../../fields/hooks/afterRead';
import { deleteUserPreferences } from '../../preferences/deleteUserPreferences';
import { deleteAssociatedFiles } from '../../uploads/deleteAssociatedFiles';
import { initTransaction } from '../../utilities/initTransaction';
import { killTransaction } from '../../utilities/killTransaction';
import { deleteCollectionVersions } from '../../versions/deleteCollectionVersions';
import { buildAfterOperation } from './utils';

export type Arguments = {
  collection: Collection
  depth?: number
  id: number | string
  overrideAccess?: boolean
  req: PayloadRequest
  showHiddenFields?: boolean
}

async function deleteByID<TSlug extends keyof GeneratedTypes['collections']>(incomingArgs: Arguments): Promise<Document> {
  let args = incomingArgs;

  // /////////////////////////////////////
  // beforeOperation - Collection
  // /////////////////////////////////////

  await args.collection.config.hooks.beforeOperation.reduce(async (priorHook: BeforeOperationHook | Promise<void>, hook: BeforeOperationHook) => {
    await priorHook;

    args = (await hook({
      args,
      context: args.req.context,
      operation: 'delete',
    })) || args;
  }, Promise.resolve());

  const {
    collection: {
      config: collectionConfig,
    },
    depth,
    id,
    overrideAccess,
    req: {
      payload: {
        config,
      },
      payload,
      t,
    },
    req,
    showHiddenFields,
  } = args;

  try {
    const shouldCommit = await initTransaction(req);

    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////

    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook: BeforeOperationHook | Promise<void>, hook: BeforeOperationHook) => {
      await priorHook;

      args = (await hook({
        args,
        context: req.context,
        operation: 'delete',
      })) || args;
    }, Promise.resolve());

    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////

    const accessResults = !overrideAccess ? await executeAccess({ id, req }, collectionConfig.access.delete) : true;
    const hasWhereAccess = hasWhereAccessResult(accessResults);

    // /////////////////////////////////////
    // beforeDelete - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.beforeDelete.reduce(async (priorHook, hook) => {
      await priorHook;

      return hook({
        context: req.context,
        id,
        req,
      });
    }, Promise.resolve());

    // /////////////////////////////////////
    // Retrieve document
    // /////////////////////////////////////

    const docToDelete = await req.payload.db.findOne({
      collection: collectionConfig.slug,
      locale: req.locale,
      req,
      where: combineQueries({ id: { equals: id } }, accessResults),
    });


    if (!docToDelete && !hasWhereAccess) throw new NotFound(t);
    if (!docToDelete && hasWhereAccess) throw new Forbidden(t);


    await deleteAssociatedFiles({ collectionConfig, config, doc: docToDelete, overrideDelete: true, t });

    // /////////////////////////////////////
    // Delete document
    // /////////////////////////////////////


    let result = await req.payload.db.deleteOne({
      collection: collectionConfig.slug,
      req,
      where: { id: { equals: id } },
    });


    // /////////////////////////////////////
    // Delete Preferences
    // /////////////////////////////////////

    deleteUserPreferences({
      collectionConfig,
      ids: [id],
      payload,
      req,
    });

    // /////////////////////////////////////
    // Delete versions
    // /////////////////////////////////////

    if (collectionConfig.versions) {
      deleteCollectionVersions({
        id,
        payload,
        req,
        slug: collectionConfig.slug,
      });
    }

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
    });

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
      await priorHook;

      result = await hook({
        context: req.context,
        doc: result,
        req,
      }) || result;
    }, Promise.resolve());

    // /////////////////////////////////////
    // afterDelete - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterDelete.reduce(async (priorHook, hook) => {
      await priorHook;

      result = await hook({
        context: req.context,
        doc: result,
        id,
        req,
      }) || result;
    }, Promise.resolve());

    // /////////////////////////////////////
    // afterOperation - Collection
    // /////////////////////////////////////

    result = await buildAfterOperation<GeneratedTypes['collections'][TSlug]>({
      args,
      operation: 'deleteByID',
      result,
    });

    // /////////////////////////////////////
    // 8. Return results
    // /////////////////////////////////////

    if (shouldCommit) await payload.db.commitTransaction(req.transactionID);

    return result;
  } catch (error: unknown) {
    await killTransaction(req);
    throw error;
  }
}

export default deleteByID;
