'use client'
import type { DateFieldProps } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import React, { useCallback } from 'react'

import { DatePickerField } from '../../elements/DatePicker/index.js'
import { useField } from '../../forms/useField/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { FieldLabel } from '../FieldLabel/index.js'
import { fieldBaseClass } from '../shared/index.js'
import './index.scss'

const baseClass = 'date-time-field'

import type { DateFieldValidation } from 'packages/payload/src/fields/validations.js'

import { useFieldProps } from '../../forms/FieldPropsProvider/index.js'
import { withCondition } from '../../forms/withCondition/index.js'
import { RenderComponent } from '../../providers/Config/RenderComponent.js'
import { FieldDescription } from '../FieldDescription/index.js'
import { FieldError } from '../FieldError/index.js'

const DateTimeFieldComponent: React.FC<DateFieldProps> = (props) => {
  const {
    clientFieldConfig: {
      name,
      _path: pathFromProps,
      admin: {
        className,
        components: { Description, Error, Label, afterInput, beforeInput },
        date: datePickerProps,
        description,
        placeholder,
        style,
        width,
      },
      label,
      required,
    },
    descriptionProps,
    errorProps,
    labelProps,
    readOnly: readOnlyFromProps,
    validate,
  } = props

  const { i18n } = useTranslation()

  const memoizedValidate: DateFieldValidation = useCallback(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required })
      }
    },
    [validate, required],
  )

  const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps()

  const { formInitializing, formProcessing, path, setValue, showError, value } = useField<Date>({
    path: pathFromContext ?? pathFromProps ?? name,
    validate: memoizedValidate,
  })

  const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing

  return (
    <div
      className={[
        fieldBaseClass,
        baseClass,
        className,
        showError && `${baseClass}--has-error`,
        disabled && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      <FieldLabel Label={Label} label={label} required={required} {...(labelProps || {})} />
      <div className={`${fieldBaseClass}__wrap`} id={`field-${path.replace(/\./g, '__')}`}>
        <FieldError CustomError={Error} path={path} {...(errorProps || {})} />
        <RenderComponent mappedComponent={beforeInput} />
        <DatePickerField
          {...datePickerProps}
          onChange={(incomingDate) => {
            if (!disabled) setValue(incomingDate?.toISOString() || null)
          }}
          placeholder={getTranslation(placeholder, i18n)}
          readOnly={disabled}
          value={value}
        />
        <RenderComponent mappedComponent={afterInput} />
      </div>
      <FieldDescription
        Description={Description}
        description={description}
        {...(descriptionProps || {})}
      />
    </div>
  )
}

export const DateTimeField = withCondition(DateTimeFieldComponent)
