import { Utils, MorphCallbacks } from '@cable_ready/core'

const { getClassNames, processElements, before, operate, after } = Utils

export default {
  addCssClass: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { name } = operation
        element.classList.add(...getClassNames(name || ''))
      })
      after(element, callee, operation)
    })
  },

  removeAttribute: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { name } = operation
        element.removeAttribute(name)
      })
      after(element, callee, operation)
    })
  },

  removeCssClass: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { name } = operation
        element.classList.remove(...getClassNames(name))
      })
      after(element, callee, operation)
    })
  },

  setAttribute: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { name, value } = operation
        element.setAttribute(name, value || '')
      })
      after(element, callee, operation)
    })
  },

  setDatasetProperty: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { name, value } = operation
        element.dataset[name] = value || ''
      })
      after(element, callee, operation)
    })
  },

  setProperty: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { name, value } = operation
        if (name in element) element[name] = value || ''
      })
      after(element, callee, operation)
    })
  },

  setStyle: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { name, value } = operation
        element.style[name] = value || ''
      })
      after(element, callee, operation)
    })
  },

  setStyles: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { styles } = operation
        for (let [name, value] of Object.entries(styles))
          element.style[name] = value || ''
      })
      after(element, callee, operation)
    })
  },

  setValue: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { value } = operation
        element.value = value || ''
      })
      after(element, callee, operation)
    })
  }
}
