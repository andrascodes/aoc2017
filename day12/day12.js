const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('day12/input.txt'),
  crlfDelay: Infinity
})

const state = {
  graph: {}
}

rl.on('line', (line) => {
  
  const [ node, neighbors ] = line.split(' <-> ')
  
  const graphRow = {
    node: Number(node),
    neighbors: neighbors.split(', ').map(node => Number(node)),
    reached: false,
    reachedFrom: undefined
  }
  state.graph[graphRow.node] = graphRow

})

rl.on('close', () => {
  
  const routeExists = (state, startNode) => {
    const queue = []
    queue.push(startNode)

    while(queue.length > 0) {
      const node = queue.shift()
      const nodeObject = state.graph[node]
      if(nodeObject.reached === false) {
        queue.push(...nodeObject.neighbors)
      }
      nodeObject.reached = true
      nodeObject.reachedFrom = startNode
    }
    return Object.keys(state.graph)
            .map(node => state.graph[node])
            .filter(node => node.reached === true && node.reachedFrom === startNode)
            .map(node => node.node)
  }

  const getAnUnreachedNode = (state) => {
    return Object.keys(state.graph)
            .map(node => state.graph[node])
            .find(node => node.reached === false)
  }

  const getNumberOfGroups = state => {
    return Array.from(new Set(Object.keys(state.graph)
            .map(node => state.graph[node].reachedFrom))).length
  }

  // console.log('Solution Part 1 :', routeExists(state, 0).length)

  let startNode = getAnUnreachedNode(state)
  while(startNode !== undefined) {
    routeExists(state, startNode.node)
    startNode = getAnUnreachedNode(state)
  }
  console.log('Solution Part 2: ', getNumberOfGroups(state))


  
  console.log('done')
})