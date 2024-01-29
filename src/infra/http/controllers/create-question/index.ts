import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import {
  CreateQuestionBodySchema,
  createQuestionBodySchema,
} from './body-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}
  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    const { content, title } = body
    const { sub: authorId } = user
    await this.createQuestion.execute({
      title,
      content,
      authorId,
      attachmentsIds: [],
    })
  }
}
