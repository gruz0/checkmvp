import { Queue } from 'bullmq'
import { QueueService } from '@/lib/QueueService'

export class BullMQQueueService implements QueueService {
  private queue: Queue

  constructor(redisConnectionString: string, queueName: string) {
    this.queue = new Queue(queueName, {
      connection: {
        host: new URL(redisConnectionString).hostname,
        port: parseInt(new URL(redisConnectionString).port),
        password: new URL(redisConnectionString).password,
      },
    })
  }

  async addJob(jobName: string, data: unknown): Promise<void> {
    await this.queue.add(jobName, data)
  }
}
