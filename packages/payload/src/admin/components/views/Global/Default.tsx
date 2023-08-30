import React from 'react'
import { useTranslation } from 'react-i18next'

import type { Props } from './types.js'

import { getTranslation } from '../../../../utilities/getTranslation.js'
import { formatDate } from '../../../utilities/formatDate/index.js'
import Autosave from '../../elements/Autosave/index.js'
import CopyToClipboard from '../../elements/CopyToClipboard/index.js'
import Eyebrow from '../../elements/Eyebrow/index.js'
import { Gutter } from '../../elements/Gutter/index.js'
import { FormLoadingOverlayToggle } from '../../elements/Loading/index.js'
import PreviewButton from '../../elements/PreviewButton/index.js'
import { Publish } from '../../elements/Publish/index.js'
import { Save } from '../../elements/Save/index.js'
import { SaveDraft } from '../../elements/SaveDraft/index.js'
import Status from '../../elements/Status/index.js'
import VersionsCount from '../../elements/VersionsCount/index.js'
import ViewDescription from '../../elements/ViewDescription/index.js'
import Form from '../../forms/Form/index.js'
import RenderFields from '../../forms/RenderFields/index.js'
import fieldTypes from '../../forms/field-types/index.js'
import LeaveWithoutSaving from '../../modals/LeaveWithoutSaving/index.js'
import { useConfig } from '../../utilities/Config/index.js'
import { useDocumentInfo } from '../../utilities/DocumentInfo/index.js'
import Meta from '../../utilities/Meta/index.js'
import { OperationContext } from '../../utilities/OperationProvider/index.js'
import './index.scss'

const baseClass = 'global-edit'

const DefaultGlobalView: React.FC<Props> = (props) => {
  const { action, apiURL, data, global, initialState, isLoading, onSave, permissions, updatedAt } =
    props

  const {
    admin: { dateFormat },
  } = useConfig()
  const { publishedDoc } = useDocumentInfo()
  const { i18n, t } = useTranslation('general')

  const { admin: { description, hideAPIURL, preview } = {}, fields, label, versions } = global

  const hasSavePermission = permissions?.update?.permission

  return (
    <div className={baseClass}>
      <OperationContext.Provider value="update">
        <Form
          action={action}
          className={`${baseClass}__form`}
          disabled={!hasSavePermission}
          initialState={initialState}
          method="post"
          onSuccess={onSave}
        >
          <FormLoadingOverlayToggle
            action="update"
            loadingSuffix={getTranslation(label, i18n)}
            name={`global-edit--${label}`}
          />

          {!isLoading && (
            <React.Fragment>
              <div className={`${baseClass}__main`}>
                <Meta
                  description={getTranslation(label, i18n)}
                  keywords={`${getTranslation(label, i18n)}, Payload, CMS`}
                  title={getTranslation(label, i18n)}
                />
                <Eyebrow />
                {!(global.versions?.drafts && global.versions?.drafts?.autosave) && (
                  <LeaveWithoutSaving />
                )}
                <Gutter className={`${baseClass}__edit`}>
                  <header className={`${baseClass}__header`}>
                    <h1>{t('editLabel', { label: getTranslation(label, i18n) })}</h1>
                    {description && (
                      <div className={`${baseClass}__sub-header`}>
                        <ViewDescription description={description} />
                      </div>
                    )}
                  </header>
                  <RenderFields
                    filter={(field) =>
                      !field.admin.position ||
                      (field.admin.position && field.admin.position !== 'sidebar')
                    }
                    fieldSchema={fields}
                    fieldTypes={fieldTypes}
                    permissions={permissions.fields}
                    readOnly={!hasSavePermission}
                  />
                </Gutter>
              </div>
              <div className={`${baseClass}__sidebar-wrap`}>
                <div className={`${baseClass}__sidebar`}>
                  <div className={`${baseClass}__sidebar-sticky-wrap`}>
                    <div
                      className={`${baseClass}__document-actions${
                        (global.versions?.drafts && !global.versions?.drafts?.autosave) || preview
                          ? ` ${baseClass}__document-actions--has-2`
                          : ''
                      }`}
                    >
                      {preview &&
                        (!global.versions?.drafts || global.versions?.drafts?.autosave) && (
                          <PreviewButton
                            CustomComponent={global?.admin?.components?.elements?.PreviewButton}
                            generatePreviewURL={preview}
                          />
                        )}

                      {hasSavePermission && (
                        <React.Fragment>
                          {global.versions?.drafts && (
                            <React.Fragment>
                              {!global.versions.drafts.autosave && (
                                <SaveDraft
                                  CustomComponent={
                                    global?.admin?.components?.elements?.SaveDraftButton
                                  }
                                />
                              )}

                              <Publish
                                CustomComponent={global?.admin?.components?.elements?.PublishButton}
                              />
                            </React.Fragment>
                          )}
                          {!global.versions?.drafts && (
                            <Save
                              CustomComponent={global?.admin?.components?.elements?.SaveButton}
                            />
                          )}
                        </React.Fragment>
                      )}
                    </div>
                    <div className={`${baseClass}__sidebar-fields`}>
                      {preview && global.versions?.drafts && !global.versions?.drafts?.autosave && (
                        <PreviewButton
                          CustomComponent={global?.admin?.components?.elements?.PreviewButton}
                          generatePreviewURL={preview}
                        />
                      )}
                      {global.versions?.drafts && (
                        <React.Fragment>
                          <Status />
                          {global.versions.drafts.autosave && hasSavePermission && (
                            <Autosave
                              global={global}
                              publishedDocUpdatedAt={publishedDoc?.updatedAt || data?.createdAt}
                            />
                          )}
                        </React.Fragment>
                      )}
                      <RenderFields
                        fieldSchema={fields}
                        fieldTypes={fieldTypes}
                        filter={(field) => field.admin.position === 'sidebar'}
                        permissions={permissions.fields}
                        readOnly={!hasSavePermission}
                      />
                    </div>
                    <ul className={`${baseClass}__meta`}>
                      {versions && (
                        <li>
                          <div className={`${baseClass}__label`}>{t('version:versions')}</div>
                          <VersionsCount global={global} />
                        </li>
                      )}
                      {data && !hideAPIURL && (
                        <li className={`${baseClass}__api-url`}>
                          <span className={`${baseClass}__label`}>
                            API URL <CopyToClipboard value={apiURL} />
                          </span>
                          <a href={apiURL} rel="noopener noreferrer" target="_blank">
                            {apiURL}
                          </a>
                        </li>
                      )}
                      {updatedAt && (
                        <li>
                          <div className={`${baseClass}__label`}>{t('lastModified')}</div>
                          <div>{formatDate(updatedAt , dateFormat, i18n?.language)}</div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </Form>
      </OperationContext.Provider>
    </div>
  )
}

export default DefaultGlobalView
