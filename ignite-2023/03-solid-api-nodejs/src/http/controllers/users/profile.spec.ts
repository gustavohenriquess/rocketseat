import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile - e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get user Profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jhon.doe@gmail.com',
      }),
    )
  })
})
