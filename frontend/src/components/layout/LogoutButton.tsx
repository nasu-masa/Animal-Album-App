"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth";

export default function LogoutButton() {
  const pathname = usePathname();

  return <LogoutButtonForRoute key={pathname} />;
}

function LogoutButtonForRoute() {
  const [LoggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      await logout();
      window.location.replace("/");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "ログアウトに失敗しました。時間をおいて再度お試しください。",
      );
      setLoggingOut(false);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-1 text-xs text-red-600">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleLogout}
        disabled={LoggingOut}
        className="text-sm text-gray-600 hover:text-amber-600 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {LoggingOut ? "ログアウト中..." : "ログアウト"}
      </button>
    </div>
  );
}
