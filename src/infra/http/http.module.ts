import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account'
import { AuthenticateController } from './controllers/authenticate'
import { CreateQuestionController } from './controllers/create-question'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CryptographModule } from '../cryptography/crypyograph.module'

@Module({
  imports: [DatabaseModule, CryptographModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
