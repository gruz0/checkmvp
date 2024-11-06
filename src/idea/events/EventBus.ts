import type { Event } from '@/idea/events/Event'
import { EventHandler } from '@/idea/events/EventHandler'

export interface EventBus {
  subscribe(eventType: string, handler: EventHandler): void
  emit(event: Event): void
}
