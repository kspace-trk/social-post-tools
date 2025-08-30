import type { TranslateRequestBody, TranslateResponse } from '~~/shared/types/api/translate';
import { translateText } from '~~/server/utils/translate';

export default defineEventHandler(async (event): Promise<TranslateResponse> => {
  try {
    const body = await readBody<TranslateRequestBody>(event);
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

    // 翻訳の実行
    const result = await translateText(body);

    console.log('result', result);

    return result;
  }
  catch (error) {
    console.error('翻訳API エラー:', error);

    // 既にcreateErrorで作成されたエラーの場合はそのまま投げる
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    // その他のエラーは500として扱う
    throw createError({
      statusCode: 500,
      statusMessage: '翻訳処理中にエラーが発生しました',
    });
  }
});
