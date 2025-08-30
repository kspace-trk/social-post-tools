import type { GeneratePostRequestBody, GeneratePostResponse } from '~/shared/api/generatePost';

export default defineEventHandler(async (event) => {
  const body = await readBody<GeneratePostRequestBody>(event);
  const { post, referencePosts } = body;
  const generatedPost = await generatePost(post, referencePosts);
  return generatedPost;
});
