export default function sortList(list) {
  const directories = list.filter((file) => file.type === 'directory')
  const files = list.filter((file) => file.type === 'file')

  directories.sort((a, b) => a.name.localeCompare(b.name))
  files.sort((a, b) => a.name.localeCompare(b.name))

  return [...directories, ...files]
}