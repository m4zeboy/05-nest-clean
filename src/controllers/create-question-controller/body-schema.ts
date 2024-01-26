import { z } from 'zod'

export const createQuestionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
