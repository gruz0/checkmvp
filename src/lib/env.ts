import { coerce, object, string } from 'zod'

const envSchema = object({
  OPENAI_API_KEY: string().min(1),
  REDIS_URL: string().min(1),
  DATABASE_URL: string().min(1),
  CREATE_IDEA_LIMITER_LIMIT: coerce.number().positive().default(30),
  CREATE_IDEA_LIMITER_TIMEFRAME: coerce.number().positive().default(3600),
})

export const env = envSchema.parse(process.env)
