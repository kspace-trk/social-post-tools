import type { TranslateRequestBody, TranslateResponse } from '~~/shared/api/translate';

interface UseTranslateReturn {
  data: Readonly<Ref<TranslateResponse | null>>;
  pending: Readonly<Ref<boolean>>;
  error: Readonly<Ref<string | null>>;
  translateText: (requestBody: TranslateRequestBody) => Promise<TranslateResponse | null>;
}

export const useTranslate = (): UseTranslateReturn => {
  const pending = ref(false);
  const error = ref<string | null>(null);
  const data = ref<TranslateResponse | null>(null);

  const translateText = async (requestBody: TranslateRequestBody): Promise<TranslateResponse | null> => {
    try {
      pending.value = true;
      error.value = null;
      data.value = null;

      const response = await $fetch<TranslateResponse>('/api/translate', {
        method: 'POST',
        body: requestBody,
      });

      data.value = response;
      return response;
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : '翻訳中にエラーが発生しました';
      error.value = errorMessage;
      console.error('useTranslate エラー:', err);
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
    translateText,
  };
};
