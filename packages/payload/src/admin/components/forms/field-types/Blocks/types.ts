import type { FieldTypes } from '..'
import type { FieldPermissions } from '../../../../../auth/types'
import type { BlockField } from '../../../../../fields/config/types'

export type Props = Omit<BlockField, 'type'> & {
  fieldTypes: FieldTypes
  indexPath: string
  path?: string
  permissions: FieldPermissions
}
