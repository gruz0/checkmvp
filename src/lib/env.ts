import { object, string } from 'zod'

const envSchema = object({
  OPENAI_API_KEY: string().min(1),
  REDIS_URL: string().min(1),
  DATABASE_URL: string().min(1).optional(),
})

export const env = envSchema.parse(process.env)
