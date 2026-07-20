import "server-only";
import { API_TIMEOUT_MS } from "@/constants/api";

const RETRYABLE_STATUSES = new Set([502, 503, 504]);
const RETRY_DELAYS_MS = [1_000];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableFetchError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "TimeoutError") ||
    error instanceof TypeError
  );
}

/**
 * Render の起動・再起動中に返る一時的な gateway error を吸収する。
 * 呼び出し元は GET のみに使用すること。
 */
export async function fetchApiOnServer(
  input: string | URL,
  init: RequestInit = {},
): Promise<Response> {
  for (let attempt = 0; ; attempt += 1) {
    const delay = RETRY_DELAYS_MS[attempt];
    try {
      const response = await fetch(input, {
        ...init,
        signal: AbortSignal.timeout(API_TIMEOUT_MS),
      });

      if (!RETRYABLE_STATUSES.has(response.status) || delay === undefined) {
        return response;
      }

      // 次の接続を再利用させず、レスポンスボディを確実に解放する。
      await response.body?.cancel();
      console.warn(
        `Backend temporarily unavailable; status=${response.status} attempt=${attempt + 1} retry_in_ms=${delay}`,
      );
    } catch (error) {
      if (!isRetryableFetchError(error) || delay === undefined) {
        throw error;
      }

      const status =
        error instanceof DOMException && error.name === "TimeoutError"
          ? "timeout"
          : "connection_error";
      console.warn(
        `Backend temporarily unavailable; status=${status} attempt=${attempt + 1} retry_in_ms=${delay}`,
      );
    }

    await wait(delay);
  }
}
