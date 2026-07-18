import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { fetchApiOnServer } from "@/lib/serverFetch";

vi.mock("server-only", () => ({}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("一時的なゲートウェイエラーを再試行する", async () => {
  vi.mocked(fetch)
    .mockResolvedValueOnce(new Response(null, { status: 503 }))
    .mockResolvedValueOnce(new Response(null, { status: 200 }));

  const responsePromise = fetchApiOnServer("https://example.com/api/media");

  await vi.runAllTimersAsync();

  await expect(responsePromise).resolves.toMatchObject({ status: 200 });
  expect(fetch).toHaveBeenCalledTimes(2);
});

test("再試行対象外のエラーはそのまま返す", async () => {
  vi.mocked(fetch).mockResolvedValueOnce(
    new Response(null, { status: 500 }),
  );

  const response = await fetchApiOnServer("https://example.com/api/media");

  expect(response.status).toBe(500);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("一時的なエラーが続いても最大3回で停止する", async () => {
  vi.mocked(fetch).mockResolvedValue(
    new Response(null, { status: 504 }),
  );

  const responsePromise = fetchApiOnServer("https://example.com/api/media");

  await vi.runAllTimersAsync();

  await expect(responsePromise).resolves.toMatchObject({ status: 504 });
  expect(fetch).toHaveBeenCalledTimes(3);
});
