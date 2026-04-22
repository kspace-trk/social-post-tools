import type { GeneratePostRequestBody, GeneratePostResponse } from '~~/shared/types/api/generatePost';

export const useGeneratePost = () => {
  const error = ref<string | null>(null);
  const data = ref<GeneratePostResponse | null>(null);
  const { fallbackLogs, pending, fetchSSE } = useSSEFetch();

  const generatePost = async (requestBody: GeneratePostRequestBody): Promise<GeneratePostResponse | null> => {
    error.value = null;
    data.value = null;

    await fetchSSE<GeneratePostResponse>({
      url: '/api/generatePost',
      body: requestBody,
      onResult: (result) => { data.value = result; },
      onError: (message) => { error.value = message; },
    });

    return data.value;
  };

  return {
    data: readonly(data),
    pending,
    error: readonly(error),
    fallbackLogs,
    generatePost,
  };
};
