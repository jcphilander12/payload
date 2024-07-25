import type { FormFieldBase, TextareaField as TextareaFieldType } from 'payload'

import { type ChangeEvent } from 'react'

export type TextareaFieldProps = {
  maxLength?: number
  minLength?: number
  name?: string
  path?: string
  placeholder?: TextareaFieldType['admin']['placeholder']
  rows?: number
  width?: string
} & FormFieldBase

export type TextAreaInputProps = {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  showError?: boolean
  value?: string
} & TextareaFieldProps
