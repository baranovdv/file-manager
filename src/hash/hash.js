import { createReadStream } from 'fs'
import { createHash } from 'crypto'
import resolveFilename from '../helpers/resolveFilename.js'
import { pipeline } from 'stream/promises'

export default async function hash(state, filename) {
  try {
    const fileToCalculateHashPath = await resolveFilename(state, filename)

    const readStream = createReadStream(fileToCalculateHashPath)

    const hash = createHash('sha256');

    await pipeline(readStream, hash);

    console.log(`File hash: ${hash.digest('hex')}`);
  } catch {
    throw new Error('Operation failed')
  }
}