import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jhon.doe@gmail.com',
      password: 'jh0n@d03',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jhon.doe@gmail.com',
      password: 'jh0n@d03',
    })

    const isPasswordHashed = await compare('jh0n@d03', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const email = 'jhon.doe@gmail.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'jh0n@d03',
    })

    await expect(async () => {
      await registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'jh0n@d03',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
