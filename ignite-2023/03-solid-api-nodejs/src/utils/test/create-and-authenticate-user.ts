import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password_hash: await hash('jhon123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhon.doe@gmail.com',
    password: 'jhon123',
  })

  const { token } = authResponse.body

  return { token }
}
