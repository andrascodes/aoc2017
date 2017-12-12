const util = require('util')
const fs = require('fs')

const state = {
  list: Array(256).fill(0).map((val, ind, array) => value = ind),
  // list: Array(5).fill(0).map((val, ind, array) => value = ind),
  currentPosition: 0,
  skipSize: 0,
  lengths: undefined
}

const part1 = (state) => {

  state.lengths.map(length => {

    // 1. take from the list[currentPosition..length] - list is circular
    let remainingElements = length
    const sublist = []
    while(remainingElements > 0) {
      if(state.list[state.currentPosition] === undefined) {
        state.currentPosition = 0
      }

      sublist.push(state.list[state.currentPosition])
      state.currentPosition++
      remainingElements--
    }

    // 2. reverse the elements, put it back into the same place - list is circular
    const reversedSublist = sublist.reverse()
    let currentIndex = state.currentPosition - 1
    while(reversedSublist.length > 0) {
      if(state.list[currentIndex] === undefined) {
        currentIndex = state.list.length - 1
      }
      state.list[currentIndex] = reversedSublist.pop()
      currentIndex--
    }

    // 3. currentPosition += length + skipSize - list is circular
    let remainingSkipSize = state.skipSize
    while(remainingSkipSize > 0) {
      state.currentPosition++
      remainingSkipSize--
      if(state.list[state.currentPosition] === undefined) {
        state.currentPosition = 0
      }
    }
  
    // 4. skipSize++
    state.skipSize++
  })
}

const part2 = (state) => {
  
}

const main = async () => {

  const readFile = util.promisify(fs.readFile)
  try {
    const file = await readFile("day10/input.txt", 'utf8')
    const input = file.split(',').map(str => Number(str))
    state.lengths = input
    
    part1(state)
    
    console.log('Solution Part 1:', state.list[0] * state.list[1])
    console.log('done')
  }
  catch(error) {
    console.error(error)
  }
  
}

main()