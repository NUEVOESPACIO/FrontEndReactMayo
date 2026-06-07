import { z } from "zod";

export const userCreateSchema = z.object({
  username: z
    .string()
    .min(1, "Username requerido")
    .regex(
      /^[A-Za-z][A-Za-z0-9_]*$/,
      "Debe comenzar con una letra y no contener espacios"
    ),

  nombre: z
    .string()
    .min(1, "Nombre requerido"),

  apellido: z
    .string()
    .min(1, "Apellido requerido"),

  email: z
    .string()
    .trim()
    .min(1, "Email requerido")
    .email("Email inválido"),


  password: z
    .string()
    .min(1, "Mínimo 6 caracteres"),

  confirmPassword: z
    .string()
    .min(1, "Confirma la password"),

  perfilAcademico: z
    .string()
    .optional(),

  RoleName: z
    .string()
    .min(1, "Rol requerido"),

  foto: z
    .instanceof(File)
    .optional()


})

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,

    {
      message:
        "Las passwords no coinciden",

      path: ["confirmPassword"],
    }
  );



export type UserCreateFormData =
  z.infer<typeof userCreateSchema>;