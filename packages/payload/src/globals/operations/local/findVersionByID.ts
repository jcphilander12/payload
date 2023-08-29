import type { Config as GeneratedTypes } from 'payload/generated-types';

import type { PayloadRequest } from '../../../express/types.js';
import type { Payload } from '../../../payload.js';
import type { Document } from '../../../types/index.js';
import type { TypeWithVersion } from '../../../versions/types.js';

import { getDataLoader } from '../../../collections/dataloader.js';
import { APIError } from '../../../errors/index.js';
import { setRequestContext } from '../../../express/setRequestContext.js';
import { i18nInit } from '../../../translations/init.js';
import findVersionByID from '../findVersionByID.js';

export type Options<T extends keyof GeneratedTypes['globals']> = {
  depth?: number
  disableErrors?: boolean
  fallbackLocale?: string
  id: string
  locale?: string
  overrideAccess?: boolean
  showHiddenFields?: boolean
  slug: T
  user?: Document
}

export default async function findVersionByIDLocal<T extends keyof GeneratedTypes['globals']>(
  payload: Payload,
  options: Options<T>,
): Promise<TypeWithVersion<GeneratedTypes['globals'][T]>> {
  const {
    depth,
    disableErrors = false,
    fallbackLocale = null,
    id,
    locale = payload.config.localization ? payload.config.localization?.defaultLocale : null,
    overrideAccess = true,
    showHiddenFields,
    slug: globalSlug,
    user,
  } = options;

  const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug);
  const i18n = i18nInit(payload.config.i18n);

  if (!globalConfig) {
    throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`);
  }

  const req = {
    fallbackLocale,
    i18n,
    locale,
    payload,
    payloadAPI: 'local',
    t: i18n.t,
    user,
  } as PayloadRequest;
  setRequestContext(req);

  if (!req.payloadDataLoader) req.payloadDataLoader = getDataLoader(req);

  return findVersionByID({
    depth,
    disableErrors,
    globalConfig,
    id,
    overrideAccess,
    req,
    showHiddenFields,
  });
}
