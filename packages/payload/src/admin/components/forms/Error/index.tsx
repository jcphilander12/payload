import React from 'react'

import type { Props } from './types.js'

import Tooltip from '../../elements/Tooltip/index.js'
import './index.scss'

const baseClass = 'field-error'

const Error: React.FC<Props> = (props) => {
  const { message, showError = false } = props

  if (showError) {
    return (
      <Tooltip className={baseClass} delay={0}>
        {message}
      </Tooltip>
    )
  }

  return null
}

export default Error
