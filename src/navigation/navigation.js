import {sep} from 'path'
import readfFilenames from '../helpers/readfFilenames.js'

export function up(state) {
  const separator = sep

  const dirUp = path.split(separator)
  dirUp.pop()
  
  return dirUp.length < 2 ? `${dirUp}${separator}` : dirUp.join(separator)
}

export async function cd(state, newdir) {
  const separator = sep

  let currentdirFolders = await readfFilenames(state.currentdir)

}

export async function ls(state) {
  const parsedFiles = await readfFilenames(state.currentdir)

  console.table(parsedFiles)
}