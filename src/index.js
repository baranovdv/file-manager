import { createInterface } from 'readline'
import os from 'os'
import path from 'path'
import up from './modules/up.js'

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

  console.log(`You are currently in ${currentdir}`)

  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    process.exit()
  })

  rl.on('line', (line) => {
    if(line === '.exit') {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`)
      process.exit()
    }

    if(line === 'up') {
      if (currentdir !== rootdir) currentdir = up(currentdir)

      console.log(`You are currently in ${currentdir}`)
      return
    }

    console.log('Invalid input')
    // console.log(`You are currently in ${currentdir}`)
  }); 

  // process.stdin.on('data', (chunk) => {
  //   console.log(chunk)
  // })
}

app()