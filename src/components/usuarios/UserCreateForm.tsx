import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  userCreateSchema,
  type UserCreateFormData,
} from "../../schemas/useCreateSchema";

import { createUser } from "../../services/usersApi";
import { ROLE_LABELS } from "../../types/roles";

export default function UserCreateForm() {

  const [serverError, setServerError] =
    useState("");

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UserCreateFormData>({
    resolver:
      zodResolver(userCreateSchema),

    mode: "onBlur",
  });

  // =========================
  // IMAGE
  // =========================

  const handleImageChange = (
    file: File | undefined
  ) => {

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    setValue("foto", file);

    const objectUrl =
      URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  // =========================
  // SUBMIT
  // =========================

  const onSubmit = async (
    data: UserCreateFormData
  ) => {

    try {

      setServerError("");

      let fotoBytes:
        | number[]
        | undefined = undefined;

      let mimeType:
        | string
        | undefined = undefined;

      // =====================
      // FILE -> BYTE ARRAY
      // =====================

      if (data.foto) {

        const arrayBuffer =
          await data.foto.arrayBuffer();

        fotoBytes = Array.from(
          new Uint8Array(arrayBuffer)
        );

        mimeType = data.foto.type;
      }

      await createUser({
        username: data.username,

        nombre: data.nombre,

        apellido: data.apellido,

        email: data.email,

        password: data.password,

        perfilAcademico:
          data.perfilAcademico,

        foto: fotoBytes,

        mimeType,

        RoleName: data.RoleName,
      });

      alert("Usuario creado");

    } catch (error: any) {

      const message =
        error.response?.data?.message ||
        "Error al crear usuario";

      setServerError(message);
    }
  };

  return (
    <div
      className="
        mx-auto
        max-w-4xl
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <h1
        className="
          mb-8
          text-3xl
          font-black
          tracking-tight
          text-slate-900
        "
      >
        Crear usuario
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >

        {/* GRID */}
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >

          {/* USERNAME */}
          <div>
            <label className={labelStyles}>
              Username
            </label>

            <input
              {...register("username")}
              className={inputStyles}
            />

            {errors.username && (
              <p className={errorStyles}>
                {
                  errors.username
                    .message
                }
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className={labelStyles}>
              Email
            </label>

            <input
              {...register("email")}
              className={inputStyles}
            />

            {errors.email && (
              <p className={errorStyles}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* NOMBRE */}
          <div>
            <label className={labelStyles}>
              Nombre
            </label>

            <input
              {...register("nombre")}
              className={inputStyles}
            />

            {errors.nombre && (
              <p className={errorStyles}>
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* APELLIDO */}
          <div>
            <label className={labelStyles}>
              Apellido
            </label>

            <input
              {...register("apellido")}
              className={inputStyles}
            />

            {errors.apellido && (
              <p className={errorStyles}>
                {
                  errors.apellido
                    .message
                }
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className={labelStyles}>
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              className={inputStyles}
            />

            {errors.password && (
              <p className={errorStyles}>
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <label className={labelStyles}>
              Rol
            </label>

            <select
              {...register("RoleName")}
              className={inputStyles}
            >
              <option value="">
                Seleccionar
              </option>

              {Object.entries(ROLE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.RoleName && (
              <p className={errorStyles}>
                {
                  errors.RoleName
                    .message
                }
              </p>
            )}
          </div>
        </div>

        {/* PERFIL */}
        <div>
          <label className={labelStyles}>
            Perfil académico
          </label>

          <textarea
            rows={5}
            {...register(
              "perfilAcademico"
            )}
            className={inputStyles}
          />
        </div>

        {/* FOTO */}
        <div>
          <label className={labelStyles}>
            Foto
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) =>
              handleImageChange(
                e.target.files?.[0]
              )
            }
          />

          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="
                  h-64
                  w-64
                  rounded-2xl
                  border
                  border-slate-200
                  object-cover
                  shadow-sm
                "
              />
            </div>
          )}
        </div>

        {/* ERROR */}
        {serverError && (
          <p className={errorStyles}>
            {serverError}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonStyles}
        >
          {isSubmitting
            ? "Creando..."
            : "Crear usuario"}
        </button>
      </form>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const labelStyles = `
  mb-2
  block
  text-sm
  font-semibold
  text-slate-700
`;

const inputStyles = `
  w-full
  rounded-xl
  border
  border-slate-300
  bg-white
  px-4
  py-3
  text-slate-900
  outline-none
  transition
  focus:border-indigo-500
  focus:ring-4
  focus:ring-indigo-100
`;

const buttonStyles = `
  rounded-xl
  bg-indigo-600
  px-6
  py-3
  font-semibold
  text-white
  transition
  hover:bg-indigo-700
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const errorStyles = `
  mt-1
  text-sm
  text-red-500
`;