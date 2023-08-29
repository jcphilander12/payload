import type { PayloadRequest } from '../express/types.js';

/**
 * Rollback the transaction from the req using the db adapter and removes it from the req
 */
export async function killTransaction(req: PayloadRequest): Promise<void> {
  const {
    payload,
    transactionID,
  } = req;
  if (transactionID) {
    await payload.db.rollbackTransaction(req.transactionID);
    delete req.transactionID;
  }
}
