import {sep} from 'path'

export default function createPath(basePath, ...args) {
  if (basePath === sep) return `${basePath}${args.join(sep)}`
  const newPathArray = basePath.split(sep)

  return [...newPathArray, ...args].join(sep)
}