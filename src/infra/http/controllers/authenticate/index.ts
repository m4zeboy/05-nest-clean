import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { AuthenticateBodySchema, authenticateBodySchema } from './body-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = authenticateBodySchema.parse(body)

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })
    if (result.isFailure()) {
      throw new Error()
    }
    const { accessToken } = result.value
    return {
      access_token: accessToken,
    }
  }
}
