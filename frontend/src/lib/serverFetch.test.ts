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

test("タイムアウト後に1回再試行して成功する", async () => {
  vi.mocked(fetch)
    .mockRejectedValueOnce(new DOMException("Timed out", "TimeoutError"))
    .mockResolvedValueOnce(new Response(null, { status: 200 }));

  const responsePromise = fetchApiOnServer("https://example.com/api/user");

  await vi.runAllTimersAsync();

  await expect(responsePromise).resolves.toMatchObject({ status: 200 });
  expect(fetch).toHaveBeenCalledTimes(2);
});

test("一時的な接続失敗後に1回再試行して成功する", async () => {
  vi.mocked(fetch)
    .mockRejectedValueOnce(new TypeError("fetch failed"))
    .mockResolvedValueOnce(new Response(null, { status: 200 }));

  const responsePromise = fetchApiOnServer("https://example.com/api/user");

  await vi.runAllTimersAsync();

  await expect(responsePromise).resolves.toMatchObject({ status: 200 });
  expect(fetch).toHaveBeenCalledTimes(2);
});

test("502後に1回再試行して成功する", async () => {
  vi.mocked(fetch)
    .mockResolvedValueOnce(new Response(null, { status: 502 }))
    .mockResolvedValueOnce(new Response(null, { status: 200 }));

  const responsePromise = fetchApiOnServer("https://example.com/api/user");

  await vi.runAllTimersAsync();

  await expect(responsePromise).resolves.toMatchObject({ status: 200 });
  expect(fetch).toHaveBeenCalledTimes(2);
});

test("401は再試行しない", async () => {
  vi.mocked(fetch).mockResolvedValueOnce(
    new Response(null, { status: 401 }),
  );

  const response = await fetchApiOnServer("https://example.com/api/user");

  expect(response.status).toBe(401);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("2回目も失敗した場合はそこで停止する", async () => {
  vi.mocked(fetch).mockResolvedValue(
    new Response(null, { status: 504 }),
  );

  const responsePromise = fetchApiOnServer("https://example.com/api/user");

  await vi.runAllTimersAsync();

  await expect(responsePromise).resolves.toMatchObject({ status: 504 });
  expect(fetch).toHaveBeenCalledTimes(2);
});
