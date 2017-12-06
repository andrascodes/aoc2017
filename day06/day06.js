const util = require('util');
const fs = require('fs');

const part1 = memoryBanks => {

  const previousConfigs = []

  while(!previousConfigs.includes(memoryBanks.join())) {
    
    previousConfigs.push(memoryBanks.join())

    let indexOfBankWithMostBlocks = memoryBanks.reduce((maxIndex, currentValue, currentIndex, array) => {
      if(currentValue > array[maxIndex]) {
        maxIndex = currentIndex
      }
      return maxIndex
    }, 0)

    let index = indexOfBankWithMostBlocks
    let blocksToBeRedistributed = memoryBanks[indexOfBankWithMostBlocks]
    memoryBanks[indexOfBankWithMostBlocks] = 0
    while(blocksToBeRedistributed > 0) {
      index++
      if(memoryBanks[index] === undefined) {
        index = 0
      }
      memoryBanks[index]++
      blocksToBeRedistributed--
    }
  }

  return previousConfigs.length

}

const part2 = memoryBanks => {
  
    const previousConfigs = []
    
    while(!previousConfigs.includes(memoryBanks.join())) {

      previousConfigs.push(memoryBanks.join())
  
      let indexOfBankWithMostBlocks = memoryBanks.reduce((maxIndex, currentValue, currentIndex, array) => {
        if(currentValue > array[maxIndex]) {
          maxIndex = currentIndex
        }
        return maxIndex
      }, 0)
  
      let index = indexOfBankWithMostBlocks
      let blocksToBeRedistributed = memoryBanks[indexOfBankWithMostBlocks]
      memoryBanks[indexOfBankWithMostBlocks] = 0
      while(blocksToBeRedistributed > 0) {
        index++
        if(memoryBanks[index] === undefined) {
          index = 0
        }
        memoryBanks[index]++
        blocksToBeRedistributed--
      }
    }
    
    const repeatingConfig = memoryBanks.join()
    const indexOfFirstOccuranceOfRepeatingConfig = previousConfigs.findIndex(value => {
      return value === repeatingConfig
    })

    return previousConfigs.length - indexOfFirstOccuranceOfRepeatingConfig
  
  }

const main = async () => {

  const readFile = util.promisify(fs.readFile)
  try {
    const file = await readFile("day06/input.txt", 'utf8')
    const input = file.split('\t').map(str => Number(str))

    const part1Input = input.slice(0)
    const part2Input = input.slice(0)
    console.log('Solution for Part 1: ', part1(part1Input))
    console.log('Solution for Part 2: ', part2(part2Input))
  }
  catch(error) {
    console.error(error)
  }
  
}

main()