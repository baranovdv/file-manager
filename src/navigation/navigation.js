import {sep} from 'path'
import fs from 'fs/promises'
import readfFilenames from '../helpers/readfFilenames.js'
import createPath from '../helpers/createPath.js'

export function up(state) {
  const dirUp = state.currentdir.split(sep)
  dirUp.pop()
  
  state.currentdir = dirUp.length < 2 ? `${dirUp}${sep}` : dirUp.join(sep)
}

export async function cd(state, newdir) {
  const currentdirItems = await readfFilenames(state.currentdir)
  const currentdirFolders = currentdirItems.filter((file) => file.type === 'directory')
  try {
    if (currentdirFolders.some((dir) => dir.name === newdir)) {
      state.currentdir = createPath(state.currentdir, newdir)

      return
    } else {
      await fs.access(newdir)

      state.currentdir = newdir

      return
    }
  } catch {
    throw new Error('Operation failed')
  }
}

export async function ls(state) {
  const parsedFiles = await readfFilenames(state.currentdir)

  console.table(parsedFiles)
}
