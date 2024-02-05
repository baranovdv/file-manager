import { add, cat, cp, mv, rmc, rn } from "../file/file.js";
import hash from "../hash/hash.js";
import { currentdirMessage, goodbyeMessage } from "../helpers/consoleMessages.js";
import { cd, ls, up } from "../navigation/navigation.js";
import osc from "../os/os.js";

export default async function handleCommand(state, command, ...args) {
  try {
    switch(command) {
      case '.exit':
        goodbyeMessage(state.username)
        process.exit()
      case 'up':
        up(state)
        break

      case 'cd':
        await cd(state, args[0])
        break

      case 'ls':
        await ls(state)
        break

      case 'cat':
        await cat(state, args[0])
        break

      case 'add':
        await add(state, args[0])
        break

      case 'rm':
        await rmc(state, args[0])
        break

      case 'rn':
        if (args.length < 2) throw new Error('Invalid input')
        await rn(state, args[0], args[1])
        break

      case 'cp':
        if (args.length < 2) throw new Error('Invalid input')
        await cp(state, args[0], args[1])
        break

      case 'mv':
        if (args.length < 2) throw new Error('Invalid input')
        await mv(state, args[0], args[1])
        break

      case 'os':
        osc(args[0])
        break

      case 'hash':
        await hash(state, args[0])
        break

      default: throw new Error('Invalid input')
    }
  } catch(error) {
    console.log(error.message)
  }
  currentdirMessage(state.currentdir)
}