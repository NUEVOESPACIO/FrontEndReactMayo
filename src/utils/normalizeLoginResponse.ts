import type { LoginResponse, User } from "../types/authTypes";

type RawRecord = Record<string, unknown>;

function pickToken(raw: RawRecord): string | null {
  for (const key of ["token", "accessToken", "jwt", "access_token"] as const) {
    const value = raw[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return null;
}

function isRecord(value: unknown): value is RawRecord {
  return typeof value === "object" && value !== null;
}

function mapToUser(raw: RawRecord): User {
  return {
    id: Number(raw.id ?? 0),
    //name: String(raw.name ?? raw.nombre ?? "Usuario"),
    //surname:
    //  raw.surname != null
    //    ? String(raw.surname)
    //    : raw.apellido != null
    //      ? String(raw.apellido)
    //      : undefined,
    username:
      raw.username != null
        ? String(raw.username)
        : raw.usuario != null
          ? String(raw.usuario)
          : undefined,
    //email: String(raw.email ?? ""),
    rol: String(raw.role ?? raw.rol ?? "USER"),
  };
}

function extractUserPayload(source: RawRecord): RawRecord | null {
  for (const key of ["user", "usuario", "userDto", "profile"] as const) {
    const nested = source[key];
    if (isRecord(nested)) {
      return nested;
    }
  }

  if (source.id != null || source.email != null || source.name != null) {
    return source;
  }

  return null;
}

export function normalizeLoginResponse(data: unknown): LoginResponse {
  const root = isRecord(data) ? data : {};
  const source = isRecord(root.data) ? root.data : root;

  const token = pickToken(source) ?? pickToken(root);
  if (!token) {
    throw new Error("Invalid login response: missing token");
  }

  const userPayload = extractUserPayload(source);
  const user = userPayload ? mapToUser(userPayload) : null;

  return { token, user };
}
