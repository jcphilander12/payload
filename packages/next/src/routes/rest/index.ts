import type { Endpoint } from 'payload/config'
import type {
  Collection,
  GlobalConfig,
  PayloadRequest,
  PayloadRequestData,
  SanitizedConfig,
} from 'payload/types'

import httpStatus from 'http-status'
import { match } from 'path-to-regexp'

import type {
  CollectionRouteHandler,
  CollectionRouteHandlerWithID,
  GlobalRouteHandler,
  GlobalRouteHandlerWithID,
} from './types.js'

import { addDataAndFileToRequest } from '../../utilities/addDataAndFileToRequest.js'
import { addLocalesToRequestFromData } from '../../utilities/addLocalesToRequest.js'
import { createPayloadRequest } from '../../utilities/createPayloadRequest.js'
import { headersWithCors } from '../../utilities/headersWithCors.js'
import { access } from './auth/access.js'
import { forgotPassword } from './auth/forgotPassword.js'
import { init } from './auth/init.js'
import { login } from './auth/login.js'
import { logout } from './auth/logout.js'
import { me } from './auth/me.js'
import { refresh } from './auth/refresh.js'
import { registerFirstUser } from './auth/registerFirstUser.js'
import { resetPassword } from './auth/resetPassword.js'
import { unlock } from './auth/unlock.js'
import { verifyEmail } from './auth/verifyEmail.js'
import { buildFormState } from './buildFormState.js'
import { endpointsAreDisabled } from './checkEndpoints.js'
import { count } from './collections/count.js'
import { create } from './collections/create.js'
import { deleteDoc } from './collections/delete.js'
import { deleteByID } from './collections/deleteByID.js'
import { docAccess } from './collections/docAccess.js'
import { duplicate } from './collections/duplicate.js'
import { find } from './collections/find.js'
import { findByID } from './collections/findByID.js'
import { findVersionByID } from './collections/findVersionByID.js'
import { findVersions } from './collections/findVersions.js'
import { preview as previewCollection } from './collections/preview.js'
import { restoreVersion } from './collections/restoreVersion.js'
import { update } from './collections/update.js'
import { updateByID } from './collections/updateByID.js'
import { getFile } from './files/getFile.js'
import { docAccess as docAccessGlobal } from './globals/docAccess.js'
import { findOne } from './globals/findOne.js'
import { findVersionByID as findVersionByIdGlobal } from './globals/findVersionByID.js'
import { findVersions as findVersionsGlobal } from './globals/findVersions.js'
import { preview as previewGlobal } from './globals/preview.js'
import { restoreVersion as restoreVersionGlobal } from './globals/restoreVersion.js'
import { update as updateGlobal } from './globals/update.js'
import { generateOGImage } from './og/index.js'
import { routeError } from './routeError.js'

const endpoints = {
  collection: {
    DELETE: {
      delete: deleteDoc,
      deleteByID,
    },
    GET: {
      count,
      'doc-access-by-id': docAccess,
      'doc-versions-by-id': findVersionByID,
      find,
      findByID,
      getFile,
      init,
      me,
      preview: previewCollection,
      versions: findVersions,
    },
    PATCH: {
      update,
      updateByID,
    },
    POST: {
      access: docAccess,
      create,
      'doc-access-by-id': docAccess,
      'doc-verify-by-id': verifyEmail,
      'doc-versions-by-id': restoreVersion,
      duplicate,
      'first-register': registerFirstUser,
      'forgot-password': forgotPassword,
      login,
      logout,
      'refresh-token': refresh,
      'reset-password': resetPassword,
      unlock,
    },
  },
  global: {
    GET: {
      'doc-access': docAccessGlobal,
      'doc-versions': findVersionsGlobal,
      'doc-versions-by-id': findVersionByIdGlobal,
      findOne,
      preview: previewGlobal,
    },
    POST: {
      'doc-access': docAccessGlobal,
      'doc-versions-by-id': restoreVersionGlobal,
      update: updateGlobal,
    },
  },
  root: {
    GET: {
      access,
      og: generateOGImage,
    },
    POST: {
      'form-state': buildFormState,
    },
  },
}

const handleCustomEndpoints = ({
  endpoints,
  entitySlug,
  payloadRequest,
}: {
  endpoints: Endpoint[] | GlobalConfig['endpoints']
  entitySlug?: string
  payloadRequest: PayloadRequest
}): Promise<Response> | Response => {
  if (endpoints && endpoints.length > 0) {
    let handlerParams = {}
    const { pathname } = payloadRequest

    /*
     * This makes sure the next.js basePath property is supported. If basePath is used, payload config.routes.api should include it. This makes all outgoing frontend request
     * target the correct API endpoint starting with basePath, which is good!
     *
     * The incoming request (here) will not include the basePath though, as it's automatically stripped by Next.js. Since we are adding the basePath to the pathPrefix below though
     * (from payloadRequest.payload.config.routes.api) we need to add it to pathname, which does not contain the basePath. Otherwise, no endpoint will be matched if basePath is set.
     */
    let adjustedPathname = pathname

    if (process.env.NEXT_BASE_PATH) {
      adjustedPathname = process.env.NEXT_BASE_PATH + pathname
    }

    const pathPrefix =
      payloadRequest.payload.config.routes.api + (entitySlug ? `/${entitySlug}` : '')

    const customEndpoint = endpoints.find((endpoint) => {
      if (endpoint.method === payloadRequest.method.toLowerCase()) {
        const pathMatchFn = match(`${pathPrefix}${endpoint.path}`, {
          decode: decodeURIComponent,
        })

        const tempParams = pathMatchFn(adjustedPathname)
        if (tempParams) {
          handlerParams = tempParams.params
          return true
        }
      }
    })

    if (customEndpoint) {
      payloadRequest.routeParams = {
        ...payloadRequest.routeParams,
        ...handlerParams,
      }
      return customEndpoint.handler(payloadRequest)
    }
  }

  return null
}

const RouteNotFoundResponse = ({ slug, req }: { req: PayloadRequest; slug: string[] }) =>
  Response.json(
    {
      message: `Route Not Found: "${slug.join('/')}"`,
    },
    {
      headers: headersWithCors({
        headers: new Headers(),
        req,
      }),
      status: httpStatus.NOT_FOUND,
    },
  )

export const OPTIONS =
  (config: Promise<SanitizedConfig> | SanitizedConfig) => async (request: Request) => {
    let req: PayloadRequest

    try {
      req = await createPayloadRequest({
        config,
        request,
      })

      return Response.json(
        {},
        {
          headers: headersWithCors({
            headers: new Headers(),
            req,
          }),
          status: 200,
        },
      )
    } catch (error) {
      return routeError({
        config,
        err: error,
        req: req || request,
      })
    }
  }

export const GET =
  (config: Promise<SanitizedConfig> | SanitizedConfig) =>
  async (request: Request, { params: { slug } }: { params: { slug: string[] } }) => {
    const [slug1, slug2, slug3, slug4] = slug
    let req: PayloadRequest | (PayloadRequest & PayloadRequestData)
    let res: Response
    let collection: Collection

    try {
      req = await createPayloadRequest({
        config,
        request,
      })

      const disableEndpoints = endpointsAreDisabled({
        endpoints: req.payload.config.endpoints,
        request,
      })

      if (disableEndpoints) return disableEndpoints

      collection = req.payload.collections?.[slug1]

      if (collection) {
        req.routeParams.collection = slug1
        const disableEndpoints = endpointsAreDisabled({
          endpoints: collection.config.endpoints,
          request,
        })
        if (disableEndpoints) return disableEndpoints

        const customEndpointResponse = await handleCustomEndpoints({
          endpoints: collection.config.endpoints,
          entitySlug: slug1,
          payloadRequest: req,
        })

        if (customEndpointResponse) {
          return customEndpointResponse
        } else {
          const reqWithData = await addDataAndFileToRequest({ request: req })
          const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })

          switch (slug.length) {
            case 1:
              // /:collection
              res = await endpoints.collection.GET.find({ collection, req: payloadRequest })
              break
            case 2:
              if (slug2 in endpoints.collection.GET) {
                // /:collection/init
                // /:collection/me
                // /:collection/versions
                // /:collection/count
                res = await (endpoints.collection.GET[slug2] as CollectionRouteHandler)({
                  collection,
                  req: payloadRequest,
                })
              } else {
                // /:collection/:id
                res = await endpoints.collection.GET.findByID({
                  id: slug2,
                  collection,
                  req: payloadRequest,
                })
              }
              break
            case 3:
              if (slug2 === 'file') {
                // /:collection/file/:filename
                res = await endpoints.collection.GET.getFile({
                  collection,
                  filename: slug3,
                  req: payloadRequest,
                })
              } else if (slug3 in endpoints.collection.GET) {
                // /:collection/:id/preview
                res = await (endpoints.collection.GET[slug3] as CollectionRouteHandlerWithID)({
                  id: slug2,
                  collection,
                  req: payloadRequest,
                })
              } else if (`doc-${slug2}-by-id` in endpoints.collection.GET) {
                // /:collection/access/:id
                // /:collection/versions/:id
                res = await (
                  endpoints.collection.GET[`doc-${slug2}-by-id`] as CollectionRouteHandlerWithID
                )({ id: slug3, collection, req: payloadRequest })
              }
              break
          }
        }
      } else if (slug1 === 'globals') {
        const globalConfig = req.payload.config.globals.find((global) => global.slug === slug2)
        req.routeParams.global = globalConfig.slug

        const disableEndpoints = endpointsAreDisabled({
          endpoints: globalConfig.endpoints,
          request,
        })
        if (disableEndpoints) return disableEndpoints

        const customEndpointResponse = await handleCustomEndpoints({
          endpoints: globalConfig.endpoints,
          entitySlug: `${slug1}/${slug2}`,
          payloadRequest: req,
        })

        if (customEndpointResponse) {
          return customEndpointResponse
        } else {
          const reqWithData = await addDataAndFileToRequest({ request: req })
          const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })

          switch (slug.length) {
            case 2:
              // /globals/:slug
              res = await endpoints.global.GET.findOne({ globalConfig, req: payloadRequest })
              break
            case 3:
              if (slug3 in endpoints.global.GET) {
                // /globals/:slug/preview
                res = await (endpoints.global.GET[slug3] as GlobalRouteHandler)({
                  globalConfig,
                  req: payloadRequest,
                })
              } else if (`doc-${slug3}` in endpoints.global.GET) {
                // /globals/:slug/access
                // /globals/:slug/versions
                // /globals/:slug/preview
                res = await (endpoints.global.GET?.[`doc-${slug3}`] as GlobalRouteHandler)({
                  globalConfig,
                  req: payloadRequest,
                })
              }
              break
            case 4:
              if (`doc-${slug3}-by-id` in endpoints.global.GET) {
                // /globals/:slug/versions/:id
                res = await (
                  endpoints.global.GET?.[`doc-${slug3}-by-id`] as GlobalRouteHandlerWithID
                )({
                  id: slug4,
                  globalConfig,
                  req: payloadRequest,
                })
              }
              break
          }
        }
      } else if (slug.length === 1 && slug1 in endpoints.root.GET) {
        const reqWithData = await addDataAndFileToRequest({ request: req })
        const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })
        res = await endpoints.root.GET[slug1]({ req: payloadRequest })
      }

      if (res instanceof Response) return res

      // root routes
      const customEndpointResponse = await handleCustomEndpoints({
        endpoints: req.payload.config.endpoints,
        payloadRequest: req,
      })
      if (customEndpointResponse) return customEndpointResponse

      return RouteNotFoundResponse({
        slug,
        req,
      })
    } catch (error) {
      return routeError({
        collection,
        config,
        err: error,
        req: req || request,
      })
    }
  }

export const POST =
  (config: Promise<SanitizedConfig> | SanitizedConfig) =>
  async (request: Request, { params: { slug } }: { params: { slug: string[] } }) => {
    const [slug1, slug2, slug3, slug4] = slug
    let req: PayloadRequest
    let res: Response
    let collection: Collection

    try {
      req = await createPayloadRequest({
        config,
        request,
      })

      collection = req.payload.collections?.[slug1]

      const disableEndpoints = endpointsAreDisabled({
        endpoints: req.payload.config.endpoints,
        request,
      })

      if (disableEndpoints) return disableEndpoints

      if (collection) {
        req.routeParams.collection = slug1
        const disableEndpoints = endpointsAreDisabled({
          endpoints: collection.config.endpoints,
          request,
        })
        if (disableEndpoints) return disableEndpoints

        const customEndpointResponse = await handleCustomEndpoints({
          endpoints: collection.config.endpoints,
          entitySlug: slug1,
          payloadRequest: req,
        })

        if (customEndpointResponse) {
          return customEndpointResponse
        } else {
          const reqWithData = await addDataAndFileToRequest({ request: req })
          const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })

          switch (slug.length) {
            case 1:
              // /:collection
              res = await endpoints.collection.POST.create({ collection, req: payloadRequest })
              break
            case 2:
              if (slug2 in endpoints.collection.POST) {
                // /:collection/login
                // /:collection/logout
                // /:collection/unlock
                // /:collection/access
                // /:collection/first-register
                // /:collection/forgot-password
                // /:collection/reset-password
                // /:collection/refresh-token

                res = await (endpoints.collection.POST?.[slug2] as CollectionRouteHandler)({
                  collection,
                  req: payloadRequest,
                })
              }
              break
            case 3:
              if (`doc-${slug2}-by-id` in endpoints.collection.POST) {
                // /:collection/access/:id
                // /:collection/versions/:id
                // /:collection/verify/:token ("doc-verify-by-id" uses id as token internally)
                res = await (
                  endpoints.collection.POST[`doc-${slug2}-by-id`] as CollectionRouteHandlerWithID
                )({ id: slug3, collection, req: payloadRequest })
              } else if (slug3 === 'duplicate' && collection.config.disableDuplicate !== true) {
                // /:collection/:id/duplicate
                res = await endpoints.collection.POST.duplicate({
                  id: slug2,
                  collection,
                  req: payloadRequest,
                })
              }
              break
          }
        }
      } else if (slug1 === 'globals' && slug2) {
        const globalConfig = req.payload.config.globals.find((global) => global.slug === slug2)
        req.routeParams.global = globalConfig.slug

        const disableEndpoints = endpointsAreDisabled({
          endpoints: globalConfig.endpoints,
          request,
        })
        if (disableEndpoints) return disableEndpoints

        const customEndpointResponse = await handleCustomEndpoints({
          endpoints: globalConfig.endpoints,
          entitySlug: `${slug1}/${slug2}`,
          payloadRequest: req,
        })

        if (customEndpointResponse) {
          return customEndpointResponse
        } else {
          const reqWithData = await addDataAndFileToRequest({ request: req })
          const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })
          switch (slug.length) {
            case 2:
              // /globals/:slug
              res = await endpoints.global.POST.update({ globalConfig, req: payloadRequest })
              break
            case 3:
              if (`doc-${slug3}` in endpoints.global.POST) {
                // /globals/:slug/access
                res = await (endpoints.global.POST?.[`doc-${slug3}`] as GlobalRouteHandler)({
                  globalConfig,
                  req: payloadRequest,
                })
              }
              break
            case 4:
              if (`doc-${slug3}-by-id` in endpoints.global.POST) {
                // /globals/:slug/versions/:id
                res = await (
                  endpoints.global.POST?.[`doc-${slug3}-by-id`] as GlobalRouteHandlerWithID
                )({
                  id: slug4,
                  globalConfig,
                  req: payloadRequest,
                })
              }
              break
            default:
              res = new Response('Route Not Found', { status: 404 })
          }
        }
      } else if (slug.length === 1 && slug1 in endpoints.root.POST) {
        const reqWithData = await addDataAndFileToRequest({ request: req })
        const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })
        res = await endpoints.root.POST[slug1]({ req: payloadRequest })
      }

      if (res instanceof Response) return res

      // root routes
      const customEndpointResponse = await handleCustomEndpoints({
        endpoints: req.payload.config.endpoints,
        payloadRequest: req,
      })
      if (customEndpointResponse) return customEndpointResponse

      return RouteNotFoundResponse({
        slug,
        req,
      })
    } catch (error) {
      return routeError({
        collection,
        config,
        err: error,
        req: req || request,
      })
    }
  }

export const DELETE =
  (config: Promise<SanitizedConfig> | SanitizedConfig) =>
  async (request: Request, { params: { slug } }: { params: { slug: string[] } }) => {
    const [slug1, slug2] = slug
    let req: PayloadRequest
    let res: Response
    let collection: Collection

    try {
      req = await createPayloadRequest({
        config,
        request,
      })
      collection = req.payload.collections?.[slug1]

      const disableEndpoints = endpointsAreDisabled({
        endpoints: req.payload.config.endpoints,
        request,
      })
      if (disableEndpoints) return disableEndpoints

      if (collection) {
        req.routeParams.collection = slug1

        const disableEndpoints = endpointsAreDisabled({
          endpoints: collection.config.endpoints,
          request,
        })
        if (disableEndpoints) return disableEndpoints

        const customEndpointResponse = await handleCustomEndpoints({
          endpoints: collection.config.endpoints,
          entitySlug: slug1,
          payloadRequest: req,
        })
        if (customEndpointResponse) {
          return customEndpointResponse
        } else {
          const reqWithData = await addDataAndFileToRequest({ request: req })
          const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })

          switch (slug.length) {
            case 1:
              // /:collection
              res = await endpoints.collection.DELETE.delete({ collection, req: payloadRequest })
              break
            case 2:
              // /:collection/:id
              res = await endpoints.collection.DELETE.deleteByID({
                id: slug2,
                collection,
                req: payloadRequest,
              })
              break
          }
        }
      }

      if (res instanceof Response) return res

      // root routes
      const customEndpointResponse = await handleCustomEndpoints({
        endpoints: req.payload.config.endpoints,
        payloadRequest: req,
      })
      if (customEndpointResponse) return customEndpointResponse

      return RouteNotFoundResponse({
        slug,
        req,
      })
    } catch (error) {
      return routeError({
        collection,
        config,
        err: error,
        req: req || request,
      })
    }
  }

export const PATCH =
  (config: Promise<SanitizedConfig> | SanitizedConfig) =>
  async (request: Request, { params: { slug } }: { params: { slug: string[] } }) => {
    const [slug1, slug2] = slug
    let req: PayloadRequest
    let res: Response
    let collection: Collection

    try {
      req = await createPayloadRequest({
        config,
        request,
      })
      collection = req.payload.collections?.[slug1]

      const disableEndpoints = endpointsAreDisabled({
        endpoints: req.payload.config.endpoints,
        request,
      })
      if (disableEndpoints) return disableEndpoints

      if (collection) {
        req.routeParams.collection = slug1

        const disableEndpoints = endpointsAreDisabled({
          endpoints: collection.config.endpoints,
          request,
        })
        if (disableEndpoints) return disableEndpoints

        const customEndpointResponse = await handleCustomEndpoints({
          endpoints: collection.config.endpoints,
          entitySlug: slug1,
          payloadRequest: req,
        })

        if (customEndpointResponse) {
          return customEndpointResponse
        } else {
          const reqWithData = await addDataAndFileToRequest({ request: req })
          const payloadRequest = addLocalesToRequestFromData({ request: reqWithData })

          switch (slug.length) {
            case 1:
              // /:collection
              res = await endpoints.collection.PATCH.update({ collection, req: payloadRequest })
              break
            case 2:
              // /:collection/:id
              res = await endpoints.collection.PATCH.updateByID({
                id: slug2,
                collection,
                req: payloadRequest,
              })
              break
          }
        }
      }

      if (res instanceof Response) return res

      // root routes
      const customEndpointResponse = await handleCustomEndpoints({
        endpoints: req.payload.config.endpoints,
        payloadRequest: req,
      })
      if (customEndpointResponse) return customEndpointResponse

      return RouteNotFoundResponse({
        slug,
        req,
      })
    } catch (error) {
      return routeError({
        collection,
        config,
        err: error,
        req: req || request,
      })
    }
  }
