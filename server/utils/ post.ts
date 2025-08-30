import OpenAI from 'openai';
import type { GeneratePostRequestBody, GeneratePostResponse } from '~~/shared/api/generatePost';

// OpenAI クライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * ソーシャルメディア投稿を生成する関数
 * @param requestBody - 要求内容と参考投稿が含まれるリクエストボディ
 * @returns 生成された投稿内容
 */
export const generatePost = async (requestBody: GeneratePostRequestBody): Promise<GeneratePostResponse> => {
  const { requirements, referencePosts } = requestBody;

  try {
    // システムプロンプトの作成
    let systemPrompt = `以下の参考投稿の形式を取り入れて、要求に基づいて投稿文を生成してください。`;

    // 参考投稿がある場合はシステムプロンプトに追加
    if (referencePosts && referencePosts.length > 0) {
      systemPrompt += `\n\n参考投稿:\n`;
      referencePosts.forEach((post: string, index: number) => {
        systemPrompt += `\n例${index + 1}: "${post}"\n`;
      });
    }

    // OpenAI APIでの投稿生成
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `以下の要求に基づいて投稿文を生成してください:\n\n${requirements}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const generatedPost = response.choices[0]?.message?.content;

    if (!generatedPost) {
      throw new Error('投稿の生成に失敗しました');
    }

    return {
      post: generatedPost.trim(),
    };
  }
  catch (error) {
    console.error('generatePost エラー:', error);
    throw new Error(`投稿生成中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
};
