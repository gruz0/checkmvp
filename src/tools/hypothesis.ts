import { prisma } from '@/lib/prisma'

export async function getHypothesisCount() {
  return await prisma.generatedHypothesis.count()
}
