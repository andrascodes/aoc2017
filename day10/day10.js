const util = require('util')
const fs = require('fs')

const state = {
  list: [...Array(256).keys()],
  // list: Array(5).fill(0).map((val, ind, array) => value = ind),
  currentPosition: 0,
  skipSize: 0,
  lengths: undefined
}

const part1 = (state) => {

  state.lengths.map(length => {

    // If length is 1: 
    // - the sublist is an array with one element
    // - reversing it has no effect on the whole list
    if (length > 1) {

      const listLength = state.list.length
      const circularList = [...state.list, ...state.list]
      const offsetFromBeginning = state.currentPosition

      const listWindow = circularList.slice(state.currentPosition, state.currentPosition + listLength)
      
      const reversedSubList = listWindow.slice(0, length).reverse()
      const restOfList = listWindow.slice(length)
      const reversedListWindow = [...reversedSubList, ...restOfList]

      const beginningOfCircularReversedList = reversedListWindow.slice(-offsetFromBeginning)
      const circularReversedList = [...beginningOfCircularReversedList, ...reversedListWindow]

      state.list = circularReversedList.slice(0, listLength)
    }
    // The list has 256 elements
    // - currentPosition += length + skipSize modulo 256 - circular list
    // - increment skipSize
    state.currentPosition = (state.currentPosition + length + state.skipSize) % state.list.length
    state.skipSize++
  })
}

const main = async () => {

  const readFile = util.promisify(fs.readFile)
  try {
    const file = await readFile("day10/input.txt", 'utf8')

    // // Part 1: Processing
    // const input = file.split(',').map(str => Number(str))
    // state.lengths = input

    // // Part 1: Run one round
    // part1(state)

    // // Part 1: Result
    // console.log('Solution Part 1:', state.list[0] * state.list[1])

    // Part 2: Processing
    const input = file.trim().split('')
    const inputInASCII = input.map(char => char.charCodeAt(0))
    const finalSequenceOfLengths = inputInASCII.concat([17, 31, 73, 47, 23])

    state.lengths = finalSequenceOfLengths

    // Part 2: Run 16 rounds
    for(let i = 0; i < 64; i++) {
      // console.log(state.currentPosition, state.lengths, state.skipSize)
      part1(state)
      // console.log(state.currentPosition, state.lengths, state.skipSize)
    }

    // Part 2: Chunk up sparseHash
    const sparseHash = state.list.slice()
    
    // console.log(sparseHash)

    const chunkedSparseHash = []
    const chunkSize = 16
    for(let i = 0; i < chunkSize; ++i) {
      chunkedSparseHash.push(sparseHash.slice(0 + i * chunkSize, chunkSize + i * chunkSize))
    }

    // Part 2: Create denseHash
    const denseHash = chunkedSparseHash.map(chunk => {
      return chunk.reduce((acc, curr) => {
        acc = acc ^ curr
        return acc
      }, 0)
    })

    // Part 2: Convert denseHash to Hexadec
    const hexaDecArray = denseHash.map(dec => {
      const hexadec = dec.toString(16)
      if(hexadec.length < 2) {
        return `0${hexadec}`
      }
      return hexadec
    })

    // Part 2: Result
    const knotHashString = hexaDecArray.reduce((acc, curr) => acc.concat(curr), '')
    console.log('Solution Part 2:', knotHashString)
    
    console.log('done')
  }
  catch(error) {
    console.error(error)
  }
  
}

main()