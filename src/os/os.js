import os from 'os'

export default function osc(command) {
  switch (command) {
    case '--EOL':
      console.log(`--EOL: ${JSON.stringify(os.EOL)}`)
      break

    case '--cpus':
      cpusData()
      break

    case '--homedir':
      console.log(`--homedir: ${os.homedir()}`)
      break

    case '--username':
      console.log(`--username: ${os.userInfo().username}`)
      break

    case '--architecture':
      console.log(`--architecture: ${process.arch}`)
      break

    default: throw new Error('Invalid input')
  }
}

function cpusData() {
  const cpu = os.cpus();

  const cpusData = cpu.map((cpu) => {
    const model = cpu.model
    const speed = (cpu.speed / 1000).toFixed(1)

    return {model, speed}
  })
  console.log(`Num of cpus: ${cpusData.length}`)
  console.table(cpusData)
}