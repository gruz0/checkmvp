import { Event } from '@/concept/events/Event'
import { EventBus } from '@/concept/events/EventBus'
import { EventHandler } from '@/concept/events/EventHandler'

export class EventBusInMemory implements EventBus {
  private listeners: Map<string, EventHandler[]> = new Map()

  public subscribe(eventType: string, handler: EventHandler): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [])
    }

    this.listeners.get(eventType)!.push(handler)
  }

  public emit(event: Event): void {
    console.debug('Emitting event type:', event.type)

    const listenersForEvent = this.listeners.get(event.type)
    if (!listenersForEvent) {
      console.warn(`No listeners found for event type: ${event.type}`)
      return
    }

    listenersForEvent.forEach((handler) => {
      handler.handle(event)

      console.debug(`EventHandler called for event type: ${event.type}`)
    })
  }
}
