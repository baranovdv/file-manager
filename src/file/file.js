import path from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { copyFile, mkdir, rename, rm, rmdir, stat, writeFile } from 'fs/promises'
import resolveFilename from '../helpers/resolveFilename.js'
import { pipeline } from 'stream/promises'

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

export async function rmc(state, filename) {
  const currentFilePath = await resolveFilename(state, filename)
  try {
    const stats = await stat(currentFilePath)

    if (stats.isDirectory()) {
      await rm(currentFilePath, { recursive: true })
    } else {
      await rm(currentFilePath)
    }
  } catch {
    throw new Error('Operation failed')
  }
}

export async function cp(state, filenamepath, newdir) {
  try {
    const currentFilePath = await resolveFilename(state, filenamepath)
    const filename = currentFilePath.split(path.sep).slice(-1)[0]
    const destFilePath = path.join(newdir, filename)

    const srcStream = createReadStream(currentFilePath, 'utf-8')
    await mkdir(newdir, { recursive: true })
    const destStream = createWriteStream(destFilePath, { flags: 'w' })
    await pipeline(srcStream, destStream)

  } catch {
    throw new Error('Operation failed')
  }
}