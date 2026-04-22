import type { GuidelineCheckRequestBody, GuidelineCheckResponse } from '~~/shared/types/api/guidelineCheck';

export const useGuidelineCheck = () => {
  const error = ref<string | null>(null);
  const data = ref<GuidelineCheckResponse | null>(null);
  const { fallbackLogs, pending, fetchSSE } = useSSEFetch();

  const checkGuideline = async (requestBody: GuidelineCheckRequestBody): Promise<GuidelineCheckResponse | null> => {
    error.value = null;
    data.value = null;

    await fetchSSE<GuidelineCheckResponse>({
      url: '/api/guidelineCheck',
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
    checkGuideline,
  };
};
