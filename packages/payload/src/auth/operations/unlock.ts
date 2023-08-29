import type { Collection } from '../../collections/config/types.js';
import type { PayloadRequest } from '../../express/types.js';

import { APIError } from '../../errors/index.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import executeAccess from '../executeAccess.js';
import { resetLoginAttempts } from '../strategies/local/resetLoginAttempts.js';

export type Args = {
  collection: Collection
  data: {
    email: string
  }
  overrideAccess?: boolean
  req: PayloadRequest
}

async function unlock(args: Args): Promise<boolean> {
  if (!Object.prototype.hasOwnProperty.call(args.data, 'email')) {
    throw new APIError('Missing email.');
  }

  const {
    collection: {
      config: collectionConfig,
    },
    overrideAccess,
    req: {
      locale,
      payload,
    },
    req,
  } = args;

  try {
    const shouldCommit = await initTransaction(req);

    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////

    if (!overrideAccess) {
      await executeAccess({ req }, collectionConfig.access.unlock);
    }

    const options = { ...args };

    const { data } = options;

    // /////////////////////////////////////
    // Unlock
    // /////////////////////////////////////

    if (!data.email) {
      throw new APIError('Missing email.');
    }

    const user = await req.payload.db.findOne({
      collection: collectionConfig.slug,
      locale,
      req,
      where: { email: { equals: data.email.toLowerCase() } },
    });

    let result;

    if (user) {
      await resetLoginAttempts({
        collection: collectionConfig,
        doc: user,
        payload: req.payload,
        req,
      });
      result = true;
    } else {
      result = null;
    }

    if (shouldCommit) await payload.db.commitTransaction(req.transactionID);

    return result;
  } catch (error: unknown) {
    await killTransaction(req);
    throw error;
  }
}

export default unlock;
