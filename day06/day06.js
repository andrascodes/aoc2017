const util = require('util');
const fs = require('fs');

const main = async () => {

  const readFile = util.promisify(fs.readFile)
  try {
    const file = await readFile("day06/test.txt", 'utf8')
    const input = file.split('\t').map(str => Number(str))
    console.log(input)
  }
  catch(error) {
    console.error(error)
  }
  
}

main()