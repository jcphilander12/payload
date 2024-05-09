/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    pages: Page;
    posts: Post;
    'posts-ssr': PostsSsr;
    tenants: Tenant;
    categories: Category;
    media: Media;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
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
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  slug: string;
  tenant?: (string | null) | Tenant;
  title: string;
  hero: {
    type: 'none' | 'highImpact' | 'lowImpact';
    richText?:
      | {
          [k: string]: unknown;
        }[]
      | null;
    media?: string | Media | null;
  };
  layout?:
    | (
        | {
            invertBackground?: boolean | null;
            richText?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            links?:
              | {
                  link: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?:
                      | ({
                          relationTo: 'posts';
                          value: string | Post;
                        } | null)
                      | ({
                          relationTo: 'pages';
                          value: string | Page;
                        } | null);
                    url?: string | null;
                    label: string;
                    appearance?: ('primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
        | {
            invertBackground?: boolean | null;
            columns?:
              | {
                  size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
                  richText?:
                    | {
                        [k: string]: unknown;
                      }[]
                    | null;
                  enableLink?: boolean | null;
                  link?: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?:
                      | ({
                          relationTo: 'posts';
                          value: string | Post;
                        } | null)
                      | ({
                          relationTo: 'pages';
                          value: string | Page;
                        } | null);
                    url?: string | null;
                    label: string;
                    appearance?: ('default' | 'primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            invertBackground?: boolean | null;
            position?: ('default' | 'fullscreen') | null;
            media: string | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            introContent?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            populateBy?: ('collection' | 'selection') | null;
            relationTo?: 'posts' | null;
            categories?: (string | Category)[] | null;
            limit?: number | null;
            selectedDocs?:
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }[]
              | null;
            populatedDocs?:
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }[]
              | null;
            populatedDocsTotal?: number | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'archive';
          }
      )[]
    | null;
  richTextSlate?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  richTextLexical?: {
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
  relationshipAsUpload?: string | Media | null;
  relationshipMonoHasOne?: (string | null) | Post;
  relationshipMonoHasMany?: (string | Post)[] | null;
  relationshipPolyHasOne?: {
    relationTo: 'posts';
    value: string | Post;
  } | null;
  relationshipPolyHasMany?:
    | {
        relationTo: 'posts';
        value: string | Post;
      }[]
    | null;
  arrayOfRelationships?:
    | {
        uploadInArray?: string | Media | null;
        richTextInArray?: {
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
        relationshipInArrayMonoHasOne?: (string | null) | Post;
        relationshipInArrayMonoHasMany?: (string | Post)[] | null;
        relationshipInArrayPolyHasOne?: {
          relationTo: 'posts';
          value: string | Post;
        } | null;
        relationshipInArrayPolyHasMany?:
          | {
              relationTo: 'posts';
              value: string | Post;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  tab: {
    relationshipInTab?: (string | null) | Post;
  };
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenants".
 */
export interface Tenant {
  id: string;
  title: string;
  clientURL: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
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
  slug: string;
  tenant?: (string | null) | Tenant;
  title: string;
  hero: {
    type: 'none' | 'highImpact' | 'lowImpact';
    richText?:
      | {
          [k: string]: unknown;
        }[]
      | null;
    media?: string | Media | null;
  };
  layout?:
    | (
        | {
            invertBackground?: boolean | null;
            richText?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            links?:
              | {
                  link: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?:
                      | ({
                          relationTo: 'posts';
                          value: string | Post;
                        } | null)
                      | ({
                          relationTo: 'pages';
                          value: string | Page;
                        } | null);
                    url?: string | null;
                    label: string;
                    appearance?: ('primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
        | {
            invertBackground?: boolean | null;
            columns?:
              | {
                  size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
                  richText?:
                    | {
                        [k: string]: unknown;
                      }[]
                    | null;
                  enableLink?: boolean | null;
                  link?: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?:
                      | ({
                          relationTo: 'posts';
                          value: string | Post;
                        } | null)
                      | ({
                          relationTo: 'pages';
                          value: string | Page;
                        } | null);
                    url?: string | null;
                    label: string;
                    appearance?: ('default' | 'primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            invertBackground?: boolean | null;
            position?: ('default' | 'fullscreen') | null;
            media: string | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            introContent?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            populateBy?: ('collection' | 'selection') | null;
            relationTo?: 'posts' | null;
            categories?: (string | Category)[] | null;
            limit?: number | null;
            selectedDocs?:
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }[]
              | null;
            populatedDocs?:
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }[]
              | null;
            populatedDocsTotal?: number | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'archive';
          }
      )[]
    | null;
  relatedPosts?: (string | Post)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts-ssr".
 */
export interface PostsSsr {
  id: string;
  slug: string;
  tenant?: (string | null) | Tenant;
  title: string;
  hero: {
    type: 'none' | 'highImpact' | 'lowImpact';
    richText?:
      | {
          [k: string]: unknown;
        }[]
      | null;
    media?: string | Media | null;
  };
  layout?:
    | (
        | {
            invertBackground?: boolean | null;
            richText?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            links?:
              | {
                  link: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?:
                      | ({
                          relationTo: 'posts';
                          value: string | Post;
                        } | null)
                      | ({
                          relationTo: 'pages';
                          value: string | Page;
                        } | null);
                    url?: string | null;
                    label: string;
                    appearance?: ('primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
        | {
            invertBackground?: boolean | null;
            columns?:
              | {
                  size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
                  richText?:
                    | {
                        [k: string]: unknown;
                      }[]
                    | null;
                  enableLink?: boolean | null;
                  link?: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?:
                      | ({
                          relationTo: 'posts';
                          value: string | Post;
                        } | null)
                      | ({
                          relationTo: 'pages';
                          value: string | Page;
                        } | null);
                    url?: string | null;
                    label: string;
                    appearance?: ('default' | 'primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            invertBackground?: boolean | null;
            position?: ('default' | 'fullscreen') | null;
            media: string | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            introContent?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            populateBy?: ('collection' | 'selection') | null;
            relationTo?: 'posts' | null;
            categories?: (string | Category)[] | null;
            limit?: number | null;
            selectedDocs?:
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }[]
              | null;
            populatedDocs?:
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }[]
              | null;
            populatedDocsTotal?: number | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'archive';
          }
      )[]
    | null;
  relatedPosts?: (string | Post)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
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
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'posts';
                value: string | Post;
              } | null)
            | ({
                relationTo: 'pages';
                value: string | Page;
              } | null);
          url?: string | null;
          label: string;
          appearance?: ('default' | 'primary' | 'secondary') | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'posts';
                value: string | Post;
              } | null)
            | ({
                relationTo: 'pages';
                value: string | Page;
              } | null);
          url?: string | null;
          label: string;
          appearance?: ('default' | 'primary' | 'secondary') | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
 // @ts-ignore 
 export interface GeneratedTypes extends Config {}
}