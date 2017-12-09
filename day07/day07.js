const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('day07/input.txt'),
  crlfDelay: Infinity
})

const state = {
  programs: [],
  programsWithWeight: [],
  tree: {}
}

rl.on('line', (line) => {

  // TODO: Learn the Regex
  const parse = s => s.match(/(\w+) \((\d+)\)(?: -> (.+))?/)
  
  const [, name, weight, programsAboveString ] = parse(line)

  const program = {
    name,
    weight: Number(weight),
    programsAbove: [],
  }

  if(programsAboveString !== undefined) {
    const programsAbove = programsAboveString.split(', ')
    program.programsAbove.push(...programsAbove)
  }

  state.programs.push(program)

})

rl.on('close', () => {
  
  const towerMap = state.programs.reduce((acc, { name, weight, programsAbove}) => {
    acc[name] = {
      name, weight, programsAbove, 
      parent: undefined,
    }
    return acc
  }, {})

  state.programs.map(prog => {
    prog.programsAbove.map(child => {
      towerMap[child].parent = prog.name
    })
  })
  
  const towers = Object.values(towerMap)
  const root = towers.find(prog => prog.parent === undefined).name

  console.log('Solution Part 1: ', root)
  
  const sum = array => array.reduce((acc, curr) => acc + curr, 0)

  const correctError = (nodeWeight, programsAbove) => {
    
    // Recursion base case: if there are no children/programsAbove, return the weight and fix=0
    if(programsAbove.length <= 0) {
      return [nodeWeight, 0]
    }
    
    // Recursion: get the weight and fix values for each subTrees
    const subTree = programsAbove.map(name => {
      const childObject = towerMap[name]
      return correctError(childObject.weight, childObject.programsAbove)
    })

    // Get only the weights from the subTrees
    const subTreeWeights = subTree.map(child => child[0])

    // From the subTree items, find the one that has a fix value larger than 0, return the fix or 0
    const getFix = (subTree) => {
      const fixValueFound = subTree.find(child => {
        return child[1] > 0
      })
      
      if(fixValueFound) {
        return fixValueFound[1]
      }
      else {
        return 0
      }
    }
    const fix = getFix(subTree)

    // If exists, find the one value in the subTreeWeights which doesn't match the others
    // Only for arrays with at least 2 elements and only one outlier
    const getNormal = ([x, y, z]) => {
      if(x === y) {
        return x
      }
      else {
        return z
      }
    }

    const findOutlier = (array, getNormal) => {
      const normal = getNormal(array)
      return {
        index: array.findIndex(x => x !== normal),
        normal
      }
    }
    const { index, normal } = findOutlier(subTreeWeights, getNormal)

    // If the subTree doesn't contain an outlier, return the sum of the subTreeWeights and the fix (0)
    if(fix || index < 0 || !normal) {
      return [nodeWeight + subTreeWeights[0] * subTreeWeights.length, fix]
    } 
    
    // If we found an outlier in the subTree values
    const outlier = subTreeWeights[index]
    // return the sum of the subTree's ideal weight and the fix
    // sum = nodeWeight + sumOfSubtreeWeights + (normal - outlier)
    // fix = theProgramsWeigthThatWeHaveToFix + (normal - outlier)
    return [
      nodeWeight + sum(subTreeWeights) + normal - outlier, 
      towerMap[programsAbove[index]].weight + normal - outlier
    ]

  }

  const rootObject = state.programs.find(prog => prog.name === root)
  console.log('Solution Part 2:', correctError(rootObject.weight, rootObject.programsAbove)[1])

  console.log('done')
})