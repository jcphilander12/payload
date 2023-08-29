/* eslint-disable no-param-reassign */
import type { Response } from 'express';
import type { Config as GeneratedTypes } from 'payload/generated-types';
import type { MarkOptional } from 'ts-essentials';

import type { PayloadRequest } from '../../../express/types.js';
import type { Collection } from '../../config/types.js';

import create from '../../operations/create.js';

export type Resolver<TSlug extends keyof GeneratedTypes['collections']> = (_: unknown, args: {
  data: MarkOptional<GeneratedTypes['collections'][TSlug], 'createdAt' | 'id' | 'sizes' | 'updatedAt'>,
  draft: boolean
  locale?: string
},
  context: {
    req: PayloadRequest,
    res: Response
  }
) => Promise<GeneratedTypes['collections'][TSlug]>

export default function createResolver<TSlug extends keyof GeneratedTypes['collections']>(
  collection: Collection,
): Resolver<TSlug> {
  return async function resolver(_, args, context) {
    if (args.locale) {
      context.req.locale = args.locale;
    }

    const options = {
      collection,
      data: args.data,
      depth: 0,
      draft: args.draft,
      req: context.req,
    };

    const result = await create(options);

    return result;
  };
}
