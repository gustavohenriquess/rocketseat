import { FastifyRequest, FastifyReply } from 'fastify'

/*
 * https://github.com/fastify/fastify-jwt?tab=readme-ov-file#typescript-1
 * Documentation to add types to fastify-jwt
 */

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()
  console.log(request.user.sub)
  return reply.status(200).send()
}
