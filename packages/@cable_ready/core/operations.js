let operations = {}

const add = (newOperations) => {
  operations = { ...operations, ...newOperations }
}

const addOperations = (operations) => {
  add(operations)
}

const addOperation = (name, operation) => {
  const operations = {}
  operations[name] = operation

  add(operations)
}

export {
  add,
  addOperations,
  addOperation,
}

export default {
  get all() {
    return operations
  }
}
