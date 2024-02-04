import fs from 'fs/promises'
import parseReadFiles from "./parseReadFiles.js"

export default async function readfFilenames(currentdir) {
  const parsedData = await fs.readdir(currentdir, { withFileTypes: true }, (err, files) => {
    if (err) throw new Error('Operation failed')
    const parsedFiles = parseReadFiles(files)
  
    return parsedFiles
  })

  return parsedData
}

