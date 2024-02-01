import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { CreateAccountBodySchema, createAccountBodySchema } from './body-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = createAccountBodySchema.parse(body)

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    })

    if (result.isFailure()) {
      throw new Error()
    }
  }
}
