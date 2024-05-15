import type { Config } from './types.js'

export const defaults: Omit<Config, 'db' | 'editor' | 'secret'> = {
  admin: {
    avatar: 'default',
    components: {},
    custom: {},
    dateFormat: 'MMMM do yyyy, h:mm a',
    disable: false,
    meta: {
      openGraph: {
        description:
          'Payload is a headless CMS and application framework built with TypeScript, Node.js, and React.',
        siteName: 'Payload App',
        title: 'Payload App',
      },
      titleSuffix: '- Payload',
    },
    routes: {
      account: '/account',
      createFirstUser: '/create-first-user',
      forgot: '/forgot',
      inactivity: '/logout-inactivity',
      login: '/login',
      logout: '/logout',
      unauthorized: '/unauthorized',
    },
  },
  bin: [],
  collections: [],
  cookiePrefix: 'payload',
  cors: [],
  csrf: [],
  custom: {},
  defaultDepth: 2,
  defaultMaxTextLength: 40000,
  endpoints: [],
  globals: [],
  graphQL: {
    disablePlaygroundInProduction: true,
    maxComplexity: 1000,
    schemaOutputFile: `${typeof process?.cwd === 'function' ? process.cwd() : ''}/schema.graphql`,
  },
  hooks: {},
  i18n: {},
  localization: false,
  maxDepth: 10,
  routes: {
    admin: '/admin',
    api: '/api',
    graphQL: '/graphql',
    graphQLPlayground: '/graphql-playground',
  },
  serverURL: '',
  telemetry: true,
  typescript: {
    outputFile: `${typeof process?.cwd === 'function' ? process.cwd() : ''}/payload-types.ts`,
  },
  upload: {},
}
