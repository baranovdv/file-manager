import { createInterface } from 'readline'
import os from 'os'
import path from 'path'
import up from './modules/up.js'
import currentdirConsole from './modules/currentdirConsole.js'
import readfFilenames from './modules/readfFilenames.js'

const app = async () => {
  const envArgs = process.argv
  const usernameArg = envArgs[2]
  const homedir = os.homedir()
  const rootdir = path.resolve("/")

  let username = ''
  let currentdir = homedir 

  if (usernameArg.startsWith('--username=')) {
    username = usernameArg.split('=')[1]
    console.log(`Welcome to the File Manager, ${username}!`)
  } else return

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  }); 

  currentdirConsole(currentdir)

  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    process.exit()
  })

  rl.on('line', async (line) => {
    if(line === '.exit') {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`)
      process.exit()
    }

    if(line === 'up') {
      if (currentdir !== rootdir) currentdir = up(currentdir)

      currentdirConsole(currentdir)
      return
    }

    if(line === 'ls') {
      const parsedFiles = await readfFilenames(currentdir)

      console.table(parsedFiles)

      currentdirConsole(currentdir)
      return
    }

    console.log('Invalid input')
    // console.log(`You are currently in ${currentdir}`)
  }); 

  // process.stdin.on('data', (chunk) => {
  //   console.log(chunk)
  // })
}

await app()