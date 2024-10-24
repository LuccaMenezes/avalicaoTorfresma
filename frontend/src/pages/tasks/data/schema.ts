import { z } from 'zod'

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const taskSchema = z.object({
  id: z.number(),
  categoryId: z.number(),  
  category: categorySchema,
  title: z.string(),
  description: z.string(),
  status: z.string(),
  creationDate: z.string(),
  completionDate: z.string().nullable().optional(),
});

export type Task = z.infer<typeof taskSchema>;
