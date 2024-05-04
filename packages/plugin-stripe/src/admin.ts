import type { Config } from 'payload/config'

import type { PluginConfig, SanitizedPluginConfig } from './types.js'

import { getFields } from './fields/getFields.js'

export const stripePlugin =
  (incomingPluginConfig: PluginConfig) =>
  (config: Config): Config => {
    const { collections } = config

    // set config defaults here
    const pluginConfig: SanitizedPluginConfig = {
      ...incomingPluginConfig,
      // TODO: in the next major version, default this to `false`
      rest: incomingPluginConfig?.rest ?? true,
      sync: incomingPluginConfig?.sync || [],
    }

    // NOTE: env variables are never passed to the client, but we need to know if `stripeSecretKey` is a test key
    // unfortunately we must set the 'isTestKey' property on the config instead of using the following code:
    // const isTestKey = stripeConfig.stripeSecretKey?.startsWith('sk_test_');

    return {
      ...config,
      collections: collections?.map((collection) => {
        const syncConfig = pluginConfig.sync?.find((sync) => sync.collection === collection.slug)

        if (syncConfig) {
          const fields = getFields({
            collection,
            pluginConfig,
            syncConfig,
          })
          return {
            ...collection,
            fields,
          }
        }

        return collection
      }),
    }
  }
