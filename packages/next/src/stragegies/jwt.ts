import jwt from 'jsonwebtoken'

import type { AuthStrategyFunction, User } from 'payload/auth'

import { extractJWT } from '../utilities/jwt'

type JWTToken = {
  collection: string
  id: string
}

export const JWTAuthentication: AuthStrategyFunction = async ({
  headers,
  isGraphQL = false,
  payload,
}) => {
  try {
    const token = extractJWT({ headers, payload })
    const decodedPayload = jwt.verify(token, payload.secret) as jwt.JwtPayload & JWTToken

    const collection = payload.collections[decodedPayload.collection]

    const user = await payload.findByID({
      id: decodedPayload.id,
      collection: decodedPayload.collection,
      depth: isGraphQL ? 0 : collection.config.auth.depth,
      // TODO(JAMES)(REVIEW): had to remove with new pattern
      // req,
    })

    if (user && (!collection.config.auth.verify || user._verified)) {
      user.collection = collection.config.slug
      user._strategy = 'local-jwt'
      return user as User
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
