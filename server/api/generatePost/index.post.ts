import type { GeneratePostRequestBody, GeneratePostResponse } from '~~/shared/types/api/generatePost';
import { generatePost } from '~~/server/utils/ post';

export default defineEventHandler(async (event): Promise<GeneratePostResponse> => {
  const body = await readBody<GeneratePostRequestBody>(event);
  const { requirements, referencePosts } = body;
  const generatedPost = await generatePost({ requirements, referencePosts });

  return generatedPost;
});
