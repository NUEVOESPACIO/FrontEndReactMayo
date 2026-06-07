import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  userCreateSchema,
  type UserCreateFormData,
} from "../../schemas/useCreateSchema";

import { createUser } from "../../services/usersApi";

import { ROLE_LABELS } from "../../types/roles";

interface UserCreateFormProps {
  onCreated: () => void;
}

export default function UserCreateForm({
  onCreated,
}: UserCreateFormProps) {

  const [serverError, setServerError] =
    useState("");

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

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
  // REMOVE IMAGE
  // =========================

  const removeImage = () => {

    setPreviewUrl(null);

    setValue("foto", undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (
    file: File | undefined
  ) => {

    if (!file) {
      removeImage();
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {

      setServerError(
        "La imagen debe ser JPG/JPEG"
      );

      removeImage();

      return;
    }

    setServerError("");

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

      onCreated();

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
        max-w-6xl
        space-y-3
      "
    >

      {/* CARD */}
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-3.5
          shadow-sm
        "
      >

        <h1
          className="
            mb-3
            text-2xl
            font-black
            tracking-tight
            text-slate-900
          "
        >
          Crear usuario
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >

          {/* =========================
              TOP SECTION
          ========================= */}

          <div
            className="
              grid
              gap-3
              rounded-3xl
              bg-slate-50
              p-3.5
              xl:grid-cols-12
            "
          >

            {/* FOTO */}
            <div
              className="
                xl:col-span-4
              "
            >

              <label className={labelStyles}>
                Foto
              </label>

              {/* INPUT OCULTO */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files?.[0]
                  )
                }
              />

              <div className="flex gap-2.5">

                {/* PREVIEW */}
                <div
                  className="
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                  "
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <span
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Sin foto
                    </span>
                  )}
                </div>

                {/* BOTONES */}
                <div
                  className="
                    flex
                    flex-col
                    gap-1.5
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="
                      rounded-xl
                      border
                      border-indigo-300
                      bg-indigo-100
                      px-4
                      py-1.5
                      text-sm
                      font-semibold
                      text-indigo-700
                      transition
                      hover:bg-indigo-200
                    "
                  >
                    Subir foto
                  </button>

                  {previewUrl && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="
                        rounded-xl
                        border
                        border-red-300
                        bg-red-100
                        px-4
                        py-1.5
                        text-sm
                        font-semibold
                        text-red-700
                        transition
                        hover:bg-red-200
                      "
                    >
                      Quitar foto
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* DATOS TOP */}
            <div
              className="
                grid
                gap-2.5
                md:grid-cols-2
                xl:col-span-8
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

                  {Object.entries(
                    ROLE_LABELS
                  ).map(([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
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
          </div>

          {/* =========================
              RESTO FORM
          ========================= */}

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-3.5
            "
          >

            <div
              className="
                grid
                gap-2.5
                md:grid-cols-2
                xl:grid-cols-4
              "
            >

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

              {/* CONFIRM PASSWORD */}
              <div>
                <label className={labelStyles}>
                  Confirmar Password
                </label>

                <input
                  type="password"
                  {...register(
                    "confirmPassword"
                  )}
                  className={inputStyles}
                />

                {errors.confirmPassword && (
                  <p className={errorStyles}>
                    {
                      errors.confirmPassword
                        .message
                    }
                  </p>
                )}
              </div>

              {/* PERFIL */}
              <div className="xl:col-span-4">
                <label className={labelStyles}>
                  Perfil académico
                </label>

                <textarea
                  rows={3}
                  {...register(
                    "perfilAcademico"
                  )}
                  className={inputStyles}
                />
              </div>
            </div>
          </div>

          {/* ERROR */}
          {serverError && (
            <p className={errorStyles}>
              {serverError}
            </p>
          )}
        </form>
      </div>

      {/* BUTTON OUTSIDE */}
      <div className="flex justify-end">

        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className={buttonStyles}
        >
          {isSubmitting
            ? "Creando..."
            : "Crear usuario"}
        </button>
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const labelStyles = `
  mb-0.5
  block
  text-sm
  font-medium
  text-slate-700
`;

const inputStyles = `
  w-full
  rounded-xl
  border
  border-slate-300
  bg-white
  px-3
  py-1.5
  text-sm
  text-slate-900
  outline-none
  transition
  focus:border-indigo-500
  focus:ring-2
  focus:ring-indigo-100
`;

const buttonStyles = `
  rounded-xl
  bg-indigo-600
  px-5
  py-2
  text-sm
  font-semibold
  text-white
  transition
  hover:bg-indigo-700
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const errorStyles = `
  mt-0.5
  text-xs
  text-red-500
`;