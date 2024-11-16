import { Event } from '@/idea/events/Event'
import { EventBus } from '@/idea/events/EventBus'
import { EventHandler } from '@/idea/events/EventHandler'

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

      console.debug(
        `EventHandler ${handler.getName()} called for event type: ${event.type}`
      )
    })
  }
}
