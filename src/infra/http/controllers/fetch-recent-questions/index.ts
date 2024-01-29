import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import {
  PageQueryParamSchema,
  pageQueryParamSchema,
} from './query-params-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}
  @Get()
  async handle(@Query(queryValidationPipe) query: PageQueryParamSchema) {
    const page = query.page ?? 1
    const questions = await this.fetchRecentQuestions.execute({
      page,
    })
    return { questions }
  }
}
