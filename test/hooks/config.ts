import path from 'path';
import { buildConfig } from '../buildConfig';
import TransformHooks from './collections/Transform';
import Hooks, { hooksSlug } from './collections/Hook';
import NestedAfterReadHooks from './collections/NestedAfterReadHooks';
import Relations from './collections/Relations';

export default buildConfig({
  admin: {
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          fs: path.resolve(__dirname, './mocks/emptyModule.js'),
        },
      },
    }),
  },
  collections: [
    TransformHooks,
    Hooks,
    NestedAfterReadHooks,
    Relations,
  ],
  onInit: async (payload) => {
    await payload.create({
      collection: hooksSlug,
      data: {
        check: 'update',
        fieldBeforeValidate: false,
        collectionBeforeValidate: false,
        fieldBeforeChange: false,
        collectionBeforeChange: false,
        fieldAfterChange: false,
        collectionAfterChange: false,
        collectionBeforeRead: false,
        fieldAfterRead: false,
        collectionAfterRead: false,
      },
    });
  },
});
