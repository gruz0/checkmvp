import 'dotenv/config'
import { Job, Worker } from 'bullmq'
import { IdeaService } from '@/lib/IdeaService'
import { ChatGPTIdeaAIService } from '@/lib/OpenAIIdeaAIService'
import { QueueServiceFactory } from '@/lib/QueueServiceFactory'
import { SQLiteIdeaRepository } from '@/lib/SQLiteIdeaRepository'
import { env } from '@/lib/env'

const queueService = QueueServiceFactory.createQueueService('bullmq')
const chatGPTService = new ChatGPTIdeaAIService(env.OPENAI_API_KEY)
const repository = new SQLiteIdeaRepository()
const ideaService = new IdeaService(repository, queueService, chatGPTService)

async function processJob(job: Job) {
  switch (job.name) {
    case 'evaluateIdeaAndTargetAudience': {
      await handleEvaluateIdeaAndTargetAudience(job)
      break
    }

    case 'generateIdeaContentAndStrategy': {
      await handleGenerateIdeaContentAndStrategy(job)
      break
    }

    case 'generateUserAcquisitionAndCompetitorAnalysis': {
      await handleGenerateUserAcquisitionAndCompetitorAnalysis(job)
      break
    }

    case 'generateContentStrategyAndGrowthPlan': {
      await handleGenerateContentStrategyAndGrowthPlan(job)
      break
    }

    default:
      throw new Error(`Unknown job type: ${job.name}`)
  }
}

async function handleEvaluateIdeaAndTargetAudience(job: Job) {
  const { ideaId } = job.data

  console.log(`Processing idea evaluation for ideaId: ${ideaId}`)

  await ideaService.evaluateIdeaAndTargetAudience(ideaId)

  return { success: true }
}

async function handleGenerateIdeaContentAndStrategy(job: Job) {
  const { ideaId } = job.data

  console.log(`Processing idea content and strategy for ideaId: ${ideaId}`)

  await ideaService.evaluateContentAndLongTermStrategy(ideaId)

  return { success: true }
}

async function handleGenerateUserAcquisitionAndCompetitorAnalysis(job: Job) {
  const { ideaId } = job.data

  console.log(
    `Processing idea user acquisition and competitor analysis for ideaId: ${ideaId}`
  )

  await ideaService.evaluateUserAcquisitionAndCompetitorAnalysis(ideaId)

  return { success: true }
}

async function handleGenerateContentStrategyAndGrowthPlan(job: Job) {
  const { ideaId } = job.data

  console.log(
    `Processing idea content strategy and growth plan for ideaId: ${ideaId}`
  )

  await ideaService.evaluateContentStrategyAndGrowthPlan(ideaId)

  return { success: true }
}

const worker = new Worker('tasks', async (job) => await processJob(job), {
  connection: {
    host: new URL(env.REDIS_URL).hostname,
    port: parseInt(new URL(env.REDIS_URL).port),
    password: new URL(env.REDIS_URL).password,
  },
})

worker.on('completed', (job) => {
  console.log(`Job with ID ${job.id} has been completed successfully.`)
})

worker.on('failed', (job, err) => {
  if (!job) {
    return
  }

  console.error(`Job with ID ${job.id} has failed with error ${err.message}`)
})
