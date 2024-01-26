import { z } from 'zod'

export const pageQueryParamSchema = z.object({
  page: z.coerce.number().optional().default(1),
})

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
