import type { GlobalConfig } from '../../../../src/globals/config/types.js';

export const menuSlug = 'menu';

export const MenuGlobal: GlobalConfig = {
  slug: menuSlug,
  fields: [
    {
      name: 'globalText',
      type: 'text',
    },
  ],
};
