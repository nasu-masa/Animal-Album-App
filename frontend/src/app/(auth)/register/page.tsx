"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { register, RegisterValidationError } from "@/lib/auth";
import AuthInput from "@/components/auth/AuthInput";
import SubmitButton from "@/components/auth/SubmitButton";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [commonError, setCommonError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setCommonError("");

    try {
      await register(name, email, password, passwordConfirmation);
      router.replace("/");
    } catch (error) {
      if (error instanceof RegisterValidationError) {
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
        <h1 className="mb-6 text-center text-2xl font-bold text-amber-600">
          新規登録
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
            <AuthInput
              id="name"
              label="名前"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={fieldErrors.name}
            />
          </div>

          <div className="mb-4">
            <AuthInput
              id="email"
              label="メールアドレス"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldErrors.email}
            />
          </div>

          <div className="mb-4">
            <AuthInput
              id="password"
              label="パスワード"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
            />
          </div>

          <div className="mb-6">
            <AuthInput
              id="password_confirmation"
              label="パスワード（確認）"
              type="password"
              autoComplete="new-password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              error={fieldErrors.password_confirmation}
            />
          </div>

          <SubmitButton
            label="新規登録"
            loadingLabel="登録中..."
            disabled={submitting}
          />

          <p className="mt-6 text-center text-sm text-gray-500">
            アカウントをお持ちの方はこちら
            <Link href="/login" className="ml-1 text-amber-600 hover:underline">
              ログイン
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
