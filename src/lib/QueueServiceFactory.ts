import { BullMQQueueService } from '@/lib/BullMQQueueService'
import { QueueService } from '@/lib/QueueService'
import { env } from '@/lib/env'

// Add more when needed
type QueueTypes = 'bullmq'

export class QueueServiceFactory {
  private static bullMQInstance: BullMQQueueService | null = null

  public static createQueueService(queueType: QueueTypes): QueueService {
    switch (queueType) {
      case 'bullmq':
        return this.getBullMQQueueService()
      default:
        throw new Error(`Unsupported queue type: ${queueType}`)
    }
  }

  private static getBullMQQueueService(): BullMQQueueService {
    if (!this.bullMQInstance) {
      const redisConnectionString = env.REDIS_URL

      this.bullMQInstance = new BullMQQueueService(
        redisConnectionString,
        'tasks'
      )
    }

    return this.bullMQInstance
  }
}
