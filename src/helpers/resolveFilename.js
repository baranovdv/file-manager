import path from 'path'
import readfFilenames from "./readfFilenames.js"
import { access } from 'fs/promises'

export default async function resolveFilename(state, filename) {
  const currentdirItems = await readfFilenames(state.currentdir)
  const currentdirFiles = currentdirItems.filter((file) => file.type === 'file')

  let filePath = ''

  try {
    if (currentdirFiles.some((file) => file.name === filename)) {

      filePath = path.join(state.currentdir, filename)
    } else {
      await access(filename)

      filePath = filename
    }

    return filePath
  } catch {
    throw new Error('Operation failed')
  }
}