import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import {
  CreateQuestionBodySchema,
  createQuestionBodySchema,
} from './body-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}
  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    const { content, title } = body
    const { sub: authorId } = user
    const result = await this.createQuestion.execute({
      title,
      content,
      authorId,
      attachmentsIds: [],
    })

    if (result.isFailure()) {
      throw new BadRequestException()
    }
  }
}
