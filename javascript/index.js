import { shouldMorphCallbacks, didMorphCallbacks } from './morph_callbacks'
import { perform, performAsync, initialize } from './cable_ready'
import DOMOperations from './operations'

import './stream_from_element'

export default {
  initialize,
  perform,
  performAsync,
  DOMOperations,
  shouldMorphCallbacks,
  didMorphCallbacks
}
