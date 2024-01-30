import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repositories/students-repository'
import { FakeHaser } from 'test/cryptograph/fake-hasher'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: RegisterStudentUseCase
let fakeHasher: FakeHaser

describe('register student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHaser()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })
  it('should be able to register a student', async () => {
    const result = await sut.execute({
      name: 'Moisés Silva de Azevedo',
      email: 'moises@email.com',
      password: 'password',
    })
    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Moisés Silva de Azevedo',
      email: 'moises@email.com',
      password: 'password',
    })
    expect(result.isSuccess()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(
      'password-hashed',
    )
  })
})
