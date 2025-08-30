import { z } from 'zod';
import type { GeneratePostResponse } from '~~/shared/types/api/generatePost';
import { generatePost } from '~~/server/utils/ post';

export default defineEventHandler(async (event): Promise<GeneratePostResponse> => {
  const bodySchema = z.object({
    requirements: z.string().min(1, '要件は必須です'),
    referencePosts: z.array(z.string()).optional().default([]),
  });

  const { requirements, referencePosts } = await readValidatedBody(event, bodySchema.parse);
  const generatedPost = await generatePost({ requirements, referencePosts });

  return generatedPost;
});
