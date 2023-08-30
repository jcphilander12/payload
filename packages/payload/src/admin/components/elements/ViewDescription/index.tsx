import React from 'react'
import { useTranslation } from 'react-i18next'

import type { Props } from './types.js'

import { getTranslation } from '../../../../utilities/getTranslation.js'
import './index.scss'
import { isComponent } from './types.js'

const ViewDescription: React.FC<Props> = (props) => {
  const { i18n } = useTranslation()
  const { description } = props

  if (isComponent(description)) {
    const Description = description
    return <Description />
  }

  if (description) {
    return (
      <div className="view-description">
        {typeof description === 'function' ? description() : getTranslation(description, i18n)}
      </div>
    )
  }

  return null
}

export default ViewDescription
