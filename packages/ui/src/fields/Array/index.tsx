'use client'
import type { FieldPermissions } from 'payload/auth'
import type { FieldBase } from 'payload/types'
import type { ArrayField as ArrayFieldType } from 'payload/types'

import { getTranslation } from '@payloadcms/translations'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'
import { FieldError } from '@payloadcms/ui/forms/FieldError'
import { FieldLabel } from '@payloadcms/ui/forms/FieldLabel'
import { useFieldProps } from '@payloadcms/ui/forms/FieldPropsProvider'
import { withCondition } from '@payloadcms/ui/forms/withCondition'
import React, { useCallback } from 'react'

import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js'
import type { FormFieldBase } from '../shared/index.js'

import { Banner } from '../../elements/Banner/index.js'
import { Button } from '../../elements/Button/index.js'
import { DraggableSortableItem } from '../../elements/DraggableSortable/DraggableSortableItem/index.js'
import { DraggableSortable } from '../../elements/DraggableSortable/index.js'
import { ErrorPill } from '../../elements/ErrorPill/index.js'
import { useForm, useFormSubmitted } from '../../forms/Form/context.js'
import { NullifyLocaleField } from '../../forms/NullifyField/index.js'
import { useField } from '../../forms/useField/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js'
import { useLocale } from '../../providers/Locale/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { scrollToID } from '../../utilities/scrollToID.js'
import { fieldBaseClass } from '../shared/index.js'
import { ArrayRow } from './ArrayRow.js'
import './index.scss'

const baseClass = 'array-field'

export type ArrayFieldProps = FormFieldBase & {
  CustomRowLabel?: React.ReactNode
  fieldMap: FieldMap
  forceRender?: boolean
  isSortable?: boolean
  label?: FieldBase['label']
  labels?: ArrayFieldType['labels']
  maxRows?: ArrayFieldType['maxRows']
  minRows?: ArrayFieldType['minRows']
  name?: string
  permissions: FieldPermissions
  width?: string
}

export const _ArrayField: React.FC<ArrayFieldProps> = (props) => {
  const {
    name,
    CustomDescription,
    CustomError,
    CustomLabel,
    CustomRowLabel,
    className,
    descriptionProps,
    errorProps,
    fieldMap,
    forceRender = false,
    isSortable = true,
    label,
    labelProps,
    localized,
    maxRows,
    minRows: minRowsProp,
    path: pathFromProps,
    permissions,
    readOnly: readOnlyFromProps,
    required,
    validate,
  } = props

  const { indexPath, readOnly: readOnlyFromContext } = useFieldProps()
  const readOnly = readOnlyFromProps || readOnlyFromContext
  const minRows = minRowsProp ?? required ? 1 : 0

  const { setDocFieldPreferences } = useDocumentInfo()
  const { addFieldRow, dispatchFields, setModified } = useForm()
  const submitted = useFormSubmitted()
  const { code: locale } = useLocale()
  const { i18n, t } = useTranslation()
  const { localization } = useConfig()

  const editingDefaultLocale = (() => {
    if (localization && localization.fallback) {
      const defaultLocale = localization.defaultLocale || 'en'
      return locale === defaultLocale
    }

    return true
  })()

  // Handle labeling for Arrays, Global Arrays, and Blocks
  const getLabels = (p: ArrayFieldProps) => {
    if ('labels' in p && p?.labels) return p.labels
    if ('label' in p && p?.label) return { plural: undefined, singular: p.label }
    return { plural: t('general:rows'), singular: t('general:row') }
  }

  const labels = getLabels(props)

  const { path: pathFromContext } = useFieldProps()

  const {
    errorPaths,
    path,
    rows = [],
    schemaPath,
    showError,
    valid,
    value,
  } = useField<number>({
    hasRows: true,
    path: pathFromContext || pathFromProps || name,
    validate,
  })

  const addRow = useCallback(
    async (rowIndex: number) => {
      await addFieldRow({ path, rowIndex, schemaPath })
      setModified(true)

      setTimeout(() => {
        scrollToID(`${path}-row-${rowIndex + 1}`)
      }, 0)
    },
    [addFieldRow, path, setModified, schemaPath],
  )

  const duplicateRow = useCallback(
    (rowIndex: number) => {
      dispatchFields({ type: 'DUPLICATE_ROW', path, rowIndex })
      setModified(true)

      setTimeout(() => {
        scrollToID(`${path}-row-${rowIndex}`)
      }, 0)
    },
    [dispatchFields, path, setModified],
  )

  const removeRow = useCallback(
    (rowIndex: number) => {
      dispatchFields({ type: 'REMOVE_ROW', path, rowIndex })
      setModified(true)
    },
    [dispatchFields, path, setModified],
  )

  const moveRow = useCallback(
    (moveFromIndex: number, moveToIndex: number) => {
      dispatchFields({ type: 'MOVE_ROW', moveFromIndex, moveToIndex, path })
      setModified(true)
    },
    [dispatchFields, path, setModified],
  )

  const toggleCollapseAll = useCallback(
    (collapsed: boolean) => {
      dispatchFields({ type: 'SET_ALL_ROWS_COLLAPSED', collapsed, path, setDocFieldPreferences })
    },
    [dispatchFields, path, setDocFieldPreferences],
  )

  const setCollapse = useCallback(
    (rowID: string, collapsed: boolean) => {
      dispatchFields({ type: 'SET_ROW_COLLAPSED', collapsed, path, rowID, setDocFieldPreferences })
    },
    [dispatchFields, path, setDocFieldPreferences],
  )

  const hasMaxRows = maxRows && rows.length >= maxRows

  const fieldErrorCount = errorPaths.length
  const fieldHasErrors = submitted && errorPaths.length > 0

  const showRequired = readOnly && rows.length === 0
  const showMinRows = rows.length < minRows || (required && rows.length === 0)

  return (
    <div
      className={[
        fieldBaseClass,
        baseClass,
        className,
        fieldHasErrors ? `${baseClass}--has-error` : `${baseClass}--has-no-error`,
      ]
        .filter(Boolean)
        .join(' ')}
      id={`field-${path.replace(/\./g, '__')}`}
    >
      {showError && (
        <div className={`${baseClass}__error-wrap`}>
          <FieldError CustomError={CustomError} path={path} {...(errorProps || {})} />
        </div>
      )}
      <header className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-wrap`}>
          <div className={`${baseClass}__header-content`}>
            <h3 className={`${baseClass}__title`}>
              <FieldLabel
                CustomLabel={CustomLabel}
                as="span"
                label={label}
                required={required}
                unstyled
                {...(labelProps || {})}
              />
            </h3>
            {fieldHasErrors && fieldErrorCount > 0 && (
              <ErrorPill count={fieldErrorCount} i18n={i18n} withMessage />
            )}
          </div>
          {rows.length > 0 && (
            <ul className={`${baseClass}__header-actions`}>
              <li>
                <button
                  className={`${baseClass}__header-action`}
                  onClick={() => toggleCollapseAll(true)}
                  type="button"
                >
                  {t('fields:collapseAll')}
                </button>
              </li>
              <li>
                <button
                  className={`${baseClass}__header-action`}
                  onClick={() => toggleCollapseAll(false)}
                  type="button"
                >
                  {t('fields:showAll')}
                </button>
              </li>
            </ul>
          )}
        </div>
        <FieldDescription CustomDescription={CustomDescription} {...(descriptionProps || {})} />
      </header>
      <NullifyLocaleField fieldValue={value} localized={localized} path={path} />
      {(rows.length > 0 || (!valid && (showRequired || showMinRows))) && (
        <DraggableSortable
          className={`${baseClass}__draggable-rows`}
          ids={rows.map((row) => row.id)}
          onDragEnd={({ moveFromIndex, moveToIndex }) => moveRow(moveFromIndex, moveToIndex)}
        >
          {rows.map((row, i) => {
            const rowErrorCount = errorPaths?.filter((errorPath) =>
              errorPath.startsWith(`${path}.${i}.`),
            ).length
            return (
              <DraggableSortableItem disabled={readOnly || !isSortable} id={row.id} key={row.id}>
                {(draggableSortableItemProps) => (
                  <ArrayRow
                    {...draggableSortableItemProps}
                    CustomRowLabel={CustomRowLabel}
                    addRow={addRow}
                    duplicateRow={duplicateRow}
                    errorCount={rowErrorCount}
                    fieldMap={fieldMap}
                    forceRender={forceRender}
                    hasMaxRows={hasMaxRows}
                    indexPath={indexPath}
                    isSortable={isSortable}
                    labels={labels}
                    moveRow={moveRow}
                    path={path}
                    permissions={permissions}
                    readOnly={readOnly}
                    removeRow={removeRow}
                    row={row}
                    rowCount={rows.length}
                    rowIndex={i}
                    schemaPath={schemaPath}
                    setCollapse={setCollapse}
                  />
                )}
              </DraggableSortableItem>
            )
          })}
          {!valid && (
            <React.Fragment>
              {showRequired && (
                <Banner>
                  {t('validation:fieldHasNo', { label: getTranslation(labels.plural, i18n) })}
                </Banner>
              )}
              {showMinRows && (
                <Banner type="error">
                  {t('validation:requiresAtLeast', {
                    count: minRows,
                    label:
                      getTranslation(minRows > 1 ? labels.plural : labels.singular, i18n) ||
                      t(minRows > 1 ? 'general:row' : 'general:rows'),
                  })}
                </Banner>
              )}
            </React.Fragment>
          )}
        </DraggableSortable>
      )}
      {!readOnly && !hasMaxRows && (
        <Button
          buttonStyle="icon-label"
          className={`${baseClass}__add-row`}
          icon="plus"
          iconPosition="left"
          iconStyle="with-border"
          onClick={() => addRow(value || 0)}
        >
          {t('fields:addLabel', { label: getTranslation(labels.singular, i18n) })}
        </Button>
      )}
    </div>
  )
}

export const ArrayField = withCondition(_ArrayField)
