/**
 * This script generates variations of the templates into the `templates` directory.
 *
 * How to use:
 *
 * pnpm run script:gen-templates
 *
 * NOTE: You will likely have to commit by using the `--no-verify` flag to avoid the repo linting
 *       There is no way currently to have lint-staged ignore the templates directory.
 */

import type { DbType, StorageAdapterType } from 'packages/create-payload-app/src/types.js'

import { configurePayloadConfig } from 'create-payload-app/lib/configure-payload-config.js'
import { copyRecursiveSync } from 'create-payload-app/utils/copy-recursive-sync.js'
import * as fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

type TemplateVariations = {
  /** package.json name */
  name: string
  /** Directory in templates dir */
  dirname: string
  db: DbType
  storage: StorageAdapterType
  vercelDeployButtonLink?: string
  envNames?: {
    dbUri: string
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

async function main() {
  const templatesDir = path.resolve(dirname, '../templates')

  const variations: TemplateVariations[] = [
    {
      name: 'payload-vercel-postgres-template',
      dirname: 'with-vercel-postgres',
      db: 'postgres',
      storage: 'vercelBlobStorage',
      vercelDeployButtonLink:
        `https://vercel.com/new/clone?repository-url=` +
        encodeURI(
          `https://github.com/payloadcms/payload/templates/${dirname}` +
            '&project-name=payload-project' +
            '&env=PAYLOAD_SECRET' +
            '&build-command=pnpm run ci' +
            '&stores=[{"type":"postgres"},{"type":"blob"}]', // Postgres and Vercel Blob Storage
        ),
      envNames: {
        // This will replace the process.env.DATABASE_URI to process.env.POSTGRES_URL
        dbUri: 'POSTGRES_URL',
      },
    },
    {
      name: 'payload-vercel-mongodb-template',
      dirname: 'with-vercel-mongodb',
      db: 'mongodb',
      storage: 'vercelBlobStorage',
      vercelDeployButtonLink:
        `https://vercel.com/new/clone?repository-url=` +
        encodeURI(
          `https://github.com/payloadcms/payload/templates/${dirname}` +
            '&project-name=payload-project' +
            '&env=PAYLOAD_SECRET' +
            '&build-command=pnpm run ci' +
            '&stores=[{"type":"blob"}]' + // Vercel Blob Storage
            '&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH', // MongoDB Atlas
        ),
      envNames: {
        dbUri: 'MONGODB_URI',
      },
    },
    {
      name: 'payload-cloud-mongodb-template',
      dirname: 'with-payload-cloud',
      db: 'mongodb',
      storage: 'payloadCloud',
    },
  ]

  for (const { name, dirname, db, storage, vercelDeployButtonLink, envNames } of variations) {
    console.log(`Generating ${name}...`)
    const destDir = path.join(templatesDir, dirname)
    copyRecursiveSync(path.join(templatesDir, 'blank-3.0'), destDir)
    console.log(`Generated ${name} in ${destDir}`)

    // Configure payload config
    await configurePayloadConfig({
      dbType: db,
      packageJsonName: name,
      projectDirOrConfigPath: { projectDir: destDir },
      storageAdapter: storage,
      envNames,
    })

    await generateReadme({
      destDir,
      data: {
        name,
        description: name, // TODO: Add descriptions
        attributes: { db, storage },
        ...(vercelDeployButtonLink && { vercelDeployButtonLink }),
      },
    })

    // Copy in initial migration if db is postgres. This contains user and media.
    if (db === 'postgres') {
      const migrationSrcDir = path.join(templatesDir, '_data/migrations')
      const migrationDestDir = path.join(destDir, 'src/migrations')

      // Make directory if it doesn't exist
      if ((await fs.stat(migrationDestDir).catch(() => null)) === null) {
        await fs.mkdir(migrationDestDir, { recursive: true })
      }
      console.log(`Copying migrations from ${migrationSrcDir} to ${migrationDestDir}`)
      copyRecursiveSync(migrationSrcDir, migrationDestDir)
    }

    // TODO: Email?

    // TODO: Sharp?

    console.log(`Done configuring payload config for ${destDir}/src/payload.config.ts`)
  }
}

async function generateReadme({
  destDir,
  data: { name, description, attributes, vercelDeployButtonLink },
}: {
  destDir: string
  data: {
    name: string
    description: string
    attributes: Pick<TemplateVariations, 'db' | 'storage'>
    vercelDeployButtonLink?: string
  }
}) {
  let header = `# ${name}\n`
  if (vercelDeployButtonLink) {
    header += `[![Deploy with Vercel](https://vercel.com/button)](${vercelDeployButtonLink})\n`
  }

  const readmeContent = `${header}
${description}

## Attributes

- **Database**: ${attributes.db}
- **Storage Adapter**: ${attributes.storage}
`

  const readmePath = path.join(destDir, 'README.md')
  await fs.writeFile(readmePath, readmeContent)
  console.log(`Generated README.md in ${readmePath}`)
}
