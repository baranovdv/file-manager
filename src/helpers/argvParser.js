export default function argvParser(envArgs) {
  const envArgsParsed = {}

  envArgs.forEach((arg) => {
    if (arg.startsWith('--')) {
      const argParsed = arg.split('=')

      envArgsParsed[argParsed[0].slice(2)] = argParsed[1]
    }
  })
  
  return envArgsParsed
}