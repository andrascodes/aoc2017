const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('day02/input.txt'),
  crlfDelay: Infinity
})

const state = {
  checkSumParts: [],
  evenlyDistributedSumParts: []
}

rl.on('line', (line) => {
  const entries = line
                    .split('\t')
                    // .split(' ')
                    .map(entry => Number(entry))
  part1(state, entries)
  part2(state, entries)
})

rl.on('close', () => {
  const checkSum = state.checkSumParts.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  const evenSum = state.evenlyDistributedSumParts.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  console.log('Part1...done. Checksum: ', checkSum)
  console.log('Part2...done. Evenly distributed sum: ', evenSum)
})

const part1 = (state, entries) => {
  const maxEntry = entries.reduce((acc, curr) => {
    if(acc < curr) {
      acc = curr
    }
    return acc
  }, entries[0])

  const minEntry = entries.reduce((acc, curr) => {
    if(acc > curr) {
      acc = curr
    }
    return acc
  }, entries[0])

  state.checkSumParts.push(maxEntry - minEntry)
}

const part2 = (state, entries) => {
  const pairs = entries.map((x, ind, array) => {
    const tail = array.slice(ind + 1)
    return tail.map(y => [x, y])
  })
  .reduce((acc, curr) => {
    return acc.concat(curr)
  })

  const [a, b] = pairs.find(([x, y]) => {
    return (x % y === 0 || y % x === 0)
  })
  
  if(a > b) {
    state.evenlyDistributedSumParts.push(a / b)
  }
  else {
    state.evenlyDistributedSumParts.push(b / a)
  }
}