import OpenAI from 'openai';

// OpenAI クライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * OpenAI APIを使用してテキストを生成する関数
 * @param systemPrompt - システムプロンプト
 * @param userPrompt - ユーザープロンプト
 * @param options - 生成オプション
 * @returns 生成されたテキスト
 */
export const generateTextWithAI = async (
  systemPrompt: string,
  userPrompt: string,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {},
): Promise<string> => {
  const {
    model = 'gpt-4o-mini',
    maxTokens = 500,
    temperature = 0.7,
  } = options;

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      max_tokens: maxTokens,
      temperature,
    });

    const generatedText = response.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error('テキストの生成に失敗しました');
    }

    return generatedText.trim();
  }
  catch (error) {
    console.error('AI生成エラー:', error);
    throw new Error(`AI生成中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
};

/**
 * 参考投稿を含むシステムプロンプトを生成する関数
 * @param referencePosts - 参考投稿の配列
 * @returns システムプロンプト
 */
export const createSystemPromptWithReferences = (referencePosts?: string[]): string => {
  let systemPrompt = `以下の参考投稿の形式を取り入れて、要求に基づいて投稿文を生成してください。`;

  // 参考投稿がある場合はシステムプロンプトに追加
  if (referencePosts && referencePosts.length > 0) {
    systemPrompt += `\n\n参考投稿:\n`;
    referencePosts.forEach((post: string, index: number) => {
      systemPrompt += `\n例${index + 1}: "${post}"\n`;
    });
  }

  return systemPrompt;
};
