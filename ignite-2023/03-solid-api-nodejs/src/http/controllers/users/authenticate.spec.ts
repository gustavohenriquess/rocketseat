import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate - e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to Authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: 'jhon123',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'jhon.doe@gmail.com',
      password: 'jhon123',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
