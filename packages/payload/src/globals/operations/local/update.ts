import type { DeepPartial } from 'ts-essentials'

import type { GeneratedTypes, PayloadT } from '../../../'
import type { PayloadRequest } from '../../../types'
import type { Document } from '../../../types'

import { APIError } from '../../../errors'
<<<<<<< HEAD
import { createLocalReq } from '../../../utilities/createLocalReq'
import update from '../update'
=======
import { i18nInit } from '../../../translations/init'
import { setRequestContext } from '../../../utilities/setRequestContext'
import { updateOperation } from '../update'
>>>>>>> 988a21e94 (feat(3.0): next route handlers (#4590))

export type Options<TSlug extends keyof GeneratedTypes['globals']> = {
  context?: RequestContext
  data: DeepPartial<Omit<GeneratedTypes['globals'][TSlug], 'id'>>
  depth?: number
  draft?: boolean
  fallbackLocale?: string
  locale?: string
  overrideAccess?: boolean
  req?: PayloadRequest
  showHiddenFields?: boolean
  slug: TSlug
  user?: Document
}

export default async function updateLocal<TSlug extends keyof GeneratedTypes['globals']>(
  payload: PayloadT,
  options: Options<TSlug>,
): Promise<GeneratedTypes['globals'][TSlug]> {
  const { slug: globalSlug, data, depth, draft, overrideAccess = true, showHiddenFields } = options

  const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug)

  if (!globalConfig) {
    throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`)
  }

  const req = createLocalReq(options, payload)

<<<<<<< HEAD
  return update<TSlug>({
    slug: globalSlug as string,
=======
  return updateOperation<TSlug>({
>>>>>>> 988a21e94 (feat(3.0): next route handlers (#4590))
    data,
    depth,
    draft,
    globalConfig,
    overrideAccess,
    req,
    showHiddenFields,
  })
}
