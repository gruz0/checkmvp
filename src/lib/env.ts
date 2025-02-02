import { coerce, object, string } from 'zod'

const envSchema = object({
  DOMAIN: string().min(1),
  OPENAI_API_KEY: string().default(''),
  REDIS_URL: string().default(''),
  DATABASE_URL: string().default(''),
  SENTRY_DSN: string().default(''),
  NEXT_PUBLIC_URL: string().min(1),
  IDEA_SERVICE_API_BASE: string().min(1),
  CONCEPT_SERVICE_API_BASE: string().min(1),
  CREATE_IDEA_LIMITER_LIMIT: coerce.number().positive(),
  CREATE_IDEA_LIMITER_TIMEFRAME: coerce.number().positive(),
  CONCEPT_EXPIRATION_DAYS: coerce.number().positive().default(3),
  IDEA_EXPIRATION_DAYS: coerce.number().positive().default(3),
  ANONYMIZE_CONCEPTS: coerce.number().nonnegative().pipe(coerce.boolean()),
})

export const env = envSchema.parse(process.env)
