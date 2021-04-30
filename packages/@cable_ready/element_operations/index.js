import { Utils, MorphCallbacks } from '@cable_ready/core'

const { shouldMorph, didMorph } = MorphCallbacks
const { assignFocus, dispatch, getClassNames, processElements } = Utils


export default {
  addCssClass: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-add-css-class', operation)
      const { name } = operation
      if (!operation.cancel) element.classList.add(...getClassNames(name || ''))
      dispatch(element, 'cable-ready:after-add-css-class', operation)
    })
  },

  removeAttribute: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-remove-attribute', operation)
      const { name } = operation
      if (!operation.cancel) element.removeAttribute(name)
      dispatch(element, 'cable-ready:after-remove-attribute', operation)
    })
  },

  removeCssClass: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-remove-css-class', operation)
      const { name } = operation
      if (!operation.cancel) element.classList.remove(...getClassNames(name))
      dispatch(element, 'cable-ready:after-remove-css-class', operation)
    })
  },

  setAttribute: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-set-attribute', operation)
      const { name, value } = operation
      if (!operation.cancel) element.setAttribute(name, value || '')
      dispatch(element, 'cable-ready:after-set-attribute', operation)
    })
  },

  setDatasetProperty: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-set-dataset-property', operation)
      const { name, value } = operation
      if (!operation.cancel) element.dataset[name] = value || ''
      dispatch(element, 'cable-ready:after-set-dataset-property', operation)
    })
  },

  setProperty: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-set-property', operation)
      const { name, value } = operation
      if (!operation.cancel && name in element) element[name] = value || ''
      dispatch(element, 'cable-ready:after-set-property', operation)
    })
  },

  setStyle: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-set-style', operation)
      const { name, value } = operation
      if (!operation.cancel) element.style[name] = value || ''
      dispatch(element, 'cable-ready:after-set-style', operation)
    })
  },

  setStyles: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-set-styles', operation)
      const { styles } = operation
      for (let [name, value] of Object.entries(styles)) {
        if (!operation.cancel) element.style[name] = value || ''
      }
      dispatch(element, 'cable-ready:after-set-styles', operation)
    })
  },

  setValue: operation => {
    processElements(operation, element => {
      dispatch(element, 'cable-ready:before-set-value', operation)
      const { value } = operation
      if (!operation.cancel) element.value = value || ''
      dispatch(element, 'cable-ready:after-set-value', operation)
    })
  }
}
