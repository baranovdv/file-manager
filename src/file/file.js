import path from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { access } from 'fs/promises'
import readfFilenames from '../helpers/readfFilenames.js'
import { pipeline } from 'stream'
import { stdout } from 'process'


export async function cat(state, filename) {
  const currentdirItems = await readfFilenames(state.currentdir)
  const currentdirFiles = currentdirItems.filter((file) => file.type === 'file')

  let readFilePath = ''

  try {
    if (currentdirFiles.some((file) => file.name === filename)) {

      readFilePath = path.join(state.currentdir, filename)
    } else {
      await access(filename)

      readFilePath = filename
    }
    const readStream = createReadStream(readFilePath, 'utf-8');

    readStream.pipe(process.stdout)
  } catch {
    throw new Error('Operation failed')
  }
}