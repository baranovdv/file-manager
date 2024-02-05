export default function checkArgs(args) {
  const stringFromArgsArray = args.join(' ')

  if (stringFromArgsArray.includes("'")) {
    const parsedArray = stringFromArgsArray.split("'").filter((item) => !!item.trim())
    return parsedArray
  } 
  if (stringFromArgsArray.includes('"')) {
    const parsedArray = stringFromArgsArray.split('"').filter((item) => !!item.trim())
    return parsedArray
  } 

  return args
}