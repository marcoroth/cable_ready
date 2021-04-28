import { Utils } from '@cable_ready/core'

const { assignFocus, dispatch } = Utils

export default {
  clearStorage: operation => {
    dispatch(document, 'cable-ready:before-clear-storage', operation)
    const { type } = operation
    const storage = type === 'session' ? sessionStorage : localStorage
    if (!operation.cancel) storage.clear()
    dispatch(document, 'cable-ready:after-clear-storage', operation)
  },

  go: operation => {
    dispatch(window, 'cable-ready:before-go', operation)
    const { delta } = operation
    if (!operation.cancel) history.go(delta)
    dispatch(window, 'cable-ready:after-go', operation)
  },

  pushState: operation => {
    dispatch(window, 'cable-ready:before-push-state', operation)
    const { state, title, url } = operation
    if (!operation.cancel) history.pushState(state || {}, title || '', url)
    dispatch(window, 'cable-ready:after-push-state', operation)
  },

  removeStorageItem: operation => {
    dispatch(document, 'cable-ready:before-remove-storage-item', operation)
    const { key, type } = operation
    const storage = type === 'session' ? sessionStorage : localStorage
    if (!operation.cancel) storage.removeItem(key)
    dispatch(document, 'cable-ready:after-remove-storage-item', operation)
  },

  replaceState: operation => {
    dispatch(window, 'cable-ready:before-replace-state', operation)
    const { state, title, url } = operation
    if (!operation.cancel) history.replaceState(state || {}, title || '', url)
    dispatch(window, 'cable-ready:after-replace-state', operation)
  },

  scrollIntoView: operation => {
    const { element } = operation
    dispatch(element, 'cable-ready:before-scroll-into-view', operation)
    if (!operation.cancel) element.scrollIntoView(operation)
    dispatch(element, 'cable-ready:after-scroll-into-view', operation)
  },

  setCookie: operation => {
    dispatch(document, 'cable-ready:before-set-cookie', operation)
    const { cookie } = operation
    if (!operation.cancel) document.cookie = cookie || ''
    dispatch(document, 'cable-ready:after-set-cookie', operation)
  },

  setFocus: operation => {
    const { element } = operation
    dispatch(element, 'cable-ready:before-set-focus', operation)
    if (!operation.cancel) assignFocus(element)
    dispatch(element, 'cable-ready:after-set-focus', operation)
  },

  setStorageItem: operation => {
    dispatch(document, 'cable-ready:before-set-storage-item', operation)
    const { key, value, type } = operation
    const storage = type === 'session' ? sessionStorage : localStorage
    if (!operation.cancel) storage.setItem(key, value || '')
    dispatch(document, 'cable-ready:after-set-storage-item', operation)
  }
}
