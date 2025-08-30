import { z } from 'zod';
import type { GuidelineCheckResponse } from '~~/shared/types/api/guidelineCheck';
import { checkGuideline } from '~~/server/utils/guidelineCheck';

export default defineEventHandler(async (event): Promise<GuidelineCheckResponse> => {
  try {
    const bodySchema = z.object({
      text: z.string().min(1, 'テキストは必須です'),
      rules: z.array(z.string()).min(1, 'ルールは1つ以上指定してください'),
    });

    const body = await readValidatedBody(event, bodySchema.parse);

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
