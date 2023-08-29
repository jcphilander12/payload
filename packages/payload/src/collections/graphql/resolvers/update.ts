/* eslint-disable no-param-reassign */
import type { Response } from 'express';
import type { Config as GeneratedTypes } from 'payload/generated-types';

import type { PayloadRequest } from '../../../express/types.js';
import type { Collection } from '../../config/types.js';

import updateByID from '../../operations/updateByID.js';

export type Resolver<TSlug extends keyof GeneratedTypes['collections']> = (_: unknown, args: {
  autosave: boolean
  data: GeneratedTypes['collections'][TSlug]
  draft: boolean
  id: number | string
  locale?: string
},
  context: {
    req: PayloadRequest,
    res: Response
  }
) => Promise<GeneratedTypes['collections'][TSlug]>

export default function updateResolver<TSlug extends keyof GeneratedTypes['collections']>(
  collection: Collection,
): Resolver<TSlug> {
  async function resolver(_, args, context) {
    if (args.locale) context.req.locale = args.locale;
    if (args.fallbackLocale) context.req.fallbackLocale = args.fallbackLocale;

    const options = {
      autosave: args.autosave,
      collection,
      data: args.data,
      depth: 0,
      draft: args.draft,
      id: args.id,
      req: context.req,
    };

    const result = await updateByID<TSlug>(options);

    return result;
  }

  return resolver;
}
