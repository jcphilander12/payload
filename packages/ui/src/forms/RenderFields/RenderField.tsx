'use client'

import type { FieldComponentProps, FieldPermissions, FieldTypes, MappedField } from 'payload'

import React from 'react'

import { RenderMappedComponent } from '../../providers/ComponentMap/RenderMappedComponent.js'
import { useOperation } from '../../providers/Operation/index.js'
import { FieldPropsProvider, useFieldProps } from '../FieldPropsProvider/index.js'

type Props = {
  Field: MappedField['Field']
  custom?: Record<any, string>
  disabled: boolean
  fieldComponentProps?: {
    forceRender?: boolean
  } & FieldComponentProps
  indexPath?: string
  isHidden?: boolean
  name?: string
  path: string
  permissions?: FieldPermissions
  readOnly?: boolean
  schemaPath: string
  siblingPermissions: {
    [fieldName: string]: FieldPermissions
  }
  type: FieldTypes
}

export const RenderField: React.FC<Props> = ({
  name,
  type,
  Field,
  custom,
  disabled,
  fieldComponentProps,
  indexPath,
  path: pathFromProps,
  permissions,
  readOnly: readOnlyFromProps,
  schemaPath: schemaPathFromProps,
  siblingPermissions,
}) => {
  const operation = useOperation()
  const { readOnly: readOnlyFromContext } = useFieldProps()

  const path = [pathFromProps, name].filter(Boolean).join('.')
  const schemaPath = [schemaPathFromProps, name].filter(Boolean).join('.')

  // if the user cannot read the field, then filter it out
  // this is different from `admin.readOnly` which is executed based on `operation`
  if (permissions?.read?.permission === false || disabled) {
    return null
  }

  // `admin.readOnly` displays the value but prevents the field from being edited
  let readOnly = readOnlyFromProps

  // if parent field is `readOnly: true`, but this field is `readOnly: false`, the field should still be editable
  if (readOnlyFromContext && readOnly !== false) readOnly = true

  // if the user does not have access control to begin with, force it to be read-only
  if (permissions?.[operation]?.permission === false) {
    readOnly = true
  }

  if (Field === undefined) {
    return null
  }

  return (
    <FieldPropsProvider
      custom={custom}
      indexPath={indexPath}
      path={path}
      permissions={permissions}
      readOnly={readOnly}
      schemaPath={schemaPath}
      siblingPermissions={siblingPermissions}
      type={type}
    >
      <RenderMappedComponent clientProps={fieldComponentProps} component={Field} />
    </FieldPropsProvider>
  )
}
