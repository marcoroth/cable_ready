import Operations from './operations'
import activeElement from './active_element'
import actionCable from './action_cable'

const perform = (
  operations,
  options = { emitMissingElementWarnings: true }
) => {
  for (let name in operations) {
    if (operations.hasOwnProperty(name)) {
      const entries = operations[name]
      for (let i = 0; i < entries.length; i++) {
        const operation = entries[i]
        try {
          if (operation.selector) {
            operation.element = operation.xpath
              ? xpathToElement(operation.selector)
              : document[
                  operation.selectAll ? 'querySelectorAll' : 'querySelector'
                ](operation.selector)
          } else {
            operation.element = document
          }
          if (operation.element || options.emitMissingElementWarnings) {
            activeElement.set(document.activeElement)
            Operations.all[name](operation)
          }
        } catch (e) {
          if (operation.element) {
            console.error(
              `CableReady detected an error in ${name}: ${e.message}. If you need to support older browsers make sure you've included the corresponding polyfills. https://docs.stimulusreflex.com/setup#polyfills-for-ie11.`
            )
            console.error(e)
          } else {
            console.log(
              `CableReady ${name} failed due to missing DOM element for selector: '${operation.selector}'`
            )
          }
        }
      }
    }
  }
}

const performAsync = (
  operations,
  options = { emitMissingElementWarnings: true }
) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(perform(operations, options))
    } catch (err) {
      reject(err)
    }
  })
}

const initialize = (initializeOptions = {}) => {
  const { consumer } = initializeOptions
  actionCable.setConsumer(consumer)
}

export {
  perform,
  performAsync,
  initialize
}
