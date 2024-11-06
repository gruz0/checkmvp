import type { Event } from '@/concept/events/Event'
import { EventHandler } from '@/concept/events/EventHandler'

export interface EventBus {
  subscribe(eventType: string, handler: EventHandler): void
  emit(event: Event): void
}
