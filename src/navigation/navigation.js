import {sep} from 'path'
import readfFilenames from '../helpers/readfFilenames.js'

export function up(state) {
  const separator = sep

  const dirUp = path.split(separator)
  dirUp.pop()
  
  return dirUp.length < 2 ? `${dirUp}${separator}` : dirUp.join(separator)
}

export function changedir(state, newdir) {
  const separator = sep


}

export async function ls(state) {
  const parsedFiles = await readfFilenames(state.currentdir)

  console.table(parsedFiles)
}