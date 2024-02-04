import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register - e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: 'jhon123',
    })

    expect(response.statusCode).toBe(201)
  })
})
