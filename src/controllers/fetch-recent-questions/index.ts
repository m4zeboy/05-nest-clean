import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

import { PrismaService } from 'src/prisma/prisma.service'
import {
  PageQueryParamSchema,
  pageQueryParamSchema,
} from './query-params-schema'

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async handle(@Query(queryValidationPipe) query: PageQueryParamSchema) {
    const perPage = 1
    const page = query.page ?? 1

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { questions }
  }
}
