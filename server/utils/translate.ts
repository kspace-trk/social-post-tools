import { generateTextWithAI } from './ai';
import type { TranslateRequestBody, TranslateResponse } from '~~/shared/types/api/translate';

/**
 * 日本語テキストを英語に翻訳する関数
 * @param requestBody - 翻訳する日本語テキストとルールが含まれるリクエストボディ
 * @returns 英語に翻訳されたテキスト
 */
export const translateText = async (requestBody: TranslateRequestBody): Promise<TranslateResponse> => {
  const { text, rules } = requestBody;
  try {
    // システムプロンプトの作成（日本語→英語専用）
    let systemPrompt = `あなたは英語のSNS運用担当者です。元の文章の形式を尊重しつつ、ルールに従って、日本語のテキストを英語に翻訳してください。`;

    // ルールがある場合はシステムプロンプトに追加
    if (rules && rules.length > 0) {
      systemPrompt += `\n\n翻訳時に必ず従うルール:\n`;
      rules.forEach((rule, index) => {
        systemPrompt += `${index + 1}. ${rule}\n`;
      });
    }

    systemPrompt += `\n翻訳結果の英語のみを出力し、説明は含めないでください。`;

    // ユーザープロンプトの作成
    const userPrompt = `ルールに従って、この文章を英語にしてください。:\n\n${text}`;

    // AI APIでの翻訳
    const translatedText = await generateTextWithAI(systemPrompt, userPrompt, {
      model: 'gpt-5-mini',
      maxTokens: 2000,
    });

    return {
      translatedText,
    };
  }
  catch (error) {
    console.error('translateText エラー:', error);
    throw new Error(`日本語から英語への翻訳中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
};
