import { generateTextWithAI } from './ai';
import type { GuidelineCheckRequestBody, GuidelineCheckResponse } from '~~/shared/api/guidelineCheck';

/**
 * テキストがガイドラインに適合しているかをチェックする関数
 * @param requestBody - チェックするテキストとルールが含まれるリクエストボディ
 * @returns ガイドラインチェック結果のテキスト
 */
export const checkGuideline = async (requestBody: GuidelineCheckRequestBody): Promise<GuidelineCheckResponse> => {
  const { text, rules } = requestBody;

  try {
    // システムプロンプトの作成
    let systemPrompt = `あなたはSNS投稿のガイドライン審査の担当者です。提供されたテキストがガイドラインに適合しているかどうかをチェックし、改善点があれば修正提案を行ってください。ガイドラインを満たしている場合は、その旨を教えてください。`;

    // ルールがある場合はシステムプロンプトに追加
    if (rules && rules.length > 0) {
      systemPrompt += `\n\n審査時に従うべきガイドライン:\n`;
      rules.forEach((rule, index) => {
        systemPrompt += `${index + 1}. ${rule}\n`;
      });
    }

    // ユーザープロンプトの作成
    const userPrompt = `以下のテキストをガイドラインに照らし合わせてチェックしてください:\n\n${text}`;

    // AI APIでのガイドラインチェック
    const guidelineCheckText = await generateTextWithAI(systemPrompt, userPrompt, {
      model: 'gpt-4o-mini',
      maxTokens: 1500,
      temperature: 0.1, // ガイドラインチェックでは一貫性と正確性を重視するため低い値
    });

    return {
      guidelineCheckText,
    };
  }
  catch (error) {
    console.error('checkGuideline エラー:', error);
    throw new Error(`ガイドラインチェック中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
};
