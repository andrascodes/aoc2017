const util = require('util')
const fs = require('fs')

const state = {
  numberOfGroups: 0,
  sum: 0,
  depth: 0,
  stack: [],
  ignoreCurrent: false,
  inGarbage: false,
  garbageCount: 0
}

const main = async () => {

  const readFile = util.promisify(fs.readFile)
  try {
    const file = await readFile("day09/input.txt", 'utf8')
    const input = file.split('')

    input.map(char => {
      if(!state.inGarbage && char === '{') {
        state.stack.push(char)
        state.depth++
      }
      else if(!state.inGarbage && char === '<') {
        state.inGarbage = true
      }
      else if(state.inGarbage) {
        if(state.ignoreCurrent) {
          state.ignoreCurrent = false
        }
        else if(char === '!') {
          state.ignoreCurrent = true
        }
        else if(char === '>') {
          state.inGarbage = false
        }
        else {
          state.garbageCount++
        }
      }
      else if(char === '}') {
        state.stack.pop()
        state.numberOfGroups++
        state.sum += state.depth
        state.depth--
      }
      return char
    })

    console.log('Solution Part 1:', state.sum)
    console.log('Solution Part 2:', state.garbageCount)
    
    console.log('done')
  }
  catch(error) {
    console.error(error)
  }
  
}

main()