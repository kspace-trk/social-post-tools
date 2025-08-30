import type { GuidelineCheckRequestBody, GuidelineCheckResponse } from '~~/shared/types/api/guidelineCheck';
import { checkGuideline } from '~~/server/utils/guidelineCheck';

export default defineEventHandler(async (event): Promise<GuidelineCheckResponse> => {
  try {
    const body = await readBody<GuidelineCheckRequestBody>(event);
    // リクエストボディのバリデーション
    if (!body.text || typeof body.text !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'テキストが必要です',
      });
    }

    if (!body.rules || !Array.isArray(body.rules)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ルールは配列で指定してください',
      });
    }

    // ガイドラインチェックの実行
    const result = await checkGuideline(body);

    console.log('result', result);

    return result;
  }
  catch (error) {
    console.error('ガイドラインチェックAPI エラー:', error);

    // 既にcreateErrorで作成されたエラーの場合はそのまま投げる
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    // その他のエラーは500として扱う
    throw createError({
      statusCode: 500,
      statusMessage: 'ガイドラインチェック処理中にエラーが発生しました',
    });
  }
});
