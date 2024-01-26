import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, failure, success } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'

interface ChooseQuestionBestAsnwerUseCaseRequest {
  answerId: string
  authorId: string
}

type ChooseQuestionBestAsnwerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAsnwerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAsnwerUseCaseRequest): Promise<ChooseQuestionBestAsnwerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return failure(new NotAllowedError())
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )
    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return success({
      question,
    })
  }
}
