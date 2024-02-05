import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Jhon Doe',
    email: 'jhon.doe@gmail.com',
    password: 'jhon123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhon.doe@gmail.com',
    password: 'jhon123',
  })

  const { token } = authResponse.body

  return { token }
}
