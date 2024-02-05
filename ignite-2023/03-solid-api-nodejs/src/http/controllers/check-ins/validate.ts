import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })
  const { checkInId } = createCheckInsParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInsUseCase()
  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
