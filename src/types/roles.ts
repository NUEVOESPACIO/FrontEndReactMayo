export const ROLE_LABELS = {
  ROLE_ADMIN: "Administrador",
  ROLE_VISITANTE: "Visitante",
  ROLE_FISICO: "Científico",
  ROLE_ASTRONOMO: "Astrónomo",
} as const;

export type RoleKey = keyof typeof ROLE_LABELS;

export function getRoleLabel(rol: string): string {
  return ROLE_LABELS[rol as RoleKey] ?? rol;
}