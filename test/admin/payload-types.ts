/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    uploads: Upload;
    posts: Post;
    users: User;
    'hidden-collection': HiddenCollection;
    'collection-no-api-view': CollectionNoApiView;
    'custom-views-one': CustomViewsOne;
    'custom-views-two': CustomViewsTwo;
    'group-one-collection-ones': GroupOneCollectionOne;
    'group-one-collection-twos': GroupOneCollectionTwo;
    'group-two-collection-ones': GroupTwoCollectionOne;
    'group-two-collection-twos': GroupTwoCollectionTwo;
    geo: Geo;
    customIdTab: CustomIdTab;
    customIdRow: CustomIdRow;
    'disable-duplicate': DisableDuplicate;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    'hidden-global': HiddenGlobal;
    'global-no-api-view': GlobalNoApiView;
    global: Global;
    'custom-global-views-one': CustomGlobalViewsOne;
    'custom-global-views-two': CustomGlobalViewsTwo;
    'group-globals-one': GroupGlobalsOne;
    'group-globals-two': GroupGlobalsTwo;
  };
  locale: 'es' | 'en';
  user: User & {
    collection: 'users';
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "uploads".
 */
export interface Upload {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string;
  title?: string | null;
  description?: string | null;
  number?: number | null;
  richText?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  group?: {
    title?: string | null;
  };
  relationship?: (string | null) | Post;
  customCell?: string | null;
  sidebarField?: string | null;
  descriptionAsString?: string | null;
  descriptionAsFunction?: string | null;
  descriptionAsComponent?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  textField?: string | null;
  sidebarField?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hidden-collection".
 */
export interface HiddenCollection {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "collection-no-api-view".
 */
export interface CollectionNoApiView {
  id: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-views-one".
 */
export interface CustomViewsOne {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-views-two".
 */
export interface CustomViewsTwo {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "group-one-collection-ones".
 */
export interface GroupOneCollectionOne {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "group-one-collection-twos".
 */
export interface GroupOneCollectionTwo {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "group-two-collection-ones".
 */
export interface GroupTwoCollectionOne {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "group-two-collection-twos".
 */
export interface GroupTwoCollectionTwo {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "geo".
 */
export interface Geo {
  id: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  point?: [number, number] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customIdTab".
 */
export interface CustomIdTab {
  id: string | null;
  title?: string | null;
  description?: string | null;
  number?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customIdRow".
 */
export interface CustomIdRow {
  id: string | null;
  title?: string | null;
  description?: string | null;
  number?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "disable-duplicate".
 */
export interface DisableDuplicate {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hidden-global".
 */
export interface HiddenGlobal {
  id: string;
  title?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "global-no-api-view".
 */
export interface GlobalNoApiView {
  id: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "global".
 */
export interface Global {
  id: string;
  title?: string | null;
  sidebarField?: string | null;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-global-views-one".
 */
export interface CustomGlobalViewsOne {
  id: string;
  title?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-global-views-two".
 */
export interface CustomGlobalViewsTwo {
  id: string;
  title?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "group-globals-one".
 */
export interface GroupGlobalsOne {
  id: string;
  title?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "group-globals-two".
 */
export interface GroupGlobalsTwo {
  id: string;
  title?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
 // @ts-ignore 
 export interface GeneratedTypes extends Config {}
}