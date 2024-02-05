import { createReadStream, createWriteStream } from 'fs'
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import resolveFilename from '../helpers/resolveFilename.js';
import { pipeline } from 'stream/promises';

export async function compress(state, srcFilename, dstFilename) {
  const srcFilenamePath = await resolveFilename(state, srcFilename)
  const dstFilenamePath = dstFilename
  try {
    const readStream = createReadStream(srcFilenamePath)
    const writeStream = createWriteStream(dstFilenamePath)

    const brotliStream = createBrotliCompress()

    await pipeline(readStream, brotliStream, writeStream)

  } catch {
    throw new Error('Operation failed')
  }
}

export async function decompress(state, srcFilename, dstFilename) {
  const srcFilenamePath = await resolveFilename(state, srcFilename)
  const dstFilenamePath = dstFilename
  try {
    const readStream = createReadStream(srcFilenamePath)
    const writeStream = createWriteStream(dstFilenamePath)

    const brotliStream = createBrotliDecompress()

    await pipeline(readStream, brotliStream, writeStream)

  } catch {
    throw new Error('Operation failed')
  }
}