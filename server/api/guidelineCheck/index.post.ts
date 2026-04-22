import { z } from 'zod';
import { checkGuideline } from '~~/server/utils/guidelineCheck';

export default defineEventHandler(async (event) => {
  const bodySchema = z.object({
    text: z.string().min(1, 'テキストは必須です'),
    rules: z.array(z.string()).min(1, 'ルールは1つ以上指定してください'),
  });

  const body = await readValidatedBody(event, bodySchema.parse);
  const stream = createEventStream(event);

  (async () => {
    try {
      const result = await checkGuideline(body, (from, to) => {
        stream.push({ event: 'fallback', data: JSON.stringify({ from, to }) });
      });
      await stream.push({ event: 'result', data: JSON.stringify(result) });
    }
    catch (err) {
      const message = err instanceof Error ? err.message : '不明なエラー';
      await stream.push({ event: 'error', data: JSON.stringify({ message }) });
    }
    finally {
      await stream.close();
    }
  })();

  return stream.send();
});
