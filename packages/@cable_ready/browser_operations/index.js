import { Utils } from '@cable_ready/core'

const { assignFocus, before, operate, after } = Utils

export default {
  clearStorage: (operation, callee) => {
    before(document, callee, operation)
    operate(operation, () => {
      const { type } = operation
      const storage = type === 'session' ? sessionStorage : localStorage
      storage.clear()
    })
    after(document, callee, operation)
  },

  go: (operation, callee) => {
    before(window, callee, operation)
    operate(operation, () => {
      const { delta } = operation
      history.go(delta)
    })
    after(window, callee, operation)
  },

  pushState: (operation, callee) => {
    before(window, callee, operation)
    operate(operation, () => {
      const { state, title, url } = operation
      history.pushState(state || {}, title || '', url)
    })
    after(window, callee, operation)
  },

  removeStorageItem: (operation, callee) => {
    before(document, callee, operation)
    operate(operation, () => {
      const { key, type } = operation
      const storage = type === 'session' ? sessionStorage : localStorage
      storage.removeItem(key)
    })
    after(document, callee, operation)
  },

  replaceState: (operation, callee) => {
    before(window, callee, operation)
    operate(operation, () => {
      const { state, title, url } = operation
      history.replaceState(state || {}, title || '', url)
    })
    after(window, callee, operation)
  },

  scrollIntoView: (operation, callee) => {
    const { element } = operation
    before(element, callee, operation)
    operate(operation, () => {
      element.scrollIntoView(operation)
    })
    after(element, callee, operation)
  },

  setCookie: (operation, callee) => {
    before(document, callee, operation)
    operate(operation, () => {
      const { cookie } = operation
      document.cookie = cookie || ''
    })
    after(document, callee, operation)
  },

  setFocus: (operation, callee) => {
    const { element } = operation
    before(element, callee, operation)
    operate(operation, () => {
      assignFocus(element)
    })
    after(element, callee, operation)
  },

  setStorageItem: (operation, callee) => {
    before(document, callee, operation)
    operate(operation, () => {
      const { key, value, type } = operation
      const storage = type === 'session' ? sessionStorage : localStorage
      storage.setItem(key, value || '')
    })
    after(document, callee, operation)
  }
}
