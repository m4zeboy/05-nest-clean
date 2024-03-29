import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import {
  PageQueryParamSchema,
  pageQueryParamSchema,
} from './query-params-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { QuestionPresenter } from '../../presenters/question.presenter'

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}
  @Get()
  async handle(@Query(queryValidationPipe) query: PageQueryParamSchema) {
    const page = query.page ?? 1
    const result = await this.fetchRecentQuestions.execute({
      page,
    })
    if (result.isFailure()) {
      throw new BadRequestException()
    }
    const questions = result.value.questions

    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}
