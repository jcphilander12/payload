/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    posts: Post;
    point: Point;
    relation: Relation;
    dummy: Dummy;
    'custom-id': CustomId;
    'custom-id-number': CustomIdNumber;
    'error-on-hooks': ErrorOnHook;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
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
  fakeLocalization?: string | null;
  relationField?: (string | null) | Relation;
  relationHasManyField?: (string | Relation)[] | null;
  relationMultiRelationTo?:
    | ({
        relationTo: 'relation';
        value: string | Relation;
      } | null)
    | ({
        relationTo: 'dummy';
        value: string | Dummy;
      } | null);
  relationMultiRelationToHasMany?:
    | (
        | {
            relationTo: 'relation';
            value: string | Relation;
          }
        | {
            relationTo: 'dummy';
            value: string | Dummy;
          }
      )[]
    | null;
  restrictedField?: string | null;
  D1: {
    D2?: {
      D3?: {
        D4?: string | null;
      };
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relation".
 */
export interface Relation {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "dummy".
 */
export interface Dummy {
  id: string;
  title?: string | null;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "point".
 */
export interface Point {
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
 * via the `definition` "custom-id".
 */
export interface CustomId {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-id-number".
 */
export interface CustomIdNumber {
  id: number;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "error-on-hooks".
 */
export interface ErrorOnHook {
  id: string;
  text?: string | null;
  errorBeforeChange?: boolean | null;
  errorAfterDelete?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
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


declare module 'payload' {
  // @ts-ignore 
  export interface GeneratedTypes extends Config {}
}