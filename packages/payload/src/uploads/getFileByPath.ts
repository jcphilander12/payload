import filetype from 'file-type'
import fs from 'fs'
import path from 'path'

import type { File } from './types.js'

const { fromFile } = filetype

const getFileByPath = async (filePath: string): Promise<File> => {
  if (typeof filePath === 'string') {
    const data = fs.readFileSync(filePath)
    const mimetype = fromFile(filePath)
    const { size } = fs.statSync(filePath)

    const name = path.basename(filePath)

    return {
      data,
      mimetype: (await mimetype).mime,
      name,
      size,
    }
  }

  return undefined
}

export default getFileByPath
