const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('day08/input.txt'),
  crlfDelay: Infinity
})

const state = {
  registers: {},
  instructions: [],
  highestValueEver: 0,
  getLargestValueOfRegisters: (registers) => {
    return Object.values(registers).reduce((acc, curr) => {
      if(curr.value > acc) {
        acc = curr.value
      }
      return acc
    }, -Infinity)
  }
}

rl.on('line', (line) => {
  const [ 
    registerToModify, modify, byValue,
    ifWord , 
    conditionalRegister, conditionalOperator, conditionalValue
  ] = line.split(' ')

  const variables = [registerToModify, conditionalRegister]
  variables.map(variableName => {
    if(state.registers[variableName] === undefined) {
      const register = {
        name: variableName,
        value: 0
      }
      state.registers[variableName] = register
      return register
    }
    return undefined
  })

  const instruction = {
    registerToModify,
    modification: {
      modify,
      byValue: Number(byValue)
    },
    condition: {
      conditionalRegister,
      conditionalOperator,
      conditionalValue: Number(conditionalValue)
    }
  }
  state.instructions.push(instruction)

})

rl.on('close', () => {
  
  
  const runInstruction = (registers, {registerToModify, modification, condition }) => {
    
    const conditionStands = (registers, {conditionalRegister, conditionalOperator, conditionalValue}) => {
      const register = registers[conditionalRegister]
      let result = false
      switch (conditionalOperator) {
        case '==':
          result = register.value === conditionalValue
          break;
        case '>=':
          result = register.value >= conditionalValue
          break;
        case '<=':
          result = register.value <= conditionalValue
          break;
        case '>':
          result = register.value > conditionalValue
          break;
        case '<':
          result = register.value < conditionalValue
          break;
        case '!=':
          result = register.value !== conditionalValue
          break;
      }
      return result
    }

    const register = state.registers[registerToModify]
    if(conditionStands(registers, condition)) {
      if(modification.modify === 'inc') {
        register.value += modification.byValue
      }
      else {
        register.value -= modification.byValue
      }
      return true
    }

    if(state.getLargestValueOfRegisters(state.registers) > state.highestValueEver) {
      state.highestValueEver = state.getLargestValueOfRegisters(state.registers)
    }
    return false
  }

  state.instructions.map(instruction => runInstruction(state.registers, instruction))

  // console.log(state.registers)
  console.log('Solution Part 1: ', state.getLargestValueOfRegisters(state.registers))
  console.log('Solution Part 2: ', state.highestValueEver)
  console.log('done')
})