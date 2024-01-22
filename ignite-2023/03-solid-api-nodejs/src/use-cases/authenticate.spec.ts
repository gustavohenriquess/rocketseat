import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    // sut == system under test

    await usersRepository.create({
      name: 'John Doe',
      email: 'jhon.doe@gmail.com',
      password_hash: await hash('jh0n@d03', 6),
    })

    const { user } = await sut.execute({
      email: 'jhon.doe@gmail.com',
      password: 'jh0n@d03',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    // sut == system under test

    await expect(async () => {
      await sut.execute({
        email: 'jhon.doe@gmail.com',
        password: 'jh0n@d03',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    // sut == system under test

    await usersRepository.create({
      name: 'John Doe',
      email: 'jhon.doe@gmail.com',
      password_hash: await hash('jh0n@d03', 6),
    })

    await expect(async () => {
      await sut.execute({
        email: 'jhon.doe@gmail.com',
        password: 'jhon@doe',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
