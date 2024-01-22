import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhon.doe@gmail.com',
      password: 'jh0n@d03',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhon.doe@gmail.com',
      password: 'jh0n@d03',
    })

    const isPasswordHashed = await compare('jh0n@d03', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jhon.doe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'jh0n@d03',
    })

    await expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email,
        password: 'jh0n@d03',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
