"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MediaError({ error, reset }: Props) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center">
      <p className="mb-4 text-gray-700">一覧の読み込みに失敗しました</p>
      <button
        onClick={reset}
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
