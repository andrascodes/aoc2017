const util = require('util');
const fs = require('fs');

const part1 = (input) => {
  let steps = 0
  let currentInd = 0

  while(input[currentInd] !== undefined) {
    const move = input[currentInd]
    input[currentInd]++
    currentInd += move
    steps++
  }
  return steps
}

const part2 = (input) => {
  let steps = 0
  let currentInd = 0

  while(input[currentInd] !== undefined) {
    const move = input[currentInd]
    if(input[currentInd] >= 3) {
      input[currentInd]--
    }
    else {
      input[currentInd]++
    }
    currentInd += move
    steps++
  }
  return steps
}

const main = async () => {

  const readFile = util.promisify(fs.readFile)
  try {
    const file = await readFile("day05/input.txt", 'utf8')
    const input = file.split('\n').map(str => Number(str))
    const part1Input = input.slice(0)
    const part2Input = input.slice(0)
    console.log('Steps taken with Part 1: ', part1(part1Input))
    console.log('Steps taken with Part 2: ', part2(part2Input))
  }
  catch(error) {
    console.error(error)
  }
  
}

main()