import type { PayloadRequest } from '../types/index.ts'
import type { File, FileData, UploadConfig } from './types.js'

import { APIError } from '../errors/index.js'

type Args = {
  data: FileData
  req: PayloadRequest
  uploadConfig: UploadConfig
}
export const getExternalFile = async ({ data, req, uploadConfig }: Args): Promise<File> => {
  const baseUrl = req.origin || `${req.protocol}://${req.host}`
  const { filename, url } = data

  if (typeof url === 'string') {
    const fileURL = `${baseUrl}${url}`

    const headers = uploadConfig.externalFileHeaderFilter
      ? uploadConfig.externalFileHeaderFilter(req.headers)
      : {
          Authorization: req.headers['authorization'],
          cookie: req.headers['cookie'],
        }

    const res = await fetch(fileURL, {
      credentials: 'include',
      headers,
      method: 'GET',
    })

    if (!res.ok) throw new APIError(`Failed to fetch file from ${fileURL}`, res.status)

    const data = await res.arrayBuffer()

    return {
      name: filename,
      data: Buffer.from(data),
      mimetype: res.headers.get('content-type') || undefined,
      size: Number(res.headers.get('content-length')) || 0,
    }
  }

  throw new APIError('Invalid file url', 400)
}
