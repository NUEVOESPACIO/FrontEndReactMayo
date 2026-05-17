import { apiClient } from "./axiosClient";
import type { User } from "../types/authTypes";

type RawRecord = Record<string, unknown>;

function isRecord(value: unknown): value is RawRecord {
  return typeof value === "object" && value !== null;
}

function mapToUser(raw: RawRecord): User {
  return {
    id: Number(raw.id ?? 0),
    username:
      raw.username != null
        ? String(raw.username)
        : raw.usuario != null
          ? String(raw.usuario)
          : undefined,
    rol: String(raw.role ?? raw.rol ?? "USER"),
  };
}

function normalizeUserList(data: unknown): User[] {
  if (Array.isArray(data)) {
    return data.filter(isRecord).map(mapToUser);
  }

  if (!isRecord(data)) {
    return [];
  }

  for (const key of ["content", "users", "data", "items"] as const) {
    const nested = data[key];
    if (Array.isArray(nested)) {
      return nested.filter(isRecord).map(mapToUser);
    }
  }

  return [];
}

function normalizeUser(data: unknown): User | null {
  if (!isRecord(data)) {
    return null;
  }

  const source = isRecord(data.data) ? data.data : data;
  return mapToUser(source);
}

export async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get("/users");
  return normalizeUserList(response.data);
}

export async function fetchUserById(id: number): Promise<User | null> {
  const response = await apiClient.get(`/users/${id}`);
  return normalizeUser(response.data);
}
