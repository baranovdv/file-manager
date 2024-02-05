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
  let currentdirFolders = await readfFilenames(state.currentdir)
  currentdirFolders = currentdirFolders.filter((file) => file.type === 'directory')

  if (currentdirFolders.some((dir) => dir.name === newdir)) {

    state.currentdir = createPath(state.currentdir, newdir)
    return
  }

  try {
    const newdirAccess = await fs.access(newdir)
    state.currentdir = newdir
    return
  } catch {
    throw new Error('Invalid input')
  }
}

export async function ls(state) {
  const parsedFiles = await readfFilenames(state.currentdir)

  console.table(parsedFiles)
}