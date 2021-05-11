import morphdom from 'morphdom'
import { Utils, MorphCallbacks } from '@cable_ready/core'

const { shouldMorph, didMorph } = MorphCallbacks
const { assignFocus, processElements, before, operate, after } = Utils

export default {
  append: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { html, focusSelector } = operation
        element.insertAdjacentHTML('beforeend', html || '')
        assignFocus(focusSelector)
      })
      after(element, callee, operation)
    })
  },

  graft: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { parent, focusSelector } = operation
        const parentElement = document.querySelector(parent)
        if (parentElement) {
          parentElement.appendChild(element)
          assignFocus(focusSelector)
        }
      })
      after(element, callee, operation)
    })
  },

  innerHtml: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { html, focusSelector } = operation
        element.innerHTML = html || ''
        assignFocus(focusSelector)
      })
      after(element, callee, operation)
    })
  },

  insertAdjacentHtml: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { html, position, focusSelector } = operation
        element.insertAdjacentHTML(position || 'beforeend', html || '')
        assignFocus(focusSelector)
      })
      after(element, callee, operation)
    })
  },

  insertAdjacentText: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { text, position, focusSelector } = operation
        element.insertAdjacentText(position || 'beforeend', text || '')
        assignFocus(focusSelector)
      })
      after(element, callee, operation)
    })
  },

  morph: (operation, callee) => {
    processElements(operation, element => {
      const { html } = operation
      const template = document.createElement('template')
      template.innerHTML = String(html).trim()
      operation.content = template.content
      const parent = element.parentElement
      const ordinal = Array.from(parent.children).indexOf(element)
      before(element, callee, operation)
      operate(operation, () => {
        const { childrenOnly, focusSelector } = operation
        morphdom(
          element,
          childrenOnly ? template.content : template.innerHTML,
          {
            childrenOnly: !!childrenOnly,
            onBeforeElUpdated: shouldMorph(operation),
            onElUpdated: didMorph(operation)
          }
        )
        assignFocus(focusSelector)
      })
      after(parent.children[ordinal], callee, operation)
    })
  },

  outerHtml: (operation, callee) => {
    processElements(operation, element => {
      const parent = element.parentElement
      const ordinal = Array.from(parent.children).indexOf(element)
      before(element, callee, operation)
      operate(operation, () => {
        const { html, focusSelector } = operation
        element.outerHTML = html || ''
        assignFocus(focusSelector)
      })
      after(parent.children[ordinal], callee, operation)
    })
  },

  prepend: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { html, focusSelector } = operation
        element.insertAdjacentHTML('afterbegin', html || '')
        assignFocus(focusSelector)
      })
      after(element, callee, operation)
    })
  },

  remove: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { focusSelector } = operation
        element.remove()
        assignFocus(focusSelector)
      })
      after(document, callee, operation)
    })
  },

  replace: (operation, callee) => {
    processElements(operation, element => {
      const parent = element.parentElement
      const ordinal = Array.from(parent.children).indexOf(element)
      before(element, callee, operation)
      operate(operation, () => {
        const { html, focusSelector } = operation
        element.outerHTML = html || ''
        assignFocus(focusSelector)
      })
      after(parent.children[ordinal], callee, operation)
    })
  },

  textContent: (operation, callee) => {
    processElements(operation, element => {
      before(element, callee, operation)
      operate(operation, () => {
        const { text, focusSelector } = operation
        element.textContent = text || ''
        assignFocus(focusSelector)
      })
      after(element, callee, operation)
    })
  }
}
