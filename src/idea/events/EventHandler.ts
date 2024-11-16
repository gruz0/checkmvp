import { Event } from './Event'

export interface EventHandler {
  getName(): string
  handle(event: Event): Promise<void>
}
