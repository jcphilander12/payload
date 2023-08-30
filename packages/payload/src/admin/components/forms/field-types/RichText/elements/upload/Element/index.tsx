import type { HTMLAttributes } from 'react'

import React, { useCallback, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Transforms } from 'slate'
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react'

import type { SanitizedCollectionConfig } from '../../../../../../../../collections/config/types.js'
import type { Props as RichTextProps } from '../../../types.js'

import { getTranslation } from '../../../../../../../../utilities/getTranslation.js'
import usePayloadAPI from '../../../../../../../hooks/usePayloadAPI.js'
import useThumbnail from '../../../../../../../hooks/useThumbnail.js'
import Button from '../../../../../../elements/Button/index.js'
import { useDocumentDrawer } from '../../../../../../elements/DocumentDrawer/index.js'
import { DrawerToggler } from '../../../../../../elements/Drawer/index.js'
import { useDrawerSlug } from '../../../../../../elements/Drawer/useDrawerSlug.js'
import { useListDrawer } from '../../../../../../elements/ListDrawer/index.js'
import FileGraphic from '../../../../../../graphics/File/index.js'
import { useConfig } from '../../../../../../utilities/Config/index.js'
import { EnabledRelationshipsCondition } from '../../EnabledRelationshipsCondition.js'
import { UploadDrawer } from './UploadDrawer/index.js'
import './index.scss'

const baseClass = 'rich-text-upload'

const initialParams = {
  depth: 0,
}

export type ElementProps = {
  attributes: HTMLAttributes<HTMLDivElement>
  children: React.ReactNode
  element: any
  enabledCollectionSlugs: string[]
  fieldProps: RichTextProps
}

const Element: React.FC<ElementProps> = (props) => {
  const {
    attributes,
    children,
    element: { relationTo, value },
    element,
    enabledCollectionSlugs,
    fieldProps,
  } = props

  const {
    collections,
    routes: { api },
    serverURL,
  } = useConfig()
  const { i18n, t } = useTranslation('fields')
  const [cacheBust, dispatchCacheBust] = useReducer((state) => state + 1, 0)
  const [relatedCollection, setRelatedCollection] = useState<SanitizedCollectionConfig>(() =>
    collections.find((coll) => coll.slug === relationTo),
  )

  const drawerSlug = useDrawerSlug('upload-drawer')

  const [ListDrawer, ListDrawerToggler, { closeDrawer: closeListDrawer }] = useListDrawer({
    collectionSlugs: enabledCollectionSlugs,
    selectedCollection: relatedCollection.slug,
  })

  const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] = useDocumentDrawer({
    collectionSlug: relatedCollection.slug,
    id: value?.id,
  })

  const editor = useSlateStatic()
  const selected = useSelected()
  const focused = useFocused()

  // Get the referenced document
  const [{ data }, { setParams }] = usePayloadAPI(
    `${serverURL}${api}/${relatedCollection.slug}/${value?.id}`,
    { initialParams },
  )

  const thumbnailSRC = useThumbnail(relatedCollection, data)

  const removeUpload = useCallback(() => {
    const elementPath = ReactEditor.findPath(editor, element)

    Transforms.removeNodes(editor, { at: elementPath })
  }, [editor, element])

  const updateUpload = useCallback(
    (json) => {
      const { doc } = json

      const newNode = {
        fields: doc,
      }

      const elementPath = ReactEditor.findPath(editor, element)

      Transforms.setNodes(editor, newNode, { at: elementPath })

      // setRelatedCollection(collections.find((coll) => coll.slug === collectionConfig.slug));

      setParams({
        ...initialParams,
        cacheBust, // do this to get the usePayloadAPI to re-fetch the data even though the URL string hasn't changed
      })

      dispatchCacheBust()
      closeDrawer()
    },
    [editor, element, setParams, cacheBust, closeDrawer],
  )

  const swapUpload = React.useCallback(
    ({ collectionConfig, docID }) => {
      const newNode = {
        children: [{ text: ' ' }],
        relationTo: collectionConfig.slug,
        type: 'upload',
        value: { id: docID },
      }

      const elementPath = ReactEditor.findPath(editor, element)

      setRelatedCollection(collections.find((coll) => coll.slug === collectionConfig.slug))

      Transforms.setNodes(editor, newNode, { at: elementPath })

      dispatchCacheBust()
      closeListDrawer()
    },
    [closeListDrawer, editor, element, collections],
  )

  const customFields = fieldProps?.admin?.upload?.collections?.[relatedCollection.slug]?.fields

  return (
    <div
      className={[baseClass, selected && focused && `${baseClass}--selected`]
        .filter(Boolean)
        .join(' ')}
      contentEditable={false}
      {...attributes}
    >
      <div className={`${baseClass}__card`}>
        <div className={`${baseClass}__topRow`}>
          <div className={`${baseClass}__thumbnail`}>
            {thumbnailSRC ? <img alt={data?.filename} src={thumbnailSRC} /> : <FileGraphic />}
          </div>
          <div className={`${baseClass}__topRowRightPanel`}>
            <div className={`${baseClass}__collectionLabel`}>
              {getTranslation(relatedCollection.labels.singular, i18n)}
            </div>
            <div className={`${baseClass}__actions`}>
              {customFields?.length > 0 && (
                <DrawerToggler
                  className={`${baseClass}__upload-drawer-toggler`}
                  disabled={fieldProps?.admin?.readOnly}
                  slug={drawerSlug}
                >
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                    buttonStyle="icon-label"
                    el="div"
                    icon="edit"
                    round
                    tooltip={t('fields:editRelationship')}
                  />
                </DrawerToggler>
              )}
              <ListDrawerToggler
                className={`${baseClass}__list-drawer-toggler`}
                disabled={fieldProps?.admin?.readOnly}
              >
                <Button
                  onClick={() => {
                    // do nothing
                  }}
                  buttonStyle="icon-label"
                  disabled={fieldProps?.admin?.readOnly}
                  el="div"
                  icon="swap"
                  round
                  tooltip={t('swapUpload')}
                />
              </ListDrawerToggler>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  removeUpload()
                }}
                buttonStyle="icon-label"
                className={`${baseClass}__removeButton`}
                disabled={fieldProps?.admin?.readOnly}
                icon="x"
                round
                tooltip={t('removeUpload')}
              />
            </div>
          </div>
        </div>
        <div className={`${baseClass}__bottomRow`}>
          <DocumentDrawerToggler className={`${baseClass}__doc-drawer-toggler`}>
            <strong>{data?.filename}</strong>
          </DocumentDrawerToggler>
        </div>
      </div>
      {children}
      {value?.id && <DocumentDrawer onSave={updateUpload} />}
      <ListDrawer onSelect={swapUpload} />
      <UploadDrawer drawerSlug={drawerSlug} relatedCollection={relatedCollection} {...props} />
    </div>
  )
}

export default (props: ElementProps): React.ReactNode => {
  return (
    <EnabledRelationshipsCondition {...props} uploads>
      <Element {...props} />
    </EnabledRelationshipsCondition>
  )
}
