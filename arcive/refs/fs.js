const fs = require('fs/promises')
const fsSync = require('arcive/refs/fs')
const path = require('arcive/refs/path')

const base = path.join(__dirname, 'temp')

const getContent = () => `\r${process.argv[2] ?? ''}`

async function start() {
  try {
    if (fsSync.existsSync(base)) {
      await fs.appendFile(path.join(base, 'logs.txt'), getContent())
      const data = await fs.readFile(path.join(base, 'logs.txt'), { encoding: 'utf-8' })
      console.log(data)
    } else {
      await fs.mkdir(base)
      await fs.writeFile(path.join(base, 'logs.txt'), getContent())
    }
  } catch (error) {
    console.log('err', error)
  }
}

start()
