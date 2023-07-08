/* eslint-disable no-restricted-syntax, no-await-in-loop */
import { DatabaseAdapter } from '../types';
import { getMigrations } from './getMigrations';
import { readMigrationFiles } from './readMigrationFiles';

export async function migrate(this: DatabaseAdapter): Promise<void> {
  const { payload } = this;
  const migrationFiles = await readMigrationFiles({ payload });
  const { existingMigrations, latestBatch } = await getMigrations({ payload });

  const newBatch = latestBatch + 1;

  // Execute 'up' function for each migration sequentially
  for (const migration of migrationFiles) {
    const existingMigration = existingMigrations.find((existing) => existing.name === migration.name);

    // Run migration if not found in database
    if (existingMigration) {
      continue; // eslint-disable-line no-continue
    }

    payload.logger.info({ msg: `Migrating: ${migration.name}` });
    const start = Date.now();
    try {
      await migration.up({ payload });
      payload.logger.info({ msg: `Migrated:  ${migration.name} (${Date.now() - start}ms)` });
    } catch (err: unknown) {
      payload.logger.error({ msg: `Error running migration ${migration.name}`, err });
      throw err;
    }

    await payload.create({
      collection: 'payload-migrations',
      data: {
        name: migration.name,
        batch: newBatch,
      },
    });
  }
}
