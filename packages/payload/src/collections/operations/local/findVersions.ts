import type { Config as GeneratedTypes } from 'payload/generated-types';

import type { PaginatedDocs } from '../../../database/types.js';
import type { PayloadRequest, RequestContext } from '../../../express/types.js';
import type { Payload } from '../../../payload.js';
import type { Document, Where } from '../../../types/index.js';
import type { TypeWithVersion } from '../../../versions/types.js';

import { APIError } from '../../../errors/index.js';
import { setRequestContext } from '../../../express/setRequestContext.js';
import { i18nInit } from '../../../translations/init.js';
import { getDataLoader } from '../../dataloader.js';
import findVersions from '../findVersions.js';

export type Options<T extends keyof GeneratedTypes['collections']> = {
  collection: T
  /**
   * context, which will then be passed to req.context, which can be read by hooks
   */
  context?: RequestContext,
  depth?: number
  draft?: boolean
  fallbackLocale?: string
  limit?: number
  locale?: string
  overrideAccess?: boolean
  page?: number
  showHiddenFields?: boolean
  sort?: string
  user?: Document
  where?: Where
}

export default async function findVersionsLocal<T extends keyof GeneratedTypes['collections']>(
  payload: Payload,
  options: Options<T>,
): Promise<PaginatedDocs<TypeWithVersion<GeneratedTypes['collections'][T]>>> {
  const {
    collection: collectionSlug,
    context,
    depth,
    fallbackLocale = null,
    limit,
    locale = null,
    overrideAccess = true,
    page,
    showHiddenFields,
    sort,
    user,
    where,
  } = options;

  const collection = payload.collections[collectionSlug];
  const defaultLocale = payload?.config?.localization ? payload?.config?.localization?.defaultLocale : null;

  if (!collection) {
    throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Find Versions Operation.`);
  }

  const i18n = i18nInit(payload.config.i18n);
  const req = {
    fallbackLocale: fallbackLocale ?? defaultLocale,
    i18n,
    locale: locale ?? defaultLocale,
    payload,
    payloadAPI: 'local',
    user,
  } as PayloadRequest;
  setRequestContext(req, context);

  if (!req.t) req.t = req.i18n.t;
  if (!req.payloadDataLoader) req.payloadDataLoader = getDataLoader(req);

  return findVersions({
    collection,
    depth,
    limit,
    overrideAccess,
    page,
    req,
    showHiddenFields,
    sort,
    where,
  });
}
