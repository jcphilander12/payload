import type { NextFunction, Response } from 'express'
import type { Config as GeneratedTypes } from 'payload/generated-types'

import httpStatus from 'http-status'

import type { PayloadRequest } from '../../express/types.js'

import findOne from '../operations/findOne.js'

export default async function findOneHandler(
  req: PayloadRequest,
  res: Response,
  next: NextFunction,
): Promise<Response<GeneratedTypes['collections']['_preference']> | void> {
  try {
    const result = await findOne({
      key: req.params.key,
      req,
      user: req.user,
    })

    return res
      .status(httpStatus.OK)
      .json(result || { message: req.t('general:notFound'), value: null })
  } catch (error) {
    return next(error)
  }
}
