import type { FieldTypes } from '..';
import type { FieldPermissions } from '../../../../../auth/types';
import type { RowField } from '../../../../../fields/config/types';

export type Props = Omit<RowField, 'type'> & {
  fieldTypes: FieldTypes
  indexPath: string
  path?: string
  permissions: FieldPermissions
}
