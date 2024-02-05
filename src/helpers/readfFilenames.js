import fs from 'fs/promises'
import parseReadFiles from './parseReadFiles.js'

export default async function readfFilenames(currentdir) {
  const files = await fs.readdir(currentdir, { withFileTypes: true }, (err) => {
    if (err) throw new Error('Operation failed')
  })

  const parsedData = parseReadFiles(files)

  return parsedData
}

