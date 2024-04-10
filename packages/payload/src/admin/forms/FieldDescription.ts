import type React from 'react'

import type { ComponentWithServerProps, LabelFunction } from '../../config/types.js'
import type { Payload } from '../../index.js'

export type DescriptionFunction = LabelFunction

export type DescriptionComponent = ComponentWithServerProps<FieldDescriptionProps>

export type Description =
  | DescriptionComponent
  | DescriptionFunction
  | Record<string, string>
  | string

export type FieldDescriptionProps = {
  CustomDescription?: React.ReactNode
  className?: string
  description?: Record<string, string> | string
  marginPlacement?: 'bottom' | 'top'
  payload?: Payload
}
