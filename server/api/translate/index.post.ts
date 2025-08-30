import { z } from 'zod';
import type { TranslateResponse } from '~~/shared/types/api/translate';
import { translateText } from '~~/server/utils/translate';

export default defineEventHandler(async (event): Promise<TranslateResponse> => {
  try {
    const bodySchema = z.object({
      text: z.string().min(1, 'テキストは必須です'),
      rules: z.array(z.string()).min(1, 'ルールは1つ以上指定してください'),
    });

    const body = await readValidatedBody(event, bodySchema.parse);

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
