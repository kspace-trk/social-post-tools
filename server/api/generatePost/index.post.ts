import { z } from 'zod';
import { generatePost } from '~~/server/utils/ post';

export default defineEventHandler(async (event) => {
  const bodySchema = z.object({
    requirements: z.string().min(1, '要件は必須です'),
    referencePosts: z.array(z.string()).optional().default([]),
  });

  const body = await readValidatedBody(event, bodySchema.parse);
  const stream = createEventStream(event);

  (async () => {
    try {
      const result = await generatePost(body, (from, to) => {
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
