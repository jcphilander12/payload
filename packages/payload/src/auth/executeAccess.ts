import type { Access, AccessResult } from '../config/types.js'

import { Forbidden } from '../errors/index.js'

const executeAccess = async (operation, access: Access): Promise<AccessResult> => {
  if (access) {
    const result = await access(operation)

    if (!result) {
      if (!operation.disableErrors) throw new Forbidden(operation.req.t)
    }

    return result
  }

  if (operation.req.user) {
    return true
  }

  if (!operation.disableErrors) throw new Forbidden(operation.req.t)
  return false
}

export default executeAccess
