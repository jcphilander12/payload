import type { Plugin } from 'payload/config'

import createBreadcrumbsField from './fields/breadcrumbs'
import createParentField from './fields/parent'
import resaveChildren from './hooks/resaveChildren'
import resaveSelfAfterCreate from './hooks/resaveSelfAfterCreate'
import type { PluginConfig } from './types'
import populateBreadcrumbs from './utilities/populateBreadcrumbs'

const nestedDocs =
  (pluginConfig: PluginConfig): Plugin =>
  (config) => {
    // @TODO: This is a hack to get the database adapter
    if (!pluginConfig?.dbType) {
      let databaseAdapter: PluginConfig['dbType'] = 'mongoose'
      if (config.db.toString().match('postgres')) {
        databaseAdapter = 'postgres'
      }
      pluginConfig.dbType = databaseAdapter
    }
    return {
      ...config,
      collections: (config.collections || []).map((collection) => {
        if (pluginConfig.collections.indexOf(collection.slug) > -1) {
          const fields = [...(collection?.fields || [])]

          if (!pluginConfig.parentFieldSlug) {
            fields.push(createParentField(collection.slug))
          }

          if (!pluginConfig.breadcrumbsFieldSlug) {
            fields.push(createBreadcrumbsField(collection.slug))
          }

          return {
            ...collection,
            hooks: {
              ...(collection.hooks || {}),
              beforeChange: [
                async ({ req, data, originalDoc }) =>
                  populateBreadcrumbs(req, pluginConfig, collection, data, originalDoc),
                ...(collection?.hooks?.beforeChange || []),
              ],
              afterChange: [
                resaveChildren(pluginConfig, collection),
                resaveSelfAfterCreate(collection),
                ...(collection?.hooks?.afterChange || []),
              ],
            },
            fields,
          }
        }

        return collection
      }),
    }
  }

export default nestedDocs
