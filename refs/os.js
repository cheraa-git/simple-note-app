const os = require('os')

console.log(os.platform())
console.log(os.arch())
console.log(os.cpus())
console.log(os.freemem())
console.log(os.totalmem())
console.log('компьютер работает',os.uptime() / 60 /60 / 24, 'дней')
console.log(os.homedir())
