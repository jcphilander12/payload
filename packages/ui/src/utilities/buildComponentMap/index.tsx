import type { ClientSideEditViewProps, SanitizedConfig } from 'payload/types'

import React from 'react'

import type { CollectionComponentMap, ComponentMap, GlobalComponentMap } from './types.js'

import { mapActions } from './mapActions.js'
import { mapFields } from './mapFields.js'

export const buildComponentMap = (args: {
  DefaultCell: React.FC<any>
  DefaultEditView: React.FC<ClientSideEditViewProps>
  DefaultListView: React.FC
  children: React.ReactNode
  config: SanitizedConfig
  readOnly?: boolean
}): {
  componentMap: ComponentMap
  wrappedChildren: React.ReactNode
} => {
  const {
    DefaultCell,
    DefaultEditView,
    DefaultListView,
    children,
    config,
    readOnly: readOnlyOverride,
  } = args

  // Collections
  const collections = config.collections.reduce((acc, collectionConfig) => {
    const { slug, fields } = collectionConfig

    const editViewFromConfig = collectionConfig?.admin?.components?.views?.Edit

    const CustomEditView =
      typeof editViewFromConfig === 'function'
        ? editViewFromConfig
        : typeof editViewFromConfig === 'object' && typeof editViewFromConfig.Default === 'function'
          ? editViewFromConfig.Default
          : typeof editViewFromConfig?.Default === 'object' &&
              'Component' in editViewFromConfig.Default &&
              typeof editViewFromConfig.Default.Component === 'function'
            ? editViewFromConfig.Default.Component
            : undefined

    const listViewFromConfig = collectionConfig?.admin?.components?.views?.List

    const CustomListView =
      typeof listViewFromConfig === 'function'
        ? listViewFromConfig
        : typeof listViewFromConfig === 'object' &&
            typeof listViewFromConfig.Component === 'function'
          ? listViewFromConfig.Component
          : undefined

    const beforeList = collectionConfig?.admin?.components?.BeforeList

    const beforeListTable = collectionConfig?.admin?.components?.BeforeListTable

    const afterList = collectionConfig?.admin?.components?.AfterList

    const afterListTable = collectionConfig?.admin?.components?.AfterListTable

    const BeforeList =
      (beforeList && Array.isArray(beforeList) && beforeList?.map((Component) => <Component />)) ||
      null

    const BeforeListTable =
      (beforeListTable &&
        Array.isArray(beforeListTable) &&
        beforeListTable?.map((Component) => <Component />)) ||
      null

    const AfterList =
      (afterList && Array.isArray(afterList) && afterList?.map((Component) => <Component />)) ||
      null

    const AfterListTable =
      (afterListTable &&
        Array.isArray(afterListTable) &&
        afterListTable?.map((Component) => <Component />)) ||
      null

    let AdminThumbnailComp: React.ComponentType = null

    if (typeof collectionConfig?.upload?.adminThumbnail === 'function') {
      AdminThumbnailComp = collectionConfig?.upload?.adminThumbnail
    } else if (typeof collectionConfig?.upload?.adminThumbnail === 'string') {
      AdminThumbnailComp = (() => collectionConfig?.upload?.adminThumbnail) as React.ComponentType
    }

    const AdminThumbnail = AdminThumbnailComp ? <AdminThumbnailComp /> : null

    const componentMap: CollectionComponentMap = {
      AdminThumbnail,
      AfterList,
      AfterListTable,
      BeforeList,
      BeforeListTable,
      CustomEditView,
      DefaultEditView,
      CustomListView,
      DefaultListView,
      actionsMap: mapActions({
        collectionConfig,
      }),
      fieldMap: mapFields({
        DefaultCell,
        config,
        fieldSchema: fields,
        readOnly: readOnlyOverride,
      }),
    }

    return {
      ...acc,
      [slug]: componentMap,
    }
  }, {})

  // Globals
  const globals = config.globals.reduce((acc, globalConfig) => {
    const { slug, fields } = globalConfig

    const editViewFromConfig = globalConfig?.admin?.components?.views?.Edit

    const CustomEditView =
      typeof editViewFromConfig === 'function'
        ? editViewFromConfig
        : typeof editViewFromConfig === 'object' && typeof editViewFromConfig.Default === 'function'
          ? editViewFromConfig.Default
          : typeof editViewFromConfig?.Default === 'object' &&
              'Component' in editViewFromConfig.Default &&
              typeof editViewFromConfig.Default.Component === 'function'
            ? editViewFromConfig.Default.Component
            : undefined

    const componentMap: GlobalComponentMap = {
      CustomEditView,
      DefaultEditView,
      actionsMap: mapActions({
        globalConfig,
      }),
      fieldMap: mapFields({
        DefaultCell,
        config,
        fieldSchema: fields,
        readOnly: readOnlyOverride,
      }),
    }

    return {
      ...acc,
      [slug]: componentMap,
    }
  }, {})

  const NestProviders = ({ children, providers }) => {
    const Component = providers[0]
    if (providers.length > 1) {
      return (
        <Component>
          <NestProviders providers={providers.slice(1)}>{children}</NestProviders>
        </Component>
      )
    }
    return <Component>{children}</Component>
  }

  const LogoutButtonComponent = config.admin?.components?.logout?.Button

  const LogoutButton = LogoutButtonComponent ? <LogoutButtonComponent /> : null

  const IconComponent = config.admin?.components?.graphics?.Icon

  const Icon = IconComponent ? <IconComponent /> : null

  return {
    componentMap: {
      Icon,
      LogoutButton,
      actions: config.admin?.components?.actions?.map((Component) => <Component />),
      collections,
      globals,
    },
    wrappedChildren:
      Array.isArray(config.admin?.components?.providers) &&
      config.admin?.components?.providers.length > 0 ? (
        <NestProviders providers={config.admin?.components?.providers}>{children}</NestProviders>
      ) : (
        children
      ),
  }
}
