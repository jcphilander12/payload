import type { Block, BlockField } from '../../fields/config/types.js'
import type { FieldMap } from '../forms/FieldMap.js'
import type { FormFieldBase } from '../types.js'

export type BlocksFieldProps = {
  blocks?: ReducedBlock[]
  forceRender?: boolean
  isSortable?: boolean
  labels?: BlockField['labels']
  maxRows?: number
  minRows?: number
  name?: string
  slug?: string
  width?: string
} & FormFieldBase

export type ReducedBlock = {
  LabelComponent: Block['admin']['components']['Label']
  custom?: Record<any, string>
  fieldMap: FieldMap
  imageAltText?: string
  imageURL?: string
  labels: BlockField['labels']
  slug: string
}
