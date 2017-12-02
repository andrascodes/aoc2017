const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
})

const NUMPAD_ROW = 3
const NUMPAD_COL = 3
const LASTFIELD = NUMPAD_COL * NUMPAD_ROW

const state = {
  currentField: 5,
  code: []
}

const changeField = (currentField, command) => {
  const commandMap = {
    "U": -NUMPAD_ROW,
    "D": NUMPAD_ROW,
    "L": -1,
    "R": 1
  }

  const step = commandMap[command]
  const newField = currentField + step

  if(newField <= 0 || newField > LASTFIELD) {
    return -1
  }
  else if(currentField % NUMPAD_ROW === 0 && command === "R") {
    return -1
  }
  else if(newField % NUMPAD_ROW === 0 && command === "L") {
    return -1
  } 
  else {
    return newField
  }
}

rl.on('line', (line) => {
  line = Array.from(line)
  const newField = line.reduce((acc, curr) => {
    const newField = changeField(acc, curr)
    if(newField === -1) {
      return acc
    }
    else {
      return newField
    }
  }, state.currentField)
  state.currentField = newField
  state.code.push(newField)
})

rl.on('close', () => {
  console.log(state.code.join(''))
})
