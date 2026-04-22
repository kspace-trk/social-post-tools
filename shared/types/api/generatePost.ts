export type GeneratePostRequestBody = {
  requirements: string;
  referencePosts: string[];
};

export type GeneratePostResponse = {
  post: string;
  model: string;
  usedFallback: boolean;
};
