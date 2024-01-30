import { InMemoryStudentsRepository } from 'test/repositories/students-repository'
import { FakeEncrypter } from 'test/cryptograph/fake-encrypter'
import { FakeHaser } from 'test/cryptograph/fake-hasher'
import { Student } from '../../enterprise/entities/student'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: AuthenticateStudentUseCase
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHaser

describe('authenticate', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHaser()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })
  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'john.doe@email.co,',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: student.email,
      password: '123456',
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
