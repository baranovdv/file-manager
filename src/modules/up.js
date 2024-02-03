import {sep} from 'path'

export default function up(path) {
  const separator = sep

  const dirUp = path.split(separator)
  dirUp.pop()
  
  return dirUp.length < 2 ? `${dirUp}${separator}` : dirUp.join(separator)
}