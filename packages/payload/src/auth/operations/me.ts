import jwt from 'jsonwebtoken'
import { URL } from 'url'

import type { Collection } from '../../collections/config/types'
import type { PayloadRequest } from '../../types'
import type { User } from '../types'

export type Result = {
  collection?: string
  exp?: number
  token?: string
  user?: User
}

export type Arguments = {
  collection: Collection
  currentToken?: string
  req: PayloadRequest
}

async function me({ collection, currentToken, req }: Arguments): Promise<Result> {
  let result: Result = {
    user: null,
  }

  if (req.user) {
    const parsedURL = new URL(req.url)
    const isGraphQL = parsedURL.pathname === `/api${req.payload.config.routes.graphQL}`

    const user = (await req.payload.findByID({
      id: req.user.id,
      collection: collection.config.slug,
      depth: isGraphQL ? 0 : collection.config.auth.depth,
      overrideAccess: false,
      req,
      showHiddenFields: false,
    })) as User

    if (req.user.collection !== collection.config.slug) {
      return {
        user: null,
      }
    }

    delete user.collection

    result = {
      collection: req.user.collection,
      user,
    }

    if (currentToken) {
      const decoded = jwt.decode(currentToken) as jwt.JwtPayload
      if (decoded) result.exp = decoded.exp
      if (!collection.config.auth.removeTokenFromResponses) result.token = currentToken
    }
  }

  // /////////////////////////////////////
  // After Me - Collection
  // /////////////////////////////////////

  await collection.config.hooks.afterMe.reduce(async (priorHook, hook) => {
    await priorHook

    result =
      (await hook({
        collection: collection?.config,
        context: req.context,
        req,
        response: result,
      })) || result
  }, Promise.resolve())

  return result
}

export default me
