import { createInterface } from 'readline'
import os from 'os'
import path from 'path'
import argvParser from './helpers/argvParser.js'
import { currentdirMessage, goodbyeMessage, greetingsMessage } from './helpers/consoleMessages.js'
import handleCommand from './handleCommand/handleCommand.js'

const app = async () => {
  const state = {}
  const envArgs = process.argv
  const argsParsed = argvParser(envArgs)

  state.username = argsParsed.username ?? 'Guest'
  state.homedir = os.homedir()
  state.rootdir = path.resolve("/")
  state.currentdir = state.homedir


  greetingsMessage(state.username)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  }); 

  currentdirMessage(state.currentdir)

  try {
    rl.on('SIGINT', () => {
      goodbyeMessage(state.username)
      process.exit()
    })

    rl.on('line', async (line) => {
      const lineParsed = line.trim().split(' ')
      const command = lineParsed.shift()

      await handleCommand(state, command, ...lineParsed)
    })
  } catch (error) {
    console.error(error.message)
  }
}

await app()