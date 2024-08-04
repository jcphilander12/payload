import type {
  ClientTranslationsObject,
  DefaultTranslationKeys,
  DefaultTranslationsObject,
  I18n,
  I18nClient,
} from '@payloadcms/translations'
import type { SanitizedConfig } from 'payload'

import { initI18n } from '@payloadcms/translations'
import { cookies, headers } from 'next/headers.js'

import { getRequestLanguage } from './getRequestLanguage.js'

/**
 * In the context of Next.js, this function initializes the i18n object for the current request.
 *
 * It must be called on the server side, and within the lifecycle of a request since it relies on the request headers and cookies.
 */
export const getNextRequestI18n = async <
  TAdditionalTranslations = {},
  TAdditionalClientTranslationKeys extends string = never,
>({
  config,
}: {
  config: SanitizedConfig
}): Promise<
  [TAdditionalClientTranslationKeys] extends [never]
    ? I18nClient
    : TAdditionalTranslations extends object
      ? I18nClient<TAdditionalTranslations, TAdditionalClientTranslationKeys>
      : I18nClient<ClientTranslationsObject, TAdditionalClientTranslationKeys>
> => {
  return (await initI18n({
    config: config.i18n,
    context: 'client',
    language: getRequestLanguage({ config, cookies: cookies(), headers: headers() }),
  })) as any
}
