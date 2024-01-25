import type { Validate } from 'payload/types'
import type { Row } from '../Form/types'

export type Options = {
  disableFormData?: boolean
  hasRows?: boolean
  validate?: Validate
}

export type FieldType<T> = {
  errorMessage?: string
  formProcessing: boolean
  formSubmitted: boolean
  initialValue?: T
  rows?: Row[]
  setValue: (val: unknown, modifyForm?: boolean) => void
  showError: boolean
  valid?: boolean
  value: T
  path: string
}
