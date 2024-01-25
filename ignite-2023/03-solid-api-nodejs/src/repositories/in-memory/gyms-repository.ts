import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  // async create(data: Prisma.GymCreateInput) {
  //   const gym = {
  //     id: randomUUID(),
  //     title: data.title,
  //     latitude: data.latitude,
  //     longitude: data.longitude,
  //     description: data.description ?? null,
  //     phone: data.phone ?? null,
  //     created_at: new Date(),
  //   }

  //   this.gyms.push(gym)

  //   return gym
  // }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
