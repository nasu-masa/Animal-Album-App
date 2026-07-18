"use client";

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function MyPageError({ error, unstable_retry }: Props) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center">
      <p className="mb-2 text-gray-700">
        マイページの読み込みに失敗しました
      </p>
      <p className="mb-1 text-sm text-gray-600">
        サーバーを起動している可能性があります
      </p>
      <p className="mb-4 text-sm text-gray-600">
        少し待ってから、もう一度お試しください
      </p>
      <button
        onClick={unstable_retry}
        className="rounded-full bg-amber-400 px-5 py-2 text-sm font-medium text-white hover:bg-amber-500"
      >
        再試行
      </button>
      {process.env.NODE_ENV === "development" && (
        <p className="mt-6 text-xs text-gray-400">{error.message}</p>
      )}
    </main>
  );
}
