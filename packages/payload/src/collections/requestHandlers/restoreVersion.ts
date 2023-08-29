import type { NextFunction, Response } from 'express';

import httpStatus from 'http-status';

import type { PayloadRequest } from '../../express/types.js';
import type { Document } from '../../types/index.js';

import formatSuccessResponse from '../../express/responses/formatSuccess.js';
import restoreVersion from '../operations/restoreVersion.js';

export type RestoreResult = {
  doc: Document
  message: string
};

export default async function restoreVersionHandler(req: PayloadRequest, res: Response, next: NextFunction): Promise<Response<RestoreResult> | void> {
  const options = {
    collection: req.collection,
    depth: Number(req.query.depth),
    id: req.params.id,
    payload: req.payload,
    req,
  };

  try {
    const doc = await restoreVersion(options);
    res.status(httpStatus.OK)
      .json({
        ...formatSuccessResponse(req.t('version:restoredSuccessfully'), 'message'),
        doc,
      });
  } catch (error) {
    next(error);
  }
}
