const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('day04/input.txt'),
  crlfDelay: Infinity
})

const state = {
  validityOfPasses: []
}

rl.on('line', (line) => {
  const elements = line
                    .split(' ')

  state.validityOfPasses.push(part1(elements))
})

rl.on('close', () => {
  const numberOfValidPasses = state.validityOfPasses.reduce((acc, curr) => (curr) ? (acc += 1) : (acc), 0)

  console.log('The number of valid passphrases: ', numberOfValidPasses)
  console.log('done')
})

const part1 = input => {
  const uniqueElements = Array.from(new Set(input))

  return input.length === uniqueElements.length
}