import sortList from "./sortList.js"

export default function parseReadFiles(files) {
  let parsedFiles = files.map((file) => {
    let type = 'unknown'
    if (file.isDirectory()) type = 'directory'
    if (file.isFile()) type = 'file'

    return { name: file.name, type: type}
  })

  parsedFiles = sortList(parsedFiles)
  return parsedFiles
}