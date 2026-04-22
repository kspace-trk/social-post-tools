import type { TranslateRequestBody, TranslateResponse } from '~~/shared/types/api/translate';

export const useTranslate = () => {
  const error = ref<string | null>(null);
  const data = ref<TranslateResponse | null>(null);
  const { fallbackLogs, pending, fetchSSE } = useSSEFetch();

  const translateText = async (requestBody: TranslateRequestBody): Promise<TranslateResponse | null> => {
    error.value = null;
    data.value = null;

    await fetchSSE<TranslateResponse>({
      url: '/api/translate',
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
    translateText,
  };
};
