import { currentdirMessage, goodbyeMessage } from "../helpers/consoleMessages.js";
import { ls } from "../navigation/navigation.js";

export default async function handleCommand(state, command, ...args) {
  try {
    switch(command) {
      case '.exit':
        goodbyeMessage(state.username)
        process.exit()
      case 'up':

        break
      case 'ls':
        await ls(state)
        break

      default: throw new Error('Invalid input')
    }
  } catch(error) {
    console.log(error.message)
  }
  currentdirMessage(state.currentdir)
}