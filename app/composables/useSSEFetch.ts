type SSEEvent = {
  event: string;
  data: string;
};

type FallbackLog = {
  from: string;
  to: string;
};

type SSEFetchOptions<T> = {
  url: string;
  body: Record<string, unknown>;
  onResult: (data: T) => void;
  onError: (message: string) => void;
};

export const useSSEFetch = () => {
  const fallbackLogs = ref<FallbackLog[]>([]);
  const pending = ref(false);

  const parseSSEEvents = (text: string): { events: SSEEvent[]; remaining: string } => {
    const events: SSEEvent[] = [];
    const parts = text.split('\n\n');
    const remaining = parts.pop() || '';

    for (const part of parts) {
      if (!part.trim()) continue;
      const lines = part.split('\n');
      let event = '';
      let data = '';
      for (const line of lines) {
        if (line.startsWith('event: ')) event = line.slice(7);
        if (line.startsWith('data: ')) data = line.slice(6);
      }
      if (event && data) {
        events.push({ event, data });
      }
    }

    return { events, remaining };
  };

  const fetchSSE = async <T>(options: SSEFetchOptions<T>): Promise<void> => {
    const { url, body, onResult, onError } = options;
    pending.value = true;
    fallbackLogs.value = [];

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok || !response.body) {
        onError(`HTTPエラー: ${response.status}`);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const { events, remaining } = parseSSEEvents(buffer);
        buffer = remaining;

        for (const ev of events) {
          if (ev.event === 'fallback') {
            const log = JSON.parse(ev.data) as FallbackLog;
            fallbackLogs.value.push(log);
          }
          else if (ev.event === 'result') {
            onResult(JSON.parse(ev.data) as T);
          }
          else if (ev.event === 'error') {
            const { message } = JSON.parse(ev.data);
            onError(message);
          }
        }
      }
    }
    catch (err) {
      onError(err instanceof Error ? err.message : '通信エラーが発生しました');
    }
    finally {
      pending.value = false;
    }
  };

  return {
    fallbackLogs: readonly(fallbackLogs),
    pending: readonly(pending),
    fetchSSE,
  };
};
