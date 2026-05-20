import { z } from "zod";

export const userCreateSchema = z.object({
  username: z
    .string()
    .min(3, "Mínimo 3 caracteres"),

  nombre: z
    .string()
    .min(2, "Nombre requerido"),

  apellido: z
    .string()
    .min(2, "Apellido requerido"),

  email: z
    .string()
    .email("Email inválido"),
    

  password: z
    .string()
    .min(6, "Mínimo 6 caracteres"),

  perfilAcademico: z
    .string()
    .optional(),

  RoleName: z
    .string()
    .min(1, "Rol requerido"),

  foto: z
    .instanceof(File)
    .optional(),
});

export type UserCreateFormData =
  z.infer<typeof userCreateSchema>;