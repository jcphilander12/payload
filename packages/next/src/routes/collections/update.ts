import httpStatus from 'http-status'

import type { PayloadRequest, Where } from 'payload/types'

import { isNumber } from 'payload/utilities'
import { updateOperation } from 'payload/operations'
import { getTranslation } from '@payloadcms/translations'

export const update = async ({ req }: { req: PayloadRequest }): Promise<Response> => {
  const { searchParams } = req
  const depth = searchParams.get('depth')
  const where = searchParams.get('where')

  const result = await updateOperation({
    collection: req.collection,
    data: req.data,
    depth: isNumber(depth) ? Number(depth) : undefined,
    draft: searchParams.get('draft') === 'true',
    req,
    where: where ? (JSON.parse(where) as Where) : undefined,
  })

  if (result.errors.length === 0) {
    const message = req.t('general:updatedCountSuccessfully', {
      count: result.docs.length,
      label: getTranslation(
        req.collection.config.labels[result.docs.length > 1 ? 'plural' : 'singular'],
        req.i18n,
      ),
    })

    return Response.json(
      {
        ...result,
        message,
      },
      {
        status: httpStatus.OK,
      },
    )
  }

  const total = result.docs.length + result.errors.length
  const message = req.t('error:unableToUpdateCount', {
    count: result.errors.length,
    label: getTranslation(
      req.collection.config.labels[total > 1 ? 'plural' : 'singular'],
      req.i18n,
    ),
    total,
  })

  return Response.json(
    {
      ...result,
      message,
    },
    {
      status: httpStatus.BAD_REQUEST,
    },
  )
}
