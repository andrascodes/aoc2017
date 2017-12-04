const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('day04/input.txt'),
  crlfDelay: Infinity
})

const state = {
  validityOfPassesPart1: [],
  validityOfPassesPart2: [],
}

rl.on('line', (line) => {
  const elements = line
                    .split(' ')

  state.validityOfPassesPart1.push(part1(elements))
  state.validityOfPassesPart2.push(part2(elements))
})

rl.on('close', () => {
  const numberOfValidPassesPart1 = state.validityOfPassesPart1.reduce((acc, curr) => (curr) ? (acc += 1) : (acc), 0)
  const numberOfValidPassesPart2 = state.validityOfPassesPart2.reduce((acc, curr) => (curr) ? (acc += 1) : (acc), 0)

  console.log('The number of valid passphrases (Part 1): ', numberOfValidPassesPart1)
  console.log('The number of valid passphrases (Part 2): ', numberOfValidPassesPart2)
  console.log('done')
})

// Part 1
/*
  To ensure security, a valid passphrase must contain no duplicate words.

  For example:

  aa bb cc dd ee is valid.
  aa bb cc dd aa is not valid - the word aa appears more than once.
  aa bb cc dd aaa is valid - aa and aaa count as different words.
  The system's full passphrase list is available as your puzzle input. How many passphrases are valid?
*/

const part1 = input => {
  const uniqueElements = Array.from(new Set(input))

  return input.length === uniqueElements.length
}

// Part 2
/*
  Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

  For example:

  abcde fghij is a valid passphrase.
  abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
  a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
  iiii oiii ooii oooi oooo is valid.
  oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
  Under this new system policy, how many passphrases are valid?
*/

const part2 = input => {

  const sortedInput = input.map( word => Array.from(word).sort().join() )
                        // .map(word => Array.from(word))
                        // .map(word => word.sort())
                        // .map(word => word.join())

  const uniqueInput = Array.from(new Set(sortedInput))

  return sortedInput.length === uniqueInput.length
}