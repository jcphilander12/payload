/* eslint-disable no-restricted-syntax, no-await-in-loop */
import type { PayloadRequest } from '../../express/types.js';
import type { DatabaseAdapter } from '../types.js';

import { readMigrationFiles } from './readMigrationFiles.js';

/**
 * Reset and re-run all migrations.
 */
export async function migrateRefresh(this: DatabaseAdapter) {
  const { payload } = this;
  const migrationFiles = await readMigrationFiles({ payload });

  // Clear all migrations
  await payload.delete({
    collection: 'payload-migrations',
    where: {}, // All migrations
  });
  let transactionID;
  // Run all migrations
  for (const migration of migrationFiles) {
    payload.logger.info({ msg: `Migrating: ${migration.name}` });
    try {
      const start = Date.now();
      transactionID = await this.beginTransaction();
      await migration.up({ payload });
      await payload.create({
        collection: 'payload-migrations',
        data: {
          executed: true,
          name: migration.name,
        },
        req: {
          transactionID,
        } as PayloadRequest,
      });
      await this.commitTransaction(transactionID);

      payload.logger.info({ msg: `Migrated:  ${migration.name} (${Date.now() - start}ms)` });
    } catch (err: unknown) {
      await this.rollbackTransaction(transactionID);
      payload.logger.error({
        err,
        msg: `Error running migration ${migration.name}`,
      });
      throw err;
    }
  }
}
