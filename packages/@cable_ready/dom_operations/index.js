import morphdom from 'morphdom'
import { Utils, MorphCallbacks } from '@cable_ready/core'

const { shouldMorph, didMorph } = MorphCallbacks
const { assignFocus, dispatch, getClassNames, processElements } = Utils

export default {
  append: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-append', operation)
      const { html, focusSelector } = operation
      if (!operation.cancel) {
        element.insertAdjacentHTML('beforeend', html || '')
        assignFocus(focusSelector)
      }
      dispatch(element, 'cable-ready:after-append', operation)
    })
  },

  graft: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-graft', operation)
      const { parent, focusSelector } = operation
      const parentElement = document.querySelector(parent)
      if (!operation.cancel && parentElement) {
        parentElement.appendChild(element)
        assignFocus(focusSelector)
      }
      dispatch(element, 'cable-ready:after-graft', operation)
    })
  },

  innerHtml: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-inner-html', operation)
      const { html, focusSelector } = operation
      if (!operation.cancel) {
        element.innerHTML = html || ''
        assignFocus(focusSelector)
      }
      dispatch(element, 'cable-ready:after-inner-html', operation)
    })
  },

  insertAdjacentHtml: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-insert-adjacent-html', operation)
      const { html, position, focusSelector } = operation
      if (!operation.cancel) {
        element.insertAdjacentHTML(position || 'beforeend', html || '')
        assignFocus(focusSelector)
      }
      dispatch(element, 'cable-ready:after-insert-adjacent-html', operation)
    })
  },

  insertAdjacentText: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-insert-adjacent-text', operation)
      const { text, position, focusSelector } = operation
      if (!operation.cancel) {
        element.insertAdjacentText(position || 'beforeend', text || '')
        assignFocus(focusSelector)
      }
      dispatch(element, 'cable-ready:after-insert-adjacent-text', operation)
    })
  },

  morph: operation => {
    processElements(operation, element => {
      const { html } = operation
      const template = document.createElement('template')
      template.innerHTML = String(html).trim()
      operation.content = template.content
      dispatch(element, 'cable-ready:before-morph', operation)
      const { childrenOnly, focusSelector } = operation
      const parent = element.parentElement
      const ordinal = Array.from(parent.children).indexOf(element)
      if (!operation.cancel) {
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
      }
      dispatch(parent.children[ordinal], 'cable-ready:after-morph', operation)
    })
  },

  outerHtml: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-outer-html', operation)
      const { html, focusSelector } = operation
      const parent = element.parentElement
      const ordinal = Array.from(parent.children).indexOf(element)
      if (!operation.cancel) {
        element.outerHTML = html || ''
        assignFocus(focusSelector)
      }
      dispatch(
        parent.children[ordinal],
        'cable-ready:after-outer-html',
        operation
      )
    })
  },

  prepend: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-prepend', operation)
      const { html, focusSelector } = operation
      if (!operation.cancel) {
        element.insertAdjacentHTML('afterbegin', html || '')
        assignFocus(focusSelector)
      }
      dispatch(element, 'cable-ready:after-prepend', operation)
    })
  },

  remove: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-remove', operation)
      const { focusSelector } = operation
      if (!operation.cancel) {
        element.remove()
        assignFocus(focusSelector)
      }
      dispatch(document, 'cable-ready:after-remove', operation)
    })
  },

  replace: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-replace', operation)
      const { html, focusSelector } = operation
      const parent = element.parentElement
      const ordinal = Array.from(parent.children).indexOf(element)
      if (!operation.cancel) {
        element.outerHTML = html || ''
        assignFocus(focusSelector)
      }
      dispatch(parent.children[ordinal], 'cable-ready:after-replace', operation)
    })
  },

  textContent: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-text-content', operation)
      const { text, focusSelector } = operation
      if (!operation.cancel) {
        element.textContent = text || ''
        assignFocus(focusSelector)
      }
      dispatch(element, 'cable-ready:after-text-content', operation)
    })
  }
}
