import { fileURLToPath } from 'node:url'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
import { payloadCloudPlugin } from '@payloadcms/plugin-cloud'
import dotenv from 'dotenv'
import path from 'path'

import { buildConfigWithDefaults } from '@test-utils/buildConfigWithDefaults.js'
import { devUser } from '@test-utils/credentials.js'
import { Media } from './collections/Media.js'
import { Users } from './collections/Users.js'

// NOTE: may need to create .env file for testing
dotenv.config({
  path: path.resolve(process.cwd(), './test/plugin-cloud/.env'),
})

export default buildConfigWithDefaults({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Media, Users],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })
  },
  plugins: [payloadCloudPlugin()],
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
