import { Utils } from '@cable_ready/core'

const { before, operate, after } = Utils

export default {
  consoleLog: (operation, callee) => {
    operate(operation, () => {
      const { message, level } = operation
      level && ['warn', 'info', 'error'].includes(level)
        ? console[level](message || '')
        : console.log(message || '')
    })
  },

  notification: (operation, callee) => {
    before(document, callee, operation)
    operate(operation, () => {
      const { title, options } = operation
      Notification.requestPermission().then(result => {
        operation.permission = result
        if (result === 'granted') new Notification(title || '', options)
      })
    })
    after(document, callee, operation)
  }
}
