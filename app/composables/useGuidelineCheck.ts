import type { GuidelineCheckRequestBody, GuidelineCheckResponse } from '~~/shared/api/guidelineCheck';

interface UseGuidelineCheckReturn {
  data: Readonly<Ref<GuidelineCheckResponse | null>>;
  pending: Readonly<Ref<boolean>>;
  error: Readonly<Ref<string | null>>;
  checkGuideline: (requestBody: GuidelineCheckRequestBody) => Promise<GuidelineCheckResponse | null>;
}

export const useGuidelineCheck = (): UseGuidelineCheckReturn => {
  const pending = ref(false);
  const error = ref<string | null>(null);
  const data = ref<GuidelineCheckResponse | null>(null);

  const checkGuideline = async (requestBody: GuidelineCheckRequestBody): Promise<GuidelineCheckResponse | null> => {
    try {
      pending.value = true;
      error.value = null;
      data.value = null;

      const response = await $fetch<GuidelineCheckResponse>('/api/guidelineCheck', {
        method: 'POST',
        body: requestBody,
      });

      data.value = response;
      return response;
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ガイドラインチェック中にエラーが発生しました';
      error.value = errorMessage;
      console.error('useGuidelineCheck エラー:', err);
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
    checkGuideline,
  };
};
