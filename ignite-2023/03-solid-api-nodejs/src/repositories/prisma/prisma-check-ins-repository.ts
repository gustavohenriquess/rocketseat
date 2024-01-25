import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findManyByUserId(userId: string) {
    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: date,
          lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }
}
