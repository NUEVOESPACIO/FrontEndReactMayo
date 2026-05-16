import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormData,
} from "../../schemas/loginSchema";

import { login } from "../../services/authServices";

import { useAuth } from "../../hooks/useAuths";
import type { User } from "../../types/authTypes";

export default function LoginForm() {

  const [serverError, setServerError] =
    useState("");

  const navigate = useNavigate();
  const { token, user, login: authLogin } = useAuth();
  const isLoggedIn = Boolean(token);

  const { register, handleSubmit, formState: { errors, isSubmitting, }, } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {

    try {

      setServerError("");

      const response = await login(
        data.username,
        data.password

      );

      authLogin(
        response.token,
        response.user
      );

      navigate("/");

    } catch (error: any) {

      const message =
        error.response?.data?.message ||
        "Error al iniciar sesión";

      setServerError(message);
    }
  };

  if (isLoggedIn) {
    const displayName = user?.name ?? user?.username ?? "usuario";

    return (
      <div className={containerStyles}>
        <h1 className={titleStyles}>¡Bienvenido, {displayName}!</h1>
        <p className="mb-6 text-center text-slate-600 leading-relaxed">
          Tu sesión está activa. Gracias por usar Gravity.
        </p>
        {user ? <UserDataDisplay user={user} /> : null}
      </div>
    );
  }

  return (
    <div className={containerStyles}>

      <h1 className={titleStyles}>
        Iniciar Sesión
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* USERNAME */}

        <div>

          <input
            type="text"
            placeholder="Usuario"
            {...register("username")}
            className={inputStyles}
          />

          {errors.username && (
            <p className={errorStyles}>
              {errors.username.message}
            </p>
          )}

        </div>



        {/* PASSWORD */}

        <div>

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={inputStyles}
          />

          {errors.password && (
            <p className={errorStyles}>
              {errors.password.message}
            </p>
          )}

        </div>

        {/* SERVER ERROR */}

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
          {
            isSubmitting
              ? "Ingresando..."
              : "Ingresar"
          }
        </button>

      </form>
    </div>
  );
}

function UserDataDisplay({ user }: { user: User }) {
  const fields: { label: string; value: string | number }[] = [
    { label: "ID", value: user.id },
    { label: "Name", value: user.name },
    ...(user.surname ? [{ label: "Surname", value: user.surname }] : []),
    ...(user.username ? [{ label: "Username", value: user.username }] : []),
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
  ];

  return (
    <dl className="space-y-3 rounded-lg bg-slate-50 p-4 text-sm">
      {fields.map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-4">
          <dt className="font-medium text-slate-500">{label}</dt>
          <dd className="text-right text-slate-800">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* =========================
   STYLES
========================= */

const containerStyles = `
  w-full
  max-w-md
  bg-white
  p-8
  rounded-2xl
  shadow-xl
`;

const titleStyles = `
  text-3xl
  font-bold
  text-center
  mb-6
`;

const inputStyles = `
  w-full
  border
  border-gray-300
  rounded-lg
  p-3
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
`;

const buttonStyles = `
  w-full
  bg-blue-600
  hover:bg-blue-700
  disabled:bg-blue-300
  text-white
  p-3
  rounded-lg
  transition
  font-semibold
`;

const errorStyles = `
  text-red-500
  text-sm
  mt-1
`;