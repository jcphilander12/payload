import type { Field } from '../../fields/config/types.js';

export default [
  {
    defaultValue: 0,
    hidden: true,
    name: 'loginAttempts',
    type: 'number',
  },
  {
    hidden: true,
    name: 'lockUntil',
    type: 'date',
  },
] as Field[];
