import { Utils } from '@cable_ready/core'

import './event_listeners'

const { dispatch } = Utils

export default {
  playSound: operation => {
    dispatch(document, 'cable-ready:before-play-sound', operation)
    const { src } = operation
    if (!operation.cancel) {
      const canplaythrough = () => {
        document.audio.removeEventListener('canplaythrough', canplaythrough)
        document.audio.play()
      }
      const ended = () => {
        document.audio.removeEventListener('ended', ended)
        dispatch(document, 'cable-ready:after-play-sound', operation)
      }
      if (document.body.hasAttribute('data-unlock-audio')) {
        document.audio.addEventListener('canplaythrough', canplaythrough)
        document.audio.addEventListener('ended', ended)
        if (src) document.audio.src = src
        document.audio.play()
      } else dispatch(document, 'cable-ready:after-play-sound', operation)
    } else dispatch(document, 'cable-ready:after-play-sound', operation)
  }
}
