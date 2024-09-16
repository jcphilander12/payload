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
    'blocks-fields': BlocksField;
    'nested-arrays': NestedArray;
    'nested-field-tables': NestedFieldTable;
    users: User;
    'localized-posts': LocalizedPost;
    'array-fields': ArrayField;
    'localized-required': LocalizedRequired;
    'with-localized-relationship': WithLocalizedRelationship;
    'relationship-localized': RelationshipLocalized;
    dummy: Dummy;
    nested: Nested;
    groups: Group;
    tabs: Tab;
    'localized-sort': LocalizedSort;
    'blocks-same-name': BlocksSameName;
    'localized-within-localized': LocalizedWithinLocalized;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'global-array': GlobalArray;
  };
  locale: 'en' | 'es' | 'pt' | 'ar' | 'hu';
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
 * via the `definition` "blocks-fields".
 */
export interface BlocksField {
  id: string;
  content?:
    | {
        content?:
          | {
              text?: string | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'textBlock';
            }[]
          | null;
        array?:
          | {
              link?: {
                label?: string | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'blockInsideBlock';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nested-arrays".
 */
export interface NestedArray {
  id: string;
  arrayWithBlocks?:
    | {
        blocksWithinArray?:
          | {
              relationWithinBlock?: (string | null) | LocalizedPost;
              myGroup?: {
                text?: string | null;
              };
              id?: string | null;
              blockName?: string | null;
              blockType: 'someBlock';
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  arrayWithLocalizedRelation?:
    | {
        localizedRelation?: (string | null) | LocalizedPost;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "localized-posts".
 */
export interface LocalizedPost {
  id: string;
  title?: string | null;
  description?: string | null;
  localizedDescription?: string | null;
  localizedCheckbox?: boolean | null;
  children?: (string | LocalizedPost)[] | null;
  group?: {
    children?: string | null;
  };
  unique?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nested-field-tables".
 */
export interface NestedFieldTable {
  id: string;
  array?:
    | {
        relation?: {
          relationTo: 'localized-posts';
          value: string | LocalizedPost;
        } | null;
        hasManyRelation?: (string | LocalizedPost)[] | null;
        hasManyPolyRelation?:
          | {
              relationTo: 'localized-posts';
              value: string | LocalizedPost;
            }[]
          | null;
        select?: ('one' | 'two' | 'three')[] | null;
        number?: number[] | null;
        text?: string[] | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  relation?: (string | null) | LocalizedPost;
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
 * via the `definition` "array-fields".
 */
export interface ArrayField {
  id: string;
  items?:
    | {
        text: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "localized-required".
 */
export interface LocalizedRequired {
  id: string;
  title: string;
  layout: (
    | {
        text?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'text';
      }
    | {
        number?: number | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'number';
      }
  )[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "with-localized-relationship".
 */
export interface WithLocalizedRelationship {
  id: string;
  localizedRelationship?: (string | null) | LocalizedPost;
  localizedRelationHasManyField?: (string | LocalizedPost)[] | null;
  localizedRelationMultiRelationTo?:
    | ({
        relationTo: 'localized-posts';
        value: string | LocalizedPost;
      } | null)
    | ({
        relationTo: 'dummy';
        value: string | Dummy;
      } | null);
  localizedRelationMultiRelationToHasMany?:
    | (
        | {
            relationTo: 'localized-posts';
            value: string | LocalizedPost;
          }
        | {
            relationTo: 'dummy';
            value: string | Dummy;
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "dummy".
 */
export interface Dummy {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relationship-localized".
 */
export interface RelationshipLocalized {
  id: string;
  relationship?: (string | null) | LocalizedPost;
  relationshipHasMany?: (string | LocalizedPost)[] | null;
  relationMultiRelationTo?:
    | ({
        relationTo: 'localized-posts';
        value: string | LocalizedPost;
      } | null)
    | ({
        relationTo: 'dummy';
        value: string | Dummy;
      } | null);
  relationMultiRelationToHasMany?:
    | (
        | {
            relationTo: 'localized-posts';
            value: string | LocalizedPost;
          }
        | {
            relationTo: 'dummy';
            value: string | Dummy;
          }
      )[]
    | null;
  arrayField?:
    | {
        nestedRelation?: (string | null) | LocalizedPost;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nested".
 */
export interface Nested {
  id: string;
  blocks?:
    | {
        array?:
          | {
              text?: string | null;
              textNotLocalized?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'block';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "groups".
 */
export interface Group {
  id: string;
  groupLocalized?: {
    title?: string | null;
  };
  group?: {
    title?: string | null;
  };
  deep?: {
    array?:
      | {
          title?: string | null;
          id?: string | null;
        }[]
      | null;
    blocks?:
      | {
          title?: string | null;
          id?: string | null;
          blockName?: string | null;
          blockType: 'first';
        }[]
      | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tabs".
 */
export interface Tab {
  id: string;
  tabLocalized?: {
    title?: string | null;
  };
  tab?: {
    title?: string | null;
  };
  deep?: {
    array?:
      | {
          title?: string | null;
          id?: string | null;
        }[]
      | null;
    blocks?:
      | {
          title?: string | null;
          id?: string | null;
          blockName?: string | null;
          blockType: 'first';
        }[]
      | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "localized-sort".
 */
export interface LocalizedSort {
  id: string;
  title?: string | null;
  date?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blocks-same-name".
 */
export interface BlocksSameName {
  id: string;
  blocks?:
    | (
        | {
            title?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'block_first';
          }
        | {
            title?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'block_second';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "localized-within-localized".
 */
export interface LocalizedWithinLocalized {
  id: string;
  myTab?: {
    shouldNotBeLocalized?: string | null;
  };
  myArray?:
    | {
        shouldNotBeLocalized?: string | null;
        id?: string | null;
      }[]
    | null;
  myBlocks?:
    | {
        shouldNotBeLocalized?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'myBlock';
      }[]
    | null;
  myGroup?: {
    shouldNotBeLocalized?: string | null;
  };
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
 * via the `definition` "global-array".
 */
export interface GlobalArray {
  id: string;
  array?:
    | {
        text?: string | null;
        id?: string | null;
      }[]
    | null;
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