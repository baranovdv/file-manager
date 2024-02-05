import path, { dirname } from 'path'
import { createReadStream } from 'fs'
import { access, rename, writeFile } from 'fs/promises'
import readfFilenames from '../helpers/readfFilenames.js'
import { pipeline } from 'stream'
import resolveFilename from '../helpers/resolveFilename.js'


export async function cat(state, filename) {
  try {
    const readFilePath = await resolveFilename(state, filename)
    const readStream = createReadStream(readFilePath, 'utf-8');

    readStream.pipe(process.stdout)
    readStream.on('end', () => {
      console.log('')
    })
    
  } catch {
    throw new Error('Operation failed')
  }
}

export async function add(state, filename) {
  const newFilePath = path.join(state.currentdir, filename)

  try {
    await writeFile(newFilePath, '')
  } catch {
    throw new Error('Operation failed')
  }
}

export async function rn(state, filename, newfilename) {
  const currentFilePath = await resolveFilename(state, filename)
  const dirname = path.dirname(currentFilePath)
  const newFilePath = path.join(dirname, newfilename)
  
  try {
    await rename(currentFilePath, newFilePath)
  } catch {
    throw new Error('Operation failed')
  }
}