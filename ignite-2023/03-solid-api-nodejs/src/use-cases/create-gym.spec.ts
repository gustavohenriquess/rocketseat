import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { CreateGymUseCase } from './create-gym'

let createGymRespository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    createGymRespository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(createGymRespository)
  })
  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gym',
      description: null,
      phone: null,
      latitude: -23.6600823,
      longitude: -46.5451525,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
