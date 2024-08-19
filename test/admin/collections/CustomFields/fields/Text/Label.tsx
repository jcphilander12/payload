import type { TextFieldLabelServerComponent } from 'payload'

import React from 'react'

export const CustomLabel: TextFieldLabelServerComponent = (props) => {
  return (
    <div id="custom-field-label">{`Label: the max length of this field is: ${props?.field?.maxLength}`}</div>
  )
}
