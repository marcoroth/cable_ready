import CableReady from '@cable_ready/core'

const { shouldMorph, didMorph } = CableReady
const { assignFocus, dispatch, getClassNames, processElements } = CableReady

export default {
  dispatchEvent: operation => {
    processElements(operation, element => {
      const { name, detail } = operation
      dispatch(element, name, detail)
    })
  },

  setMeta: operation => {
    dispatch(document, 'cable-ready:before-set-meta', operation)
    const { name, content } = operation
    if (!operation.cancel) {
      let meta = document.head.querySelector(`meta[name='${name}']`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }
    dispatch(document, 'cable-ready:after-set-meta', operation)
  }
}
