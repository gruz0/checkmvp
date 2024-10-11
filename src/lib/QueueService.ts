export interface QueueService {
  addJob(jobName: string, data: unknown): Promise<void>
}
