const NUMBERS = [1, 3, 4, 6]
const OPERATIONS = ['+', '-', '*', '/']
const TARGET = 24

// Find all permutations of numbers and operation order.
const numberLists = findPermutationsSingleUse(NUMBERS)
const operationLists = findPermutationsMultiUse(OPERATIONS, NUMBERS.length - 1)
const groupingSplitLists = findPermutationsMultiUse([true, false], NUMBERS.length - 1)

// Iterate through all permutations of the numbers.
const solutions = []
for (let i = 0; i < numberLists.length; i++) {
  // Iterate through all sets of operations
  for (let j = 0; j < operationLists.length; j++) {
    // Iterate through all sets of groupings
    for (let k = 0; k < groupingSplitLists.length; k++) {
      // Calculate the outcome, and check if it matches the target.
      const expression = buildExpression(numberLists[i], operationLists[j], groupingSplitLists[k])
      try {
        const solution = eval(expression)
        if (solution === TARGET) {
          solutions.push(expression)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
console.log('SOLUTIONS: ', solutions)

function findPermutationsSingleUse(arr) {
  if (arr.length <= 2) {
    return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  }
  return arr.reduce((acc, item, i) => {
    acc.push(...findPermutationsSingleUse([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
        item,
        ...val,
      ])
    )
    return acc
  }, [])
}

function findPermutationsMultiUse(vals, size, partial = []) {
  const list = []
  for (let i = 0; i < vals.length; i++) {
    const newPartial = [...partial, vals[i]]
    if (newPartial.length === size) {
      // Add full length to the list
      list.push(newPartial)
    } else {
      // Go deeper.
      list.push(...findPermutationsMultiUse(vals, size, newPartial))
    }
  }
  return list
}

function buildExpression(numbers, operations, groupingSplits) {
  const symbols = ['(']
  for (let i = 0; i < numbers.length; i++) {
    symbols.push(numbers[i])
    if (i < operations.length) {
      if (groupingSplits[i]) {
        symbols.push(')', operations[i], '(')
      } else {
        symbols.push(operations[i])
      }
    }
  }
  symbols.push(')')
  return symbols.join(' ')
}
