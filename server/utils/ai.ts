import OpenAI from 'openai';

// OpenRouter クライアントの初期化
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODELS = [
  'openai/gpt-oss-120b:free',
  'openai/gpt-oss-20b:free',
];

export type AIResult = {
  text: string;
  model: string;
  usedFallback: boolean;
};

/**
 * OpenRouter APIを使用してテキストを生成する関数
 * @param systemPrompt - システムプロンプト
 * @param userPrompt - ユーザープロンプト
 * @param options - 生成オプション
 * @returns 生成されたテキストとモデル情報
 */
export const generateTextWithAI = async (
  systemPrompt: string,
  userPrompt: string,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    onFallback?: (from: string, to: string) => void;
  } = {},
): Promise<AIResult> => {
  const {
    model,
    maxTokens = 500,
    temperature = 1,
    onFallback,
  } = options;

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  const params = { max_completion_tokens: maxTokens, temperature };
  const modelsToTry = model ? [model] : MODELS;

  for (let i = 0; i < modelsToTry.length; i++) {
    try {
      const currentModel = modelsToTry[i]!;
      const text = await callCompletion(currentModel, messages, params);
      return { text, model: currentModel, usedFallback: i > 0 };
    }
    catch (error) {
      const isLast = i === modelsToTry.length - 1;
      if (!isLast && error instanceof OpenAI.APIError && error.status === 429) {
        const from = modelsToTry[i]!;
        const to = modelsToTry[i + 1]!;
        console.warn(`${from} が429エラー。次のモデルへ: ${to}`);
        onFallback?.(from, to);
        continue;
      }
      console.error('AI生成エラー:', error);
      throw new Error(`AI生成中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    }
  }

  throw new Error('全てのモデルで生成に失敗しました');
};

const callCompletion = async (
  model: string,
  messages: OpenAI.ChatCompletionMessageParam[],
  params: { max_completion_tokens: number; temperature: number },
): Promise<string> => {
  const response = await openai.chat.completions.create({
    model,
    messages,
    ...params,
  });

  const generatedText = response.choices[0]?.message?.content;

  if (!generatedText) {
    console.error('AI応答の詳細:', {
      choices: response.choices,
      usage: response.usage,
      model: response.model,
    });
    throw new Error(`テキストの生成に失敗しました。レスポンス: ${JSON.stringify(response.choices)}`);
  }

  return generatedText.trim();
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
