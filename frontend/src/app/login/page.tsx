"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login, LoginValidationError } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [commonError, setCommonError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setCommonError("");

    try {
      await login(email, password);
      router.replace("/media");
    } catch (error) {
      if (error instanceof LoginValidationError) {
        const first: Record<string, string> = {};
        for (const [field, messages] of Object.entries(error.errors)) {
          const firstMessage = messages[0];

          if (firstMessage) {
            first[field] = firstMessage;
          }
        }
        setFieldErrors(first);
        if (Object.keys(error.errors).length === 0) {
          setCommonError(error.message);
        }
      } else {
        setCommonError(
          error instanceof Error
            ? error.message
            : "通信エラーが発生しました。時間をおいて再度お試しください。",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-orange-700">
          ログイン
        </h1>

        {commonError && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {commonError}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            {fieldErrors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={!!fieldErrors.password}
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            {fieldErrors.password && (
              <p
                id="password-error"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-orange-700 py-2 text-sm font-semibold text-white transition hover:bg-orange-800 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </main>
  );
}
