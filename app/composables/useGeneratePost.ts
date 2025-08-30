import type { GeneratePostRequestBody, GeneratePostResponse } from '~~/shared/api/generatePost';

interface UseGeneratePostReturn {
  data: Readonly<Ref<GeneratePostResponse | null>>;
  pending: Readonly<Ref<boolean>>;
  error: Readonly<Ref<string | null>>;
  generatePost: (requestBody: GeneratePostRequestBody) => Promise<GeneratePostResponse | null>;
}

export const useGeneratePost = (): UseGeneratePostReturn => {
  const pending = ref(false);
  const error = ref<string | null>(null);
  const data = ref<GeneratePostResponse | null>(null);

  const generatePost = async (requestBody: GeneratePostRequestBody): Promise<GeneratePostResponse | null> => {
    try {
      pending.value = true;
      error.value = null;
      data.value = null;

      const response = await $fetch<GeneratePostResponse>('/api/generatePost', {
        method: 'POST',
        body: requestBody,
      });

      data.value = response;
      return response;
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : '投稿生成中にエラーが発生しました';
      error.value = errorMessage;
      console.error('useGeneratePost エラー:', err);
      return null;
    }
    finally {
      pending.value = false;
    }
  };

  return {
    // データ
    data: readonly(data),
    pending: readonly(pending),
    error: readonly(error),

    // メソッド
    generatePost,
  };
};
