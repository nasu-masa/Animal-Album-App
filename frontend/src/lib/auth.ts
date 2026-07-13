import axios from "axios";

import apiClient from "@/lib/apiClient";
import type { User } from "@/types/user";

type ValidationErrors = Record<string, string[]>;

export class LoginValidationError extends Error {
  errors: ValidationErrors;
  constructor(message: string, errors: ValidationErrors) {
    super(message);
    this.errors = errors;
  }
}

export class LoginError extends Error { }

function isValidationErrors(value: unknown): value is ValidationErrors {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return Object.values(value).every(
    (messages) =>
      Array.isArray(messages) &&
      messages.every((message) => typeof message === "string"),
  );
}

function isValidationResponse(
  data: unknown,
): data is { message: string; errors?: ValidationErrors } {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const response = data as Record<string, unknown>;

  return (
    typeof response.message === "string" &&
    (response.errors === undefined || isValidationErrors(response.errors))
  );
}

export async function getUser(): Promise<User | null> {
  try {
    const res = await apiClient.get<User>("/api/user");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}

export async function login(email: string, password: string): Promise<void> {
  try {
    await apiClient.get("/sanctum/csrf-cookie");
    await apiClient.post("/login", { email, password });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      const data: unknown = error.response.data;
      if (isValidationResponse(data)) {
        throw new LoginValidationError(data.message, data.errors ?? {});
      }
    }
    throw new LoginError("通信エラーが発生しました。時間をおいて再度お試しください。");
  }
}
