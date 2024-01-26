import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { MaxNumberOfCheckInsError } from './erros/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './erros/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsInMemoryRepository: InMemoryGymsRepository
let sut: CheckInUseCase
// sut == system under test

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsInMemoryRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsInMemoryRepository)

    await gymsInMemoryRepository.create({
      id: 'any_gym_id',
      title: 'Academia JS',
      description: '',
      phone: '',
      latitude: -23.6600823,
      longitude: -46.5451525,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -23.6600823,
      userLongitude: -46.5451525,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -23.6600823,
      userLongitude: -46.5451525,
    })

    await expect(() =>
      sut.execute({
        userId: 'any_user_id',
        gymId: 'any_gym_id',
        userLatitude: -23.6600823,
        userLongitude: -46.5451525,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -23.6600823,
      userLongitude: -46.5451525,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -23.6600823,
      userLongitude: -46.5451525,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distance gym', async () => {
    await gymsInMemoryRepository.create({
      id: 'any_gym_id_2',
      title: 'Academia JS',
      description: '',
      phone: '',
      latitude: -23.6117639,
      longitude: -46.5689705,
    })

    await expect(() =>
      sut.execute({
        userId: 'any_user_id',
        gymId: 'any_gym_id_2',
        userLatitude: -23.6600823,
        userLongitude: -46.5451525,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
