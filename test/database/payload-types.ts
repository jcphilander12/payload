/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    posts: Post;
    'default-values': DefaultValue;
    'relation-a': RelationA;
    'relation-b': RelationB;
    'pg-migrations': PgMigration;
    'custom-schema': CustomSchema;
    'json-store': JsonStore;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    global: Global;
  };
  locale: 'en' | 'es';
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string;
  title: string;
  throwAfterChange?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "default-values".
 */
export interface DefaultValue {
  id: string;
  title?: string | null;
  defaultValue?: string | null;
  array?:
    | {
        defaultValue?: string | null;
        id?: string | null;
      }[]
    | null;
  group?: {
    defaultValue?: string | null;
  };
  select?: ('option0' | 'option1' | 'default') | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relation-a".
 */
export interface RelationA {
  id: string;
  title?: string | null;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relation-b".
 */
export interface RelationB {
  id: string;
  title?: string | null;
  relationship?: (string | null) | RelationA;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pg-migrations".
 */
export interface PgMigration {
  id: string;
  relation1?: (string | null) | RelationA;
  myArray?:
    | {
        relation2?: (string | null) | RelationB;
        mySubArray?:
          | {
              relation3?: (string | null) | RelationB;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  myGroup?: {
    relation4?: (string | null) | RelationB;
  };
  myBlocks?:
    | {
        relation5?: (string | null) | RelationA;
        relation6?: (string | null) | RelationB;
        id?: string | null;
        blockName?: string | null;
        blockType: 'myBlock';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-schema".
 */
export interface CustomSchema {
  id: string;
  text?: string | null;
  localizedText?: string | null;
  relationship?: (string | RelationA)[] | null;
  select?: ('a' | 'b' | 'c')[] | null;
  radio?: ('a' | 'b' | 'c') | null;
  array?:
    | {
        text?: string | null;
        localizedText?: string | null;
        id?: string | null;
      }[]
    | null;
  blocks?:
    | {
        text?: string | null;
        localizedText?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'block';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "json-store".
 */
export interface JsonStore {
  id: string;
  textMany?: string[] | null;
  numberMany?: number[] | null;
  selectMany?: 'x'[] | null;
  array?:
    | {
        id?: string | null;
      }[]
    | null;
  blocks?:
    | {
        id?: string | null;
        blockName?: string | null;
        blockType: 'test-block';
      }[]
    | null;
  tab?: {
    text?: string | null;
  };
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "global".
 */
export interface Global {
  id: string;
  text?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  // @ts-ignore 
  export interface GeneratedTypes extends Config {}
}