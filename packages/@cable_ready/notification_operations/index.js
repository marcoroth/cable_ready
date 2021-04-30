import { Utils } from '@cable_ready/core'

const { dispatch } = Utils

export default {
  consoleLog: operation => {
    const { message, level } = operation
    level && ['warn', 'info', 'error'].includes(level)
      ? console[level](message || '')
      : console.log(message || '')
  },

  notification: operation => {
    dispatch(document, 'cable-ready:before-notification', operation)
    const { title, options } = operation
    if (!operation.cancel)
      Notification.requestPermission().then(result => {
        operation.permission = result
        if (result === 'granted') new Notification(title || '', options)
      })
    dispatch(document, 'cable-ready:after-notification', operation)
  }
}
