import { Utils } from '@cable_ready/core'

const { dispatch, processElements, before, operate, after } = Utils

export default {
  dispatchEvent: (operation, callee) => {
    processElements(operation, element => {
      operate(operation, () => {
        const { name, detail } = operation
        dispatch(element, name, detail)
      })
    })
  },

  setMeta: (operation, callee) => {
    before(document, callee, operation)
    operate(operation, () => {
      const { name, content } = operation
      let meta = document.head.querySelector(`meta[name='${name}']`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    })
    after(document, callee, operation)
  }
}
