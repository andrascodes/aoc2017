let spiral = 1
let sides = 3
var i = 0

for(i; i<=325489; ++i) {
  if(i >= (sides * sides)) {
    spiral++
    sides += 2
  }
}

// Sides will be how many sides the rectangle should have at the given spiral
// in this case it's 571 => 571 * 571 = 1..326041 is how many numbers can the given spiral structure hold
// 326041 - 325489 = 552, 570-552 = 18
// On each side of the spiral this is how many steps it takes to get to the given loc:
// 570..285..570, so counting back 18 steps from 570 => 552

console.log(spiral, sides, i - 1)
const result = sides * sides - 325489
console.log('Right answer: ', result)