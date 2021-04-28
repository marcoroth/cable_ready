import CableReady from '@cable_ready/core'

import DOMOperations from '@cable_ready/dom_operations'
import DOMEventOperations from '@cable_ready/dom_event_operations'
import ElementOperations from '@cable_ready/element_operations'
import NotificationOperations from '@cable_ready/notification_operations'

CableReady.addOperations(DOMOperations)
CableReady.addOperations(DOMEventOperations)
CableReady.addOperations(ElementOperations)
CableReady.addOperations(NotificationOperations)

export default CableReady
